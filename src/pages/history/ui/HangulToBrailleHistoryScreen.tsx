import { HistoryItem } from '@src/entities/history';
import { tw } from '@src/shared/lib/utils';
import { BookmarkButton } from '@src/shared/ui/button';
import { FlatList, Text, View } from 'react-native';

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

export const HangulToBrailleHistoryScreen = () => {
  return (
    <View style={tw`flex h-full flex-col gap-4 bg-white px-4 pb-4 pt-8`}>
      <View style={tw`flex flex-row items-center justify-between`}>
        <Text style={tw`text-lg font-semibold`}>목록</Text>
        <BookmarkButton />
      </View>
      <FlatList
        contentContainerStyle={tw`gap-4`}
        data={temp}
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
    </View>
  );
};
