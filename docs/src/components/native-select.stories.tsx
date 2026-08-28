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
import { Field, FieldLabel } from "@cachette/ui/field";
import { NativeSelect, NativeSelectOption } from "@cachette/ui/native-select";

const meta = {
  title: "Components",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Native Select");

function NativeSelectExample() {
  return (
    <div {...stylex.props(storyStyles.preview)}>
      <Field>
        <FieldLabel>언어</FieldLabel>
        <NativeSelect defaultValue="ko">
          <NativeSelectOption value="ko">한국어</NativeSelectOption>
          <NativeSelectOption value="en">English</NativeSelectOption>
          <NativeSelectOption value="ja">日本語</NativeSelectOption>
        </NativeSelect>
      </Field>
    </div>
  );
}

const nativeSelectExampleCode =
  'import { Field, FieldLabel } from "@cachette/ui/field"\nimport { NativeSelect, NativeSelectOption } from "@cachette/ui/native-select"\n\n<Field>\n  <FieldLabel>언어</FieldLabel>\n  <NativeSelect defaultValue="ko">\n    <NativeSelectOption value="ko">한국어</NativeSelectOption>\n    <NativeSelectOption value="en">English</NativeSelectOption>\n    <NativeSelectOption value="ja">日本語</NativeSelectOption>\n  </NativeSelect>\n</Field>';

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
