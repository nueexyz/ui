import { sizeVars, spacingVars } from "@cachette/tokens/tokens.stylex";
import { Separator } from "@cachette/ui/separator";
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

const componentDocument = getComponentDocument("Separator");
const styles = stylex.create({
  row: {
    alignItems: "center",
    display: "flex",
    gap: spacingVars.space4,
    height: sizeVars.touchTarget,
  },
});

export function SeparatorExample() {
  return (
    <>
      <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
        <span>계정 정보</span>
        <Separator />
        <div {...stylex.props(styles.row)}>
          <span>프로필</span>
          <Separator orientation="vertical" />
          <span>보안</span>
        </div>
      </div>
    </>
  );
}

export const separatorExampleCode =
  'import { Separator } from "@cachette/ui/separator"\n\n<>\n  <span>계정 정보</span>\n  <Separator />\n  <div>프로필 <Separator orientation="vertical" /> 보안</div>\n</>';
