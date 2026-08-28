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
} from "./story-layout/StoryLayout";
import { getComponentDocument } from "./story-layout/component-docs";
import { AlertDialogExample, alertDialogExampleCode } from "./examples/alert-dialog.example";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Alert Dialog");

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
