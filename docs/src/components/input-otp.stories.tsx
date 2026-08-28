import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@cachette/ui/input-otp";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview, StorySection } from "./story-layout/StoryLayout";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const InputOTPStory: Story = {
  name: "Input OTP",
  render: () => (
    <StoryPage
      title="Input OTP"
      description="문자나 인증 앱으로 받은 일회용 코드를 한 자리씩 입력합니다."
    >
      <StorySection
        title="6자리 인증 코드"
        description="코드를 붙여 넣으면 각 칸에 자동으로 나뉘어 입력됩니다."
      >
        <StoryPreview>
          <InputOTP aria-label="6자리 인증 코드" length={6}>
            <InputOTPGroup>
              <InputOTPSlot />
              <InputOTPSlot />
              <InputOTPSlot />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot />
              <InputOTPSlot />
              <InputOTPSlot />
            </InputOTPGroup>
          </InputOTP>
        </StoryPreview>
      </StorySection>
    </StoryPage>
  ),
};
