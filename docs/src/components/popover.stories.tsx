import * as stylex from "@stylexjs/stylex";
import { Button } from "@cachette/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@cachette/ui/popover";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "./story-layout/StoryLayout";
import { getComponentDocument } from "./story-layout/component-docs";
import { PopoverExample, popoverExampleCode } from "./examples/popover.example";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Popover");
export const PopoverStory: Story = {
  name: "Popover",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Popover</h1>
        <p {...stylex.props(storyStyles.description)}>
          현재 화면을 벗어나지 않고 보조 정보나 간단한 조작을 제공합니다.
        </p>
      </header>
      <ComponentExample>
        <PopoverExample />
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
      <ComponentCode usage={popoverExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
