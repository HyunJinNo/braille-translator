import { History } from '@src/entities/history';
import { BRAILLE_TO_HANGUL_HISTORY_KEY } from '@src/shared/config';
import { storage } from '@src/shared/lib/utils';
import { useEffect, useState } from 'react';

export const useBrailleToHangulHistoryScreen = () => {
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [historyList, setHistoryList] = useState<History[]>([]);

  const handleBookmarkButtonClick = () => {
    setOnlyBookmarked((value) => !value);
  };

  useEffect(() => {
    setHistoryList(
      JSON.parse(storage.getString(BRAILLE_TO_HANGUL_HISTORY_KEY) ?? '[]'),
    );
  }, []);

  return { onlyBookmarked, historyList, handleBookmarkButtonClick };
};
