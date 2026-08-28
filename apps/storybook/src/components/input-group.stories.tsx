import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@cachette/ui/input-group";
import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview, StorySection, storyStyles } from "./story-layout/StoryLayout";

const meta = {
  title: "Components/Input Group",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Overview: Story = {
  render: () => (
    <StoryPage
      title="Input Group"
      description="입력값의 맥락과 보조 행동을 하나의 컨트롤 표면에 배치합니다."
    >
      <StorySection title="주소 입력" description="고정된 접두어는 입력값과 구분해 보여줍니다.">
        <StoryPreview xstyle={storyStyles.column}>
          <div {...stylex.props(storyStyles.formWidth)}>
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <InputGroupText>https://</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput aria-label="웹 주소" placeholder="example.com" />
              <InputGroupAddon align="inline-end">
                <InputGroupButton>복사</InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </StoryPreview>
      </StorySection>
    </StoryPage>
  ),
};
