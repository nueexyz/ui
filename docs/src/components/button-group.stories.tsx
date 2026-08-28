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
import { Button } from "@cachette/ui/button";
import { ButtonGroup, ButtonGroupText } from "@cachette/ui/button-group";

const meta = {
  title: "Components",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Button Group");

function ButtonGroupExample() {
  return (
    <section {...stylex.props(storyStyles.section)}>
      <header {...stylex.props(storyStyles.sectionHeader)}>
        <h2 {...stylex.props(storyStyles.sectionTitle)}>관련 행동</h2>
        <p {...stylex.props(storyStyles.description)}>가장 자주 사용하는 행동을 먼저 배치합니다.</p>
      </header>
      <div {...stylex.props(storyStyles.preview)}>
        <ButtonGroup aria-label="문서 작업">
          <ButtonGroupText>문서</ButtonGroupText>
          <Button variant="ghost">공유하기</Button>
          <Button variant="ghost">내보내기</Button>
        </ButtonGroup>
      </div>
    </section>
  );
}

const buttonGroupExampleCode =
  'import { Button } from "@cachette/ui/button"\nimport { ButtonGroup, ButtonGroupText } from "@cachette/ui/button-group"\n\n<ButtonGroup aria-label="문서 작업">\n  <ButtonGroupText>문서</ButtonGroupText>\n  <Button variant="ghost">공유하기</Button>\n  <Button variant="ghost">내보내기</Button>\n</ButtonGroup>';

export const ButtonGroupStory: Story = {
  name: "Button Group",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Button Group</h1>
        <p {...stylex.props(storyStyles.description)}>
          같은 목적을 가진 행동을 하나의 조작 단위로 묶습니다.
        </p>
      </header>
      <ComponentExample>
        <ButtonGroupExample />
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
      <ComponentCode usage={buttonGroupExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
