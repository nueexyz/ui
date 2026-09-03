import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toggle } from "@nooeh/ui/toggle";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  storyStyles,
} from "./story-layout/StoryLayout";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const registryName = "toggle";

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

      <ComponentCode usage={toggleExampleCode} />
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Variants</h2>
          <p {...stylex.props(storyStyles.description)}>
            Use an outline when the toggle should have less emphasis than the default treatment.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview)}>
          <Toggle>Default</Toggle>
          <Toggle variant="outline">Outline</Toggle>
        </div>
      </section>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Sizes</h2>
          <p {...stylex.props(storyStyles.description)}>
            Choose a size that matches the density of the editing controls around it.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview)}>
          <Toggle size="sm">Small</Toggle>
          <Toggle size="md">Default</Toggle>
          <Toggle size="lg">Large</Toggle>
        </div>
      </section>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>States</h2>
          <p {...stylex.props(storyStyles.description)}>
            Show selected and unavailable modes clearly before a person takes action.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview)}>
          <Toggle>Off</Toggle>
          <Toggle defaultPressed>On</Toggle>
          <Toggle disabled>Unavailable</Toggle>
        </div>
      </section>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Install</h2>
        </header>
        <CodeBlock
          code={`pnpm dlx @nooeh/ui add ${registryName}`}
          label="Terminal"
          language="bash"
        />
      </section>
    </main>
  ),
};
