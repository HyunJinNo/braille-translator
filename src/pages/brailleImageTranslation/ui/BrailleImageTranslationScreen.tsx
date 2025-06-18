import { tw } from '@src/shared/lib/utils';
import { LoadingOverlay } from '@src/shared/ui/overlay';
import { ImageSelector } from '@src/widgets/imageSelector';
import { View } from 'react-native';
import { useBrailleImageTranslationScreen } from '../model/useBrailleImageTranslationScreen';
import { TranslationTextViewer } from '@src/shared/ui/display';
import { ControlBar } from '@src/widgets/controlBar';

export const BrailleImageTranslationScreen = () => {
  const { state, handleImageUpload, handleSaveButtonPress } =
    useBrailleImageTranslationScreen();

  return (
    <View style={tw`flex h-full flex-col justify-between bg-white`}>
      <LoadingOverlay visible={state.loading} />
      <View style={tw`flex-1 items-center justify-center bg-white`}>
        <ImageSelector image={state.imageURL} onPress={handleImageUpload} />
      </View>
      <View style={tw`px-4`}>
        <ControlBar
          isSaveButtonActive={state.isSaveButtonActive}
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
