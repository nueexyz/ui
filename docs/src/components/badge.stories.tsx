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
import { Badge } from "@cachette/ui/badge";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Badge");

function BadgeExample() {
  return (
    <div {...stylex.props(storyStyles.preview)}>
      <Badge>진행 중</Badge>
      <Badge variant="secondary">초안</Badge>
      <Badge variant="destructive">오류</Badge>
      <Badge variant="outline">읽지 않음</Badge>
      <Badge variant="ghost">선택 사항</Badge>
    </div>
  );
}

const badgeExampleCode = 'import { Badge } from "@cachette/ui/badge"\n\n<Badge>진행 중</Badge>';

export const BadgeStory: Story = {
  name: "Badge",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Badge</h1>
        <p {...stylex.props(storyStyles.description)}>
          상태나 분류처럼 짧은 정보를 간결하게 표시합니다.
        </p>
      </header>
      <ComponentExample>
        <BadgeExample />
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
      <ComponentCode usage={badgeExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
