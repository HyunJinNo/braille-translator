import { tw } from '@src/shared/lib/utils';
import { Image } from 'react-native';

interface HangulToBrailleIconProps {
  focused?: boolean;
}

export const HangulToBrailleIcon = ({ focused }: HangulToBrailleIconProps) => {
  return (
    <Image
      style={tw`h-6 w-6`}
      source={
        focused
          ? require('@assets/icons/hangul-to-braille-icon-active.png')
          : require('@assets/icons/hangul-to-braille-icon-inactive.png')
      }
    />
  );
};
