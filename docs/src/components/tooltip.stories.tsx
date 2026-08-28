import * as stylex from "@stylexjs/stylex";
import { Button } from "@cachette/ui/button";
import { Icon } from "@cachette/ui/icon";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@cachette/ui/tooltip";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "./story-layout/StoryLayout";
import { getComponentDocument } from "./story-layout/component-docs";
import { TooltipExample, tooltipExampleCode } from "./examples/tooltip.example";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Tooltip");
export const TooltipStory: Story = {
  name: "Tooltip",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Tooltip</h1>
        <p {...stylex.props(storyStyles.description)}>
          아이콘이나 짧은 컨트롤의 의미를 한 문장으로 설명합니다.
        </p>
      </header>
      <ComponentExample>
        <TooltipExample />
      </ComponentExample>

      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>설치</h2>
        </header>
        <CodeBlock
          code={`pnpm dlx @cachette/ui add ${componentDocument.registryName}`}
          label="터미널"
          language="bash"
        />
      </section>
      <ComponentCode usage={tooltipExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
