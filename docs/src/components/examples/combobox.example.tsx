import * as stylex from "@stylexjs/stylex";
import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
} from "@cachette/ui/combobox";
import { Field, FieldDescription, FieldLabel } from "@cachette/ui/field";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "../story-layout/StoryLayout";
import { getComponentDocument } from "../story-layout/component-docs";

const frameworks = ["React", "Vue", "Svelte", "Solid", "Angular"];

const componentDocument = getComponentDocument("Combobox");

export function ComboboxExample() {
  return (
    <>
      <div {...stylex.props(storyStyles.preview)}>
        <Field>
          <FieldLabel>프레임워크</FieldLabel>
          <Combobox items={frameworks}>
            <ComboboxInput placeholder="프레임워크 검색" />
            <ComboboxContent>
              <ComboboxEmpty>일치하는 프레임워크가 없습니다.</ComboboxEmpty>
              <ComboboxCollection>
                {(framework: string) => (
                  <ComboboxItem key={framework} value={framework}>
                    {framework}
                  </ComboboxItem>
                )}
              </ComboboxCollection>
            </ComboboxContent>
          </Combobox>
          <FieldDescription>프로젝트에서 사용하는 프레임워크를 선택하세요.</FieldDescription>
        </Field>
      </div>
    </>
  );
}

export const comboboxExampleCode =
  'import { Combobox, ComboboxCollection, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem } from "@cachette/ui/combobox"\nimport { Field, FieldDescription, FieldLabel } from "@cachette/ui/field"\n\nconst frameworks = ["React", "Vue", "Svelte"]\n\n<Field>\n  <FieldLabel>프레임워크</FieldLabel>\n  <Combobox items={frameworks}>\n    <ComboboxInput placeholder="프레임워크 검색" />\n    <ComboboxContent>\n      <ComboboxEmpty>일치하는 프레임워크가 없습니다.</ComboboxEmpty>\n      <ComboboxCollection>\n        {(framework) => <ComboboxItem key={framework} value={framework}>{framework}</ComboboxItem>}\n      </ComboboxCollection>\n    </ComboboxContent>\n  </Combobox>\n  <FieldDescription>프로젝트에서 사용하는 프레임워크를 선택하세요.</FieldDescription>\n</Field>';
