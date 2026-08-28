import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "./story-layout/StoryLayout";
import { getComponentDocument } from "./story-layout/component-docs";
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

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Alert Dialog");

function AlertDialogExample() {
  return (
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
  );
}

const alertDialogExampleCode =
  'import {\n  AlertDialog,\n  AlertDialogAction,\n  AlertDialogCancel,\n  AlertDialogContent,\n  AlertDialogDescription,\n  AlertDialogFooter,\n  AlertDialogHeader,\n  AlertDialogTitle,\n  AlertDialogTrigger,\n} from "@cachette/ui/alert-dialog"\n\n<AlertDialog>\n  <AlertDialogTrigger>프로젝트 삭제</AlertDialogTrigger>\n  <AlertDialogContent>\n    <AlertDialogHeader>\n      <AlertDialogTitle>프로젝트를 삭제할까요?</AlertDialogTitle>\n      <AlertDialogDescription>삭제한 프로젝트는 복구할 수 없습니다.</AlertDialogDescription>\n    </AlertDialogHeader>\n    <AlertDialogFooter>\n      <AlertDialogCancel>취소</AlertDialogCancel>\n      <AlertDialogAction>삭제</AlertDialogAction>\n    </AlertDialogFooter>\n  </AlertDialogContent>\n</AlertDialog>';

export const AlertDialogStory: Story = {
  name: "Alert Dialog",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Alert Dialog</h1>
        <p {...stylex.props(storyStyles.description)}>
          되돌리기 어렵거나 중요한 작업을 실행하기 전에 명시적인 응답을 받습니다.
        </p>
      </header>
      <ComponentExample>
        <AlertDialogExample />
      </ComponentExample>

      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>설치</h2>
        </header>
        <CodeBlock
          code={`pnpm dlx @cachette/ui add ${componentDocument.registryName}`}
          label="터미널"
          language="bash"
        />
      </section>
      <ComponentCode usage={alertDialogExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
