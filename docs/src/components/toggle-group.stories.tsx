import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ToggleGroup, ToggleGroupItem } from "@nooeh/ui/toggle-group";
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

const registryName = "toggle-group";

const toggleGroupExampleCode = `import { ToggleGroup, ToggleGroupItem } from "@nooeh/ui/toggle-group"

<ToggleGroup aria-label="Text alignment" defaultValue={["left"]} variant="outline">
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center">Center</ToggleGroupItem>
  <ToggleGroupItem value="right">Right</ToggleGroupItem>
</ToggleGroup>`;

export const ToggleGroupStory: Story = {
  name: "Toggle Group",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Toggle Group</h1>
        <p {...stylex.props(storyStyles.description)}>
          Navigate and select related view options with the arrow keys.
        </p>
      </header>
      <ComponentExample>
        <div {...stylex.props(storyStyles.preview)}>
          <ToggleGroup aria-label="Text alignment" defaultValue={["left"]} variant="outline">
            <ToggleGroupItem value="left">Left</ToggleGroupItem>
            <ToggleGroupItem value="center">Center</ToggleGroupItem>
            <ToggleGroupItem value="right">Right</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </ComponentExample>

      <ComponentCode usage={toggleGroupExampleCode} />
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
