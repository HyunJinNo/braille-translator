import { tw } from '@src/shared/lib/utils';
import { LoadingOverlay } from '@src/shared/ui/overlay';
import { ControlBar } from '@src/widgets/controlBar';
import { TranslationTextViewer } from '@src/widgets/translationTextViewer';
import { Image, View } from 'react-native';
import { useCameraTranslationScreen } from '../model/useCameraTranslationScreen';
import { CameraView } from '@src/widgets/cameraView';
import { Filter } from '@src/shared/ui/filter';

export const CameraTranslationScreen = () => {
  const {
    state,
    device,
    camera,
    handleLayout,
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
        <Filter>
          <Image style={tw`h-full w-full`} source={{ uri: state.imageURL }} />
        </Filter>
      ) : (
        <CameraView
          device={device}
          isActive={state.isCameraActive}
          camera={camera}
          onLayout={handleLayout}
        />
      )}
      <View style={tw`bg-white px-4`}>
        <ControlBar
          isHighlightButtonActive={state.isHighlightButtonActive}
          isEditButtonActive={state.isEditButtonActive}
          isPlayButtonActive={state.isPlayButtonActive}
          isSnapshotButtonActive={state.isSnapshotButtonActive}
          isStopButtonActive={state.isStopButtonActive}
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
