import * as stylex from "@stylexjs/stylex";
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
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "../story-layout/StoryLayout";
import { getComponentDocument } from "../story-layout/component-docs";

const componentDocument = getComponentDocument("Alert Dialog");

export function AlertDialogExample() {
  return (
    <>
      <div {...stylex.props(storyStyles.preview)}>
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
      </div>
    </>
  );
}

export const alertDialogExampleCode =
  'import {\n  AlertDialog,\n  AlertDialogAction,\n  AlertDialogCancel,\n  AlertDialogContent,\n  AlertDialogDescription,\n  AlertDialogFooter,\n  AlertDialogHeader,\n  AlertDialogTitle,\n  AlertDialogTrigger,\n} from "@cachette/ui/alert-dialog"\n\n<AlertDialog>\n  <AlertDialogTrigger>프로젝트 삭제</AlertDialogTrigger>\n  <AlertDialogContent>\n    <AlertDialogHeader>\n      <AlertDialogTitle>프로젝트를 삭제할까요?</AlertDialogTitle>\n      <AlertDialogDescription>삭제한 프로젝트는 복구할 수 없습니다.</AlertDialogDescription>\n    </AlertDialogHeader>\n    <AlertDialogFooter>\n      <AlertDialogCancel>취소</AlertDialogCancel>\n      <AlertDialogAction>삭제</AlertDialogAction>\n    </AlertDialogFooter>\n  </AlertDialogContent>\n</AlertDialog>';
