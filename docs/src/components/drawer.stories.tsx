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

const directionCode =
  '<Drawer swipeDirection="down">...</Drawer>\n<Drawer swipeDirection="up">...</Drawer>\n<Drawer swipeDirection="left">...</Drawer>\n<Drawer swipeDirection="right">...</Drawer>';

const snapPointsCode =
  "<Drawer showSwipeHandle snapPoints={[0.25, 0.5, 1]}>\n  <DrawerContent>...</DrawerContent>\n</Drawer>";

const nonModalCode =
  "<Drawer modal={false} disablePointerDismissal>\n  <DrawerContent>...</DrawerContent>\n</Drawer>";

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
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Position</h2>
          <p {...stylex.props(storyStyles.description)}>
            <code>swipeDirection</code> controls the edge the Drawer opens from. The default{" "}
            <code>down</code> value opens it from the bottom; <code>up</code>, <code>left</code>,
            and <code>right</code> select the other edges.
          </p>
        </header>
        <CodeBlock code={directionCode} label="TSX" language="tsx" />
      </section>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Swipe and snap points</h2>
          <p {...stylex.props(storyStyles.description)}>
            Set <code>showSwipeHandle</code> to expose a drag affordance. <code>snapPoints</code>{" "}
            accepts viewport fractions, pixel values, or <code>rem</code> values and applies to
            vertical Drawers only.
          </p>
        </header>
        <CodeBlock code={snapPointsCode} label="TSX" language="tsx" />
      </section>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Modal behavior</h2>
          <p {...stylex.props(storyStyles.description)}>
            Drawers are modal by default. Use <code>modal={"{false}"}</code> when the page must
            remain interactive, and combine it with <code>disablePointerDismissal</code> when
            outside presses should not close the panel.
          </p>
        </header>
        <CodeBlock code={nonModalCode} label="TSX" language="tsx" />
      </section>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Responsive layouts</h2>
          <p {...stylex.props(storyStyles.description)}>
            A Drawer is not a Dialog mode. For a responsive flow, render Drawer on narrow viewports
            and Dialog on wider viewports while sharing the form content and open state in the
            application.
          </p>
        </header>
      </section>
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
