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
import { Textarea } from "@cachette/ui/textarea";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Textarea");

function TextareaExample() {
  return (
    <section {...stylex.props(storyStyles.section)}>
      <header {...stylex.props(storyStyles.sectionHeader)}>
        <h2 {...stylex.props(storyStyles.sectionTitle)}>기본</h2>
        <p {...stylex.props(storyStyles.description)}>
          플레이스홀더는 입력 형식을 보여주는 짧은 예시로 사용합니다.
        </p>
      </header>
      <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
        <div {...stylex.props(storyStyles.stack, storyStyles.formWidth)}>
          <Textarea aria-label="메모" placeholder="회의에서 결정한 내용을 적어 주세요." />
          <Textarea
            aria-label="수정할 수 없는 메모"
            disabled
            defaultValue="검토가 끝난 메모입니다."
          />
        </div>
      </div>
    </section>
  );
}

const textareaExampleCode =
  'import { Textarea } from "@cachette/ui/textarea"\n\n<>\n  <Textarea aria-label="메모" placeholder="회의에서 결정한 내용을 적어 주세요." />\n  <Textarea aria-label="수정할 수 없는 메모" disabled defaultValue="검토가 끝난 메모입니다." />\n</>';

export const TextareaStory: Story = {
  name: "Textarea",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Textarea</h1>
        <p {...stylex.props(storyStyles.description)}>
          여러 줄로 작성하는 내용과 입력 상태를 비교합니다.
        </p>
      </header>
      <ComponentExample>
        <TextareaExample />
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
      <ComponentCode usage={textareaExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
