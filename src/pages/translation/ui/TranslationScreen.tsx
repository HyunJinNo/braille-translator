import { useNavigation } from '@react-navigation/native';
import { tw } from '@src/shared/lib/utils';
import { ControlBar } from '@src/widgets/controlBar';
import { TranslationTextViewer } from '@src/widgets/translationTextViewer';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

export const TranslationScreen = () => {
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const navigation = useNavigation();

  useEffect(() => {
    if (!hasPermission) {
      (async () => {
        const cameraPermission = await requestPermission();

        if (!cameraPermission) {
          navigation.goBack();
        }
      })();
    }
  }, [hasPermission, navigation, requestPermission]);

  return (
    <View style={tw`flex h-full flex-col justify-between bg-white`}>
      {!device ? (
        <View style={tw`w-full flex-1 bg-black`} />
      ) : (
        <View style={tw`flex-10 relative`}>
          <Camera style={tw`h-full w-full`} device={device} isActive={true} />
          <View
            style={tw`absolute left-4 right-4 top-1/2 h-24 -translate-y-12 rounded-2xl border-2 border-white`}
          />
          <Text
            style={tw`absolute left-0 right-0 top-1/2 translate-y-14 text-center text-base text-white`}>
            텍스트를 박스에 비춰 주세요
          </Text>
        </View>
      )}
      <View style={tw`px-4`}>
        <ControlBar />
        <TranslationTextViewer />
      </View>
    </View>
  );
};
