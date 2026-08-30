import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  storyStyles,
} from "./story-layout/StoryLayout";
import { Switch } from "@nooeh/ui/switch";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const registryName = "switch";

function SwitchExample() {
  return (
    <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
      <label htmlFor="activity-visibility" {...stylex.props(storyStyles.option)}>
        <Switch defaultChecked id="activity-visibility" />
        Show activity status
      </label>
      <label htmlFor="admin-only" {...stylex.props(storyStyles.option)}>
        <Switch disabled id="admin-only" />
        Admin-only setting
      </label>
    </div>
  );
}

const switchExampleCode =
  'import { Switch } from "@nooeh/ui/switch"\n\n<>\n  <Switch defaultChecked id="activity-visibility" />\n  <Switch disabled id="admin-only" />\n</>';

export const SwitchStory: Story = {
  name: "Switch",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Switch</h1>
        <p {...stylex.props(storyStyles.description)}>
          Turn settings that apply immediately on or off.
        </p>
      </header>
      <ComponentExample>
        <SwitchExample />
      </ComponentExample>

      <ComponentCode usage={switchExampleCode} />
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Install</h2>
        </header>
        <CodeBlock
          code={`pnpm dlx @nooeh/ui add ${registryName}`}
          label="Terminal"
          language="bash"
        />
      </section>
    </main>
  ),
};
