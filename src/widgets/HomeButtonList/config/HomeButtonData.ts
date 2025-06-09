import { COLOR } from '@src/shared/config';

interface ItemData {
  source: any;
  title: string;
  description: string[];
  buttonStyle: string;
  rippleColor: string;
  textColor: string;
  screen: 'CameraTranslation' | 'PictureTranslation';
  headerTitle: string;
}

export const HOME_BUTTON_DATA: ItemData[] = [
  {
    source: require('@assets/icons/hangul-scan-icon.png'),
    title: '한글→점자',
    description: ['카메라로 스캔한', '한글을 점자로', '번역합니다.'],
    buttonStyle: 'border-fuchsia-200 bg-fuchsia-50',
    rippleColor: COLOR['fuchsia-200'],
    textColor: 'text-fuchsia-400',
    screen: 'CameraTranslation',
    headerTitle: '한글 번역',
  },
  {
    source: require('@assets/icons/braille-scan-icon.png'),
    title: '점자→한글',
    description: ['카메라로 스캔한', '점자를 한글로', '번역합니다.'],
    buttonStyle: 'border-green-200 bg-green-50',
    rippleColor: COLOR['green-200'],
    textColor: 'text-green-400',
    screen: 'CameraTranslation',
    headerTitle: '점자 번역',
  },
  {
    source: require('@assets/icons/hangul-to-braille-icon.png'),
    title: '한글→점자',
    description: ['사진 내', '한글을 점자로', '번역합니다.'],
    buttonStyle: 'border-blue-200 bg-blue-50',
    rippleColor: COLOR['blue-200'],
    textColor: 'text-blue-400',
    screen: 'PictureTranslation',
    headerTitle: '한글 이미지 번역',
  },
  {
    source: require('@assets/icons/braille-to-hangul-icon.png'),
    title: '점자→한글',
    description: ['사진 내', '점자를 한글로', '번역합니다.'],
    buttonStyle: 'border-cyan-200 bg-cyan-50',
    rippleColor: COLOR['cyan-200'],
    textColor: 'text-cyan-400',
    screen: 'PictureTranslation',
    headerTitle: '점자 이미지 번역',
  },
] as const;
