import { History, HistoryItem } from '@src/entities/history';
import { tw } from '@src/shared/lib/utils';
import { FlatList } from 'react-native';
import { HistoryNotFound } from './HistoryNotFound';

interface HistoryItemListProps {
  historyList: History[];
  onStarButtonPress: (createdAt: string) => void;
  onDeleteButtonPress: (createdAt: string) => void;
}

export const HistoryItemList = ({
  historyList,
  onStarButtonPress,
  onDeleteButtonPress,
}: HistoryItemListProps) => {
  return (
    <FlatList
      contentContainerStyle={tw.style(
        historyList.length === 0
          ? 'flex-1 items-center justify-center'
          : 'gap-4 p-1',
      )}
      data={historyList}
      renderItem={({ item }) => (
        <HistoryItem
          history={item}
          onStarClick={() => onStarButtonPress(item.createdAt)}
          onDeleteButtonPress={() => onDeleteButtonPress(item.createdAt)}
        />
      )}
      keyExtractor={(item) => item.createdAt}
      ListEmptyComponent={<HistoryNotFound />}
    />
  );
};
