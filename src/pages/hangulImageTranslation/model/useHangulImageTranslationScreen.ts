import TextRecognition, {
  TextRecognitionScript,
} from '@react-native-ml-kit/text-recognition';
import {
  saveHangulToBrailleHistory,
  translate,
} from '@src/features/hangulToBraille';
import { ToastDispatcherContext } from '@src/shared/model';
import { useContext, useReducer } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';

type State = {
  imageURL: string;
  loading: boolean;
  recognizedText: string;
  translatedText: string;
  recognizedTextEditable: boolean;
  isEditButtonActive: boolean;
  isStopButtonActive: boolean;
  isSaveButtonActive: boolean;
};

type Action =
  | { type: 'EDIT_BUTTON_PRESS' }
  | { type: 'STOP_BUTTON_PRESS'; payload: { isSaveButtonActive: boolean } }
  | { type: 'START_ANALYZING'; payload: { imageURL: string } }
  | {
      type: 'FINISH_ANALYZING';
      payload: { recognizedText: string; translatedText: string };
    }
  | { type: 'CHANGE_RECOGNIZED_TEXT'; payload: { text: string } };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'EDIT_BUTTON_PRESS':
      return {
        ...state,
        recognizedTextEditable: true,
        isEditButtonActive: true,
        isStopButtonActive: true,
        isSaveButtonActive: false,
      };
    case 'STOP_BUTTON_PRESS':
      return {
        ...state,
        recognizedTextEditable: false,
        isEditButtonActive: true,
        isStopButtonActive: false,
        isSaveButtonActive: action.payload.isSaveButtonActive,
      };
    case 'START_ANALYZING':
      return {
        ...state,
        imageURL: action.payload.imageURL,
        loading: true,
        recognizedText: '',
        translatedText: '',
        isEditButtonActive: false,
        isStopButtonActive: false,
        isSaveButtonActive: false,
      };
    case 'FINISH_ANALYZING':
      return {
        ...state,
        loading: false,
        recognizedText: action.payload.recognizedText,
        translatedText: action.payload.translatedText,
        isEditButtonActive: true,
        isStopButtonActive: false,
        isSaveButtonActive: action.payload.recognizedText !== '',
      };
    case 'CHANGE_RECOGNIZED_TEXT':
      return {
        ...state,
        recognizedText: action.payload.text,
        translatedText: translate(action.payload.text),
      };
    default:
      throw new Error('Unknown action type');
  }
};

export const useHangulImageTranslationScreen = () => {
  const { setToastMessage } = useContext(ToastDispatcherContext);
  const [state, dispatch] = useReducer(reducer, {
    imageURL: '',
    loading: false,
    recognizedText: '',
    translatedText: '',
    recognizedTextEditable: false,
    isEditButtonActive: true,
    isStopButtonActive: false,
    isSaveButtonActive: false,
  });

  const handleImageUpload = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });

    if (result.assets && result.assets[0].uri) {
      dispatch({
        type: 'START_ANALYZING',
        payload: { imageURL: result.assets[0].uri },
      });

      const textRecognitionResult = await TextRecognition.recognize(
        result.assets[0].uri,
        TextRecognitionScript.KOREAN,
      );
      const translatedResult = translate(textRecognitionResult.text);

      dispatch({
        type: 'FINISH_ANALYZING',
        payload: {
          recognizedText: textRecognitionResult.text,
          translatedText: translatedResult,
        },
      });
    }
  };

  const handleEditButtonPress = () => {
    dispatch({ type: 'EDIT_BUTTON_PRESS' });
  };

  const handleStopButtonPress = () => {
    dispatch({
      type: 'STOP_BUTTON_PRESS',
      payload: { isSaveButtonActive: state.recognizedText !== '' },
    });
  };

  const handleSaveButtonPress = () => {
    saveHangulToBrailleHistory(state.recognizedText, state.translatedText);
    setToastMessage('번역 기록을 저장하였습니다.');
  };

  const handleRecognizedTextChange = (text: string) => {
    dispatch({ type: 'CHANGE_RECOGNIZED_TEXT', payload: { text } });
  };

  return {
    state,
    handleImageUpload,
    handleEditButtonPress,
    handleStopButtonPress,
    handleSaveButtonPress,
    handleRecognizedTextChange,
  };
};
