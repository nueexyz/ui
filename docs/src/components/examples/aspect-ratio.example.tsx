import { colorVars, sizeVars } from "@cachette/tokens/tokens.stylex";
import { AspectRatio } from "@cachette/ui/aspect-ratio";
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

const componentDocument = getComponentDocument("Aspect Ratio");
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

export function AspectRatioExample() {
  return (
    <>
      <div {...stylex.props(storyStyles.preview)}>
        <AspectRatio ratio={16 / 9} xstyle={styles.preview}>
          16:9
        </AspectRatio>
      </div>
    </>
  );
}

export const aspectRatioExampleCode =
  'import { AspectRatio } from "@cachette/ui/aspect-ratio"\n\n<AspectRatio ratio={16 / 9}>미디어 미리보기</AspectRatio>';
