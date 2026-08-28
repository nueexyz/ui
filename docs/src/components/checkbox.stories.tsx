import { Checkbox } from "@cachette/ui/checkbox";
import { colorVars } from "@cachette/tokens/tokens.stylex";
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
import { CheckboxExample, checkboxExampleCode } from "./examples/checkbox.example";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Checkbox");

const styles = stylex.create({
  disabledOption: { color: colorVars.fgDisabled, cursor: "not-allowed" },
});

export const CheckboxStory: Story = {
  name: "Checkbox",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Checkbox</h1>
        <p {...stylex.props(storyStyles.description)}>
          서로 독립적인 항목을 하나 이상 선택할 때 사용합니다.
        </p>
      </header>
      <ComponentExample>
        <CheckboxExample />
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
      <ComponentCode usage={checkboxExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
