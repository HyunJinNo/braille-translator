import { tw } from '@src/shared/lib/utils';
import { LoadingOverlay } from '@src/shared/ui/overlay';
import { ImageSelector } from '@src/widgets/imageSelector';
import { View } from 'react-native';
import { useHangulImageTranslationScreen } from '../model/useHangulImageTranslationScreen';
import { TranslationTextViewer } from '@src/shared/ui/display';
import { ControlBar } from '@src/widgets/controlBar';

export const HangulImageTranslationScreen = () => {
  const { loading, image, recognizedText, translatedText, handleImageUpload } =
    useHangulImageTranslationScreen();

  return (
    <View style={tw`flex h-full flex-col justify-between bg-white`}>
      <LoadingOverlay loading={loading} />
      <View style={tw`flex-1 items-center justify-center bg-white`}>
        <ImageSelector image={image} onPress={handleImageUpload} />
      </View>
      <View style={tw`px-4`}>
        <ControlBar
          isEditButtonActive={false}
          isStopButtonActive={false}
          isSaveButtonActive={false}
          onEditButtonPress={() => {}}
          onStopButtonPress={() => {}}
          onSaveButtonPress={() => {}}
        />
        <TranslationTextViewer
          recognizedText={recognizedText}
          translatedText={translatedText}
        />
      </View>
    </View>
  );
};
