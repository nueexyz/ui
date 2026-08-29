import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ToggleGroup, ToggleGroupItem } from "@dumo/ui/toggle-group";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "./story-layout/StoryLayout";
import { getComponentDocument } from "./story-layout/component-docs";

const meta = {
  title: "Components",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Toggle Group");

const toggleGroupExampleCode = `import { ToggleGroup, ToggleGroupItem } from "@dumo/ui/toggle-group"

<ToggleGroup aria-label="텍스트 정렬" defaultValue={["left"]} variant="outline">
  <ToggleGroupItem value="left">왼쪽</ToggleGroupItem>
  <ToggleGroupItem value="center">가운데</ToggleGroupItem>
  <ToggleGroupItem value="right">오른쪽</ToggleGroupItem>
</ToggleGroup>`;

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
        <div {...stylex.props(storyStyles.preview)}>
          <ToggleGroup aria-label="텍스트 정렬" defaultValue={["left"]} variant="outline">
            <ToggleGroupItem value="left">왼쪽</ToggleGroupItem>
            <ToggleGroupItem value="center">가운데</ToggleGroupItem>
            <ToggleGroupItem value="right">오른쪽</ToggleGroupItem>
          </ToggleGroup>
        </div>
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
      <ComponentCode usage={toggleGroupExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
