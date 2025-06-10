import { tw } from '@src/shared/lib/utils';
import {
  GestureResponderEvent,
  Image,
  Pressable,
  Text,
  View,
} from 'react-native';

interface BookmarkButtonProps {
  isActive?: boolean;
  onPress?: ((event: GestureResponderEvent) => void) | null;
}

export const BookmarkButton = ({ isActive, onPress }: BookmarkButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <View
          style={tw.style(
            isActive || pressed ? 'border-green-200' : 'border-gray-200',
            'flex flex-row items-center gap-1 rounded-lg border p-1',
          )}>
          <Image
            style={tw`h-4 w-4`}
            source={
              isActive || pressed
                ? require('@assets/icon/star-icon-filled-active.png')
                : require('@assets/icon/star-icon-filled-inactive.png')
            }
          />
          <Text
            style={tw.style(
              isActive || pressed ? 'text-green-400' : 'text-gray-400',
              'text-xs',
            )}>
            즐겨찾기한 기록
          </Text>
        </View>
      )}
    </Pressable>
  );
};
