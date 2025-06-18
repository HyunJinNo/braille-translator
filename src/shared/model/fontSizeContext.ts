import { createContext } from 'react';

export type FontSize = '작게 (16px)' | '중간 (20px)' | '크게 (24px)';

export type FontSizeContextType = {
  fontSize: FontSize;
  setFontSize: (value: FontSize) => void;
};

export const FontSizeContext = createContext<FontSizeContextType>({
  fontSize: '중간 (20px)',
  setFontSize: (_value: FontSize) => {},
});
