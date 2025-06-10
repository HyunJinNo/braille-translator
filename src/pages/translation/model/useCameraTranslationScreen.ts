import TextRecognition, {
  TextRecognitionScript,
} from '@react-native-ml-kit/text-recognition';
import { useNavigation } from '@react-navigation/native';
import { translate } from '@src/features/hangulToBraille';
import { useEffect, useReducer, useRef } from 'react';
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
  isHighlightButtonActive: boolean;
  isEditButtonActive: boolean;
  isPlayButtonActive: boolean;
  isSnapshotButtonActive: boolean;
  isStopButtonActive: boolean;
};

type Action =
  | { type: 'HIGHLIGHT_BUTTON_PRESS' }
  | { type: 'EDIT_BUTTON_PRESS' }
  | { type: 'PLAY_BUTTON_PRESS' }
  | {
      type: 'SNAPSHOT_BUTTON_PRESS';
      payload: { isHighlightButtonActive: boolean };
    }
  | { type: 'STOP_BUTTON_PRESS' }
  | { type: 'START_ANALYZING'; payload: { imageURL: string } }
  | {
      type: 'FINISH_ANALYZING';
      payload: { recognizedText: string; translatedText: string };
    };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'HIGHLIGHT_BUTTON_PRESS':
      return {
        ...state,
        isHighlightButtonActive: true,
        isEditButtonActive: false,
        isPlayButtonActive: false,
        isSnapshotButtonActive: false,
        isStopButtonActive: true,
      };
    case 'EDIT_BUTTON_PRESS':
      return {
        ...state,
        isHighlightButtonActive: false,
        isEditButtonActive: true,
        isPlayButtonActive: false,
        isSnapshotButtonActive: false,
        isStopButtonActive: true,
      };
    case 'PLAY_BUTTON_PRESS':
      return {
        ...state,
        imageURL: '',
        recognizedText: '',
        translatedText: '',
        isCameraActive: true,
        isHighlightButtonActive: false,
        isEditButtonActive: false,
        isPlayButtonActive: false,
        isSnapshotButtonActive: true,
        isStopButtonActive: true,
      };
    case 'SNAPSHOT_BUTTON_PRESS':
      return {
        ...state,
        isCameraActive: false,
        isHighlightButtonActive: action.payload.isHighlightButtonActive,
        isEditButtonActive: true,
        isPlayButtonActive: true,
        isSnapshotButtonActive: false,
        isStopButtonActive: false,
      };
    case 'STOP_BUTTON_PRESS':
      return {
        ...state,
        isCameraActive: false,
        isEditButtonActive: true,
        isPlayButtonActive: true,
        isSnapshotButtonActive: false,
        isStopButtonActive: false,
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
    default:
      throw new Error('Unknown action type');
  }
};

export const useCameraTranslationScreen = () => {
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
    isHighlightButtonActive: false,
    isEditButtonActive: true,
    isPlayButtonActive: true,
    isSnapshotButtonActive: false,
    isStopButtonActive: false,
  });

  const handleHighlightButtonPress = () => {
    // TODO
    dispatch({ type: 'HIGHLIGHT_BUTTON_PRESS' });
  };

  const handleEditButtonPress = () => {
    // TODO
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
        payload: { isHighlightButtonActive: false },
      });
    }

    dispatch({
      type: 'START_ANALYZING',
      payload: { imageURL: 'file://' + snapshot.path },
    });

    const textRecognitionResult = await TextRecognition.recognize(
      'file://' + snapshot.path,
      TextRecognitionScript.KOREAN,
    );

    dispatch({
      type: 'FINISH_ANALYZING',
      payload: {
        recognizedText: textRecognitionResult.text,
        translatedText: translate(textRecognitionResult.text),
      },
    });

    dispatch({
      type: 'SNAPSHOT_BUTTON_PRESS',
      payload: { isHighlightButtonActive: textRecognitionResult.text !== '' },
    });
  };

  const handleStopButtonPress = () => {
    dispatch({ type: 'STOP_BUTTON_PRESS' });
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
    handleHighlightButtonPress,
    handleEditButtonPress,
    handlePlayButtonPress,
    handleSnapshotButtonPress,
    handleStopButtonPress,
  };
};
