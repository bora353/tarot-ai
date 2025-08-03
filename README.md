# AI 타로카드 웹사이트

AI가 따뜻하게 해석해주는 타로카드 뽑기 웹사이트입니다. 사용자는 타로카드를 직접 3장 뽑고, 궁금한 질문을 입력하면 AI가 친절하게 해석해줍니다.

## 주요 기능

- 타로카드 78장(메이저+마이너) 원형 배치
- 카드 뒷면/앞면 뒤집기(3장만 선택 가능)
- 질문 직접 입력(글자수 제한)
- AI(챗GPT) 연동 해석 결과 표시(예정)
- 반응형 UI, 예쁜 TailwindCSS 스타일

## 기술 스택

- **프론트엔드**: React, Vite, TypeScript, TailwindCSS
- **백엔드**: Vercel Serverless Functions (Node.js)
- **AI**: OpenAI GPT API

## 개발/실행 방법

1. 저장소 클론

```bash
git clone [저장소주소]
cd tarot
```

2. 패키지 설치

```bash
npm install
```

3. 개발 서버 실행

```bash
npm run dev
```

4. (선택) Vercel 배포

```bash
vercel
```

## 환경변수 설정 (OpenAI API Key)

루트 폴더에 `.env` 파일을 만들고 아래처럼 입력하세요:

```
OPENAI_API_KEY=sk-여기에_발급받은_키_붙여넣기
```

## 폴더 구조

```
public/
  tarot-images/   # 카드 이미지, 뒷면(back.svg), 원형 배경(circle_bg.png)
src/
  components/     # 리액트 컴포넌트
  data/           # 타로카드 데이터
  api/            # 서버리스 함수(API)
```

## 기여 방법

- 이슈/PR 환영합니다!
- 카드 이미지, 해석 프롬프트, UI 개선 등 자유롭게 제안해 주세요.

## 라이선스

- 오픈소스(라이선스 지정 필요시 추가)
- 카드 이미지는 저작권에 주의하세요(무료 이미지 권장)
