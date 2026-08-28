import * as stylex from "@stylexjs/stylex";
import { Button } from "@cachette/ui/button";
import { toast, Toaster } from "@cachette/ui/toast";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect } from "react";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "./story-layout/StoryLayout";
import { getComponentDocument } from "./story-layout/component-docs";
import { ToastExample, toastExampleCode } from "./examples/toast.example";

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

const componentDocument = getComponentDocument("Toast");

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
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Toast</h1>
        <p {...stylex.props(storyStyles.description)}>
          작업 결과나 상태 변화를 화면 흐름을 막지 않고 알립니다.
        </p>
      </header>
      <ComponentExample>
        <ToastExample position={position} />
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
      <ComponentCode usage={toastExampleCode} />
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>States</h2>
          <p {...stylex.props(storyStyles.description)}>
            아이콘과 문구를 함께 사용해 결과를 구분합니다.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview)}>
          <Button
            variant="secondary"
            onClick={() => toast.add({ title: "저장했어요.", type: "success" })}
          >
            변경사항 저장
          </Button>
          <Button
            variant="secondary"
            onClick={() => toast.add({ title: "새 업데이트가 있어요.", type: "info" })}
          >
            업데이트 보기
          </Button>
          <Button
            variant="secondary"
            onClick={() => toast.add({ title: "저장 공간이 얼마 남지 않았어요.", type: "warning" })}
          >
            저장 공간 관리
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
            다시 저장하기
          </Button>
        </div>
      </section>
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
