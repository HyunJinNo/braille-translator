import { COLOR } from '@src/shared/config';
import { tw } from '@src/shared/lib/utils';
import { Image, Pressable, Text, View } from 'react-native';
import { History } from '../model/history';

interface HistoryItemProps {
  history: History;
  onStarClick: () => void;
  onDeleteButtonPress: () => void;
}

export const HistoryItem = ({
  history,
  onStarClick,
  onDeleteButtonPress,
}: HistoryItemProps) => {
  return (
    <Pressable
      style={tw`flex w-full flex-row items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow`}
      android_ripple={{ color: COLOR['green-200'] }}>
      <Pressable onPress={onStarClick}>
        <Image
          style={tw`h-10 w-10`}
          source={
            history.isBookmarked
              ? require('@assets/icon/star-icon-filled-active.png')
              : require('@assets/icon/star-icon-outline-inactive.png')
          }
        />
      </Pressable>
      <View style={tw`flex-1 gap-1`}>
        <Text
          style={tw`text-base font-semibold`}
          numberOfLines={1}
          ellipsizeMode="tail">
          {history.recognizedText}
        </Text>
        <Text style={tw`text-base`} numberOfLines={1} ellipsizeMode="tail">
          {history.translatedText}
        </Text>
        <Text style={tw`text-xs text-green-400`}>{history.createdAt}</Text>
      </View>
      <Pressable onPress={onDeleteButtonPress}>
        {({ pressed }) => (
          <Image
            style={tw`h-10 w-10`}
            source={
              pressed
                ? require('@assets/icon/delete-icon-filled-active.png')
                : require('@assets/icon/delete-icon-outline-inactive.png')
            }
          />
        )}
      </Pressable>
    </Pressable>
  );
};
