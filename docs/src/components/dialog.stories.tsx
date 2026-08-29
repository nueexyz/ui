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
import { Button } from "@dumo/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@dumo/ui/dialog";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Dialog");

function DialogExample() {
  return (
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
  );
}

const dialogExampleCode =
  'import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@dumo/ui/dialog"\n\n<Dialog>\n  <DialogTrigger>프로필 열기</DialogTrigger>\n  <DialogContent>\n    <DialogTitle>프로필</DialogTitle>\n  </DialogContent>\n</Dialog>';

export const DialogStory: Story = {
  name: "Dialog",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Dialog</h1>
        <p {...stylex.props(storyStyles.description)}>
          현재 흐름을 잠시 멈추고 확인이나 입력이 필요한 작업을 표시합니다.
        </p>
      </header>
      <ComponentExample>
        <DialogExample />
      </ComponentExample>

      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>설치</h2>
        </header>
        <CodeBlock
          code={`pnpm dlx @dumo/ui add ${componentDocument.registryName}`}
          label="터미널"
          language="bash"
        />
      </section>
      <ComponentCode usage={dialogExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
