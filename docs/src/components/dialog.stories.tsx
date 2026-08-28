import { Button } from "@cachette/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@cachette/ui/dialog";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview } from "./story-layout/StoryLayout";
const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const DialogStory: Story = {
  name: "Dialog",
  render: () => (
    <StoryPage
      title="Dialog"
      description="현재 흐름을 잠시 멈추고 확인이나 입력이 필요한 작업을 표시합니다."
    >
      <StoryPreview>
        <Dialog>
          <DialogTrigger render={<Button>프로젝트 보관하기</Button>} />
          <DialogContent closeLabel="닫기">
            <DialogHeader>
              <DialogTitle>프로젝트를 보관할까요?</DialogTitle>
              <DialogDescription>
                보관한 프로젝트는 목록에서 숨겨지며 설정에서 복원할 수 있습니다.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button variant="secondary">취소</Button>} />
              <Button>보관하기</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </StoryPreview>
    </StoryPage>
  ),
};
