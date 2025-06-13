import { History } from '@src/entities/history';
import { storage, tw } from '@src/shared/lib/utils';
import { BookmarkButton } from '@src/shared/ui/button';
import { HistoryItemList } from '@src/widgets/historyItemList';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

export const HangulToBrailleHistoryScreen = () => {
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [historyList, setHistoryList] = useState<History[]>();

  const handleBookmarkButtonClick = () => {
    setOnlyBookmarked((value) => !value);
  };

  useEffect(() => {
    setHistoryList(
      JSON.parse(storage.getString('hangulToBrailleHistory') ?? ''),
    );
  }, []);

  return (
    <View style={tw`flex h-full flex-col gap-4 bg-white px-4 pb-4 pt-8`}>
      <View style={tw`flex flex-row items-center justify-between`}>
        <Text style={tw`text-lg font-semibold`}>목록</Text>
        <BookmarkButton
          isActive={onlyBookmarked}
          onPress={handleBookmarkButtonClick}
        />
      </View>
      <HistoryItemList
        historyList={historyList ?? []}
        onlyBookmarked={onlyBookmarked}
      />
    </View>
  );
};
