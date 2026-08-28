import { Field, FieldDescription, FieldLabel } from "@cachette/ui/field";
import { Slider } from "@cachette/ui/slider";
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

const componentDocument = getComponentDocument("Slider");

export function SliderExample() {
  return (
    <>
      <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
        <div {...stylex.props(storyStyles.stack, storyStyles.formWidth)}>
          <Field>
            <FieldLabel>알림 음량</FieldLabel>
            <Slider defaultValue={40} />
            <FieldDescription>키보드 방향키로 세밀하게 조절할 수 있습니다.</FieldDescription>
          </Field>
          <Field>
            <FieldLabel>가격 범위</FieldLabel>
            <Slider
              defaultValue={[20, 80]}
              getAriaLabel={(index) => (index === 0 ? "최저 가격" : "최고 가격")}
            />
          </Field>
        </div>
      </div>
    </>
  );
}

export const sliderExampleCode =
  'import { Slider } from "@cachette/ui/slider"\n\n<Slider aria-label="볼륨" defaultValue={40} />';
