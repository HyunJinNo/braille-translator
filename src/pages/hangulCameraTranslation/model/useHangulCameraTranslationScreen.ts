import ImageEditor from '@react-native-community/image-editor';
import TextRecognition, {
  TextRecognitionScript,
} from '@react-native-ml-kit/text-recognition';
import { useNavigation } from '@react-navigation/native';
import {
  saveHangulToBrailleHistory,
  translate,
} from '@src/features/hangulToBraille';
import { ToastDispatcherContext } from '@src/shared/model';
import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

type State = {
  isCameraActive: boolean;
  imageURL: string;
  loading: boolean;
  recognizedText: string;
  translatedText: string;
  recognizedTextEditable: boolean;
  isEditButtonActive: boolean;
  isPlayButtonActive: boolean;
  isSnapshotButtonActive: boolean;
  isStopButtonActive: boolean;
  isSaveButtonActive: boolean;
};

type Action =
  | { type: 'EDIT_BUTTON_PRESS' }
  | { type: 'PLAY_BUTTON_PRESS' }
  | {
      type: 'SNAPSHOT_BUTTON_PRESS';
      payload: { isSaveButtonActive: boolean };
    }
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
        isPlayButtonActive: false,
        isSnapshotButtonActive: false,
        isStopButtonActive: true,
        isSaveButtonActive: false,
      };
    case 'PLAY_BUTTON_PRESS':
      return {
        ...state,
        imageURL: '',
        recognizedText: '',
        translatedText: '',
        isCameraActive: true,
        isEditButtonActive: false,
        isPlayButtonActive: false,
        isSnapshotButtonActive: true,
        isStopButtonActive: true,
        isSaveButtonActive: false,
      };
    case 'SNAPSHOT_BUTTON_PRESS':
      return {
        ...state,
        isCameraActive: false,
        isEditButtonActive: true,
        isPlayButtonActive: true,
        isSnapshotButtonActive: false,
        isStopButtonActive: false,
        isSaveButtonActive: action.payload.isSaveButtonActive,
      };
    case 'STOP_BUTTON_PRESS':
      return {
        ...state,
        isCameraActive: false,
        recognizedTextEditable: false,
        isEditButtonActive: true,
        isPlayButtonActive: true,
        isSnapshotButtonActive: false,
        isStopButtonActive: false,
        isSaveButtonActive: action.payload.isSaveButtonActive,
      };
    case 'START_ANALYZING':
      return {
        ...state,
        imageURL: action.payload.imageURL,
        loading: true,
      };
    case 'FINISH_ANALYZING':
      return {
        ...state,
        loading: false,
        recognizedText: action.payload.recognizedText,
        translatedText: action.payload.translatedText,
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

export const useHangulCameraTranslationScreen = () => {
  const navigation = useNavigation();
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);
  const { hasPermission, requestPermission } = useCameraPermission();
  const [state, dispatch] = useReducer(reducer, {
    isCameraActive: false,
    imageURL: '',
    loading: false,
    recognizedText: '',
    translatedText: '',
    recognizedTextEditable: false,
    isEditButtonActive: true,
    isPlayButtonActive: true,
    isSnapshotButtonActive: false,
    isStopButtonActive: false,
    isSaveButtonActive: false,
  });

  const [cameraViewWidth, setCameraViewWidth] = useState(0);
  const [cameraViewHeight, setCameraViewHeight] = useState(0);
  const { setToastMessage } = useContext(ToastDispatcherContext);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setCameraViewWidth(width);
    setCameraViewHeight(height);
  };

  const handleEditButtonPress = () => {
    dispatch({ type: 'EDIT_BUTTON_PRESS' });
  };

  const handlePlayButtonPress = () => {
    dispatch({ type: 'PLAY_BUTTON_PRESS' });
  };

  const handleSnapshotButtonPress = async () => {
    const snapshot = await camera.current?.takeSnapshot();

    if (!snapshot) {
      return dispatch({
        type: 'SNAPSHOT_BUTTON_PRESS',
        payload: { isSaveButtonActive: false },
      });
    }

    dispatch({
      type: 'START_ANALYZING',
      payload: { imageURL: 'file://' + snapshot.path },
    });

    const croppedImage = await ImageEditor.cropImage(
      'file://' + snapshot.path,
      {
        offset: {
          x: (16 * snapshot.width) / cameraViewWidth,
          y: ((cameraViewHeight / 2 - 48) * snapshot.height) / cameraViewHeight,
        },
        size: {
          width: ((cameraViewWidth - 32) * snapshot.width) / cameraViewWidth,
          height: (96 * snapshot.height) / cameraViewHeight,
        },
      },
    );

    const textRecognitionResult = await TextRecognition.recognize(
      croppedImage.uri,
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

    dispatch({
      type: 'SNAPSHOT_BUTTON_PRESS',
      payload: { isSaveButtonActive: textRecognitionResult.text !== '' },
    });
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

  useEffect(() => {
    if (!hasPermission) {
      (async () => {
        const cameraPermission = await requestPermission();

        if (!cameraPermission) {
          navigation.goBack();
        }
      })();
    }
  }, [hasPermission, navigation, requestPermission]);

  return {
    state,
    device,
    camera,
    handleLayout,
    handleEditButtonPress,
    handlePlayButtonPress,
    handleSnapshotButtonPress,
    handleStopButtonPress,
    handleRecognizedTextChange,
    handleSaveButtonPress,
  };
};
