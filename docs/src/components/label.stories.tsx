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
import { Input } from "@cachette/ui/input";
import { Label } from "@cachette/ui/label";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Label");

function LabelExample() {
  return (
    <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
      <div {...stylex.props(storyStyles.field, storyStyles.formWidth)}>
        <Label htmlFor="display-name">표시 이름</Label>
        <Input id="display-name" placeholder="홍길동" />
      </div>
    </div>
  );
}

const labelExampleCode =
  'import { Input } from "@cachette/ui/input"\nimport { Label } from "@cachette/ui/label"\n\n<div>\n  <Label htmlFor="display-name">표시 이름</Label>\n  <Input id="display-name" placeholder="홍길동" />\n</div>';

export const LabelStory: Story = {
  name: "Label",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Label</h1>
        <p {...stylex.props(storyStyles.description)}>
          입력할 정보와 컨트롤의 관계를 명확하게 안내합니다.
        </p>
      </header>
      <ComponentExample>
        <LabelExample />
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
      <ComponentCode usage={labelExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
