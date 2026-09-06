# 디자인 토큰

토큰은 재사용할 디자인 결정에 붙인 이름입니다. 같은 색처럼 보여도 배경, 본문, 경계선의 역할이 다르면 해당 역할의 토큰을 선택합니다.

## 언제 사용하나요

색상·글꼴·간격·모서리·그림자·조작 크기·모션을 정할 때 사용합니다. 컴포넌트에 이미 `size`나 `variant`가 있다면 그 속성을 먼저 사용합니다.

## 선택 기준

| 역할                              | 토큰 그룹                               |
| --------------------------------- | --------------------------------------- |
| 표면·텍스트·경계·상태             | `colorVars`                             |
| 요소 사이 거리·내부 여백          | `spacingVars`                           |
| 컨트롤·아이콘·콘텐츠 폭·터치 영역 | `sizeVars`                              |
| 글꼴·글자 크기·굵기·줄 높이       | `typographyVars`                        |
| 모서리·그림자·겹침 순서           | `radiusVars`, `shadowVars`, `layerVars` |
| 시간·가감속·비활성 투명도         | `motionVars`, `opacityVars`             |

새 화면에서는 원시 팔레트를 직접 선택하기보다 의미 토큰을 사용합니다. 기존 역할로 설명되지 않는 값은 먼저 화면에 한정하고, 여러 곳에서 동일한 의도가 반복되는지 확인한 뒤 공통 토큰 추가를 판단합니다.

## 구현 예시

```tsx
import * as stylex from "@stylexjs/stylex";
import { colorVars, spacingVars } from "@/styles/semantic.stylex";

const styles = stylex.create({
  panel: {
    backgroundColor: colorVars.bgSurface,
    color: colorVars.fgPrimary,
    padding: spacingVars.space6,
  },
});
```

복사 설치한 프로젝트는 `nuee.json`의 스타일 별칭을 사용합니다. 이 저장소의 예제는 토큰 패키지를 직접 참조할 수 있습니다. 화면을 작성하기 전에 실제 토큰 파일에서 이름을 확인하고 존재하지 않는 토큰을 만들지 않습니다.
