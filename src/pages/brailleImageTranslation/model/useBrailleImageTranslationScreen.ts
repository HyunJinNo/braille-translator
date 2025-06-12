import { translate } from '@src/features/brailleToHangul';
import { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';

export const useBrailleImageTranslationScreen = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string>();
  const [recognizedText, setRecognizedText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const handleImageUpload = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });

    if (result.assets && result.assets[0].uri) {
      setImage(result.assets[0].uri);
      setLoading(true);

      const data = await translate({
        fileName: result.assets[0].fileName!,
        type: result.assets[0].type!,
        uri: result.assets[0].uri,
      });

      setRecognizedText(data.srcText);
      setTranslatedText(data.translatedText);
      setLoading(false);
    }
  };

  return { loading, image, recognizedText, translatedText, handleImageUpload };
};
