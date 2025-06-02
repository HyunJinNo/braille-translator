import { COLOR } from '@src/shared/config';
import { tw } from '@src/shared/lib/utils';
import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
} from 'react-native';

interface SettingButtonProps {
  source: ImageSourcePropType;
  title: string;
  description: string;
  onPress?: ((event: GestureResponderEvent) => void) | null;
}

export const SettingButton = ({
  source,
  title,
  description,
  onPress,
}: SettingButtonProps) => {
  return (
    <Pressable
      style={tw`flex h-24 flex-row items-center gap-4 px-4`}
      android_ripple={{ color: COLOR['blue-200'] }}
      onPress={onPress}>
      <Image style={tw`h-10 w-10`} source={source} />
      <View style={tw`flex flex-col items-start gap-1`}>
        <Text style={tw`text-base font-semibold`}>{title}</Text>
        <Text style={tw`text-xs`}>{description}</Text>
        <Text style={tw`text-xs text-blue-400`}>느림</Text>
      </View>
    </Pressable>
  );
};
