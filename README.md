# Next.js URI Generator

Next.js 프로젝트의 페이지 라우팅 구조를 기반으로 URI를 자동으로 생성해주는 VS Code 확장 프로그램입니다.

## 주요 기능

이 확장 프로그램은 다음과 같은 기능을 제공합니다:

- Next.js 프로젝트의 디렉토리 구조를 분석하여 가능한 모든 URI 경로를 생성
- 생성된 URI를 클립보드에 복사 가능

## 설치 방법

VS Code 마켓플레이스에서 'Next.js URI Generator'를 검색하여 설치할 수 있습니다.

## 사용 방법

1. nextjs 프로젝트에서 api 디렉터리 하위의 route 파일을 열어서 아래와 같은 형식으로 정의된 HTTP 함수 상단에 표시되는 URI와 복사 단추를 사용합니다.

```typescript
export async function GET
```

## 확장 프로그램 설정

다음과 같은 설정을 제공합니다:

- `nextjsUriGenerator.hostUrl`: 복사 할 때 uri 앞에 붙일 문자열

## 릴리스 노트

### 0.0.1

- 개발 진행중
- 기본적인 URI 생성 기능 구현

## 개발자 정보

- GitHub: <https://github.com/BearMett/nextjs-uri-generator>  
- 이슈 리포트: <https://github.com/BearMett/nextjs-uri-generator/issues>

---

**즐거운 개발 되세요!**
