import { spacingVars } from "@cachette/tokens/tokens.stylex";
import { Typography } from "@cachette/ui/typography";
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
import { TypographyExample, typographyExampleCode } from "./examples/typography.example";

const meta = {
  title: "Components",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Typography");
const styles = stylex.create({
  stack: { display: "flex", flexDirection: "column", gap: spacingVars.space4 },
});
export const TypographyStory: Story = {
  name: "Typography",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Typography</h1>
        <p {...stylex.props(storyStyles.description)}>
          정보의 위계와 용도에 맞는 글자 스타일을 사용합니다.
        </p>
      </header>
      <ComponentExample>
        <TypographyExample />
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
      <ComponentCode usage={typographyExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
