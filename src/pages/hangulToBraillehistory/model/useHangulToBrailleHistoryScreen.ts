import { useFocusEffect } from '@react-navigation/native';
import { History } from '@src/entities/history';
import { HANGUL_TO_BRAILLE_HISTORY_KEY } from '@src/shared/config';
import { storage } from '@src/shared/lib/utils';
import { useCallback, useState } from 'react';

export const useHangulToBrailleHistoryScreen = () => {
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [historyList, setHistoryList] = useState<History[]>([]);

  const handleBookmarkButtonClick = () => {
    setOnlyBookmarked((value) => !value);
  };

  useFocusEffect(
    useCallback(() => {
      setHistoryList(
        JSON.parse(storage.getString(HANGUL_TO_BRAILLE_HISTORY_KEY) ?? '[]'),
      );
    }, []),
  );

  return { onlyBookmarked, historyList, handleBookmarkButtonClick };
};
