import * as stylex from "@stylexjs/stylex";
import { Button } from "@cachette/ui/button";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "../story-layout/StoryLayout";
import { getComponentDocument } from "../story-layout/component-docs";

const componentDocument = getComponentDocument("Button");

export function ButtonExample() {
  return (
    <>
      <div {...stylex.props(storyStyles.preview)}>
        <Button>저장하기</Button>
      </div>
    </>
  );
}

export const buttonExampleCode =
  'import { Button } from "@cachette/ui/button"\n\n<Button>저장하기</Button>';
