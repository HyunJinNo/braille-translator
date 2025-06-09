import TextRecognition, {
  TextRecognitionScript,
} from '@react-native-ml-kit/text-recognition';
import { useNavigation } from '@react-navigation/native';
import { translate } from '@src/features/hangulToBraille';
import { tw } from '@src/shared/lib/utils';
import { LoadingOverlay } from '@src/shared/ui/overlay';
import { ControlBar } from '@src/widgets/controlBar';
import { TranslationTextViewer } from '@src/widgets/translationTextViewer';
import { useEffect, useRef, useState } from 'react';
import { Image, Text, View } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

export const CameraTranslationScreen = () => {
  const navigation = useNavigation();
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);
  const { hasPermission, requestPermission } = useCameraPermission();
  const [recognizedText, setRecognizedText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState('');

  const takeSnapshot = async () => {
    const snapshot = await camera.current?.takeSnapshot();

    if (snapshot) {
      setImageURL('file://' + snapshot.path);
      setLoading(true);

      const textRecognitionResult = await TextRecognition.recognize(
        'file://' + snapshot.path,
        TextRecognitionScript.KOREAN,
      );
      setRecognizedText(textRecognitionResult.text);
      setTranslatedText(translate(textRecognitionResult.text));
      setLoading(false);
    }
  };

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
    <View style={tw`flex h-full flex-col justify-between bg-black`}>
      <LoadingOverlay loading={loading} />
      {imageURL !== '' ? (
        <Image
          style={tw`w-full flex-1 border border-blue-500`}
          source={{ uri: imageURL }}
        />
      ) : !device ? (
        <View style={tw`w-full flex-1 bg-black`} />
      ) : (
        <View style={tw`relative flex-1`}>
          <Camera
            style={tw`h-full w-full`}
            device={device}
            isActive={false} // TODO
            photo={true}
            ref={camera}
          />
          <View
            style={tw`absolute bottom-1/2 left-0 right-0 top-0 -translate-y-12 bg-black/50`}
          />
          <View
            style={tw`absolute left-0 top-1/2 h-24 w-4 -translate-y-12 bg-black/50`}
          />
          <View
            style={tw`absolute right-0 top-1/2 h-24 w-4 -translate-y-12 bg-black/50`}
          />
          <View
            style={tw`absolute bottom-0 left-0 right-0 top-1/2 translate-y-12 bg-black/50`}
          />
          <View
            style={tw`absolute left-4 right-4 top-1/2 h-24 -translate-y-12 border-2 border-white`}
          />
          <Text
            style={tw`absolute left-0 right-0 top-1/2 translate-y-14 text-center text-base text-white`}>
            텍스트를 박스에 비춰 주세요
          </Text>
        </View>
      )}
      <View style={tw`bg-white px-4`}>
        <ControlBar
          isSpeakButtonActive={false}
          isVoiceButtonActive={false}
          isHighlightButtonActive={false}
          isEditButtonActive={false}
          isPlayButtonActive={true}
          isSnapshotButtonActive={false}
          isStopButtonActive={false}
        />
        <TranslationTextViewer
          recognizedText={recognizedText}
          translatedText={translatedText}
        />
      </View>
    </View>
  );
};
