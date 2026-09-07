# 색상

색상의 역할을 일관되게 쓰면 사용자는 제목, 보조 설명, 필요한 행동을 빠르게 구별할 수 있습니다. 역할에 맞는 의미 토큰을 선택하면 라이트·다크 모드에서도 같은 기준으로 화면을 구성할 수 있습니다.

## 선택 기준

| 사용 상황                 | 권장 선택                 | 적용 코드                              |
| ------------------------- | ------------------------- | -------------------------------------- |
| 화면의 가장 바깥 배경     | `colorVars.bgCanvas`      | `backgroundColor: colorVars.bgCanvas`  |
| 일반 콘텐츠 영역          | `colorVars.bgSurface`     | `backgroundColor: colorVars.bgSurface` |
| 약하게 구별할 영역        | `colorVars.bgSubtle`      | `backgroundColor: colorVars.bgSubtle`  |
| 팝업처럼 떠 있는 표면     | `colorVars.bgRaised`      | `backgroundColor: colorVars.bgRaised`  |
| 제목·필수 본문            | `colorVars.fgPrimary`     | `color: colorVars.fgPrimary`           |
| 설명·보조 정보            | `colorVars.fgSecondary`   | `color: colorVars.fgSecondary`         |
| 일반 구분선               | `colorVars.strokeDefault` | `borderColor: colorVars.strokeDefault` |
| 반드시 구별해야 하는 경계 | `colorVars.strokeStrong`  | `borderColor: colorVars.strokeStrong`  |

주요 행동이나 파괴적 행동의 배경에는 대응하는 `fgOnActionPrimary` 또는 `fgOnActionDestructive`를 사용합니다. 오류는 `fgFeedbackError` 같은 상태 토큰과 구체적인 설명을 함께 사용합니다.

## 적용 예시

### 설정 패널에 적용하기

패널은 `bgSurface`, 제목은 `fgPrimary`, 보조 설명은 `fgSecondary`로 구성합니다. 저장 오류가 생기면 오류 색과 함께 수정 방법을 표시합니다. 설명과 오류를 모두 약한 색으로 처리하면 지금 해결할 문제가 묻힙니다.

> 라이트·다크 모드에서 같은 의미 토큰을 유지합니다. 의미 토큰을 썼다는 이유만으로 모든 전경·배경 조합의 대비가 보장되지는 않습니다. 실제 조합을 검사하고, 상태를 색만으로 전달하지 않습니다.
