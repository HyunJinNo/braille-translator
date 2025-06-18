import { useCallback, useEffect, useMemo, useState } from 'react';
import { storage } from '@src/shared/lib/utils';
import { FONT_SIZE_KEY } from '@src/shared/config';
import { FontSize, FontSizeContext } from '@src/shared/model';

interface FontSizeProviderProps {
  children: React.ReactNode;
}

export const FontSizeProvider = ({ children }: FontSizeProviderProps) => {
  const [fontSize, setFontSize] = useState<FontSize>('중간 (20px)');

  const handleFontSizeChange = useCallback((value: FontSize) => {
    storage.set(FONT_SIZE_KEY, value);
    setFontSize(value);
  }, []);

  const memoizedValue = useMemo(
    () => ({ fontSize, setFontSize: handleFontSizeChange }),
    [fontSize, handleFontSizeChange],
  );

  useEffect(() => {
    const currentFontSize = storage.getString(FONT_SIZE_KEY);

    if (
      currentFontSize === '작게 (16px)' ||
      currentFontSize === '중간 (20px)' ||
      currentFontSize === '크게 (24px)'
    ) {
      setFontSize(currentFontSize);
    } else {
      storage.set(FONT_SIZE_KEY, '중간 (20px)');
      setFontSize('중간 (20px)');
    }
  }, []);

  return <FontSizeContext value={memoizedValue}>{children}</FontSizeContext>;
};
