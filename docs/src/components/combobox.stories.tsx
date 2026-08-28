import * as stylex from "@stylexjs/stylex";
import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
} from "@cachette/ui/combobox";
import { Field, FieldDescription, FieldLabel } from "@cachette/ui/field";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "./story-layout/StoryLayout";
import { getComponentDocument } from "./story-layout/component-docs";
import { ComboboxExample, comboboxExampleCode } from "./examples/combobox.example";

const frameworks = ["React", "Vue", "Svelte", "Solid", "Angular"];
const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Combobox");

export const ComboboxStory: Story = {
  name: "Combobox",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Combobox</h1>
        <p {...stylex.props(storyStyles.description)}>
          선택지가 많을 때 검색으로 범위를 좁혀 항목을 고릅니다.
        </p>
      </header>
      <ComponentExample>
        <ComboboxExample />
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
      <ComponentCode usage={comboboxExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
