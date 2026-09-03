import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  storyStyles,
} from "./story-layout/StoryLayout";
import { Button } from "@nooeh/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@nooeh/ui/drawer";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const registryName = "drawer";

function DrawerExample() {
  return (
    <div {...stylex.props(storyStyles.preview)}>
      <Drawer showSwipeHandle>
        <DrawerTrigger render={<Button>Open drawer</Button>} />
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Move to folder</DrawerTitle>
            <DrawerDescription>Choose where to keep this project.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose render={<Button variant="secondary">Cancel</Button>} />
            <DrawerClose render={<Button>Move project</Button>} />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

const drawerExampleCode =
  'import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "@nooeh/ui/drawer"\n\n<Drawer showSwipeHandle swipeDirection="down">\n  <DrawerTrigger>Open drawer</DrawerTrigger>\n  <DrawerContent>\n    <DrawerTitle>Move to folder</DrawerTitle>\n  </DrawerContent>\n</Drawer>';

export const DrawerStory: Story = {
  name: "Drawer",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Drawer</h1>
        <p {...stylex.props(storyStyles.description)}>
          Present supporting actions in a panel that slides in from an edge of the screen.
        </p>
      </header>
      <ComponentExample>
        <DrawerExample />
      </ComponentExample>

      <ComponentCode usage={drawerExampleCode} />
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Install</h2>
        </header>
        <CodeBlock
          code={`pnpm dlx @nooeh/ui add ${registryName}`}
          label="Terminal"
          language="bash"
        />
      </section>
    </main>
  ),
};
