import { Field, FieldLabel } from "@cachette/ui/field";
import { RadioGroup, RadioGroupItem } from "@cachette/ui/radio-group";
import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview, storyStyles } from "./story-layout/StoryLayout";
const meta = {
  title: "Components/Radio Group",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Overview: Story = {
  render: () => (
    <StoryPage title="Radio Group" description="여러 선택지 중 하나만 결정할 때 사용합니다.">
      <StoryPreview xstyle={storyStyles.column}>
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
      </StoryPreview>
    </StoryPage>
  ),
};
