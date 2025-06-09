import { tw } from '@src/shared/lib/utils';
import { Image } from 'react-native';

interface HistoryIconProps {
  focused?: boolean;
}

export const HistoryIcon = ({ focused }: HistoryIconProps) => {
  return (
    <Image
      style={tw`h-6 w-6`}
      source={
        focused
          ? require('@assets/icon/history-icon-active.png')
          : require('@assets/icon/history-icon-inactive.png')
      }
    />
  );
};
