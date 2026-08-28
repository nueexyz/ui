import { sizeVars, spacingVars } from "@cachette/tokens/tokens.stylex";
import { Skeleton } from "@cachette/ui/skeleton";
import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "../story-layout/StoryLayout";
import { getComponentDocument } from "../story-layout/component-docs";

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

export function SkeletonExample() {
  return (
    <>
      <div {...stylex.props(storyStyles.preview)}>
        <div {...stylex.props(styles.card)}>
          <Skeleton xstyle={styles.title} />
          <Skeleton xstyle={styles.body} />
        </div>
      </div>
    </>
  );
}

export const skeletonExampleCode =
  'import { Skeleton } from "@cachette/ui/skeleton"\n\n<div>\n  <Skeleton style={{ height: "1.5rem", width: "45%" }} />\n  <Skeleton style={{ height: "2.5rem", width: "100%" }} />\n</div>';
