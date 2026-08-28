import * as stylex from "@stylexjs/stylex";
import { Spinner } from "@cachette/ui/spinner";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "../story-layout/StoryLayout";
import { getComponentDocument } from "../story-layout/component-docs";

const componentDocument = getComponentDocument("Spinner");

export function SpinnerExample() {
  return (
    <>
      <div {...stylex.props(storyStyles.preview)}>
        <Spinner label="저장 중" />
      </div>
    </>
  );
}

export const spinnerExampleCode =
  'import { Spinner } from "@cachette/ui/spinner"\n\n<Spinner label="저장 중" />';
