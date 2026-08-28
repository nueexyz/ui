import { Button } from "@cachette/ui/button";
import { toast, Toaster } from "@cachette/ui/toast";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect } from "react";
import { StoryPage, StoryPreview, StorySection } from "./story-layout/StoryLayout";

const meta = {
  title: "Components",
  component: Toaster,
  args: { position: "bottom-right" },
  argTypes: {
    position: {
      control: "select",
      options: [
        "top-left",
        "top-center",
        "top-right",
        "bottom-left",
        "bottom-center",
        "bottom-right",
      ],
    },
  },
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

function PersistentToast() {
  useEffect(() => {
    const id = toast.add({
      title: "변경사항을 저장했어요.",
      description: "이 알림은 결과 화면을 바로 확인할 수 있도록 유지됩니다.",
      timeout: 0,
      type: "success",
    });

    return () => toast.close(id);
  }, []);

  return null;
}

export const ToastStory: Story = {
  name: "Toast",
  render: ({ position }) => (
    <StoryPage title="Toast" description="작업 결과나 상태 변화를 화면 흐름을 막지 않고 알립니다.">
      <Toaster position={position} />
      <PersistentToast />
      <StorySection
        title="기본"
        description="완료 결과를 바로 확인할 수 있습니다. Controls에서 표시 위치를 바꿔 보세요."
      >
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
      <StorySection
        title="여러 알림"
        description="알림을 추가하면 최근 세 개가 쌓이고, 목록에 포인터를 올리면 내용을 펼칩니다."
      >
        <StoryPreview>
          <Button
            variant="secondary"
            onClick={() =>
              toast.add({
                title: "새 알림이 도착했어요.",
                description: "버튼을 다시 눌러 쌓이는 동작을 확인해 보세요.",
                timeout: 0,
              })
            }
          >
            Toast 추가
          </Button>
        </StoryPreview>
      </StorySection>
    </StoryPage>
  ),
};
