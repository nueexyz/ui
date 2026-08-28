import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@cachette/ui/accordion";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview, StorySection, storyStyles } from "./story-layout/StoryLayout";

const meta = { title: "Components/Accordion", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <StoryPage
      title="Accordion"
      description="관련 정보를 제목 단위로 접고 펼쳐 필요한 내용에 집중하게 합니다."
    >
      <StorySection title="하나씩 열기" description="한 번에 하나의 답변만 확인합니다.">
        <StoryPreview xstyle={storyStyles.componentWidth}>
          <Accordion defaultValue={["shipping"]}>
            <AccordionItem value="shipping">
              <AccordionTrigger>배송은 얼마나 걸리나요?</AccordionTrigger>
              <AccordionContent>기본 배송은 영업일 기준 2~3일이 걸립니다.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="return">
              <AccordionTrigger>반품은 어떻게 신청하나요?</AccordionTrigger>
              <AccordionContent>
                주문 내역에서 반품할 상품과 사유를 선택해 신청할 수 있습니다.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem disabled value="member">
              <AccordionTrigger>멤버 전용 혜택</AccordionTrigger>
              <AccordionContent>멤버십 가입 후 확인할 수 있습니다.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </StoryPreview>
      </StorySection>
      <StorySection
        title="여러 개 열기"
        description="서로 비교해야 하는 정보는 동시에 펼칠 수 있습니다."
      >
        <StoryPreview xstyle={storyStyles.componentWidth}>
          <Accordion defaultValue={["email", "push"]} multiple>
            <AccordionItem value="email">
              <AccordionTrigger>이메일 알림</AccordionTrigger>
              <AccordionContent>주요 활동과 주간 요약을 이메일로 받습니다.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="push">
              <AccordionTrigger>푸시 알림</AccordionTrigger>
              <AccordionContent>마감과 댓글 알림을 바로 받습니다.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </StoryPreview>
      </StorySection>
    </StoryPage>
  ),
};
