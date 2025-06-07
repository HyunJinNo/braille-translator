import { tw } from '@src/shared/lib/utils';
import { ScrollView, Text, View } from 'react-native';

interface TranslationTextViewerProps {
  recognizedText: string;
  translatedText: string;
}

export const TranslationTextViewer = ({
  recognizedText,
  translatedText,
}: TranslationTextViewerProps) => {
  return (
    <View style={tw`bg-white`}>
      <ScrollView style={tw`h-40 border-b border-t border-gray-400`}>
        <Text
          style={tw.style(
            recognizedText === '' && 'text-gray-400',
            'pt-2 text-xl',
          )}>
          {recognizedText !== '' ? recognizedText : '인식된 글자'}
        </Text>
      </ScrollView>
      <ScrollView style={tw`h-40`}>
        <Text
          style={tw.style(
            translatedText === '' && 'text-gray-400',
            'pt-2 text-xl',
          )}>
          {translatedText !== '' ? translatedText : '번역된 글자'}
        </Text>
      </ScrollView>
    </View>
  );
};
