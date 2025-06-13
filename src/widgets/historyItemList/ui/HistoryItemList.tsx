import { History, HistoryItem } from '@src/entities/history';
import { tw } from '@src/shared/lib/utils';
import { FlatList } from 'react-native';

interface HistoryItemListProps {
  historyList: History[];
  onlyBookmarked: boolean;
}

export const HistoryItemList = ({
  historyList,
  onlyBookmarked,
}: HistoryItemListProps) => {
  return (
    <FlatList
      contentContainerStyle={tw`gap-4 p-1`}
      data={
        onlyBookmarked
          ? historyList.filter((history) => history.isBookmarked)
          : historyList
      }
      renderItem={({ item }) => <HistoryItem history={item} />}
      keyExtractor={(item) => item.createdAt}
    />
  );
};
