import { HistoryItem } from '@src/entities/history';
import { tw } from '@src/shared/lib/utils';
import { FlatList } from 'react-native';

// TODO: 삭제 필요
const temp = [
  {
    recognizedText: '남자장애인화장실',
    translatedText: '⠉⠢⠨⠨⠶⠗⠟⠚⠧⠨⠶⠠⠕⠂',
    createdAt: '2025-06-06 21:05',
    isBookmarked: true,
  },
  {
    recognizedText: '실시간 점자 번역기 앱의 디자인입니다.',
    translatedText: '⠠⠕⠂⠠⠕⠫⠒⠀⠨⠎⠢⠨⠀⠘⠾⠱⠁⠈⠕⠀⠗⠃⠺⠀⠊⠕⠨⠣⠟⠕⠃⠉⠕⠊⠲',
    createdAt: '2025-06-06 21:04',
    isBookmarked: false,
  },
  {
    recognizedText: '남자장애인화장실',
    translatedText: '⠉⠢⠨⠨⠶⠗⠟⠚⠧⠨⠶⠠⠕⠂',
    createdAt: '2025-06-06 21:03',
    isBookmarked: true,
  },
  {
    recognizedText: '실시간 점자 번역기 앱의 디자인입니다.',
    translatedText: '⠠⠕⠂⠠⠕⠫⠒⠀⠨⠎⠢⠨⠀⠘⠾⠱⠁⠈⠕⠀⠗⠃⠺⠀⠊⠕⠨⠣⠟⠕⠃⠉⠕⠊⠲',
    createdAt: '2025-06-06 21:02',
    isBookmarked: false,
  },
  {
    recognizedText: '실시간 점자 번역기 앱의 디자인입니다.',
    translatedText: '⠠⠕⠂⠠⠕⠫⠒⠀⠨⠎⠢⠨⠀⠘⠾⠱⠁⠈⠕⠀⠗⠃⠺⠀⠊⠕⠨⠣⠟⠕⠃⠉⠕⠊⠲',
    createdAt: '2025-06-06 21:01',
    isBookmarked: false,
  },
];

interface HistoryItemListProps {
  onlyBookmarked: boolean;
}

export const HistoryItemList = ({ onlyBookmarked }: HistoryItemListProps) => {
  return (
    <FlatList
      contentContainerStyle={tw`gap-4 p-1`}
      data={onlyBookmarked ? temp.filter((item) => item.isBookmarked) : temp}
      renderItem={({ item }) => (
        <HistoryItem
          recognizedText={item.recognizedText}
          translatedText={item.translatedText}
          createdAt={item.createdAt}
          isBookmarked={item.isBookmarked}
        />
      )}
      keyExtractor={(item) => item.createdAt}
    />
  );
};
