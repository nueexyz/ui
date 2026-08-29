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
import { Bubble } from "@dumo/ui/bubble";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Bubble");

function BubbleExample() {
  return (
    <section {...stylex.props(storyStyles.section)}>
      <header {...stylex.props(storyStyles.sectionHeader)}>
        <h2 {...stylex.props(storyStyles.sectionTitle)}>대화</h2>
        <p {...stylex.props(storyStyles.description)}>
          보낸 메시지와 받은 메시지는 정렬 방향으로 먼저 구분합니다.
        </p>
      </header>
      <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
        <Bubble>오늘 회의 자료를 확인해 줄 수 있을까요?</Bubble>
        <Bubble side="outgoing" variant="outline">
          네, 오후 3시 전까지 의견을 남길게요.
        </Bubble>
      </div>
    </section>
  );
}

const bubbleExampleCode =
  'import { Bubble } from "@dumo/ui/bubble"\n\n<Bubble>오늘 회의 자료를 확인해 줄 수 있을까요?</Bubble>';

export const BubbleStory: Story = {
  name: "Bubble",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Bubble</h1>
        <p {...stylex.props(storyStyles.description)}>
          대화에서 주고받은 메시지를 방향과 표면으로 구분합니다.
        </p>
      </header>
      <ComponentExample>
        <BubbleExample />
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
      <ComponentCode usage={bubbleExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
