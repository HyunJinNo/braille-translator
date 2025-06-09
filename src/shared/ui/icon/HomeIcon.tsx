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
          ? require('@assets/icons/home-icon-active.png')
          : require('@assets/icons/home-icon-inactive.png')
      }
    />
  );
};
