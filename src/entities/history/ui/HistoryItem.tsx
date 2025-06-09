import { COLOR } from '@src/shared/config';
import { tw } from '@src/shared/lib/utils';
import { Image, Pressable, Text, View } from 'react-native';

interface HistoryItemProps {
  recognizedText: string;
  translatedText: string;
  createdAt: string;
  isBookmarked: boolean;
}

export const HistoryItem = ({
  recognizedText,
  translatedText,
  createdAt,
  isBookmarked,
}: HistoryItemProps) => {
  return (
    <Pressable
      style={tw`flex w-full flex-row items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow`}
      android_ripple={{ color: COLOR['green-200'] }}>
      <View style={tw`flex-1 flex-row items-center gap-4`}>
        <Image
          style={tw`h-18 w-18 rounded-xl`}
          source={require('@assets/image/example.png')}
        />
        <View style={tw`flex-1 gap-1`}>
          <Text
            style={tw`text-base font-semibold`}
            numberOfLines={1}
            ellipsizeMode="tail">
            {recognizedText}
          </Text>
          <Text style={tw`text-base`} numberOfLines={1} ellipsizeMode="tail">
            {translatedText}
          </Text>
          <Text style={tw`text-xs text-green-400`}>{createdAt}</Text>
        </View>
      </View>
      <Image
        style={tw`h-10 w-10`}
        source={
          isBookmarked
            ? require('@assets/icon/star-icon-filled-active.png')
            : require('@assets/icon/star-icon-outline-inactive.png')
        }
      />
    </Pressable>
  );
};
