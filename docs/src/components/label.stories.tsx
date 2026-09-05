import { Input } from "@nuee/ui/input";
import { Label } from "@nuee/ui/label";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as stylex from "@stylexjs/stylex";

import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  storyStyles,
} from "./story-layout/StoryLayout";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const registryName = "label";

function LabelExample() {
  return (
    <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
      <div {...stylex.props(storyStyles.field, storyStyles.formWidth)}>
        <Label htmlFor="display-name">Display name</Label>
        <Input id="display-name" placeholder="Jordan Lee" />
      </div>
    </div>
  );
}

const labelExampleCode =
  'import { Input } from "@nuee/ui/input"\nimport { Label } from "@nuee/ui/label"\n\n<div>\n  <Label htmlFor="display-name">Display name</Label>\n  <Input id="display-name" placeholder="Jordan Lee" />\n</div>';

export const LabelStory: Story = {
  name: "Label",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Label</h1>
        <p {...stylex.props(storyStyles.description)}>
          Clearly describe the relationship between information and its control.
        </p>
      </header>
      <ComponentExample>
        <LabelExample />
      </ComponentExample>

      <ComponentCode usage={labelExampleCode} />
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
