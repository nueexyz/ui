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
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@nooeh/ui/context-menu";

const meta = {
  title: "Components",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Context Menu");

function ContextMenuExample() {
  return (
    <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
      <ContextMenu>
        <ContextMenuTrigger {...stylex.props(storyStyles.contextTarget)}>
          project-proposal.pdf
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>
            Preview<ContextMenuShortcut>Space</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Rename<ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>
            Download<ContextMenuShortcut>⌘D</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
}

const contextMenuExampleCode =
  'import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuTrigger } from "@nooeh/ui/context-menu"\n\n<ContextMenu>\n  <ContextMenuTrigger>project-proposal.pdf</ContextMenuTrigger>\n  <ContextMenuContent>\n    <ContextMenuItem>Preview<ContextMenuShortcut>Space</ContextMenuShortcut></ContextMenuItem>\n    <ContextMenuItem>Rename<ContextMenuShortcut>⌘R</ContextMenuShortcut></ContextMenuItem>\n    <ContextMenuSeparator />\n    <ContextMenuItem>Download<ContextMenuShortcut>⌘D</ContextMenuShortcut></ContextMenuItem>\n  </ContextMenuContent>\n</ContextMenu>';

export const ContextMenuStory: Story = {
  name: "Context Menu",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Context Menu</h1>
        <p {...stylex.props(storyStyles.description)}>
          Open actions directly related to a selection with a secondary click.
        </p>
      </header>
      <ComponentExample>
        <ContextMenuExample />
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
      <ComponentCode usage={contextMenuExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
