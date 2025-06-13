import { History } from '@src/entities/history';
import { BRAILLE_TO_HANGUL_HISTORY_KEY } from '@src/shared/config';
import { storage } from '@src/shared/lib/utils';

export function saveBrailleToHangulHistory(
  recognizedText: string,
  translatedText: string,
) {
  const brailleToHangulHistory: History[] = JSON.parse(
    storage.getString(BRAILLE_TO_HANGUL_HISTORY_KEY) ?? '[]',
  );

  storage.set(
    BRAILLE_TO_HANGUL_HISTORY_KEY,
    JSON.stringify([
      {
        recognizedText,
        translatedText,
        isBookmarked: false,
        createdAt: new Date().toLocaleString(),
      },
      ...brailleToHangulHistory,
    ]),
  );
}
