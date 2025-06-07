import { tw } from '@src/shared/lib/utils';
import { BookmarkButton } from '@src/shared/ui/button';
import { HistoryItemList } from '@src/widgets/historyItemList';
import { useState } from 'react';
import { Text, View } from 'react-native';

export const HangulToBrailleHistoryScreen = () => {
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);

  const handleBookmarkButtonClick = () => {
    setOnlyBookmarked((value) => !value);
  };

  return (
    <View style={tw`flex h-full flex-col gap-4 bg-white px-4 pb-4 pt-8`}>
      <View style={tw`flex flex-row items-center justify-between`}>
        <Text style={tw`text-lg font-semibold`}>목록</Text>
        <BookmarkButton
          isActive={onlyBookmarked}
          onPress={handleBookmarkButtonClick}
        />
      </View>
      <HistoryItemList onlyBookmarked={onlyBookmarked} />
    </View>
  );
};
