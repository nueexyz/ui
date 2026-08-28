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
import { ToggleGroup, ToggleGroupItem } from "@cachette/ui/toggle-group";

const meta = {
  title: "Components",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Toggle Group");

function ToggleGroupExample() {
  return (
    <div {...stylex.props(storyStyles.preview)}>
      <ToggleGroup aria-label="텍스트 정렬" defaultValue={["left"]}>
        <ToggleGroupItem value="left">왼쪽</ToggleGroupItem>
        <ToggleGroupItem value="center">가운데</ToggleGroupItem>
        <ToggleGroupItem value="right">오른쪽</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}

const toggleGroupExampleCode =
  'import { ToggleGroup, ToggleGroupItem } from "@cachette/ui/toggle-group"\n\n<ToggleGroup aria-label="텍스트 정렬" defaultValue={["left"]}>\n  <ToggleGroupItem value="left">왼쪽</ToggleGroupItem>\n  <ToggleGroupItem value="center">가운데</ToggleGroupItem>\n  <ToggleGroupItem value="right">오른쪽</ToggleGroupItem>\n</ToggleGroup>';

export const ToggleGroupStory: Story = {
  name: "Toggle Group",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Toggle Group</h1>
        <p {...stylex.props(storyStyles.description)}>
          서로 관련된 보기 옵션을 방향키로 탐색하고 선택합니다.
        </p>
      </header>
      <ComponentExample>
        <ToggleGroupExample />
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
      <ComponentCode usage={toggleGroupExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
