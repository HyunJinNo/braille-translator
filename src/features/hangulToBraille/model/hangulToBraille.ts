import { assemble } from 'es-hangul';
import {
  CHOSUNG,
  CONTRACTION,
  DECOMPOSE,
  JONGSUNG,
  JUNGSUNG,
  NUMBER,
  PUNCTUATION,
  QUOTATION,
} from '../config/mapping';
import {
  CHOSUNG_LIST,
  JONGSUNG_LIST,
  JUNGSUNG_LIST,
} from '../config/letterList';
import { BASE_CODE, CHOSUNG_CODE, JUNGSUNG_CODE } from '../config/code';

let flag10 = false; // 점자 규정 제 10항 확인용
let flag11 = false; // 점자 규정 제 11항 확인용
let flag17 = false; // 점자 규정 제 17항 확인용
let bQuot = 0; // big quotation index
let sQuot = 2; // small quotation index
let translatedText = '';

function extractWords(text: string) {
  return text.split(' ');
}

function checkContraction(word: string, index: number) {
  const character = word[index];

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
    flag17 = true;
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
    if (Object.keys(DECOMPOSE).includes(jongsung)) {
      doubleJongsung = DECOMPOSE[jongsung as keyof typeof DECOMPOSE];
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
        translatedText += JONGSUNG[doubleJongsung[1] as keyof typeof JONGSUNG];
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
        translatedText += '⠼' + NUMBER[word[index] as keyof typeof NUMBER];
      }
    } else {
      // 첫 인덱스이며 숫자인 경우 수표 추가
      translatedText += '⠼' + NUMBER[word[index] as keyof typeof NUMBER];
    }
    return true;
  }
  return false;
}

function checkPunctuation(word: string, index: number) {
  const punc = word[index];

  if (Object.keys(PUNCTUATION).includes(punc)) {
    translatedText += PUNCTUATION[punc as keyof typeof PUNCTUATION];
    return true;
  } else if (punc === '"') {
    translatedText += QUOTATION[bQuot];

    if (bQuot === 0) {
      bQuot++;
    } else {
      bQuot--;
    }
    return true;
  } else if (punc === "'") {
    translatedText += QUOTATION[sQuot];

    if (sQuot === 2) {
      sQuot++;
    } else {
      sQuot--;
    }
    return true;
  }

  return false;
}

function checkCharacter(word: string, index: number) {
  const key = word[index];
  let charCode = 0;
  let char1 = 0;
  let char2 = 0;
  let char3 = 0;

  if (/[ㄱ-ㅎㅏ-ㅣ가-힣]+/.test(key)) {
    charCode = key.charCodeAt(0) - BASE_CODE;

    // 완전한 글자인 경우
    if (charCode >= 0) {
      char1 = Math.floor(charCode / CHOSUNG_CODE);
      char2 = Math.floor((charCode - CHOSUNG_CODE * char1) / JUNGSUNG_CODE);
      char3 = Math.floor(
        charCode - CHOSUNG_CODE * char1 - JUNGSUNG_CODE * char2,
      );

      const chosung = CHOSUNG_LIST[char1];
      const jungsung = JUNGSUNG_LIST[char2];
      const jongsung = JONGSUNG_LIST[char3];

      // 모음 시작
      if (chosung === 'ㅇ' && flag17) {
        flag11 = false;
        if (char3 === 0) {
          flag10 = true;
          if (
            jungsung === 'ㅑ' ||
            jungsung === 'ㅘ' ||
            jungsung === 'ㅜ' ||
            jungsung === 'ㅝ'
          ) {
            flag11 = true;
          }
        }

        // "예"로 끝
        if (jungsung === 'ㅖ') {
          translatedText += '⠤';
        } else {
          translatedText += '⠣';
        }
        flag17 = false;
      }

      //늘 → ㅁ ㄴ+'을' 과 같은 약어가 없는 경우
      if (!checkContraction2(chosung, jungsung, jongsung)) {
        // 감 → '가'+ㅁ 과 같은 약어가 없는 경우
        if (!checkContraction3(chosung, jungsung, jongsung)) {
          // 약자, 약어 없이 초성, 중성, 종성 모든 파트 1:1 매핑
          // 규정 제 10항
          if (flag10 && chosung === 'ㅇ' && jungsung === 'ㅖ') {
            translatedText += '⠤';
            translatedText += CHOSUNG[chosung];
            translatedText += JUNGSUNG[jungsung];

            if (char3 !== 0) {
              translatedText += JONGSUNG[jongsung];
              flag10 = false;
            } else {
              flag10 = true;
            }

            flag11 = false;
            flag17 = false;
          }
          // 규정 제 11항
          else if (flag10 && flag11 && chosung === 'ㅇ' && jungsung === 'ㅐ') {
            translatedText += '⠤';
            translatedText += CHOSUNG[chosung];
            translatedText += JUNGSUNG[jungsung];

            if (char3 !== 0) {
              translatedText += JONGSUNG[jongsung];
              flag10 = false;
            }
            flag11 = false;
            flag17 = false;
          }
          // 1:1 매핑 케이스
          else {
            translatedText += CHOSUNG[chosung];

            // 종성 자음이 존재할 경우에만 추가
            if (char3 !== 0) {
              if (
                jungsung === 'ㅓ' &&
                jongsung === 'ㅇ' &&
                (chosung === 'ㅅ' ||
                  chosung === 'ㅆ' ||
                  chosung === 'ㅈ' ||
                  chosung === 'ㅉ' ||
                  chosung === 'ㅊ')
              ) {
                translatedText += '⠻'; // 규정 제 16항
              } else {
                translatedText += JUNGSUNG[jungsung];
                translatedText += JONGSUNG[jongsung];
              }

              flag10 = false;
              flag11 = false;
              flag17 = false;
            }
            // 종성 자음이 존재하지 않고 모음까지만 존재하는 경우
            else {
              translatedText += JUNGSUNG[jungsung];
              flag10 = true;

              if (
                jungsung === 'ㅑ' ||
                jungsung === 'ㅘ' ||
                jungsung === 'ㅜ' ||
                jungsung === 'ㅝ'
              ) {
                flag11 = true;
              }

              flag17 = false;
            }
          }
        }
      }

      return true;
    }
    // 자음 혹은 모음 하나만 있을 때
    else {
      translatedText += '⠿';

      // 초성 자음인 경우
      if (Object.keys(CHOSUNG).includes(key)) {
        if (Object.keys(DECOMPOSE).includes(key)) {
          translatedText += DECOMPOSE[key as keyof typeof DECOMPOSE];
        } else {
          translatedText += CHOSUNG[key as keyof typeof CHOSUNG];
        }
      }
      // 중성 모음인 경우
      else {
        translatedText += JUNGSUNG[key as keyof typeof JUNGSUNG];
      }

      flag10 = false;
      flag11 = false;
      flag17 = false;
      return true;
    }
  }

  return false;
}

export function checkValidity(text: string) {
  if (checkContraction(text, 0) !== 0) {
    return true;
  }

  if (checkNumber(text, 0)) {
    return true;
  }

  if (checkPunctuation(text, 0)) {
    return true;
  }

  if (checkCharacter(text, 0)) {
    return true;
  }

  return false;
}

export function translate(text: string) {
  flag10 = false; // 점자 규정 제 10항 확인용
  flag11 = false; // 점자 규정 제 11항 확인용
  flag17 = false; // 점자 규정 제 17항 확인용
  bQuot = 0; // big quotation index
  sQuot = 2; // small quotation index
  translatedText = '';

  text.split('\n').forEach((line) => {
    extractWords(line).forEach((word) => {
      let index = 0;
      const length = word.length;

      while (index < length) {
        const checkCont = checkContraction(word, index);

        if (checkCont !== 0) {
          index += checkCont;
          continue;
        }

        if (checkNumber(word, index)) {
          index++;
          flag10 = false;
          flag11 = false;
          flag17 = false;
          continue;
        }

        if (checkPunctuation(word, index)) {
          index++;
          flag10 = false;
          flag11 = false;
          flag17 = false;
          continue;
        }

        checkCharacter(word, index);
        index++;
      }

      translatedText += ' ';
      flag10 = false;
      flag11 = false;
      flag17 = false;
    });

    translatedText += '\n';
  });

  return translatedText.trim();
}
