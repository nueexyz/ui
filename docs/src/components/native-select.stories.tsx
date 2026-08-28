import { Field, FieldLabel } from "@cachette/ui/field";
import { NativeSelect, NativeSelectOption } from "@cachette/ui/native-select";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview } from "./story-layout/StoryLayout";
const meta = {
  title: "Components",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const NativeSelectStory: Story = {
  name: "Native Select",
  render: () => (
    <StoryPage
      title="Native Select"
      description="운영체제의 익숙한 선택 화면을 그대로 사용할 때 적합합니다."
    >
      <StoryPreview>
        <Field>
          <FieldLabel>언어</FieldLabel>
          <NativeSelect defaultValue="ko">
            <NativeSelectOption value="ko">한국어</NativeSelectOption>
            <NativeSelectOption value="en">English</NativeSelectOption>
            <NativeSelectOption value="ja">日本語</NativeSelectOption>
          </NativeSelect>
        </Field>
      </StoryPreview>
    </StoryPage>
  ),
};
