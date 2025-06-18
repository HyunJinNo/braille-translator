import { tw } from '@src/shared/lib/utils';
import { LoadingOverlay } from '@src/shared/ui/overlay';
import { ControlBar } from '@src/widgets/controlBar';
import { Image, View } from 'react-native';
import { CameraView } from '@src/widgets/cameraView';
import { Filter } from '@src/shared/ui/filter';
import { useHangulCameraTranslationScreen } from '../model/useHangulCameraTranslationScreen';
import { TranslationTextViewer } from '@src/shared/ui/display';

export const HangulCameraTranslationScreen = () => {
  const {
    state,
    device,
    camera,
    handleLayout,
    handleEditButtonPress,
    handlePlayButtonPress,
    handleSnapshotButtonPress,
    handleStopButtonPress,
    handleRecognizedTextChange,
    handleSaveButtonPress,
  } = useHangulCameraTranslationScreen();

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
          isEditButtonActive={state.isEditButtonActive}
          isPlayButtonActive={state.isPlayButtonActive}
          isSnapshotButtonActive={state.isSnapshotButtonActive}
          isStopButtonActive={state.isStopButtonActive}
          isSaveButtonActive={state.isSaveButtonActive}
          onEditButtonPress={handleEditButtonPress}
          onPlayButtonPress={handlePlayButtonPress}
          onSnapshotButtonPress={handleSnapshotButtonPress}
          onStopButtonPress={handleStopButtonPress}
          onSaveButtonPress={handleSaveButtonPress}
        />
        <TranslationTextViewer
          recognizedText={state.recognizedText}
          translatedText={state.translatedText}
          recognizedTextEditable={state.recognizedTextEditable}
          onChangeRecognizedText={handleRecognizedTextChange}
        />
      </View>
    </View>
  );
};
