import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  storyStyles,
} from "./story-layout/StoryLayout";
import { sizeVars, spacingVars } from "@nooeh/tokens/tokens.stylex";
import { Separator } from "@nooeh/ui/separator";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const registryName = "separator";

const styles = stylex.create({
  row: {
    alignItems: "center",
    display: "flex",
    gap: spacingVars.space4,
    height: sizeVars.touchTarget,
  },
});

function SeparatorExample() {
  return (
    <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
      <span>Account information</span>
      <Separator />
      <div {...stylex.props(styles.row)}>
        <span>Profile</span>
        <Separator orientation="vertical" />
        <span>Security</span>
      </div>
    </div>
  );
}

const separatorExampleCode =
  'import { Separator } from "@nooeh/ui/separator"\n\n<>\n  <span>Account information</span>\n  <Separator />\n  <div>Profile <Separator orientation="vertical" /> Security</div>\n</>';

export const SeparatorStory: Story = {
  name: "Separator",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Separator</h1>
        <p {...stylex.props(storyStyles.description)}>
          Mark the boundary between distinct information groups.
        </p>
      </header>
      <ComponentExample>
        <SeparatorExample />
      </ComponentExample>

      <ComponentCode usage={separatorExampleCode} />
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
