import { useNavigation } from '@react-navigation/native';
import { tw } from '@src/shared/lib/utils';
import { ControlBar } from '@src/widgets/controlBar';
import { TranslationTextViewer } from '@src/widgets/translationTextViewer';
import { useEffect } from 'react';
import { View } from 'react-native';
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
        <Camera style={tw`w-full flex-1`} device={device} isActive={true} />
      )}
      <View style={tw`px-4`}>
        <ControlBar />
        <TranslationTextViewer />
      </View>
    </View>
  );
};
