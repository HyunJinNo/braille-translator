import TextRecognition, {
  TextRecognitionScript,
} from '@react-native-ml-kit/text-recognition';
import { translate } from '@src/features/hangulToBraille';
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
      setRecognizedText(textRecognitionResult.text);
      setTranslatedText(translate(textRecognitionResult.text));
      setLoading(false);
    }
  };

  return { loading, image, recognizedText, translatedText, handleImageUpload };
};
