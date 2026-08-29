import * as stylex from "@stylexjs/stylex";
import { Button } from "@dumo/ui/button";
import { toast, Toaster } from "@dumo/ui/toast";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "./story-layout/StoryLayout";
import { getComponentDocument } from "./story-layout/component-docs";
import { useEffect } from "react";

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

function ToastExample({
  position,
}: {
  position: React.ComponentProps<typeof Toaster>["position"];
}) {
  return (
    <>
      <Toaster position={position} />
      <PersistentToast />
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>기본</h2>
          <p {...stylex.props(storyStyles.description)}>
            완료 결과를 바로 확인할 수 있습니다. Controls에서 표시 위치를 바꿔 보세요.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview)}>
          <Button
            variant="secondary"
            onClick={() =>
              toast.add({
                title: "일정을 만들었어요.",
                description: "12월 3일 일요일 오전 9시",
              })
            }
          >
            일정 만들기
          </Button>
        </div>
      </section>

      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>실행</h2>
          <p {...stylex.props(storyStyles.description)}>
            되돌릴 수 있는 작업은 바로 실행할 선택지를 제공합니다.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview)}>
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
            보관 취소하기
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
            저장 시작하기
          </Button>
        </div>
      </section>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>여러 알림</h2>
          <p {...stylex.props(storyStyles.description)}>
            알림을 추가하면 최근 세 개가 쌓이고, 목록에 포인터를 올리면 내용을 펼치거나 모두 지울 수
            있습니다.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview)}>
          <Button
            variant="secondary"
            onClick={() => {
              for (const notification of [
                ["디자인 검토가 시작됐어요.", "오늘 오후 3시까지 의견을 남겨 주세요."],
                ["새 댓글이 달렸어요.", "민지님이 변경사항을 확인했어요."],
                ["작업을 할당했어요.", "랜딩 페이지 개선 작업이 내일 시작됩니다."],
              ]) {
                toast.add({
                  title: notification[0],
                  description: notification[1],
                  timeout: 0,
                });
              }
            }}
          >
            알림 세 개 추가하기
          </Button>
        </div>
      </section>
    </>
  );
}

const toastExampleCode =
  'import { Button } from "@dumo/ui/button"\nimport { toast, Toaster } from "@dumo/ui/toast"\n\n<>\n  <Button onClick={() => toast.add({ title: "저장했어요." })}>저장하기</Button>\n  <Toaster position="bottom-right" />\n</>';

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
          code={`pnpm dlx @dumo/ui add ${componentDocument.registryName}`}
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
