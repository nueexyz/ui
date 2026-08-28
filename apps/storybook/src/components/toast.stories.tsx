import { Button } from "@cachette/ui/button";
import { toast, Toaster } from "@cachette/ui/toast";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview, StorySection } from "./story-layout/StoryLayout";

const meta = {
  title: "Components",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const ToastStory: Story = {
  name: "Toast",
  render: () => (
    <StoryPage title="Toast" description="작업 결과나 상태 변화를 화면 흐름을 막지 않고 알립니다.">
      <Toaster />
      <StorySection title="기본" description="완료된 작업과 이어서 확인할 정보를 함께 알립니다.">
        <StoryPreview>
          <Button
            variant="secondary"
            onClick={() =>
              toast.add({
                title: "일정을 만들었어요.",
                description: "12월 3일 일요일 오전 9시",
              })
            }
          >
            기본 Toast 보기
          </Button>
        </StoryPreview>
      </StorySection>
      <StorySection title="상태" description="아이콘과 문구를 함께 사용해 결과를 구분합니다.">
        <StoryPreview>
          <Button
            variant="secondary"
            onClick={() => toast.add({ title: "저장했어요.", type: "success" })}
          >
            성공
          </Button>
          <Button
            variant="secondary"
            onClick={() => toast.add({ title: "새 업데이트가 있어요.", type: "info" })}
          >
            정보
          </Button>
          <Button
            variant="secondary"
            onClick={() => toast.add({ title: "저장 공간이 얼마 남지 않았어요.", type: "warning" })}
          >
            경고
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              toast.add({
                title: "저장하지 못했어요.",
                description: "연결을 확인한 뒤 다시 시도해 주세요.",
                priority: "high",
                type: "error",
              })
            }
          >
            오류
          </Button>
        </StoryPreview>
      </StorySection>
      <StorySection
        title="실행"
        description="되돌릴 수 있는 작업은 바로 실행할 선택지를 제공합니다."
      >
        <StoryPreview>
          <Button
            variant="secondary"
            onClick={() => {
              const id = toast.add({
                title: "보관함으로 옮겼어요.",
                actionProps: {
                  children: "되돌리기",
                  onClick: () => toast.close(id),
                },
              });
            }}
          >
            실행 버튼 보기
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              toast.promise(new Promise((resolve) => window.setTimeout(resolve, 1200)), {
                loading: { title: "변경사항을 저장하고 있어요.", type: "loading" },
                success: { title: "변경사항을 저장했어요.", type: "success" },
                error: { title: "변경사항을 저장하지 못했어요.", type: "error" },
              })
            }
          >
            진행 상태 보기
          </Button>
        </StoryPreview>
      </StorySection>
    </StoryPage>
  ),
};
