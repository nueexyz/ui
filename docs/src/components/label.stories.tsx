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
import { Input } from "@nooeh/ui/input";
import { Label } from "@nooeh/ui/label";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Label");

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
  'import { Input } from "@nooeh/ui/input"\nimport { Label } from "@nooeh/ui/label"\n\n<div>\n  <Label htmlFor="display-name">Display name</Label>\n  <Input id="display-name" placeholder="Jordan Lee" />\n</div>';

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
      <ComponentCode usage={labelExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
