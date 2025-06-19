<h1>Braille Translator - 점자 번역기</h1>

<br />

<div align="center">
  <img src="https://github.com/user-attachments/assets/8a3ea668-057b-44d2-a789-0970f1225143" alt="logo" />
</div>

<br />

<div align="center">
  <a href="https://github.com/HyunJinNo/braille-translator/wiki" target="_blank"><img src="https://img.shields.io/badge/GitHub%20Wiki-181717?logo=github&logoColor=white"></a>
   <a href="https://github.com/users/HyunJinNo/projects/1" target="blank"><img src="https://img.shields.io/badge/🎯Backlog%20-02B78F?logo=none&logoColor=white"></a>
   <a href="https://www.figma.com/design/CnQv3445XcSMa0PCkq8vGg/Braille-Translator?node-id=3203-2446&t=Kit9cJsybo6PmPTA-1" target="_blank"><img src="https://img.shields.io/badge/Figma-%23F24E1E.svg?logo=figma&logoColor=white"></a>
</div>

<br />
<br />

<h2>목차</h2>

- [📖 프로젝트 소개](#-프로젝트-소개)
  - [개요](#개요)
  - [프로젝트 인원](#프로젝트-인원)
  - [프로젝트 기간](#프로젝트-기간)
  - [서비스 대상](#서비스-대상)
- [💾 주요 기능](#-주요-기능)
  - [카메라 번역 기능](#카메라-번역-기능)
  - [이미지 번역 기능](#이미지-번역-기능)
  - [번역 기록](#번역-기록)
- [✏️ 개발 기록](#️-개발-기록)
- [🏛️️ 아키텍처](#️️-아키텍처)
- [📚 기술 스택](#-기술-스택)

<br />
<br />

## 📖 프로젝트 소개

### 개요

카메라와 사진을 이용해 한글과 점자 간의 번역을 지원하는 모바일 애플리케이션 서비스입니다. 사용자로 하여금 한글과 점자를 직접 입력할 필요 없이 카메라와 사진을 이용해 간편하게 번역 내용을 확인할 수 있게 돕습니다.

<br />

### 프로젝트 인원

`1명 (HyunJinNo)`

<br />

### 프로젝트 기간

`2025.05.28. ~ 2025.06.19.`

<br />

### 서비스 대상

- `시각장애인 활동지원사`

  전맹인 시각장애인에게 점자 교육을 제공하고자 하지만 점자에 대한 지식이 많지 않은 활동지원사, 가족 등

- `저시력 시각장애인`

  사물의 유무 정도는 분간할 수 있지만 시력이 낮아 글자를 읽는 데에는 한계가 있어 점자를 배울 필요가 있는 저시력 시각장애인

- `실명 질환 환자`

  시력이 남아 있지만 백내장, 녹내장, 황반변성 등 시력을 점차 잃어가게 되는 질병에 걸린 진행형 시각장애인

<br />
<br />

## 💾 주요 기능

### 카메라 번역 기능

- 카메라를 사용하여 한글을 점자로 번역하거나 점자를 한글로 번역할 수 있습니다.
- 카메라 한글→점자 번역 화면에서 인식된 텍스트를 수정할 수 있는 기능을 제공합니다.
- 저장 버튼을 눌러서 번역 기록을 저장할 수 있습니다.

|                                                       카메라 한글→점자 번역                                                        |                                                       카메라 점자→한글 번역                                                        |
| :--------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/user-attachments/assets/66199056-32b7-4dec-91e9-e0284c320ecd" alt="한글 카메라 번역" width="240px" /> | <img src="https://github.com/user-attachments/assets/04e99ea4-9b6f-415c-b11c-a473f16f914c" alt="점자 카메라 번역" width="240px" /> |

<br />

### 이미지 번역 기능

- 디바이스 내 이미지를 선택하여 한글을 점자로 번역하거나 점자를 한글로 번역할 수 있습니다.

|                                                          한글 이미지 번역                                                          |                                                          점자 이미지 번역                                                           |
| :--------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/user-attachments/assets/b00f627b-65bc-48e4-bf86-5e3fe68e0f7d" alt="한글 이미지 번역" width="240px" /> | <img src="https://github.com/user-attachments/assets/5f0f2de6-ca70-48e5-b70f-c988f94c6b80" alt="점자 이미지 번역" width ="240px" /> |

<br />

### 번역 기록

- 저장한 번역 기록을 확인할 수 있습니다.
- 번역 기록을 북마크할 수 있는 기능을 제공합니다.
- 전체 번역 기록 또는 개별 번역 기록을 삭제할 수 있습니다.

|                                                          번역 기록 조회                                                           |                                                               북마크 기능과 삭제 기능                                                                |
| :-------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/user-attachments/assets/2ad37427-47c8-4e15-adb8-a3f17918e961" alt="번역 기록 조회" width ="240px" /> | <img src="https://github.com/user-attachments/assets/ea79635f-6423-45c0-803b-5a78824520dd" alt="번역 기록 북마크 기능과 삭제 기능" width ="240px" /> |

<br />
<br />

## ✏️ 개발 기록

| 제목                                                                                                                                                                                                                            | 핵심 키워드           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| [💿React Native CLI 시작하기](https://hyunjinno.github.io/posts/react-native-basic)                                                                                                                                             | `React Native`        |
| [🪟React Native 프로젝트에 Tailwind CSS 적용하기](https://github.com/TripInfoWeb/solitour-mobile/wiki/%F0%9F%AA%9FReact-Native-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%97%90-Tailwind-CSS-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0) | `Tailwind CSS`        |
| [⚡Splash Screen 적용하기](https://github.com/TripInfoWeb/solitour-mobile/wiki/%E2%9A%A1Splash-Screen-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0)                                                                                     | `Splash Screen`       |
| [💿React Navigation 설정 방법](https://hyunjinno.github.io/posts/react-navigation/)                                                                                                                                             | `React Navigation`    |
| [💿React Native + env 설정 방법](https://hyunjinno.github.io/posts/react-native-dotenv/)                                                                                                                                        | `env`                 |
| [💿React Native 프로젝트에 Path Alias 설정 방법](https://hyunjinno.github.io/posts/react-native-path-alias/)                                                                                                                    | `Path Alias`          |
| [🍞React Native 프로젝트에서 토스트 메시지 직접 구현하기](https://hyunjinno.github.io/posts/react-native-toast/)                                                                                                                | `Toast` `Context API` |
| [📦React Native APK 빌드 방법](https://hyunjinno.github.io/posts/react-native-apk/)                                                                                                                                             | `APK`                 |

<br />
<br />

## 🏛️️ 아키텍처

![image](https://github.com/user-attachments/assets/c2ee8698-bf9b-4afe-af68-b6dfc4a9e30c)

<br />
<br />

## 📚 기술 스택

| 분류                | 기술 스택                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Front-end           | ![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?logo=npm&logoColor=white) ![Prettier](https://img.shields.io/badge/-Prettier-F7B93E?logo=prettier&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=white) ![React_Native](https://img.shields.io/badge/React_Native-%2320232a.svg?logo=react&logoColor=%2361DAFB) ![Tailwind_CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white) |
| Back-end            | ![Python](https://img.shields.io/badge/Python-3776AB?logo=Python&logoColor=FFFFFF) ![Flask](https://img.shields.io/badge/Flask-000000?logo=Flask&logoColor=FFFFFF)                                                                                                                                                                                                                                                                                                                                                                                                    |
| Infrastructure      | ![Raspberry_Pi](https://img.shields.io/badge/Raspberry%20Pi-A22846?logo=Raspberry%20Pi&logoColor=FFFFFF) ![Nginx](https://img.shields.io/badge/Nginx-%23009639.svg?logo=nginx&logoColor=white)                                                                                                                                                                                                                                                                                                                                                                        |
| Collaboration Tools | ![Figma](https://img.shields.io/badge/Figma-%23F24E1E.svg?logo=figma&logoColor=white) ![GitHub](https://img.shields.io/badge/-GitHub-181717?logo=github&logoColor=white)                                                                                                                                                                                                                                                                                                                                                                                              |
