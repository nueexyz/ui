import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  storyStyles,
} from "./story-layout/StoryLayout";
import { sizeVars, spacingVars } from "@nooeh/tokens/tokens.stylex";
import { Skeleton } from "@nooeh/ui/skeleton";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const registryName = "skeleton";

const styles = stylex.create({
  card: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space3,
    maxWidth: sizeVars.contentSm,
    width: "100%",
  },
  title: { height: sizeVars.iconMd, width: "45%" },
  body: { height: sizeVars.controlMd, width: "100%" },
});

function SkeletonExample() {
  return (
    <div {...stylex.props(storyStyles.preview)}>
      <div {...stylex.props(styles.card)}>
        <Skeleton xstyle={styles.title} />
        <Skeleton xstyle={styles.body} />
      </div>
    </div>
  );
}

const skeletonExampleCode =
  'import { Skeleton } from "@nooeh/ui/skeleton"\n\n<div>\n  <Skeleton style={{ height: "1.5rem", width: "45%" }} />\n  <Skeleton style={{ height: "2.5rem", width: "100%" }} />\n</div>';

export const SkeletonStory: Story = {
  name: "Skeleton",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Skeleton</h1>
        <p {...stylex.props(storyStyles.description)}>
          Show a loading state while preserving the content structure.
        </p>
      </header>
      <ComponentExample>
        <SkeletonExample />
      </ComponentExample>

      <ComponentCode usage={skeletonExampleCode} />
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
