# Random Extraction Frontend

## 개요
이 프로젝트는 랜덤 추출 기능을 제공하는 웹 애플리케이션의 프론트엔드입니다. React를 사용하여 구현되었으며, 백엔드 API와 통신하여 사용자에게 랜덤 데이터를 시각적으로 제공하는 UI를 구현했습니다.

## 주요 기능
- 사용자에게 랜덤 데이터를 시각적으로 제공하는 UI
- 백엔드 API와 통신하여 랜덤 키워드 및 스토리 데이터를 가져옴
- React를 사용하여 상태 관리 및 컴포넌트 기반 설계

## 기술 스택
- **프레임워크**: React
- **언어**: JavaScript, HTML, CSS
- **패키지 관리**: npm (`package.json`)

## 설치 및 실행 방법
1. 레포지토리를 클론합니다:
    ```bash
    git clone https://github.com/mytime501/randomfrontend
    ```
2. 프로젝트 디렉토리로 이동합니다:
    ```bash
    cd randomfrontend
    ```
3. 필요한 패키지를 설치합니다:
    ```bash
    npm install
    ```
4. 개발 서버를 실행합니다:
    ```bash
    npm start
    ```

## 백엔드 연동
- 백엔드 API를 통해 랜덤 데이터를 가져옵니다:
    - API 엔드포인트: `/api/keywords/random` 또는 `/api/stories/random`
    - 메소드: `GET`
    - 설명: 백엔드에서 랜덤 데이터를 받아와 UI에 표시

## 기여 방법
이슈를 통해 버그를 보고하거나 기능 제안을 할 수 있으며, 풀 리퀘스트를 통해 프로젝트에 기여할 수 있습니다.

## 라이선스
이 프로젝트는 MIT 라이선스를 따릅니다.
