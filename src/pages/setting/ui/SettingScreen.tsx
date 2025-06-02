import { tw } from '@src/shared/lib/utils';
import { SettingButton } from '@src/shared/ui/button';
import { View } from 'react-native';

export const SettingScreen = () => {
  return (
    <View style={tw`h-full bg-white`}>
      <SettingButton
        source={require('@assets/icons/speed-icon.png')}
        title="음성 속도"
        description="음성으로 읽어주는 기능의 재생 속도를 조절합니다."
      />
      <SettingButton
        source={require('@assets/icons/font-icon.png')}
        title="글자 크기"
        description="출력되는 글자의 크기를 조절합니다."
      />
    </View>
  );
};
