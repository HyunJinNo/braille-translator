import { COLOR } from '@src/shared/config';
import { tw } from '@src/shared/lib/utils';
import { ScrollView, Text, TextInput, View } from 'react-native';

interface TranslationTextViewerProps {
  recognizedText: string;
  translatedText: string;
  recognizedTextEditable?: boolean;
  onChangeRecognizedText?: (text: string) => void;
}

export const TranslationTextViewer = ({
  recognizedText,
  translatedText,
  recognizedTextEditable,
  onChangeRecognizedText,
}: TranslationTextViewerProps) => {
  return (
    <View style={tw`bg-white`}>
      <ScrollView style={tw`h-40 border-b border-t border-gray-400`}>
        <TextInput
          style={tw.style(
            recognizedTextEditable &&
              'text-blue-400 underline underline-offset-2',
            'pt-2 text-xl',
          )}
          placeholderTextColor={COLOR['gray-400']}
          onChangeText={onChangeRecognizedText}
          value={recognizedText}
          placeholder="인식된 글자"
          editable={recognizedTextEditable ?? false}
        />
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
