import { Field, FieldLabel } from "@nuee/ui/field";
import { NativeSelect, NativeSelectOption } from "@nuee/ui/native-select";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as stylex from "@stylexjs/stylex";

import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  storyStyles,
} from "./story-layout/StoryLayout";

const meta = {
  title: "Components",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const registryName = "native-select";

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
  'import { Field, FieldLabel } from "@nuee/ui/field"\nimport { NativeSelect, NativeSelectOption } from "@nuee/ui/native-select"\n\n<Field>\n  <FieldLabel>Language</FieldLabel>\n  <NativeSelect defaultValue="ko">\n    <NativeSelectOption value="ko">Korean</NativeSelectOption>\n    <NativeSelectOption value="en">English</NativeSelectOption>\n    <NativeSelectOption value="ja">Japanese</NativeSelectOption>\n  </NativeSelect>\n</Field>';

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

      <ComponentCode usage={nativeSelectExampleCode} />
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Sizes</h2>
          <p {...stylex.props(storyStyles.description)}>
            Match the control height to the density of the surrounding form.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
          <NativeSelect size="sm" defaultValue="ko">
            <NativeSelectOption value="ko">Small select</NativeSelectOption>
          </NativeSelect>
          <NativeSelect defaultValue="ko">
            <NativeSelectOption value="ko">Default select</NativeSelectOption>
          </NativeSelect>
        </div>
      </section>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>States</h2>
          <p {...stylex.props(storyStyles.description)}>
            Keep unavailable choices visibly distinct from interactive controls.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
          <NativeSelect defaultValue="ko">
            <NativeSelectOption value="ko">Available select</NativeSelectOption>
          </NativeSelect>
          <NativeSelect defaultValue="ko" disabled>
            <NativeSelectOption value="ko">Unavailable select</NativeSelectOption>
          </NativeSelect>
        </div>
      </section>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Install</h2>
        </header>
        <CodeBlock
          code={`pnpm dlx @nuee/ui add ${registryName}`}
          label="Terminal"
          language="bash"
        />
      </section>
    </main>
  ),
};
