import { useFocusEffect } from '@react-navigation/native';
import { History } from '@src/entities/history';
import { BRAILLE_TO_HANGUL_HISTORY_KEY } from '@src/shared/config';
import { storage } from '@src/shared/lib/utils';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';

export const useBrailleToHangulHistoryScreen = () => {
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [historyList, setHistoryList] = useState<History[]>([]);

  const handleClearButtonPress = () => {
    Alert.alert(
      '전체 기록 삭제',
      '모든 점자→한글 번역 기록을 삭제하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          onPress: () => {
            storage.set(BRAILLE_TO_HANGUL_HISTORY_KEY, JSON.stringify([]));
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

  const handleStarButtonPress = (createdAt: string) => {
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
      BRAILLE_TO_HANGUL_HISTORY_KEY,
      JSON.stringify(updatedHistoryList),
    );
    setHistoryList(updatedHistoryList);
  };

  const handleDeleteButtonPress = (createdAt: string) => {
    Alert.alert('번역 기록 삭제', '정말 삭제하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제',
        onPress: () => {
          const updatedHistoryList = historyList.filter(
            (history) => history.createdAt !== createdAt,
          );
          storage.set(
            BRAILLE_TO_HANGUL_HISTORY_KEY,
            JSON.stringify(updatedHistoryList),
          );
          setHistoryList(updatedHistoryList);
        },
      },
    ]);
  };

  useFocusEffect(
    useCallback(() => {
      setHistoryList(
        JSON.parse(storage.getString(BRAILLE_TO_HANGUL_HISTORY_KEY) ?? '[]'),
      );
    }, []),
  );

  return {
    onlyBookmarked,
    historyList,
    handleClearButtonPress,
    handleBookmarkButtonPress,
    handleStarButtonPress,
    handleDeleteButtonPress,
  };
};
