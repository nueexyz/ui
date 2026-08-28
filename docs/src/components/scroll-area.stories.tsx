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
} from "./story-layout/StoryLayout";
import { getComponentDocument } from "./story-layout/component-docs";
import { ScrollAreaExample, scrollAreaExampleCode } from "./examples/scroll-area.example";

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

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Scroll Area");

export const ScrollAreaStory: Story = {
  name: "Scroll Area",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Scroll Area</h1>
        <p {...stylex.props(storyStyles.description)}>
          정해진 영역 안에서 긴 콘텐츠를 스크롤해 탐색할 수 있게 합니다.
        </p>
      </header>
      <ComponentExample>
        <ScrollAreaExample />
      </ComponentExample>

      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>설치</h2>
        </header>
        <CodeBlock
          code={`pnpm dlx @cachette/ui add ${componentDocument.registryName}`}
          label="터미널"
          language="bash"
        />
      </section>
      <ComponentCode usage={scrollAreaExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
