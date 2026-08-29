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
import { Switch } from "@dumo/ui/switch";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Switch");

function SwitchExample() {
  return (
    <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
      <label htmlFor="activity-visibility" {...stylex.props(storyStyles.option)}>
        <Switch defaultChecked id="activity-visibility" />
        활동 상태 공개
      </label>
      <label htmlFor="admin-only" {...stylex.props(storyStyles.option)}>
        <Switch disabled id="admin-only" />
        관리자 전용 설정
      </label>
    </div>
  );
}

const switchExampleCode =
  'import { Switch } from "@dumo/ui/switch"\n\n<>\n  <Switch defaultChecked id="activity-visibility" />\n  <Switch disabled id="admin-only" />\n</>';

export const SwitchStory: Story = {
  name: "Switch",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Switch</h1>
        <p {...stylex.props(storyStyles.description)}>변경 즉시 적용되는 설정을 켜거나 끕니다.</p>
      </header>
      <ComponentExample>
        <SwitchExample />
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
      <ComponentCode usage={switchExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
