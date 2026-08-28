import { ScrollArea } from "@cachette/ui/scroll-area";
import { Separator } from "@cachette/ui/separator";
import { spacingVars } from "@cachette/tokens/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "../story-layout/StoryLayout";
import { getComponentDocument } from "../story-layout/component-docs";

const styles = stylex.create({
  viewport: { height: "14rem", width: "20rem" },
  item: { paddingBlock: spacingVars.space3 },
});

const activities = [
  "배포 체크리스트를 완료했어요.",
  "디자인 검토 요청을 보냈어요.",
  "로그인 화면을 수정했어요.",
  "새 멤버를 프로젝트에 초대했어요.",
  "사용자 인터뷰 일정을 추가했어요.",
  "개발 환경 설정을 공유했어요.",
  "오류 보고서를 확인했어요.",
  "프로토타입 링크를 업데이트했어요.",
  "이번 주 목표를 정리했어요.",
  "회의록에 결정 사항을 기록했어요.",
  "브랜드 가이드가 변경되었어요.",
  "다음 배포 일정을 확정했어요.",
];

const componentDocument = getComponentDocument("Scroll Area");

export function ScrollAreaExample() {
  return (
    <>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>활동 내역</h2>
          <p {...stylex.props(storyStyles.description)}>
            스크롤바는 필요할 때만 조작을 돕고 콘텐츠의 폭은 유지합니다.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview)}>
          <ScrollArea xstyle={styles.viewport}>
            {activities.map((activity, index) => (
              <div key={index}>
                <div {...stylex.props(styles.item)}>{activity}</div>
                {index < 11 ? <Separator /> : null}
              </div>
            ))}
          </ScrollArea>
        </div>
      </section>
    </>
  );
}

export const scrollAreaExampleCode =
  'import { ScrollArea } from "@cachette/ui/scroll-area"\nimport { Separator } from "@cachette/ui/separator"\n\nconst activities = [\n  "배포 체크리스트를 완료했어요.",\n  "디자인 검토 요청을 보냈어요.",\n  "로그인 화면을 수정했어요.",\n  "새 멤버를 프로젝트에 초대했어요.",\n  "사용자 인터뷰 일정을 추가했어요.",\n  "개발 환경 설정을 공유했어요.",\n  "오류 보고서를 확인했어요.",\n  "프로토타입 링크를 업데이트했어요.",\n  "이번 주 목표를 정리했어요.",\n  "회의록에 결정 사항을 기록했어요.",\n  "브랜드 가이드가 변경되었어요.",\n  "다음 배포 일정을 확정했어요.",\n]\n\n<ScrollArea style={{ height: "14rem", width: "20rem" }}>\n  {activities.map((activity, index) => (\n    <div key={activity}>\n      <div style={{ paddingBlock: "0.75rem" }}>{activity}</div>\n      {index < activities.length - 1 ? <Separator /> : null}\n    </div>\n  ))}\n</ScrollArea>';
