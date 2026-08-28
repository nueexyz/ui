import * as stylex from "@stylexjs/stylex";
import { Field, FieldLabel } from "@cachette/ui/field";
import { NativeSelect, NativeSelectOption } from "@cachette/ui/native-select";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "./story-layout/StoryLayout";
import { getComponentDocument } from "./story-layout/component-docs";
import { NativeSelectExample, nativeSelectExampleCode } from "./examples/native-select.example";

const meta = {
  title: "Components",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Native Select");
export const NativeSelectStory: Story = {
  name: "Native Select",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Native Select</h1>
        <p {...stylex.props(storyStyles.description)}>
          운영체제의 익숙한 선택 화면을 그대로 사용할 때 적합합니다.
        </p>
      </header>
      <ComponentExample>
        <NativeSelectExample />
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
      <ComponentCode usage={nativeSelectExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
