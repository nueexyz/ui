import * as stylex from "@stylexjs/stylex";
import { Badge } from "@cachette/ui/badge";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "../story-layout/StoryLayout";
import { getComponentDocument } from "../story-layout/component-docs";

const componentDocument = getComponentDocument("Badge");

export function BadgeExample() {
  return (
    <>
      <div {...stylex.props(storyStyles.preview)}>
        <Badge>진행 중</Badge>
        <Badge variant="secondary">초안</Badge>
        <Badge variant="destructive">오류</Badge>
        <Badge variant="outline">읽지 않음</Badge>
        <Badge variant="ghost">선택 사항</Badge>
      </div>
    </>
  );
}

export const badgeExampleCode =
  'import { Badge } from "@cachette/ui/badge"\n\n<Badge>진행 중</Badge>';
