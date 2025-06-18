import { tw } from '@src/shared/lib/utils';
import { TranslationTextViewer } from '@src/shared/ui/display';
import { ModalTemplate } from '@src/shared/ui/modal';
import { View } from 'react-native';

interface HistoryModalProps {
  recognizedText: string;
  translatedText: string;
  isOpen: boolean;
  closeModal: () => void;
}

export const HistoryModal = ({
  recognizedText,
  translatedText,
  isOpen,
  closeModal,
}: HistoryModalProps) => {
  return (
    <ModalTemplate title="번역 기록" visible={isOpen} closeModal={closeModal}>
      <View style={tw`mt-6 h-80 w-full`}>
        <TranslationTextViewer
          recognizedText={recognizedText}
          translatedText={translatedText}
        />
      </View>
    </ModalTemplate>
  );
};
