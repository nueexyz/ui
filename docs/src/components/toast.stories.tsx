import * as stylex from "@stylexjs/stylex";
import { Button } from "@nuee/ui/button";
import { toast, Toaster } from "@nuee/ui/toast";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  storyStyles,
} from "./story-layout/StoryLayout";
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

const registryName = "toast";

function PersistentToast() {
  useEffect(() => {
    const id = toast.add({
      title: "Changes saved.",
      description: "This notification stays visible so the result can be reviewed.",
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
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Default</h2>
          <p {...stylex.props(storyStyles.description)}>
            Review completed work immediately. Change the position in Controls.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview)}>
          <Button
            variant="secondary"
            onClick={() =>
              toast.add({
                title: "Schedule created.",
                description: "Sunday, December 3 at 9:00 AM",
              })
            }
          >
            Create schedule
          </Button>
        </div>
      </section>

      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Actions</h2>
          <p {...stylex.props(storyStyles.description)}>
            Provide an immediate option for reversible work.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview)}>
          <Button
            variant="secondary"
            onClick={() => {
              const id = toast.add({
                title: "Moved to archive.",
                actionProps: {
                  children: "Undo",
                  onClick: () => toast.close(id),
                },
              });
            }}
          >
            Undo archive
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              toast.promise(new Promise((resolve) => window.setTimeout(resolve, 1200)), {
                loading: { title: "Saving changes.", type: "loading" },
                success: { title: "Changes saved.", type: "success" },
                error: { title: "Couldn’t save changes.", type: "error" },
              })
            }
          >
            Start saving
          </Button>
        </div>
      </section>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Multiple notifications</h2>
          <p {...stylex.props(storyStyles.description)}>
            The latest three notifications stack. Hover over the list to expand it or clear all.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview)}>
          <Button
            variant="secondary"
            onClick={() => {
              for (const notification of [
                ["Design review started.", "Leave feedback by 3 PM today."],
                ["New comment.", "Minji reviewed the changes."],
                ["Task assigned.", "Landing-page improvements start tomorrow."],
              ]) {
                toast.add({
                  title: notification[0],
                  description: notification[1],
                  timeout: 0,
                });
              }
            }}
          >
            Add three notifications
          </Button>
        </div>
      </section>
    </>
  );
}

const toastExampleCode =
  'import { Button } from "@nuee/ui/button"\nimport { toast, Toaster } from "@nuee/ui/toast"\n\n<>\n  <Button onClick={() => toast.add({ title: "Saved." })}>Save</Button>\n  <Toaster position="bottom-right" />\n</>';

export const ToastStory: Story = {
  name: "Toast",
  render: ({ position }) => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Toast</h1>
        <p {...stylex.props(storyStyles.description)}>
          Notify people about results or state changes without blocking the flow.
        </p>
      </header>
      <ComponentExample>
        <ToastExample position={position} />
      </ComponentExample>

      <ComponentCode usage={toastExampleCode} />
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Install</h2>
        </header>
        <CodeBlock
          code={`pnpm dlx @nuee/ui add ${registryName}`}
          label="Terminal"
          language="bash"
        />
      </section>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>States</h2>
          <p {...stylex.props(storyStyles.description)}>
            Combine an icon and text to differentiate results.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview)}>
          <Button
            variant="secondary"
            onClick={() => toast.add({ title: "Saved.", type: "success" })}
          >
            Save changes
          </Button>
          <Button
            variant="secondary"
            onClick={() => toast.add({ title: "Update available.", type: "info" })}
          >
            View update
          </Button>
          <Button
            variant="secondary"
            onClick={() => toast.add({ title: "Storage is running low.", type: "warning" })}
          >
            Manage storage
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              toast.add({
                title: "Couldn’t save.",
                description: "Check your connection and try again.",
                priority: "high",
                type: "error",
              })
            }
          >
            Save again
          </Button>
        </div>
      </section>
    </main>
  ),
};
