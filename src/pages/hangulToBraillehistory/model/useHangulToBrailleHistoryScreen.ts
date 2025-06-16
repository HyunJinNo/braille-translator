import { useFocusEffect } from '@react-navigation/native';
import { History } from '@src/entities/history';
import { HANGUL_TO_BRAILLE_HISTORY_KEY } from '@src/shared/config';
import { storage } from '@src/shared/lib/utils';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';

export const useHangulToBrailleHistoryScreen = () => {
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [historyList, setHistoryList] = useState<History[]>([]);

  const handleClearButtonPress = () => {
    Alert.alert(
      '전체 기록 삭제',
      '모든 한글→점자 번역 기록을 삭제하시겠습니까?',
      [
        { text: '취소' },
        {
          text: '삭제',
          onPress: () => {
            storage.set(HANGUL_TO_BRAILLE_HISTORY_KEY, JSON.stringify([]));
            setHistoryList([]);
            setOnlyBookmarked(false);
          },
        },
      ],
    );
  };

  const handleBookmarkButtonPress = () => {
    setOnlyBookmarked((value) => !value);
  };

  const handleStarClick = (createdAt: string) => {
    const updatedHistoryList = [...historyList];
    const index = updatedHistoryList.findIndex(
      (history) => history.createdAt === createdAt,
    );

    if (index === -1) {
      return;
    }

    updatedHistoryList[index].isBookmarked =
      !updatedHistoryList[index].isBookmarked;

    storage.set(
      HANGUL_TO_BRAILLE_HISTORY_KEY,
      JSON.stringify(updatedHistoryList),
    );
    setHistoryList(updatedHistoryList);
  };

  useFocusEffect(
    useCallback(() => {
      setHistoryList(
        JSON.parse(storage.getString(HANGUL_TO_BRAILLE_HISTORY_KEY) ?? '[]'),
      );
    }, []),
  );

  return {
    onlyBookmarked,
    historyList,
    handleClearButtonPress,
    handleBookmarkButtonPress,
    handleStarClick,
  };
};
