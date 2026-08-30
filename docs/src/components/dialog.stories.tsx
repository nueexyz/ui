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
import { Button } from "@nooeh/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@nooeh/ui/dialog";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Dialog");

function DialogExample() {
  return (
    <div {...stylex.props(storyStyles.preview)}>
      <Dialog>
        <DialogTrigger render={<Button>Archive project</Button>} />
        <DialogContent closeLabel="Close">
          <DialogHeader>
            <DialogTitle>Archive this project?</DialogTitle>
            <DialogDescription>
              Archived projects are hidden from the list and can be restored in Settings.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="secondary">Cancel</Button>} />
            <Button>Archive</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const dialogExampleCode =
  'import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@nooeh/ui/dialog"\n\n<Dialog>\n  <DialogTrigger>Open profile</DialogTrigger>\n  <DialogContent>\n    <DialogTitle>Profile</DialogTitle>\n  </DialogContent>\n</Dialog>';

export const DialogStory: Story = {
  name: "Dialog",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Dialog</h1>
        <p {...stylex.props(storyStyles.description)}>
          Temporarily pause the current flow for confirmation or input.
        </p>
      </header>
      <ComponentExample>
        <DialogExample />
      </ComponentExample>

      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Install</h2>
        </header>
        <CodeBlock
          code={`pnpm dlx @nooeh/ui add ${componentDocument.registryName}`}
          label="Terminal"
          language="bash"
        />
      </section>
      <ComponentCode usage={dialogExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
