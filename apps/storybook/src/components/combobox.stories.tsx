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
import { StoryPage, StoryPreview } from "./story-layout/StoryLayout";

const frameworks = ["React", "Vue", "Svelte", "Solid", "Angular"];
const meta = { title: "Components/Combobox", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <StoryPage
      title="Combobox"
      description="선택지가 많을 때 검색으로 범위를 좁혀 항목을 고릅니다."
    >
      <StoryPreview>
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
      </StoryPreview>
    </StoryPage>
  ),
};
