import { tw } from '@src/shared/lib/utils';
import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  Pressable,
} from 'react-native';

interface ControlBarButtonProps {
  imageSource: ImageSourcePropType;
  pressedImageSource: ImageSourcePropType;
  disabledImageSource: ImageSourcePropType;
  isActive: boolean;
  onPress: ((event: GestureResponderEvent) => void) | null;
}

export const ControlBarButton = ({
  imageSource,
  pressedImageSource,
  disabledImageSource,
  isActive,
  onPress,
}: ControlBarButtonProps) => {
  return (
    <Pressable onPress={onPress} disabled={!isActive}>
      {({ pressed }) => (
        <Image
          style={tw`h-10 w-10`}
          source={
            pressed
              ? pressedImageSource
              : isActive
                ? imageSource
                : disabledImageSource
          }
        />
      )}
    </Pressable>
  );
};
