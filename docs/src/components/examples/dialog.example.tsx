import * as stylex from "@stylexjs/stylex";
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
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "../story-layout/StoryLayout";
import { getComponentDocument } from "../story-layout/component-docs";

const componentDocument = getComponentDocument("Dialog");

export function DialogExample() {
  return (
    <>
      <div {...stylex.props(storyStyles.preview)}>
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
      </div>
    </>
  );
}

export const dialogExampleCode =
  'import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@cachette/ui/dialog"\n\n<Dialog>\n  <DialogTrigger>프로필 열기</DialogTrigger>\n  <DialogContent>\n    <DialogTitle>프로필</DialogTitle>\n  </DialogContent>\n</Dialog>';
