import { FontSize } from '@src/entities/fontSize';
import { tw } from '@src/shared/lib/utils';
import { RadioButton } from '@src/shared/ui/button';
import { ModalTemplate } from '@src/shared/ui/modal';
import { TranslationTextViewer } from '@src/widgets/translationTextViewer';
import { Pressable, Text, View } from 'react-native';

interface FontSizeModalProps {
  isOpen: boolean;
  fontSize: FontSize;
  closeModal: () => void;
  setFontSize: (fontSize: FontSize) => void;
}

export const FontSizeModal = ({
  isOpen,
  fontSize,
  closeModal,
  setFontSize,
}: FontSizeModalProps) => {
  return (
    <ModalTemplate title="글자 크기" visible={isOpen} closeModal={closeModal}>
      <View style={tw`mt-2 flex w-full flex-col`}>
        <RadioButton
          currentValue={fontSize}
          value="작게 (16px)"
          onPress={() => setFontSize('작게 (16px)')}
        />
        <RadioButton
          currentValue={fontSize}
          value="중간 (20px)"
          onPress={() => setFontSize('중간 (20px)')}
        />
        <RadioButton
          currentValue={fontSize}
          value="크게 (24px)"
          onPress={() => setFontSize('크게 (24px)')}
        />
      </View>
      <Text style={tw`mt-2 w-full text-base text-blue-400`}>
        아래와 같이 표시됩니다.
      </Text>
      <View style={tw`my-4 h-80 w-full`}>
        <TranslationTextViewer
          recognizedText="표시되는 글자 크기입니다."
          translatedText="⠙⠬⠠⠕⠊⠽⠉⠵⠀⠈⠮⠨⠀⠋⠪⠈⠕⠕⠃⠉⠕⠊⠲"
        />
      </View>
      <Pressable
        style={({ pressed }) =>
          tw.style(
            pressed ? 'bg-blue-500' : 'bg-blue-400',
            'rounded-full border border-blue-200 px-8 py-2 shadow',
          )
        }
        onPress={closeModal}>
        <Text style={tw`text-base text-white`}>완료</Text>
      </Pressable>
    </ModalTemplate>
  );
};
