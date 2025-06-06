import TextRecognition, {
  TextRecognitionScript,
} from '@react-native-ml-kit/text-recognition';
import { translate } from '@src/features/hangulToBraille';
import { tw } from '@src/shared/lib/utils';
import { ImageSelector } from '@src/widgets/imageSelector';
import { TranslationTextViewer } from '@src/widgets/translationTextViewer';
import { useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

export const PictureTranslationScreen = () => {
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

  return (
    <View style={tw`flex h-full flex-col justify-between bg-white`}>
      {loading && (
        <View
          style={tw`absolute bottom-0 left-0 right-0 top-0 z-10 flex flex-col items-center justify-center gap-4 bg-black/50`}>
          <ActivityIndicator size={80} color={'#FFFFFF'} />
          <Text style={tw`text-xl font-semibold text-white`}>분석 중...</Text>
        </View>
      )}
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
