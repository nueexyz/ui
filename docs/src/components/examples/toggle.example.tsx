import * as stylex from "@stylexjs/stylex";
import { Toggle } from "@cachette/ui/toggle";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "../story-layout/StoryLayout";
import { getComponentDocument } from "../story-layout/component-docs";

const componentDocument = getComponentDocument("Toggle");

export function ToggleExample() {
  return (
    <>
      <div {...stylex.props(storyStyles.preview)}>
        <Toggle defaultPressed>굵게</Toggle>
        <Toggle variant="outline">기울임</Toggle>
      </div>
    </>
  );
}

export const toggleExampleCode =
  'import { Toggle } from "@cachette/ui/toggle"\n\n<div>\n  <Toggle defaultPressed>굵게</Toggle>\n  <Toggle variant="outline">기울임</Toggle>\n</div>';
