import * as stylex from "@stylexjs/stylex";
import { Field, FieldDescription, FieldLabel } from "@cachette/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@cachette/ui/select";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "../story-layout/StoryLayout";
import { getComponentDocument } from "../story-layout/component-docs";

const componentDocument = getComponentDocument("Select");

export function SelectExample() {
  return (
    <>
      <div {...stylex.props(storyStyles.preview)}>
        <Field>
          <FieldLabel>테마</FieldLabel>
          <Select
            defaultValue="system"
            items={{ dark: "다크", light: "라이트", system: "시스템 설정" }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>화면 모드</SelectLabel>
                <SelectItem value="light">라이트</SelectItem>
                <SelectItem value="dark">다크</SelectItem>
                <SelectItem value="system">시스템 설정</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectItem disabled value="contrast">
                고대비
              </SelectItem>
            </SelectContent>
          </Select>
          <FieldDescription>선택한 테마는 이 기기에 저장됩니다.</FieldDescription>
        </Field>
      </div>
    </>
  );
}

export const selectExampleCode =
  'import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@cachette/ui/select"\n\n<Select defaultValue="design">\n  <SelectTrigger aria-label="팀 선택">\n    <SelectValue />\n  </SelectTrigger>\n  <SelectContent>\n    <SelectItem value="design">디자인</SelectItem>\n    <SelectItem value="development">개발</SelectItem>\n  </SelectContent>\n</Select>';
