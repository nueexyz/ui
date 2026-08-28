import { Field, FieldDescription, FieldError, FieldLabel } from "@cachette/ui/field";
import { Input } from "@cachette/ui/input";
import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview, StorySection, storyStyles } from "./story-layout/StoryLayout";

const meta = { title: "Components/Field", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Overview: Story = {
  render: () => (
    <StoryPage
      title="Field"
      description="레이블, 설명, 입력, 오류를 하나의 접근 가능한 필드로 연결합니다."
    >
      <StorySection
        title="검증"
        description="문제가 생기면 원인과 다음 행동을 입력 바로 아래에서 안내합니다."
      >
        <StoryPreview xstyle={storyStyles.column}>
          <div {...stylex.props(storyStyles.formWidth)}>
            <Field invalid>
              <FieldLabel>이메일</FieldLabel>
              <Input required type="email" defaultValue="min@" />
              <FieldDescription>업무에 사용하는 이메일을 입력하세요.</FieldDescription>
              <FieldError match>이메일 주소 전체를 입력하세요.</FieldError>
            </Field>
          </div>
        </StoryPreview>
      </StorySection>
    </StoryPage>
  ),
};
