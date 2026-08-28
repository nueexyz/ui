import { spacingVars } from "@cachette/tokens/tokens.stylex";
import { Button } from "@cachette/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@cachette/ui/empty";
import { Icon } from "@cachette/ui/icon";
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
import { EmptyExample, emptyExampleCode } from "./examples/empty.example";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Empty");
const styles = stylex.create({ full: { width: "100%" }, content: { gap: spacingVars.space4 } });
export const EmptyStory: Story = {
  name: "Empty",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Empty</h1>
        <p {...stylex.props(storyStyles.description)}>
          아직 표시할 내용이 없을 때 이유와 다음 행동을 안내합니다.
        </p>
      </header>
      <ComponentExample>
        <EmptyExample />
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
      <ComponentCode usage={emptyExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
