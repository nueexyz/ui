import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  storyStyles,
} from "./story-layout/StoryLayout";
import { colorVars, sizeVars } from "@nooeh/tokens/tokens.stylex";
import { AspectRatio } from "@nooeh/ui/aspect-ratio";

const meta = {
  title: "Components",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const registryName = "aspect-ratio";

const styles = stylex.create({
  preview: {
    alignItems: "center",
    backgroundColor: colorVars.bgSubtle,
    color: colorVars.fgSecondary,
    display: "flex",
    justifyContent: "center",
    maxWidth: sizeVars.contentSm,
  },
});

function AspectRatioExample() {
  return (
    <div {...stylex.props(storyStyles.preview)}>
      <AspectRatio ratio={16 / 9} xstyle={styles.preview}>
        16:9
      </AspectRatio>
    </div>
  );
}

const aspectRatioExampleCode =
  'import { AspectRatio } from "@nooeh/ui/aspect-ratio"\n\n<AspectRatio ratio={16 / 9}>Media preview</AspectRatio>';

export const AspectRatioStory: Story = {
  name: "Aspect Ratio",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Aspect Ratio</h1>
        <p {...stylex.props(storyStyles.description)}>
          Keep media at a fixed ratio across screen sizes.
        </p>
      </header>
      <ComponentExample>
        <AspectRatioExample />
      </ComponentExample>

      <ComponentCode usage={aspectRatioExampleCode} />
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
