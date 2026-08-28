import { Input } from "@cachette/ui/input";
import { Label } from "@cachette/ui/label";
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

const componentDocument = getComponentDocument("Label");

export function LabelExample() {
  return (
    <>
      <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
        <div {...stylex.props(storyStyles.field, storyStyles.formWidth)}>
          <Label htmlFor="display-name">표시 이름</Label>
          <Input id="display-name" placeholder="홍길동" />
        </div>
      </div>
    </>
  );
}

export const labelExampleCode =
  'import { Input } from "@cachette/ui/input"\nimport { Label } from "@cachette/ui/label"\n\n<div>\n  <Label htmlFor="display-name">표시 이름</Label>\n  <Input id="display-name" placeholder="홍길동" />\n</div>';
