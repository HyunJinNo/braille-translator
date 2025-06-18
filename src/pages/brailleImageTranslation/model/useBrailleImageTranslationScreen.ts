import {
  saveBrailleToHangulHistory,
  translate,
} from '@src/features/brailleToHangul';
import { ToastDispatcherContext } from '@src/shared/model';
import { useContext, useReducer } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';

type State = {
  imageURL: string;
  loading: boolean;
  recognizedText: string;
  translatedText: string;
  isSaveButtonActive: boolean;
};

type Action =
  | { type: 'START_ANALYZING'; payload: { imageURL: string } }
  | {
      type: 'FINISH_ANALYZING';
      payload: { recognizedText: string; translatedText: string };
    };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'START_ANALYZING':
      return {
        ...state,
        imageURL: action.payload.imageURL,
        loading: true,
        recognizedText: '',
        translatedText: '',
        isSaveButtonActive: false,
      };
    case 'FINISH_ANALYZING':
      return {
        ...state,
        loading: false,
        recognizedText: action.payload.recognizedText,
        translatedText: action.payload.translatedText,
        isSaveButtonActive: action.payload.recognizedText !== '',
      };
  }
};

export const useBrailleImageTranslationScreen = () => {
  const { setToastMessage } = useContext(ToastDispatcherContext);
  const [state, dispatch] = useReducer(reducer, {
    imageURL: '',
    loading: false,
    recognizedText: '',
    translatedText: '',
    isSaveButtonActive: false,
  });

  const handleImageUpload = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });

    if (result.assets && result.assets[0].uri) {
      dispatch({
        type: 'START_ANALYZING',
        payload: { imageURL: result.assets[0].uri },
      });

      const data = await translate({
        fileName: result.assets[0].fileName!,
        type: result.assets[0].type!,
        uri: result.assets[0].uri,
      });

      dispatch({
        type: 'FINISH_ANALYZING',
        payload: {
          recognizedText: data.srcText,
          translatedText: data.translatedText,
        },
      });
    }
  };

  const handleSaveButtonPress = () => {
    saveBrailleToHangulHistory(state.recognizedText, state.translatedText);
    setToastMessage('번역 기록을 저장하였습니다.');
  };

  return { state, handleImageUpload, handleSaveButtonPress };
};
