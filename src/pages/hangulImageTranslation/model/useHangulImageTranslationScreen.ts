import TextRecognition, {
  TextRecognitionScript,
} from '@react-native-ml-kit/text-recognition';
import { History } from '@src/entities/history';
import { translate } from '@src/features/hangulToBraille';
import { HANGUL_TO_BRAILLE_HISTORY_KEY } from '@src/shared/config';
import { storage } from '@src/shared/lib/utils';
import { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';

export const useHangulImageTranslationScreen = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string>();
  const [recognizedText, setRecognizedText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const handleImageUpload = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });

    if (result.assets && result.assets[0].uri) {
      setImage(result.assets[0].uri);
      setLoading(true);

      const textRecognitionResult = await TextRecognition.recognize(
        result.assets[0].uri,
        TextRecognitionScript.KOREAN,
      );
      const translatedResult = translate(textRecognitionResult.text);

      setRecognizedText(textRecognitionResult.text);
      setTranslatedText(translatedResult);
      setLoading(false);

      const hangulToBrailleHistory: History[] = JSON.parse(
        storage.getString(HANGUL_TO_BRAILLE_HISTORY_KEY) ?? '[]',
      );

      storage.set(
        HANGUL_TO_BRAILLE_HISTORY_KEY,
        JSON.stringify([
          {
            recognizedText: textRecognitionResult.text,
            translatedText: translatedResult,
            isBookmarked: false,
            createdAt: new Date().toLocaleString(),
          },
          ...hangulToBrailleHistory,
        ]),
      );
    }
  };

  return { loading, image, recognizedText, translatedText, handleImageUpload };
};
