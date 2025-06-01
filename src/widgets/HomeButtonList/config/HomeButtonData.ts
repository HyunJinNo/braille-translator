interface ItemData {
  source: any;
  title: string;
  description: string[];
  buttonStyle: string;
  textColor: string;
}

export const HOME_BUTTON_DATA: ItemData[] = [
  {
    source: require('@assets/icons/hangul-scan-icon.png'),
    title: '한글→점자',
    description: ['카메라로 스캔한', '한글을 점자로', '번역합니다.'],
    buttonStyle: 'border-fuchsia-200 bg-fuchsia-50',
    textColor: 'text-fuchsia-400',
  },
  {
    source: require('@assets/icons/braille-scan-icon.png'),
    title: '점자→한글',
    description: ['카메라로 스캔한', '점자를 한글로', '번역합니다.'],
    buttonStyle: 'border-green-200 bg-green-50',
    textColor: 'text-green-400',
  },
  {
    source: require('@assets/icons/hangul-to-braille-icon.png'),
    title: '한글→점자',
    description: ['사진 내', '한글을 점자로', '번역합니다.'],
    buttonStyle: 'border-blue-200 bg-blue-50',
    textColor: 'text-blue-400',
  },
  {
    source: require('@assets/icons/braille-to-hangul-icon.png'),
    title: '점자→한글',
    description: ['사진 내', '점자를 한글로', '번역합니다.'],
    buttonStyle: 'border-cyan-200 bg-cyan-50',
    textColor: 'text-cyan-400',
  },
];
