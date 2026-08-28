import * as stylex from "@stylexjs/stylex";
import { Kbd, KbdGroup } from "@cachette/ui/kbd";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "../story-layout/StoryLayout";
import { getComponentDocument } from "../story-layout/component-docs";

const componentDocument = getComponentDocument("Kbd");

export function KbdExample() {
  return (
    <>
      <div {...stylex.props(storyStyles.preview)}>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
        <KbdGroup>
          <Kbd>⇧</Kbd>
          <Kbd>Enter</Kbd>
        </KbdGroup>
      </div>
    </>
  );
}

export const kbdExampleCode =
  'import { Kbd, KbdGroup } from "@cachette/ui/kbd"\n\n<KbdGroup>\n  <Kbd>⌘</Kbd>\n  <Kbd>K</Kbd>\n</KbdGroup>';
