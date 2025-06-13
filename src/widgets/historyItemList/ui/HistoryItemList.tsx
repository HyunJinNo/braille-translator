import { History, HistoryItem } from '@src/entities/history';
import { tw } from '@src/shared/lib/utils';
import { FlatList } from 'react-native';
import { HistoryNotFound } from './HistoryNotFound';

interface HistoryItemListProps {
  historyList: History[];
}

export const HistoryItemList = ({ historyList }: HistoryItemListProps) => {
  return (
    <FlatList
      contentContainerStyle={tw.style(
        historyList.length === 0
          ? 'flex-1 items-center justify-center'
          : 'gap-4 p-1',
      )}
      data={historyList}
      renderItem={({ item }) => <HistoryItem history={item} />}
      keyExtractor={(item) => item.createdAt}
      ListEmptyComponent={<HistoryNotFound />}
    />
  );
};
