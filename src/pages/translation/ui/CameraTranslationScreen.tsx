import { tw } from '@src/shared/lib/utils';
import { LoadingOverlay } from '@src/shared/ui/overlay';
import { ControlBar } from '@src/widgets/controlBar';
import { TranslationTextViewer } from '@src/widgets/translationTextViewer';
import { Image, Text, View } from 'react-native';
import { Camera } from 'react-native-vision-camera';
import { useCameraTranslationScreen } from '../model/useCameraTranslationScreen';

export const CameraTranslationScreen = () => {
  const {
    state,
    device,
    camera,
    handleSpeakButtonPress,
    handleVoiceButtonPress,
    handleHighlightButtonPress,
    handleEditButtonPress,
    handlePlayButtonPress,
    handleSnapshotButtonPress,
    handleStopButtonPress,
  } = useCameraTranslationScreen();

  return (
    <View style={tw`flex h-full flex-col justify-between bg-black`}>
      <LoadingOverlay loading={state.loading} />
      {state.imageURL !== '' ? (
        <Image
          style={tw`w-full flex-1 border border-blue-500`}
          source={{ uri: state.imageURL }}
        />
      ) : !device ? (
        <View style={tw`w-full flex-1 bg-black`} />
      ) : (
        <View style={tw`relative flex-1`}>
          <Camera
            style={tw`h-full w-full`}
            device={device}
            isActive={state.isCameraActive}
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
          isSpeakButtonActive={state.isSpeakButtonActive}
          isVoiceButtonActive={state.isVoiceButtonActive}
          isHighlightButtonActive={state.isHighlightButtonActive}
          isEditButtonActive={state.isEditButtonActive}
          isPlayButtonActive={state.isPlayButtonActive}
          isSnapshotButtonActive={state.isSnapshotButtonActive}
          isStopButtonActive={state.isStopButtonActive}
          onSpeakButtonPress={handleSpeakButtonPress}
          onVoiceButtonPress={handleVoiceButtonPress}
          onHighlightButtonPress={handleHighlightButtonPress}
          onEditButtonPress={handleEditButtonPress}
          onPlayButtonPress={handlePlayButtonPress}
          onSnapshotButtonPress={handleSnapshotButtonPress}
          onStopButtonPress={handleStopButtonPress}
        />
        <TranslationTextViewer
          recognizedText={state.recognizedText}
          translatedText={state.translatedText}
        />
      </View>
    </View>
  );
};
