import { Switch } from "@cachette/ui/switch";
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

const componentDocument = getComponentDocument("Switch");

export function SwitchExample() {
  return (
    <>
      <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
        <label htmlFor="activity-visibility" {...stylex.props(storyStyles.option)}>
          <Switch defaultChecked id="activity-visibility" />
          활동 상태 공개
        </label>
        <label htmlFor="admin-only" {...stylex.props(storyStyles.option)}>
          <Switch disabled id="admin-only" />
          관리자 전용 설정
        </label>
      </div>
    </>
  );
}

export const switchExampleCode =
  'import { Switch } from "@cachette/ui/switch"\n\n<>\n  <Switch defaultChecked id="activity-visibility" />\n  <Switch disabled id="admin-only" />\n</>';
