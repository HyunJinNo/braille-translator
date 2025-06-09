import { tw } from '@src/shared/lib/utils';
import { LoadingOverlay } from '@src/shared/ui/overlay';
import { ControlBar } from '@src/widgets/controlBar';
import { TranslationTextViewer } from '@src/widgets/translationTextViewer';
import { Image, View } from 'react-native';
import { useCameraTranslationScreen } from '../model/useCameraTranslationScreen';
import { CameraView } from '@src/widgets/cameraView';

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
      ) : (
        <CameraView
          device={device}
          isActive={state.isCameraActive}
          camera={camera}
        />
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
