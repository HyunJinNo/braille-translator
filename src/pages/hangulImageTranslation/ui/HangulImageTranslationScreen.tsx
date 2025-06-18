import { tw } from '@src/shared/lib/utils';
import { LoadingOverlay } from '@src/shared/ui/overlay';
import { ImageSelector } from '@src/widgets/imageSelector';
import { View } from 'react-native';
import { useHangulImageTranslationScreen } from '../model/useHangulImageTranslationScreen';
import { TranslationTextViewer } from '@src/shared/ui/display';
import { ControlBar } from '@src/widgets/controlBar';

export const HangulImageTranslationScreen = () => {
  const {
    state,
    handleImageUpload,
    handleEditButtonPress,
    handleStopButtonPress,
    handleSaveButtonPress,
  } = useHangulImageTranslationScreen();

  return (
    <View style={tw`flex h-full flex-col justify-between bg-white`}>
      <LoadingOverlay visible={state.loading} />
      <View style={tw`flex-1 items-center justify-center bg-white`}>
        <ImageSelector image={state.imageURL} onPress={handleImageUpload} />
      </View>
      <View style={tw`px-4`}>
        <ControlBar
          isEditButtonActive={state.isEditButtonActive}
          isStopButtonActive={state.isStopButtonActive}
          isSaveButtonActive={state.isSaveButtonActive}
          onEditButtonPress={handleEditButtonPress}
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
