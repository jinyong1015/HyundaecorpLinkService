# Hyundaecorp Link Service

Hyundaecorp 서비스 링크를 한 페이지에 모은 Link-in-Bio 웹앱입니다.  
방문자는 프로필과 배너를 확인한 뒤, 각 배너를 클릭해 관련 분석 서비스로 이동합니다.

## 주요 기능

- 기업 로고 / 이름 / 타이틀 / 안내 문구 프로필 영역
- 서비스 배너 링크 (새 탭 이동)
- Dark Mode 기본 + Light/Dark 토글
- Crest Wave 배경 애니메이션 (V자 세로 정점선)
- 모바일 우선 반응형 레이아웃 (콘텐츠 최대 너비 480px)

## 서비스 링크

| 배너 | URL |
|---|---|
| 검사DATA분석 | https://jinyong1015-company.vercel.app/ |
| 생산DATA 분석 | https://jinyong1015-companysangsan.vercel.app/ |
| VINA인원현황 | https://hyundaecorpvinapeople.vercel.app/ |

## 기술 스택

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4

## 시작하기

이 앱은 저장소의 `my-app` 폴더에 있습니다.

```bash
cd my-app
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 으로 확인하세요.

### 스크립트

| 명령 | 설명 |
|---|---|
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run vercel-build` | Vercel 빌드용 (`next build`) |
| `npm run start` | 빌드 결과 실행 |
| `npm run lint` | ESLint 검사 |

## 프로필 / 링크 수정

프로필과 배너 정보는 아래 파일에서 관리합니다.

- `src/lib/profile.ts` — 이름, 타이틀, 소개, 로고 경로, 링크 목록
- `public/avatar.png` — 프로필 로고 이미지
- `src/components/social-icon.tsx` — 배너 아이콘

현재 기본값:

- 이름: `Hyundaecorp`
- 타이틀: `AI website`
- 소개: `배너 클릭시 해당 링크로 이동됩니다.`
- 로고: `/avatar.png` (둥근 사각형, `object-contain`)

## 테마

- 기본 테마: **Dark Mode**
- 우측 상단 토글로 Light / Dark 전환
- 선택값은 `localStorage` 키 `link-in-bio-theme` 에 저장

관련 파일:

- `src/components/theme-provider.tsx`
- `src/components/theme-toggle.tsx`
- `src/app/globals.css`

## 배경 애니메이션

전체 배경에 Crest Wave 효과를 사용합니다.

- 세로 막대마다 빛나는 정점선이 흐름
- 막대별 delay로 V자 물결 형태 유지
- `prefers-reduced-motion` 설정 시 애니메이션 비활성화

관련 파일:

- `src/components/wave-background.tsx`
- `src/app/globals.css` (`.crest-*` 스타일)

## 프로젝트 구조

```text
my-app/
├── public/                 # 정적 파일 (avatar.png 등)
├── src/
│   ├── app/                # App Router (layout, page, globals.css)
│   ├── components/         # UI 컴포넌트
│   │   ├── home-page.tsx
│   │   ├── profile-section.tsx
│   │   ├── link-list.tsx
│   │   ├── social-icon.tsx
│   │   ├── theme-provider.tsx
│   │   ├── theme-toggle.tsx
│   │   └── wave-background.tsx
│   └── lib/
│       └── profile.ts      # 프로필/링크 데이터
├── 화면 설계서.md
└── package.json
```

## 배포 (Vercel)

저장소 루트에 Next.js 앱이 있지 않고 `my-app` 하위에 있으므로, Vercel 설정을 맞춰야 합니다.

1. Vercel 프로젝트 → **Settings → General**
2. **Root Directory** 를 `my-app` 으로 설정
3. Framework Preset: **Next.js**
4. Build Command: `npm run build` 또는 `npm run vercel-build`
5. Redeploy

Root Directory를 지정하지 않으면 `Couldn't find any pages or app directory` 빌드 에러가 발생할 수 있습니다.

## 화면 설계서

UI/UX 상세 명세는 `화면 설계서.md` 를 참고하세요.
