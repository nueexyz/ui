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
import { sizeVars, spacingVars } from "@dumo/tokens/tokens.stylex";
import { Separator } from "@dumo/ui/separator";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Separator");

const styles = stylex.create({
  row: {
    alignItems: "center",
    display: "flex",
    gap: spacingVars.space4,
    height: sizeVars.touchTarget,
  },
});

function SeparatorExample() {
  return (
    <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
      <span>계정 정보</span>
      <Separator />
      <div {...stylex.props(styles.row)}>
        <span>프로필</span>
        <Separator orientation="vertical" />
        <span>보안</span>
      </div>
    </div>
  );
}

const separatorExampleCode =
  'import { Separator } from "@dumo/ui/separator"\n\n<>\n  <span>계정 정보</span>\n  <Separator />\n  <div>프로필 <Separator orientation="vertical" /> 보안</div>\n</>';

export const SeparatorStory: Story = {
  name: "Separator",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Separator</h1>
        <p {...stylex.props(storyStyles.description)}>서로 다른 정보 그룹의 경계를 표시합니다.</p>
      </header>
      <ComponentExample>
        <SeparatorExample />
      </ComponentExample>

      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>설치</h2>
        </header>
        <CodeBlock
          code={`pnpm dlx @dumo/ui add ${componentDocument.registryName}`}
          label="터미널"
          language="bash"
        />
      </section>
      <ComponentCode usage={separatorExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
