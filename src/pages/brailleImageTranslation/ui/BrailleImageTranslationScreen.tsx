import { BACKEND_URL } from '@env';
import { tw } from '@src/shared/lib/utils';
import { LoadingOverlay } from '@src/shared/ui/overlay';
import { ImageSelector } from '@src/widgets/imageSelector';
import { TranslationTextViewer } from '@src/widgets/translationTextViewer';
import { useState } from 'react';
import { View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

export const BrailleImageTranslationScreen = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string>();
  const [recognizedText, setRecognizedText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const handleImageUpload = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });

    if (result.assets && result.assets[0].uri) {
      setImage(result.assets[0].uri);
      setLoading(true);

      const formData = new FormData();
      formData.append('file', {
        name: result.assets[0].fileName,
        type: result.assets[0].type,
        uri: result.assets[0].uri,
      });

      const response = await fetch(`${BACKEND_URL}/inference`, {
        method: 'POST',
        body: formData,
      });

      const data: { srcText: string; translatedText: string } =
        await response.json();

      setRecognizedText(data.srcText);
      setTranslatedText(data.translatedText);
      setLoading(false);
    }
  };

  return (
    <View style={tw`flex h-full flex-col justify-between bg-white`}>
      <LoadingOverlay loading={loading} />
      <View style={tw`mt-14 flex-1 items-center justify-center bg-white`}>
        <ImageSelector image={image} onPress={handleImageUpload} />
      </View>
      <View style={tw`px-4`}>
        <TranslationTextViewer
          recognizedText={recognizedText}
          translatedText={translatedText}
        />
      </View>
    </View>
  );
};
