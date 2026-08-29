import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@dumo/ui/button";
import { ButtonGroup } from "@dumo/ui/button-group";
import { Icon } from "@dumo/ui/icon";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "./story-layout/StoryLayout";
import { getComponentDocument } from "./story-layout/component-docs";

const meta = {
  title: "Components",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Button Group");

const buttonGroupExampleCode = `import { Button } from "@dumo/ui/button"
import { ButtonGroup } from "@dumo/ui/button-group"
import { Icon } from "@dumo/ui/icon"

<div>
  <ButtonGroup aria-label="이전 화면으로 이동">
    <Button size="sm" variant="secondary" aria-label="뒤로 가기">
      <Icon aria-hidden="true" name="chevronLeft" />
    </Button>
  </ButtonGroup>

  <ButtonGroup aria-label="메시지 작업">
    <Button size="sm" variant="secondary">보관</Button>
    <Button size="sm" variant="secondary">신고</Button>
  </ButtonGroup>

  <ButtonGroup aria-label="추가 작업">
    <Button size="sm" variant="secondary">다시 알림</Button>
    <Button size="sm" variant="secondary" aria-label="추가 작업">
      <Icon aria-hidden="true" name="moreHorizontal" />
    </Button>
  </ButtonGroup>
</div>`;

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
        <div {...stylex.props(storyStyles.preview)}>
          <ButtonGroup aria-label="이전 화면으로 이동">
            <Button size="sm" variant="secondary" aria-label="뒤로 가기">
              <Icon aria-hidden="true" name="chevronLeft" />
            </Button>
          </ButtonGroup>
          <ButtonGroup aria-label="메시지 작업">
            <Button size="sm" variant="secondary">보관</Button>
            <Button size="sm" variant="secondary">신고</Button>
          </ButtonGroup>
          <ButtonGroup aria-label="추가 작업">
            <Button size="sm" variant="secondary">다시 알림</Button>
            <Button size="sm" variant="secondary" aria-label="추가 작업">
              <Icon aria-hidden="true" name="moreHorizontal" />
            </Button>
          </ButtonGroup>
        </div>
      </ComponentExample>

      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>설치</h2>
        </header>
        <CodeBlock
          code={`pnpm dlx @dumo/ui add ${componentDocument.registryName}`}
          label="터미널"
          language="bash"
        />
      </section>
      <ComponentCode usage={buttonGroupExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
