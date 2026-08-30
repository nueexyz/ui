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
import { Field, FieldLabel } from "@nooeh/ui/field";
import { NativeSelect, NativeSelectOption } from "@nooeh/ui/native-select";

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
        <FieldLabel>Language</FieldLabel>
        <NativeSelect defaultValue="ko">
          <NativeSelectOption value="ko">Korean</NativeSelectOption>
          <NativeSelectOption value="en">English</NativeSelectOption>
          <NativeSelectOption value="ja">日本語</NativeSelectOption>
        </NativeSelect>
      </Field>
    </div>
  );
}

const nativeSelectExampleCode =
  'import { Field, FieldLabel } from "@nooeh/ui/field"\nimport { NativeSelect, NativeSelectOption } from "@nooeh/ui/native-select"\n\n<Field>\n  <FieldLabel>Language</FieldLabel>\n  <NativeSelect defaultValue="ko">\n    <NativeSelectOption value="ko">Korean</NativeSelectOption>\n    <NativeSelectOption value="en">English</NativeSelectOption>\n    <NativeSelectOption value="ja">Japanese</NativeSelectOption>\n  </NativeSelect>\n</Field>';

export const NativeSelectStory: Story = {
  name: "Native Select",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Native Select</h1>
        <p {...stylex.props(storyStyles.description)}>
          Use it when the operating system’s familiar selection interface is appropriate.
        </p>
      </header>
      <ComponentExample>
        <NativeSelectExample />
      </ComponentExample>

      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Install</h2>
        </header>
        <CodeBlock
          code={`pnpm dlx @nooeh/ui add ${componentDocument.registryName}`}
          label="Terminal"
          language="bash"
        />
      </section>
      <ComponentCode usage={nativeSelectExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
