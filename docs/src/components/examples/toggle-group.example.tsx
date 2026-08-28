import * as stylex from "@stylexjs/stylex";
import { ToggleGroup, ToggleGroupItem } from "@cachette/ui/toggle-group";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "../story-layout/StoryLayout";
import { getComponentDocument } from "../story-layout/component-docs";

const componentDocument = getComponentDocument("Toggle Group");

export function ToggleGroupExample() {
  return (
    <>
      <div {...stylex.props(storyStyles.preview)}>
        <ToggleGroup aria-label="텍스트 정렬" defaultValue={["left"]}>
          <ToggleGroupItem value="left">왼쪽</ToggleGroupItem>
          <ToggleGroupItem value="center">가운데</ToggleGroupItem>
          <ToggleGroupItem value="right">오른쪽</ToggleGroupItem>
        </ToggleGroup>
      </div>
    </>
  );
}

export const toggleGroupExampleCode =
  'import { ToggleGroup, ToggleGroupItem } from "@cachette/ui/toggle-group"\n\n<ToggleGroup aria-label="텍스트 정렬" defaultValue={["left"]}>\n  <ToggleGroupItem value="left">왼쪽</ToggleGroupItem>\n  <ToggleGroupItem value="center">가운데</ToggleGroupItem>\n  <ToggleGroupItem value="right">오른쪽</ToggleGroupItem>\n</ToggleGroup>';
