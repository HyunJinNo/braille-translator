import { tw } from '@src/shared/lib/utils';
import { Image } from 'react-native';

interface BrailleToHangulIconProps {
  focused?: boolean;
}

export const BrailleToHangulIcon = ({ focused }: BrailleToHangulIconProps) => {
  return (
    <Image
      style={tw`h-6 w-6`}
      source={
        focused
          ? require('@assets/icons/braille-to-hangul-icon-active.png')
          : require('@assets/icons/braille-to-hangul-icon-inactive.png')
      }
    />
  );
};
