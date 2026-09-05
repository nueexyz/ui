import { Button } from "@nuee/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@nuee/ui/dropdown-menu";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as stylex from "@stylexjs/stylex";

import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  storyStyles,
} from "./story-layout/StoryLayout";

const meta = {
  title: "Components",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const registryName = "dropdown-menu";

function DropdownMenuExample() {
  return (
    <div {...stylex.props(storyStyles.preview)}>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="secondary">Project actions</Button>} />
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Website redesign</DropdownMenuLabel>
            <DropdownMenuItem>
              Rename<DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Duplicate<DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem defaultChecked>Show in favorites</DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem destructive>Delete project</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const dropdownMenuExampleCode =
  'import { Button } from "@nuee/ui/button"\nimport { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@nuee/ui/dropdown-menu"\n\n<DropdownMenu>\n  <DropdownMenuTrigger render={<Button variant="secondary">Project actions</Button>} />\n  <DropdownMenuContent>\n    <DropdownMenuGroup>\n      <DropdownMenuLabel>Website redesign</DropdownMenuLabel>\n      <DropdownMenuItem>Rename<DropdownMenuShortcut>⌘R</DropdownMenuShortcut></DropdownMenuItem>\n      <DropdownMenuItem>Duplicate<DropdownMenuShortcut>⌘D</DropdownMenuShortcut></DropdownMenuItem>\n    </DropdownMenuGroup>\n    <DropdownMenuSeparator />\n    <DropdownMenuCheckboxItem defaultChecked>Show in favorites</DropdownMenuCheckboxItem>\n    <DropdownMenuSeparator />\n    <DropdownMenuItem destructive>Delete project</DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>';

export const DropdownMenuStory: Story = {
  name: "Dropdown Menu",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Dropdown Menu</h1>
        <p {...stylex.props(storyStyles.description)}>
          Open actions and settings for the current target from a button.
        </p>
      </header>
      <ComponentExample>
        <DropdownMenuExample />
      </ComponentExample>

      <ComponentCode usage={dropdownMenuExampleCode} />
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
