import ImageEditor from '@react-native-community/image-editor';
import { useNavigation } from '@react-navigation/native';
import {
  saveBrailleToHangulHistory,
  translate,
} from '@src/features/brailleToHangul';
import { useEffect, useReducer, useRef, useState } from 'react';
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
  isHighlightButtonActive: boolean;
  isPlayButtonActive: boolean;
  isSnapshotButtonActive: boolean;
  isStopButtonActive: boolean;
};

type Action =
  | { type: 'HIGHLIGHT_BUTTON_PRESS' }
  | { type: 'PLAY_BUTTON_PRESS' }
  | {
      type: 'SNAPSHOT_BUTTON_PRESS';
      payload: { isHighlightButtonActive: boolean };
    }
  | { type: 'STOP_BUTTON_PRESS'; payload: { isHighlightButtonActive: boolean } }
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
        isPlayButtonActive: false,
        isSnapshotButtonActive: true,
        isStopButtonActive: true,
      };
    case 'SNAPSHOT_BUTTON_PRESS':
      return {
        ...state,
        isCameraActive: false,
        isHighlightButtonActive: action.payload.isHighlightButtonActive,
        isPlayButtonActive: true,
        isSnapshotButtonActive: false,
        isStopButtonActive: false,
      };
    case 'STOP_BUTTON_PRESS':
      return {
        ...state,
        isCameraActive: false,
        isHighlightButtonActive: action.payload.isHighlightButtonActive,
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

export const useBrailleCameraTranslationScreen = () => {
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
    isPlayButtonActive: true,
    isSnapshotButtonActive: false,
    isStopButtonActive: false,
  });

  const [cameraViewWidth, setCameraViewWidth] = useState(0);
  const [cameraViewHeight, setCameraViewHeight] = useState(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setCameraViewWidth(width);
    setCameraViewHeight(height);
  };

  const handleHighlightButtonPress = () => {
    // TODO
    dispatch({ type: 'HIGHLIGHT_BUTTON_PRESS' });
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

    const data = await translate({
      fileName: croppedImage.name,
      type: croppedImage.type,
      uri: croppedImage.uri,
    });

    dispatch({
      type: 'FINISH_ANALYZING',
      payload: {
        recognizedText: data.srcText,
        translatedText: data.translatedText,
      },
    });

    dispatch({
      type: 'SNAPSHOT_BUTTON_PRESS',
      payload: { isHighlightButtonActive: data.srcText !== '' },
    });

    saveBrailleToHangulHistory(data.srcText, data.translatedText);
  };

  const handleStopButtonPress = () => {
    dispatch({
      type: 'STOP_BUTTON_PRESS',
      payload: { isHighlightButtonActive: state.recognizedText !== '' },
    });
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
    handleHighlightButtonPress,
    handlePlayButtonPress,
    handleSnapshotButtonPress,
    handleStopButtonPress,
  };
};
