import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  storyStyles,
} from "./story-layout/StoryLayout";
import { Kbd, KbdGroup } from "@nooeh/ui/kbd";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const registryName = "kbd";

function KbdExample() {
  return (
    <div {...stylex.props(storyStyles.preview)}>
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>⇧</Kbd>
        <Kbd>Enter</Kbd>
      </KbdGroup>
    </div>
  );
}

const kbdExampleCode =
  'import { Kbd, KbdGroup } from "@nooeh/ui/kbd"\n\n<KbdGroup>\n  <Kbd>⌘</Kbd>\n  <Kbd>K</Kbd>\n</KbdGroup>';

export const KbdStory: Story = {
  name: "Kbd",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Kbd</h1>
        <p {...stylex.props(storyStyles.description)}>
          Display keyboard shortcuts and key combinations.
        </p>
      </header>
      <ComponentExample>
        <KbdExample />
      </ComponentExample>

      <ComponentCode usage={kbdExampleCode} />
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
