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
import { sizeVars, spacingVars } from "@dumo/tokens/tokens.stylex";
import { Skeleton } from "@dumo/ui/skeleton";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Skeleton");

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
  'import { Skeleton } from "@dumo/ui/skeleton"\n\n<div>\n  <Skeleton style={{ height: "1.5rem", width: "45%" }} />\n  <Skeleton style={{ height: "2.5rem", width: "100%" }} />\n</div>';

export const SkeletonStory: Story = {
  name: "Skeleton",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Skeleton</h1>
        <p {...stylex.props(storyStyles.description)}>
          콘텐츠 구조를 유지하며 불러오는 상태를 보여줍니다.
        </p>
      </header>
      <ComponentExample>
        <SkeletonExample />
      </ComponentExample>

      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>설치</h2>
        </header>
        <CodeBlock
          code={`pnpm dlx @dumo/ui add ${componentDocument.registryName}`}
          label="터미널"
          language="bash"
        />
      </section>
      <ComponentCode usage={skeletonExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
