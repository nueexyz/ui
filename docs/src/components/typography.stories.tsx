import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  storyStyles,
} from "./story-layout/StoryLayout";
import { spacingVars } from "@nooeh/tokens/tokens.stylex";
import { Typography } from "@nooeh/ui/typography";

const meta = {
  title: "Components",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const registryName = "typography";

const styles = stylex.create({
  stack: { display: "flex", flexDirection: "column", gap: spacingVars.space4 },
});

function TypographyExample() {
  return (
    <div {...stylex.props(storyStyles.preview, [storyStyles.column, styles.stack])}>
      <Typography variant="display">Primary product heading</Typography>
      <Typography variant="title">Page title</Typography>
      <Typography variant="heading">Content heading</Typography>
      <Typography>Body text keeps a readable size and line height.</Typography>
      <Typography variant="label">Field label</Typography>
      <Typography variant="caption">Updated just now</Typography>
      <Typography variant="code">pnpm storybook</Typography>
    </div>
  );
}

const typographyExampleCode =
  'import { Typography } from "@nooeh/ui/typography"\n\n<Typography variant="display">Primary product heading</Typography>';

export const TypographyStory: Story = {
  name: "Typography",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Typography</h1>
        <p {...stylex.props(storyStyles.description)}>
          Use text styles that match information hierarchy and purpose.
        </p>
      </header>
      <ComponentExample>
        <TypographyExample />
      </ComponentExample>

      <ComponentCode usage={typographyExampleCode} />
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
