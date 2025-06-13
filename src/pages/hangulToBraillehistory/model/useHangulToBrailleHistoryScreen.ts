import { History } from '@src/entities/history';
import { storage } from '@src/shared/lib/utils';
import { useEffect, useState } from 'react';

export const useHangulToBrailleHistoryScreen = () => {
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [historyList, setHistoryList] = useState<History[]>();

  const handleBookmarkButtonClick = () => {
    setOnlyBookmarked((value) => !value);
  };

  useEffect(() => {
    setHistoryList(
      JSON.parse(storage.getString('hangulToBrailleHistory') ?? ''),
    );
  }, []);

  return { onlyBookmarked, historyList, handleBookmarkButtonClick };
};
