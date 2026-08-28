import { Input } from "@cachette/ui/input";
import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview, StorySection, storyStyles } from "./story-layout/StoryLayout";

const meta = { title: "Components/Input", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <StoryPage title="Input" description="값의 유무, 입력 유형, 상태에 따른 표현을 비교합니다.">
      <StorySection title="기본" description="입력 전과 입력 후의 기본 표현을 비교합니다.">
        <StoryPreview xstyle={storyStyles.column}>
          <div {...stylex.props(storyStyles.stack, storyStyles.formWidth)}>
            <Input aria-label="이름" placeholder="홍길동" />
            <Input aria-label="이메일" defaultValue="hello@cachette.dev" />
          </div>
        </StoryPreview>
      </StorySection>
      <StorySection
        title="입력 유형"
        description="입력 유형이 달라도 같은 크기와 상태 규칙을 유지합니다."
      >
        <StoryPreview xstyle={storyStyles.column}>
          <div {...stylex.props(storyStyles.stack, storyStyles.formWidth)}>
            <label htmlFor="input-email" {...stylex.props(storyStyles.field)}>
              이메일
              <Input id="input-email" type="email" placeholder="hello@example.com" />
            </label>
            <label htmlFor="input-password" {...stylex.props(storyStyles.field)}>
              비밀번호
              <Input id="input-password" type="password" defaultValue="password" />
            </label>
          </div>
        </StoryPreview>
      </StorySection>
      <StorySection
        title="상태"
        description="오류와 비활성 상태를 기본 입력과 명확하게 구분합니다."
      >
        <StoryPreview xstyle={storyStyles.column}>
          <div {...stylex.props(storyStyles.stack, storyStyles.formWidth)}>
            <Input aria-label="잘못 입력된 이메일" aria-invalid defaultValue="min@" />
            <Input aria-label="수정할 수 없는 이름" disabled defaultValue="홍길동" />
          </div>
        </StoryPreview>
      </StorySection>
    </StoryPage>
  ),
};
