import { tw } from '@src/shared/lib/utils';
import {
  GestureResponderEvent,
  Image,
  Pressable,
  Text,
  View,
} from 'react-native';

interface ClearButtonProps {
  onPress?: ((event: GestureResponderEvent) => void) | null;
}

export const ClearButton = ({ onPress }: ClearButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <View
          style={tw.style(
            pressed ? 'border-green-200' : 'border-gray-200',
            'flex flex-row items-center gap-1 rounded-lg border p-1',
          )}>
          <Image
            style={tw`h-4 w-4`}
            source={
              pressed
                ? require('@assets/icon/delete-icon-filled-active.png')
                : require('@assets/icon/delete-icon-filled-inactive.png')
            }
          />
          <Text
            style={tw.style(
              pressed ? 'text-green-400' : 'text-gray-400',
              'text-xs',
            )}>
            전체 기록 삭제
          </Text>
        </View>
      )}
    </Pressable>
  );
};
