# nuée documentation

컴포넌트 문서는 `src/components/{component}/docs.mdx`에 작성합니다.
같은 폴더의 `Default.tsx`, `Sizes.tsx` 등은 일반 React 예제입니다.
`ComponentPreview`는 이 파일을 실행하고 `?raw`로 가져온 원본을 코드 탭에 표시합니다.
예제를 추가할 때 별도의 스토리 메타데이터나 소스 변환은 필요하지 않습니다.

미리보기는 콘텐츠와 기본 여백에 맞춰 높이를 계산하며 오른쪽 아래 모서리로
세로 크기를 조절할 수 있습니다. 팝업이나 토스트 예제에는
`isolated height={360}`처럼 격리 여부와 펼쳐질 공간을 명시합니다.
일반 예제는 문서에서 직접 렌더링합니다. 격리한 예제는 프레임을 유지한 채
메시지로 테마와 모션 설정만 갱신합니다. 문서 렌더러는 같은 React 루트를
갱신하여 테마 변경 때 입력값이나 열린 예제가 초기화되지 않게 합니다.

사용 기준은 `src/foundations/{topic}/guidelines.md`가 원본입니다.
MDX 문서와 LLM용 자료가 이 원본을 함께 사용합니다.
`node scripts/build-guidelines.mjs`로 `public/llms.txt`, `public/llms-full.txt`,
주제별 Markdown을 생성합니다. 개발 서버와 문서 빌드 시작 시에도 생성합니다.
개발 중 기준을 수정했다면 이 명령을 다시 실행해 LLM 자료를 갱신합니다.

다른 프로젝트의 LLM 요청에는 배포된 `llms-full.txt` 주소 또는 원본 파일을
명시하고, 필요한 컴포넌트의 실제 소스와 함께 읽도록 안내합니다.
예: “nuée 사용 기준을 먼저 읽고 계정 설정 화면을 만들어 줘.
Field와 Switch의 실제 API를 확인하고 로딩·오류·키보드 상태도 처리해 줘.”

## Storybook 도구 모음

manager의 도구 모음은 기본 HTML select를 사용하고, nuée와 비슷한 글자·테두리·포커스 스타일을 적용합니다. 별도 React 호환 빌드는 사용하지 않습니다.
