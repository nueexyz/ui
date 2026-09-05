import { Button } from "@nuee/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@nuee/ui/popover";
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

const registryName = "popover";

function PopoverExample() {
  return (
    <section {...stylex.props(storyStyles.section)}>
      <header {...stylex.props(storyStyles.sectionHeader)}>
        <h2 {...stylex.props(storyStyles.sectionTitle)}>Alignment</h2>
        <p {...stylex.props(storyStyles.description)}>
          Align to the trigger’s left edge by default, or center and right as needed.
        </p>
      </header>
      <div {...stylex.props(storyStyles.preview)}>
        <Popover>
          <PopoverTrigger render={<Button variant="secondary">Align left</Button>} />
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>Align left</PopoverTitle>
              <PopoverDescription>Align the popover start with the trigger.</PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger render={<Button variant="secondary">Align center</Button>} />
          <PopoverContent align="center">
            <PopoverHeader>
              <PopoverTitle>Align center</PopoverTitle>
              <PopoverDescription>Align the popover center with the trigger.</PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger render={<Button variant="secondary">Align right</Button>} />
          <PopoverContent align="end">
            <PopoverHeader>
              <PopoverTitle>Align right</PopoverTitle>
              <PopoverDescription>Align the popover end with the trigger.</PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
      </div>
    </section>
  );
}

const popoverExampleCode =
  'import { Button } from "@nuee/ui/button"\nimport { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@nuee/ui/popover"\n\n<Popover>\n  <PopoverTrigger render={<Button variant="secondary">Align left</Button>} />\n  <PopoverContent>\n    <PopoverHeader>\n      <PopoverTitle>Align left</PopoverTitle>\n      <PopoverDescription>Align the popover start with the trigger.</PopoverDescription>\n    </PopoverHeader>\n  </PopoverContent>\n</Popover>';

export const PopoverStory: Story = {
  name: "Popover",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Popover</h1>
        <p {...stylex.props(storyStyles.description)}>
          Provide supporting information or simple controls without leaving the current screen.
        </p>
      </header>
      <ComponentExample>
        <PopoverExample />
      </ComponentExample>

      <ComponentCode usage={popoverExampleCode} />
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
