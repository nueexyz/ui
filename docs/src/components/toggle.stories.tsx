import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toggle } from "@nooeh/ui/toggle";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "./story-layout/StoryLayout";
import { getComponentDocument } from "./story-layout/component-docs";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Toggle");

const toggleExampleCode = `import { Toggle } from "@nooeh/ui/toggle"

<div>
  <Toggle defaultPressed>Bold</Toggle>
  <Toggle variant="outline">Italic</Toggle>
</div>`;

export const ToggleStory: Story = {
  name: "Toggle",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Toggle</h1>
        <p {...stylex.props(storyStyles.description)}>
          Toggle view or editing modes that apply optionally.
        </p>
      </header>
      <ComponentExample>
        <div {...stylex.props(storyStyles.preview)}>
          <Toggle defaultPressed>Bold</Toggle>
          <Toggle variant="outline">Italic</Toggle>
        </div>
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
      <ComponentCode usage={toggleExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
