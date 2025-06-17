import { tw } from '@src/shared/lib/utils';
import { Image, Modal, Pressable, Text, View } from 'react-native';

interface ModalTemplateProps {
  children: React.ReactNode;
  title: string;
  visible: boolean;
  closeModal: () => void;
}

export const ModalTemplate = ({
  children,
  title,
  visible,
  closeModal,
}: ModalTemplateProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => closeModal()}>
      <View
        style={tw`flex-1 items-center justify-center bg-black/50 px-4`}
        onTouchEnd={closeModal}>
        <View
          style={tw`flex w-full flex-col items-center rounded-2xl bg-white p-4`}
          onTouchEnd={(e) => e.stopPropagation()}>
          <View style={tw`flex w-full flex-row items-center justify-between`}>
            <Text style={tw`text-lg font-semibold`}>{title}</Text>
            <Pressable onPress={() => closeModal()}>
              {({ pressed }) => (
                <Image
                  style={tw`h-6 w-6`}
                  source={
                    pressed
                      ? require('@assets/icon/close-icon-active.png')
                      : require('@assets/icon/close-icon-inactive.png')
                  }
                />
              )}
            </Pressable>
          </View>
          {children}
        </View>
      </View>
    </Modal>
  );
};
