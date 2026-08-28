import { Field, FieldLabel } from "@cachette/ui/field";
import { RadioGroup, RadioGroupItem } from "@cachette/ui/radio-group";
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

const componentDocument = getComponentDocument("Radio Group");

export function RadioGroupExample() {
  return (
    <>
      <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
        <Field>
          <FieldLabel>알림 빈도</FieldLabel>
          <RadioGroup defaultValue="daily">
            <label htmlFor="frequency-daily" {...stylex.props(storyStyles.option)}>
              <RadioGroupItem id="frequency-daily" value="daily" />
              매일
            </label>
            <label htmlFor="frequency-weekly" {...stylex.props(storyStyles.option)}>
              <RadioGroupItem id="frequency-weekly" value="weekly" />
              매주
            </label>
            <label htmlFor="frequency-never" {...stylex.props(storyStyles.option)}>
              <RadioGroupItem id="frequency-never" value="never" />
              받지 않기
            </label>
          </RadioGroup>
        </Field>
      </div>
    </>
  );
}

export const radioGroupExampleCode =
  'import { Field, FieldLabel } from "@cachette/ui/field"\nimport { RadioGroup, RadioGroupItem } from "@cachette/ui/radio-group"\n\n<Field>\n  <FieldLabel>알림 빈도</FieldLabel>\n  <RadioGroup defaultValue="daily">\n    <label><RadioGroupItem value="daily" />매일</label>\n    <label><RadioGroupItem value="weekly" />매주</label>\n    <label><RadioGroupItem value="never" />받지 않기</label>\n  </RadioGroup>\n</Field>';
