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
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@nooeh/ui/dropdown-menu";

const meta = {
  title: "Components",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Dropdown Menu");

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
  'import { Button } from "@nooeh/ui/button"\nimport { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@nooeh/ui/dropdown-menu"\n\n<DropdownMenu>\n  <DropdownMenuTrigger render={<Button variant="secondary">Project actions</Button>} />\n  <DropdownMenuContent>\n    <DropdownMenuGroup>\n      <DropdownMenuLabel>Website redesign</DropdownMenuLabel>\n      <DropdownMenuItem>Rename<DropdownMenuShortcut>⌘R</DropdownMenuShortcut></DropdownMenuItem>\n      <DropdownMenuItem>Duplicate<DropdownMenuShortcut>⌘D</DropdownMenuShortcut></DropdownMenuItem>\n    </DropdownMenuGroup>\n    <DropdownMenuSeparator />\n    <DropdownMenuCheckboxItem defaultChecked>Show in favorites</DropdownMenuCheckboxItem>\n    <DropdownMenuSeparator />\n    <DropdownMenuItem destructive>Delete project</DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>';

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
      <ComponentCode usage={dropdownMenuExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
