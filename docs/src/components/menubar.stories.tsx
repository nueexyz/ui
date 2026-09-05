import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@nuee/ui/menubar";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as stylex from "@stylexjs/stylex";

import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  storyStyles,
} from "./story-layout/StoryLayout";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const registryName = "menubar";

function MenubarExample() {
  return (
    <div {...stylex.props(storyStyles.preview)}>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              New document<MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Open<MenubarShortcut>⌘O</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              Save<MenubarShortcut>⌘S</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Undo<MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Redo<MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}

const menubarExampleCode =
  'import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "@nuee/ui/menubar"\n\n<Menubar>\n  <MenubarMenu>\n    <MenubarTrigger>File</MenubarTrigger>\n    <MenubarContent>\n      <MenubarItem>New document<MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>\n      <MenubarItem>Open<MenubarShortcut>⌘O</MenubarShortcut></MenubarItem>\n      <MenubarSeparator />\n      <MenubarItem>Save<MenubarShortcut>⌘S</MenubarShortcut></MenubarItem>\n    </MenubarContent>\n  </MenubarMenu>\n</Menubar>';

export const MenubarStory: Story = {
  name: "Menubar",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Menubar</h1>
        <p {...stylex.props(storyStyles.description)}>
          Keep frequently used command groups in a consistent location, like an editor.
        </p>
      </header>
      <ComponentExample>
        <MenubarExample />
      </ComponentExample>

      <ComponentCode usage={menubarExampleCode} />
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
    </main>
  ),
};
