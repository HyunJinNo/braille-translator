import { COLOR } from '@src/shared/config';
import { tw } from '@src/shared/lib/utils';
import { Image, Pressable, Text } from 'react-native';

interface ImageSelectorProps {
  image?: string;
  onPress: () => void;
}

export const ImageSelector = ({ image, onPress }: ImageSelectorProps) => {
  return (
    <Pressable
      style={tw.style(
        'h-72 w-72 items-center justify-center rounded-2xl border border-dashed border-gray-400 bg-gray-100',
      )}
      android_ripple={{ color: COLOR['gray-200'] }}
      onPress={onPress}>
      {image ? (
        <Image
          style={tw`h-80 w-80 rounded-2xl border-2 border-fuchsia-400`}
          source={{ uri: image }}
        />
      ) : (
        <Text style={tw`text-base text-gray-400`}>사진을 선택해 주세요.</Text>
      )}
    </Pressable>
  );
};
