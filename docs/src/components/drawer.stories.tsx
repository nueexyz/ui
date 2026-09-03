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

type DrawerDirection = "down" | "up" | "left" | "right";

function DrawerExample({ swipeDirection = "down" }: { swipeDirection?: DrawerDirection }) {
  return (
    <div {...stylex.props(storyStyles.preview)}>
      <Drawer showSwipeHandle swipeDirection={swipeDirection}>
        <DrawerTrigger render={<Button>Open {swipeDirection} drawer</Button>} />
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
  '<Drawer swipeDirection="up">...</Drawer>\n<Drawer swipeDirection="left">...</Drawer>\n<Drawer swipeDirection="right">...</Drawer>';

const snapPointsCode =
  "<Drawer showSwipeHandle defaultSnapPoint={0.5} snapPoints={[0.5, 1]}>\n  <DrawerContent>...</DrawerContent>\n</Drawer>";

const nonModalCode =
  '<Drawer modal={false} overlay="none" disablePointerDismissal>\n  <DrawerContent>...</DrawerContent>\n</Drawer>';

const pushContentCode =
  'const [open, setOpen] = useState(false)\n\n<>\n  <main className={open ? "content contentPushed" : "content"}>\n    <App />\n  </main>\n\n  <Drawer open={open} onOpenChange={setOpen} swipeDirection="left">\n    <DrawerContent>...</DrawerContent>\n  </Drawer>\n</>';

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
            <code>down</code> value opens it from the bottom and occupies at least half of the
            viewport; <code>up</code> opens it from the top and follows the same minimum height;{" "}
            <code>left</code> and <code>right</code> select a side panel. Drawer actions align left;
            side-panel actions center on narrow screens.
          </p>
        </header>
        <CodeBlock code={directionCode} label="TSX" language="tsx" />
        <div {...stylex.props(storyStyles.preview)}>
          <DrawerExample swipeDirection="up" />
          <DrawerExample swipeDirection="left" />
          <DrawerExample swipeDirection="right" />
        </div>
      </section>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Swipe and snap points</h2>
          <p {...stylex.props(storyStyles.description)}>
            Set <code>showSwipeHandle</code> to expose a drag affordance. <code>snapPoints</code>{" "}
            accepts viewport fractions, pixel values, or <code>rem</code> values and applies to
            vertical Drawers only. In <code>[0.5, 1]</code>, <code>0.5</code> is half the viewport
            height and <code>1</code> is its full height; swiping settles the Drawer on either
            height. <code>defaultSnapPoint</code> selects its initial height. Top and bottom Drawers
            retain at least half of the viewport height.
          </p>
        </header>
        <CodeBlock code={snapPointsCode} label="TSX" language="tsx" />
      </section>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Modal behavior</h2>
          <p {...stylex.props(storyStyles.description)}>
            Drawers are modal with a visible overlay by default. Use{" "}
            <code>overlay="transparent"</code> to retain modal behavior without dimming the page. To
            keep the page interactive, use <code>modal={"{false}"}</code> with{" "}
            <code>overlay="none"</code>.
          </p>
        </header>
        <CodeBlock code={nonModalCode} label="TSX" language="tsx" />
      </section>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Pushing page content</h2>
          <p {...stylex.props(storyStyles.description)}>
            Drawer does not move the page automatically. Control <code>open</code> in the
            application, then move the layout region that should make space for the panel.
          </p>
        </header>
        <CodeBlock code={pushContentCode} label="TSX" language="tsx" />
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
