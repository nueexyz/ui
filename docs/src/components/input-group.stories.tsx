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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@cachette/ui/input-group";

const meta = {
  title: "Components",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Input Group");

function InputGroupExample() {
  return (
    <section {...stylex.props(storyStyles.section)}>
      <header {...stylex.props(storyStyles.sectionHeader)}>
        <h2 {...stylex.props(storyStyles.sectionTitle)}>주소 입력</h2>
        <p {...stylex.props(storyStyles.description)}>
          고정된 접두어는 입력값과 구분해 보여줍니다.
        </p>
      </header>
      <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
        <div {...stylex.props(storyStyles.formWidth)}>
          <InputGroup>
            <InputGroupAddon align="inline-start">
              <InputGroupText>https://</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput aria-label="웹 주소" placeholder="example.com" />
            <InputGroupAddon align="inline-end">
              <InputGroupButton>복사</InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
    </section>
  );
}

const inputGroupExampleCode =
  'import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from "@cachette/ui/input-group"\n\n<InputGroup>\n  <InputGroupAddon align="inline-start"><InputGroupText>https://</InputGroupText></InputGroupAddon>\n  <InputGroupInput aria-label="웹 주소" placeholder="example.com" />\n  <InputGroupAddon align="inline-end"><InputGroupButton>복사</InputGroupButton></InputGroupAddon>\n</InputGroup>';

export const InputGroupStory: Story = {
  name: "Input Group",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Input Group</h1>
        <p {...stylex.props(storyStyles.description)}>
          입력값의 맥락과 보조 행동을 하나의 컨트롤 표면에 배치합니다.
        </p>
      </header>
      <ComponentExample>
        <InputGroupExample />
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
      <ComponentCode usage={inputGroupExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
