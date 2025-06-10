import { tw } from '@src/shared/lib/utils';
import { Image } from 'react-native';

interface HomeIconProps {
  focused?: boolean;
}

export const HomeIcon = ({ focused }: HomeIconProps) => {
  return (
    <Image
      style={tw`h-6 w-6`}
      source={
        focused
          ? require('@assets/icon/home-icon-active.png')
          : require('@assets/icon/home-icon-inactive.png')
      }
    />
  );
};
