import { tw } from '@src/shared/lib/utils';
import { Image } from 'react-native';

interface SettingIconProps {
  focused?: boolean;
}

export const SettingIcon = ({ focused }: SettingIconProps) => {
  return (
    <Image
      style={tw`h-6 w-6`}
      source={
        focused
          ? require('@assets/icons/setting-active.png')
          : require('@assets/icons/setting.png')
      }
    />
  );
};
