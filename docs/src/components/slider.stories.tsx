import { Field, FieldDescription, FieldLabel } from "@cachette/ui/field";
import { Slider } from "@cachette/ui/slider";
import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview, storyStyles } from "./story-layout/StoryLayout";
const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const SliderStory: Story = {
  name: "Slider",
  render: () => (
    <StoryPage title="Slider" description="정해진 범위에서 값을 빠르게 조절합니다.">
      <StoryPreview xstyle={storyStyles.column}>
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
      </StoryPreview>
    </StoryPage>
  ),
};
