import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@cachette/ui/alert-dialog";
import { Button } from "@cachette/ui/button";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview } from "./story-layout/StoryLayout";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const AlertDialogStory: Story = {
  name: "Alert Dialog",
  render: () => (
    <StoryPage
      title="Alert Dialog"
      description="되돌리기 어렵거나 중요한 작업을 실행하기 전에 명시적인 응답을 받습니다."
    >
      <StoryPreview>
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="secondary">프로젝트 삭제하기</Button>} />
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>프로젝트를 삭제할까요?</AlertDialogTitle>
              <AlertDialogDescription>
                프로젝트와 관련 파일이 모두 삭제되며, 이 작업은 되돌릴 수 없습니다.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>취소</AlertDialogCancel>
              <AlertDialogAction>삭제하기</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </StoryPreview>
    </StoryPage>
  ),
};
