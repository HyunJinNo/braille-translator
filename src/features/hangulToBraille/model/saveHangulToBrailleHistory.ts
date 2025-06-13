import { History } from '@src/entities/history';
import { HANGUL_TO_BRAILLE_HISTORY_KEY } from '@src/shared/config';
import { storage } from '@src/shared/lib/utils';

export function saveHangulToBrailleHistory(
  recognizedText: string,
  translatedText: string,
) {
  const hangulToBrailleHistory: History[] = JSON.parse(
    storage.getString(HANGUL_TO_BRAILLE_HISTORY_KEY) ?? '[]',
  );

  storage.set(
    HANGUL_TO_BRAILLE_HISTORY_KEY,
    JSON.stringify([
      {
        recognizedText,
        translatedText,
        isBookmarked: false,
        createdAt: new Date().toLocaleString(),
      },
      ...hangulToBrailleHistory,
    ]),
  );
}
