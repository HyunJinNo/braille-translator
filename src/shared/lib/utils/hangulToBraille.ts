import { assemble } from 'es-hangul';
import {
  CHOSUNG,
  CONTRACTION,
  DECOMPOSE,
  JONGSUNG,
  JUNGSUNG,
  NUMBER,
  NUMBER_START,
} from './mapping';

/**
 * 초성 목록
 */
const CHOSUNG_LIST = [
  'ㄱ',
  'ㄲ',
  'ㄴ',
  'ㄷ',
  'ㄸ',
  'ㄹ',
  'ㅁ',
  'ㅂ',
  'ㅃ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅉ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
] as const;

/**
 * 중성 목록
 */
const JUNGSUNG_LIST = [
  'ㅏ',
  'ㅐ',
  'ㅑ',
  'ㅒ',
  'ㅓ',
  'ㅔ',
  'ㅕ',
  'ㅖ',
  'ㅗ',
  'ㅘ',
  'ㅙ',
  'ㅚ',
  'ㅛ',
  'ㅜ',
  'ㅝ',
  'ㅞ',
  'ㅟ',
  'ㅠ',
  'ㅡ',
  'ㅢ',
  'ㅣ',
] as const;

/**
 * 종성 목록
 */
const JONGSUNG_LIST = [
  ' ',
  'ㄱ',
  'ㄲ',
  'ㄳ',
  'ㄴ',
  'ㄵ',
  'ㄶ',
  'ㄷ',
  'ㄹ',
  'ㄺ',
  'ㄻ',
  'ㄼ',
  'ㄽ',
  'ㄾ',
  'ㄿ',
  'ㅀ',
  'ㅁ',
  'ㅂ',
  'ㅄ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
] as const;

const BASE_CODE = 44032;
const CHOSUNG_CODE = 588;
const JUNGSUNG_CODE = 28;
let flag10 = false; // 점자 규정 제 10항 확인용
let flag11 = false; // 점자 규정 제 11항 확인용
let flag17 = false; // 점자 규정 제 17항 확인용
const bQuot = 0; // big quotation index
const sQuot = 2; // small quotation index

let translatedText = '';

function extractWords(text: string) {
  return text.split(' ');
}

function checkContraction(word: string, index: number) {
  const character = word.charAt(index);

  if (
    character === '나' ||
    character === '다' ||
    character === '마' ||
    character === '바' ||
    character === '자' ||
    character === '카' ||
    character === '타' ||
    character === '파' ||
    character === '하'
  ) {
    translatedText += CONTRACTION[character];
    flag10 = true;
    return 1;
  }

  if (
    character === '가' ||
    character === '사' ||
    character === '까' ||
    character === '따' ||
    character === '빠' ||
    character === '짜'
  ) {
    translatedText += CONTRACTION[character];
    flag10 = true;
    return 1;
  }

  const keys = Object.keys(CONTRACTION) as (keyof typeof CONTRACTION)[];

  for (let key of keys) {
    if (word.slice(index).startsWith(key)) {
      // 제 18항
      if (
        index !== 0 &&
        (key === '그래서' ||
          key === '그러나' ||
          key === '그러면' ||
          key === '그러므로' ||
          key === '그런데' ||
          key === '그리고' ||
          key === '그리하여')
      ) {
        flag10 = false;
        flag11 = false;
        flag17 = false;
        return 0;
      }

      const temp = word.slice(index);
      if (
        temp !== '가' &&
        temp !== '나' &&
        temp !== '다' &&
        temp !== '마' &&
        temp !== '바' &&
        temp !== '사' &&
        temp !== '자' &&
        temp !== '카' &&
        temp !== '타' &&
        temp !== '파' &&
        temp !== '하' &&
        temp !== '것' &&
        temp !== '까' &&
        temp !== '싸' &&
        temp !== '껏'
      ) {
        // 억, 언, ... 인
        if (flag17) {
          // 나, 다, 마, ... , 하 뒤에 모음인 경우
          translatedText += '⠣';
          flag17 = false;
        }
        flag10 = false;
        flag11 = false;
      }

      translatedText += CONTRACTION[key];
      return key.length;
    }
  }

  return 0;
}

function checkContraction2(
  chosung: keyof typeof CHOSUNG,
  jungsung: keyof typeof JUNGSUNG,
  jongsung: keyof typeof JONGSUNG,
) {
  // 초성 자음 + 약어 (억 || 언 || 얼 || 연 || 열 ... || 인) 등 검사
  const jasoList = ['ㅇ', jungsung];
  let doubleJongsung = ''; // 규정 제 15항 확인용 변수 (종성이 자음 두개로 이루어진 경우 분리 후 첫 번째로 약자 확인)

  // 종성이 존재하는 경우
  if (jongsung.trim() !== '') {
    // 종성이 double 형태인 경우
    if (
      jongsung === 'ㄲ' ||
      jongsung === 'ㄳ' ||
      jongsung === 'ㄵ' ||
      jongsung === 'ㄶ' ||
      jongsung === 'ㄺ' ||
      jongsung === 'ㄻ' ||
      jongsung === 'ㄼ' ||
      jongsung === 'ㄽ' ||
      jongsung === 'ㄾ' ||
      jongsung === 'ㄿ' ||
      jongsung === 'ㅀ' ||
      jongsung === 'ㅄ' ||
      jongsung === 'ㅆ'
    ) {
      doubleJongsung = DECOMPOSE[jongsung];
      jasoList.push(doubleJongsung[0]); // double의 첫 자모 추가
    } else {
      jasoList.push(jongsung); // 종성이 낱개 자모인 경우 해당 문자 추가
    }
  }

  try {
    const hangul = assemble(jasoList);

    // 약어가 존재하는 경우
    if (Object.keys(CONTRACTION).includes(hangul)) {
      if (
        hangul === '영' &&
        (chosung === 'ㅅ' || chosung === 'ㅈ' || chosung === 'ㅊ')
      ) {
        return false; // 규정 제 16항
      }

      translatedText += CHOSUNG[chosung];
      translatedText += CONTRACTION[hangul as keyof typeof CONTRACTION];
      flag10 = false;
      flag11 = false;
      flag17 = false;

      // double인 경우 낱개 자모 하나 더 추가
      if (doubleJongsung.length > 1) {
        translatedText += JONGSUNG[doubleJongsung[0] as keyof typeof JONGSUNG];
      }
      return true;
    }
  } catch (error) {
    console.error(error);
  }
  return false;
}

function checkContraction3(
  chosung: keyof typeof CHOSUNG,
  jungsung: keyof typeof JUNGSUNG,
  jongsung: keyof typeof JONGSUNG,
) {
  // 약어 (가 || 나 || 다 || 마 || 바 || 사 ... || 하) + 종성 자음 등 검사

  try {
    const hangul = assemble([chosung, jungsung]);

    //(가 || 나 || 다 || ...|| 하) 존재하는 경우
    if (Object.keys(CONTRACTION).includes(hangul)) {
      translatedText += CONTRACTION[hangul as keyof typeof CONTRACTION];

      // 제 17항 "팠"
      if (hangul === '파' && jongsung === 'ㅆ') {
        translatedText += '⠣';
      }

      translatedText += JONGSUNG[jongsung];
      flag10 = false;
      flag11 = false;
      flag17 = false;
      return true;
    }
  } catch (error) {
    console.error(error);
  }
  return false;
}

function checkNumber(word: string, index: number) {
  // 숫자인 경우
  if (Object.keys(NUMBER).includes(word[index])) {
    // 첫 글자 이후인 경우
    if (index !== 0) {
      // 직전 글자가 숫자인 경우 수표 추가할 필요 없음.
      if (Object.keys(NUMBER).includes(word[index - 1])) {
        translatedText += NUMBER[word[index] as keyof typeof NUMBER];
      } else {
        // 처음 시작하는 숫자일 경우 수표 추가
        translatedText +=
          NUMBER_START + NUMBER[word[index] as keyof typeof NUMBER];
      }
    } else {
      // 첫 인덱스이며 숫자인 경우 수표 추가
      translatedText +=
        NUMBER_START + NUMBER[word[index] as keyof typeof NUMBER];
    }
    return true;
  }
  return false;
}
