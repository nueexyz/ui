import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@cachette/ui/breadcrumb";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview, StorySection } from "./story-layout/StoryLayout";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const BreadcrumbStory: Story = {
  name: "Breadcrumb",
  render: () => (
    <StoryPage
      title="Breadcrumb"
      description="현재 위치와 상위 경로를 한눈에 파악하고 이동할 수 있게 합니다."
    >
      <StorySection
        title="기본"
        description="가장 가까운 상위 경로부터 현재 페이지까지 표시합니다."
      >
        <StoryPreview>
          <Breadcrumb aria-label="현재 위치">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">프로젝트</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">디자인 시스템</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>컴포넌트</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </StoryPreview>
      </StorySection>
      <StorySection
        title="경로 축약"
        description="경로가 길면 중간 단계를 줄여 현재 위치를 우선 보여줍니다."
      >
        <StoryPreview>
          <Breadcrumb aria-label="현재 위치">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">문서</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbEllipsis />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>접근성</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </StoryPreview>
      </StorySection>
    </StoryPage>
  ),
};
