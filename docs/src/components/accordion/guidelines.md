## 사용 가이드

관련 내용을 의미가 분명한 제목 아래 묶습니다. 답변끼리 비교해야 한다면 여러 항목을 함께 열 수 있게 합니다.

> 필수 안내는 닫힌 항목 안에 숨기지 않고 보이게 둡니다.

### 구성과 스타일

`Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`로 구성합니다.
제목과 애니메이션 패널은 내부에서 제공하므로 별도로 감싸지 않습니다.
`AccordionContent`의 `xstyle`은 자식을 직접 감싸는 영역에 적용됩니다.
`keepMounted`, `hiddenUntilFound`, `ref`와 나머지 DOM 속성은 바깥 패널에 전달됩니다.
