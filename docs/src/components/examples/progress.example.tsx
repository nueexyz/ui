import * as stylex from "@stylexjs/stylex";
import { Progress } from "@cachette/ui/progress";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "../story-layout/StoryLayout";
import { getComponentDocument } from "../story-layout/component-docs";

const componentDocument = getComponentDocument("Progress");

export function ProgressExample() {
  return (
    <>
      <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
        <Progress aria-label="파일 업로드 진행률" value={64} xstyle={storyStyles.formWidth} />
        <Progress aria-label="처리 중" value={null} xstyle={storyStyles.formWidth} />
      </div>
    </>
  );
}

export const progressExampleCode =
  'import { Progress } from "@cachette/ui/progress"\n\n<>\n  <Progress aria-label="파일 업로드 진행률" value={64} />\n  <Progress aria-label="처리 중" value={null} />\n</>';
