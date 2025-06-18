import { tw } from '@src/shared/lib/utils';
import { LoadingOverlay } from '@src/shared/ui/overlay';
import { ControlBar } from '@src/widgets/controlBar';
import { Image, View } from 'react-native';
import { CameraView } from '@src/widgets/cameraView';
import { Filter } from '@src/shared/ui/filter';
import { useBrailleCameraTranslationScreen } from '../model/useBrailleCameraTranslationScreen';
import { TranslationTextViewer } from '@src/shared/ui/display';

export const BrailleCameraTranslationScreen = () => {
  const {
    state,
    device,
    camera,
    handleLayout,
    handlePlayButtonPress,
    handleSnapshotButtonPress,
    handleStopButtonPress,
    handleSaveButtonPress,
  } = useBrailleCameraTranslationScreen();

  return (
    <View style={tw`flex h-full flex-col justify-between bg-black`}>
      <LoadingOverlay visible={state.loading} />
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
          isPlayButtonActive={state.isPlayButtonActive}
          isSnapshotButtonActive={state.isSnapshotButtonActive}
          isStopButtonActive={state.isStopButtonActive}
          isSaveButtonActive={state.isSaveButtonActive}
          onPlayButtonPress={handlePlayButtonPress}
          onSnapshotButtonPress={handleSnapshotButtonPress}
          onStopButtonPress={handleStopButtonPress}
          onSaveButtonPress={handleSaveButtonPress}
        />
        <TranslationTextViewer
          recognizedText={state.recognizedText}
          translatedText={state.translatedText}
        />
      </View>
    </View>
  );
};
