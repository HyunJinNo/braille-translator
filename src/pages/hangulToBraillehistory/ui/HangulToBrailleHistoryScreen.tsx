import { tw } from '@src/shared/lib/utils';
import { BookmarkButton, ClearButton } from '@src/shared/ui/button';
import { HistoryItemList } from '@src/widgets/historyItemList';
import { Text, View } from 'react-native';
import { useHangulToBrailleHistoryScreen } from '../model/useHangulToBrailleHistoryScreen';

export const HangulToBrailleHistoryScreen = () => {
  const {
    onlyBookmarked,
    historyList,
    handleClearButtonPress,
    handleBookmarkButtonPress,
    handleStarClick,
  } = useHangulToBrailleHistoryScreen();

  return (
    <View style={tw`flex h-full flex-col gap-4 bg-white px-4 pb-4 pt-8`}>
      <View style={tw`flex flex-row items-center justify-between`}>
        <Text style={tw`text-lg font-semibold`}>목록</Text>
        <View style={tw`flex flex-row items-center gap-2`}>
          <ClearButton onPress={handleClearButtonPress} />
          <BookmarkButton
            isActive={onlyBookmarked}
            onPress={handleBookmarkButtonPress}
          />
        </View>
      </View>
      <HistoryItemList
        historyList={
          onlyBookmarked
            ? historyList.filter((history) => history.isBookmarked)
            : historyList
        }
        onStarClick={handleStarClick}
      />
    </View>
  );
};
