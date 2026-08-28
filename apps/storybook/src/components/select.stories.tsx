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
import { StoryPage, StoryPreview } from "./story-layout/StoryLayout";

const meta = { title: "Components/Select", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <StoryPage title="Select" description="정해진 선택지 중 하나를 고릅니다.">
      <StoryPreview>
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
      </StoryPreview>
    </StoryPage>
  ),
};
