import * as stylex from "@stylexjs/stylex";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@cachette/ui/tabs";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "./story-layout/StoryLayout";
import { getComponentDocument } from "./story-layout/component-docs";
import { TabsExample, tabsExampleCode } from "./examples/tabs.example";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Tabs");

export const TabsStory: Story = {
  name: "Tabs",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Tabs</h1>
        <p {...stylex.props(storyStyles.description)}>
          같은 맥락의 콘텐츠를 짧은 범주로 나누어 전환합니다.
        </p>
      </header>
      <ComponentExample>
        <TabsExample />
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
      <ComponentCode usage={tabsExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
