import * as stylex from "@stylexjs/stylex";
import { Field, FieldLabel } from "@cachette/ui/field";
import { NativeSelect, NativeSelectOption } from "@cachette/ui/native-select";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "../story-layout/StoryLayout";
import { getComponentDocument } from "../story-layout/component-docs";

const componentDocument = getComponentDocument("Native Select");

export function NativeSelectExample() {
  return (
    <>
      <div {...stylex.props(storyStyles.preview)}>
        <Field>
          <FieldLabel>언어</FieldLabel>
          <NativeSelect defaultValue="ko">
            <NativeSelectOption value="ko">한국어</NativeSelectOption>
            <NativeSelectOption value="en">English</NativeSelectOption>
            <NativeSelectOption value="ja">日本語</NativeSelectOption>
          </NativeSelect>
        </Field>
      </div>
    </>
  );
}

export const nativeSelectExampleCode =
  'import { Field, FieldLabel } from "@cachette/ui/field"\nimport { NativeSelect, NativeSelectOption } from "@cachette/ui/native-select"\n\n<Field>\n  <FieldLabel>언어</FieldLabel>\n  <NativeSelect defaultValue="ko">\n    <NativeSelectOption value="ko">한국어</NativeSelectOption>\n    <NativeSelectOption value="en">English</NativeSelectOption>\n    <NativeSelectOption value="ja">日本語</NativeSelectOption>\n  </NativeSelect>\n</Field>';
