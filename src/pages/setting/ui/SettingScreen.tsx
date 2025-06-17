import { useModal } from '@src/shared/lib/hooks';
import { tw } from '@src/shared/lib/utils';
import { SettingButton } from '@src/shared/ui/button';
import { View } from 'react-native';
import { FontSizeModal } from './FontSizeModal';
import { useContext } from 'react';
import { FontSizeContext } from '@src/entities/fontSize';

export const SettingScreen = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const { fontSize, setFontSize } = useContext(FontSizeContext);

  return (
    <View style={tw`h-full bg-white`}>
      <FontSizeModal
        isOpen={isOpen}
        fontSize={fontSize}
        closeModal={closeModal}
        setFontSize={setFontSize}
      />
      <SettingButton
        source={require('@assets/icon/font-icon.png')}
        title="글자 크기"
        description="출력되는 글자의 크기를 조절합니다."
        value={fontSize}
        onPress={openModal}
      />
    </View>
  );
};
