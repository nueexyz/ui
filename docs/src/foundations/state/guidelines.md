# 상태

조작 가능 여부와 지속되는 선택을 구별하면 사용자는 지금 할 수 있는 행동과 이미 정한 값을 혼동하지 않습니다. 입력에 대한 순간적인 반응, 선택, 요청 결과를 나누어 표현합니다.

## 선택 기준

| 사용 상황                     | 권장 선택                                                          | 적용 코드                                               |
| ----------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------- |
| 포인터를 올림                 | `interactionHover`, 채워진 행동 버튼은 `interactionSolidHover`     | `backgroundColor: colorVars.interactionHover`           |
| 누르는 동안                   | `interactionPressed`, 채워진 행동 버튼은 `interactionSolidPressed` | `backgroundColor: colorVars.interactionPressed`         |
| 키보드로 조작할 위치를 표시함 | `strokeFocus`와 초점 테두리                                        | `outlineColor: colorVars.strokeFocus`                   |
| 선택한 항목을 계속 표시함     | `interactionSelected`와 선택 표시                                  | `backgroundColor: colorVars.interactionSelected`        |
| 현재 조건에서 조작할 수 없음  | `fgDisabled`와 컨트롤의 `disabled`                                 | `color: colorVars.fgDisabled`                           |
| 요청 대기                     | 처리 중 문구와 `Spinner`                                           | `<Spinner />`                                           |
| 입력값을 고쳐야 함            | `FieldError`와 입력 가까운 설명                                    | `<FieldError>Enter a valid email address.</FieldError>` |

`interactionPressed`는 누르는 동안만 적용합니다. `interactionSelected`는 선택된 상태를 유지할 때 사용합니다. 하나로 합치면 선택 여부와 입력 반응이 혼동됩니다.

### 구현 기준

컴포넌트의 `disabled`, `checked`, `aria-invalid` 등 의미가 있는 속성을 먼저 사용합니다. 비활성 상태는 모양뿐 아니라 실제 조작에도 적용합니다. 로딩 중에는 중복 제출을 막되 어떤 작업이 진행 중인지 알려줍니다.

초점 테두리는 색상과 함께 `outlineStyle`, `outlineWidth`, `outlineOffset`도 지정합니다. 선택은 `checked`나 `aria-pressed`로, 처리 중인 영역은 `aria-busy`로 연결합니다. 입력 오류는 `aria-invalid`와 오류 설명의 ID를 `aria-describedby`로 연결합니다.

> 기본·호버·누름·초점·비활성 상태를 라이트·다크 모드에서 확인합니다. 선택된 요소에 초점이 놓인 상태도 확인합니다. 사용할 수 없는 이유를 알아야 다음 행동을 정할 수 있다면 해당 요소 가까이에 설명합니다.

### 상태와 결과 색상

`interaction*` 토큰은 호버·누름·선택·비활성 상태를 표현합니다. 반투명 색은 기존 배경 위에 겹쳐 사용하며, `interactionSolid*`는 채워진 행동 버튼의 배경에 사용합니다.

`bgFeedback*`, `fgFeedback*`, `strokeFeedback*`는 정보·성공·경고·오류의 배경·본문·경계를 각각 표현합니다. 누름 상태와 작업 결과는 서로 다른 의미이므로 같은 색상 역할로 합치지 않습니다.

## 적용 예시

### 선택한 항목에 다시 초점이 왔을 때

항목을 선택한 뒤 Tab으로 다시 이동해도 선택 표시는 남아 있어야 합니다. 초점 표시는 그 위에 현재 조작 위치를 더합니다. 누르는 동안의 색만 선택에 사용하면 손을 뗀 뒤 어떤 값이 남았는지 알기 어렵습니다.

### 상태 스타일 적용하기

일반 행동에는 `Button`, 유지되는 선택에는 `Toggle`을 먼저 사용합니다. 아래 코드는 새 컨트롤을 만드는 경우를 위해 스타일 속성과 상태의 연결을 보여 줍니다. **Pin project**에 포인터를 올리고 누른 뒤 놓아 보세요. 선택 배경·경계·체크 표시는 남고 누름 레이어만 사라집니다. Tab으로 이동하면 선택 상태 위에 초점 표시가 더해집니다.

> 호버·누름 색상은 반투명 레이어입니다. 아래 예제는 `bgSubtle` 위에 선택 배경과 호버·누름 레이어를 겹치며, 선택에 경계와 체크 표시도 더합니다. 채워진 주요 행동 배경에서는 `interactionSolidHover`·`interactionSolidPressed`를 사용합니다. 색상만으로 HTML 상태나 조작 동작이 생기지는 않습니다.
