import { spacingVars } from "@cachette/tokens/tokens.stylex";
import { Typography } from "@cachette/ui/typography";
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

const componentDocument = getComponentDocument("Typography");
const styles = stylex.create({
  stack: { display: "flex", flexDirection: "column", gap: spacingVars.space4 },
});

export function TypographyExample() {
  return (
    <>
      <div {...stylex.props(storyStyles.preview, [storyStyles.column, styles.stack])}>
        <Typography variant="display">제품의 핵심 제목</Typography>
        <Typography variant="title">화면 제목</Typography>
        <Typography variant="heading">콘텐츠 제목</Typography>
        <Typography>본문은 읽기 편한 크기와 줄 높이를 유지합니다.</Typography>
        <Typography variant="label">필드 레이블</Typography>
        <Typography variant="caption">업데이트: 방금 전</Typography>
        <Typography variant="code">pnpm storybook</Typography>
      </div>
    </>
  );
}

export const typographyExampleCode =
  'import { Typography } from "@cachette/ui/typography"\n\n<Typography variant="display">제품의 핵심 제목</Typography>';
