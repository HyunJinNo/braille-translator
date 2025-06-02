import { tw } from '@src/shared/lib/utils';
import {
  FlatList,
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
} from 'react-native';

interface HomeButtonProps {
  source: ImageSourcePropType;
  title: string;
  description: string[];
  buttonStyle?: string;
  rippleColor?: string;
  textColor?: string;
  onPress?: ((event: GestureResponderEvent) => void) | null;
}

export const HomeButton = ({
  source,
  title,
  description,
  buttonStyle,
  rippleColor,
  textColor,
  onPress,
}: HomeButtonProps) => {
  return (
    <Pressable
      style={tw.style(
        buttonStyle ?? 'border-fuchsia-200 bg-fuchsia-50',
        'h-75 flex flex-1 flex-col items-center rounded-2xl border pt-12 shadow',
      )}
      android_ripple={{ color: rippleColor }}
      onPress={onPress}>
      <Image style={tw`h-20 w-20`} source={source} />
      <Text
        style={tw.style(
          textColor ?? 'text-fuchsia-400',
          'pt-4 text-center text-base font-semibold',
        )}>
        {title}
      </Text>
      <FlatList
        style={tw`pt-6`}
        data={description}
        renderItem={({ item }) => (
          <Text
            style={tw.style(
              textColor ?? 'text-fuchsia-400',
              'text-center text-sm',
            )}>
            {item}
          </Text>
        )}
      />
    </Pressable>
  );
};
