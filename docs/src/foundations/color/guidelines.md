# 색상

색상은 정보의 역할과 상태를 구별하기 위해 사용합니다. 장식 색을 늘리기 전에 중립 표면과 글자 위계로 충분히 구분되는지 확인합니다.

## 어떤 색을 고르나요

| 상황                      | 기본 선택                 |
| ------------------------- | ------------------------- |
| 화면의 가장 바깥 배경     | `colorVars.bgCanvas`      |
| 일반 콘텐츠 영역          | `colorVars.bgSurface`     |
| 약하게 구별할 영역        | `colorVars.bgSubtle`      |
| 팝업처럼 떠 있는 표면     | `colorVars.bgRaised`      |
| 제목·필수 본문            | `colorVars.fgPrimary`     |
| 설명·보조 정보            | `colorVars.fgSecondary`   |
| 일반 구분선               | `colorVars.strokeDefault` |
| 반드시 구별해야 하는 경계 | `colorVars.strokeStrong`  |

강한 행동 배경에는 대응하는 `fgOnActionPrimary` 또는 `fgOnActionDestructive`를 사용합니다. 오류는 `fgFeedbackError` 같은 상태 토큰과 구체적인 설명을 함께 사용합니다.

## 사용 예

설정 화면의 설명은 `fgSecondary`로 낮추되 사용자가 반드시 알아야 하는 오류까지 약하게 만들지 않습니다. 카드가 같은 면에 있으면 모두 그림자를 추가하기보다 여백과 경계선으로 묶음을 구분합니다.

## 확인할 것

라이트·다크 모드에서 같은 의미 토큰을 유지합니다. 의미 토큰을 썼다는 이유만으로 모든 전경·배경 조합의 대비가 보장되지는 않습니다. 실제 조합을 검사하고, 상태를 색만으로 전달하지 않습니다.
