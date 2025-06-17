import { COLOR } from '@src/shared/config';
import { tw } from '@src/shared/lib/utils';
import { Image, Pressable, Text } from 'react-native';

interface RadioButtonProps<T extends string> {
  currentValue: T;
  value: T;
  onPress: () => void;
}

export const RadioButton = <T extends string>({
  currentValue,
  value,
  onPress,
}: RadioButtonProps<T>) => {
  return (
    <Pressable
      style={tw`flex flex-row items-center gap-4 py-2`}
      android_ripple={{ color: COLOR['blue-200'] }}
      onPress={onPress}>
      <Image
        style={tw`h-6 w-6`}
        source={
          currentValue === value
            ? require('@assets/icon/radio-button-icon-active.png')
            : require('@assets/icon/radio-button-icon-inactive.png')
        }
      />
      <Text style={tw`text-base`}>{value}</Text>
    </Pressable>
  );
};
