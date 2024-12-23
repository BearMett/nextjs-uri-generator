# Next.js URI Generator

Next.js 프로젝트의 페이지 라우팅 구조를 기반으로 URI를 자동으로 생성해주는 VS Code 확장 프로그램입니다.

## 주요 기능

이 확장 프로그램은 다음과 같은 기능을 제공합니다:

- Next.js 프로젝트의 pages 디렉토리 구조를 분석하여 가능한 모든 URI 경로를 자동 생성
- 동적 라우팅 ([id], [...slug] 등) 지원
- 생성된 URI를 클립보드에 복사 가능
- URI 목록을 파일로 내보내기 기능

## 설치 방법

VS Code 마켓플레이스에서 'Next.js URI Generator'를 검색하여 설치할 수 있습니다.

## 사용 방법

1. Next.js 프로젝트를 VS Code에서 엽니다.
2. 명령 팔레트(Cmd/Ctrl + Shift + P)를 열고 'Generate Next.js URIs'를 실행합니다.
3. 생성된 URI 목록에서 원하는 항목을 선택하여 사용합니다.

## 확장 프로그램 설정

다음과 같은 설정을 제공합니다:

- `nextjsUriGenerator.excludePaths`: URI 생성 시 제외할 경로 패턴
- `nextjsUriGenerator.exportFormat`: URI 내보내기 시 사용할 파일 형식 (JSON/TXT)

## 알려진 문제점

현재 알려진 주요 문제점은 없습니다.

## 릴리스 노트

### 1.0.0

- 최초 릴리스
- 기본적인 URI 생성 기능 구현
- 동적 라우팅 지원

## 개발자 정보

- GitHub: [저장소 링크]
- 이슈 리포트: [이슈 페이지 링크]

---

**즐거운 개발 되세요!**
