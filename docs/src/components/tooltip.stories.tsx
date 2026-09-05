import { Button } from "@nuee/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@nuee/ui/tooltip";
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

const registryName = "tooltip";

function TooltipExample() {
  return (
    <section {...stylex.props(storyStyles.section)}>
      <header {...stylex.props(storyStyles.sectionHeader)}>
        <h2 {...stylex.props(storyStyles.sectionTitle)}>Alignment</h2>
        <p {...stylex.props(storyStyles.description)}>
          Align descriptions to the trigger’s start, center, or end.
        </p>
      </header>
      <div {...stylex.props(storyStyles.preview)}>
        <TooltipProvider delay={100}>
          {(
            [
              ["start", "Align left"],
              ["center", "Align center"],
              ["end", "Align right"],
            ] as const
          ).map(([align, label]) => (
            <Tooltip key={align}>
              <TooltipTrigger
                render={
                  <Button size="sm" variant="secondary">
                    {label}
                  </Button>
                }
              />
              <TooltipContent align={align}>Change project visibility.</TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </section>
  );
}

const tooltipExampleCode =
  'import { Tooltip, TooltipContent, TooltipTrigger } from "@nuee/ui/tooltip"\n\n<Tooltip>\n  <TooltipTrigger aria-label="Help">?</TooltipTrigger>\n  <TooltipContent>View additional information.</TooltipContent>\n</Tooltip>';

export const TooltipStory: Story = {
  name: "Tooltip",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Tooltip</h1>
        <p {...stylex.props(storyStyles.description)}>
          Explain an icon or short control in one sentence.
        </p>
      </header>
      <ComponentExample>
        <TooltipExample />
      </ComponentExample>

      <ComponentCode usage={tooltipExampleCode} />
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
