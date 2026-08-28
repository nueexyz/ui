import * as stylex from "@stylexjs/stylex";
import { Kbd, KbdGroup } from "@cachette/ui/kbd";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "./story-layout/StoryLayout";
import { getComponentDocument } from "./story-layout/component-docs";
import { KbdExample, kbdExampleCode } from "./examples/kbd.example";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Kbd");
export const KbdStory: Story = {
  name: "Kbd",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Kbd</h1>
        <p {...stylex.props(storyStyles.description)}>키보드 단축키와 입력 조합을 표시합니다.</p>
      </header>
      <ComponentExample>
        <KbdExample />
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
      <ComponentCode usage={kbdExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
