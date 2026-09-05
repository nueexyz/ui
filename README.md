# Nuee

StyleX 앱을 위한 오픈 코드 React 컴포넌트 모음입니다.

## 설치

프로젝트에서 초기 설정과 컴포넌트 경로를 대화형으로 정합니다.

```sh
pnpm dlx @nuee/ui init
```

Vite 프로젝트라면 StyleX 플러그인 설정과 reset CSS import까지 함께 추가합니다.

```sh
pnpm dlx @nuee/ui init --vite
```

## 사용

필요한 컴포넌트 소스를 프로젝트에 추가합니다.

```sh
pnpm dlx @nuee/ui add button
```

기본 경로를 선택했다면 컴포넌트를 이렇게 사용합니다.

```tsx
import { Button } from "@/components/ui/button";

export function SaveButton() {
  return <Button>Save</Button>;
}
```

`init`에서 UI와 스타일 import alias를 바꿨다면 그 경로를 사용하면 됩니다.
