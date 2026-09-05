import { Switch } from "@nuee/ui/switch";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as stylex from "@stylexjs/stylex";

import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  storyStyles,
} from "./story-layout/StoryLayout";

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
  'import { Switch } from "@nuee/ui/switch"\n\n<>\n  <Switch defaultChecked id="activity-visibility" />\n  <Switch disabled id="admin-only" />\n</>';

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
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Sizes</h2>
          <p {...stylex.props(storyStyles.description)}>
            Choose a control size that matches nearby form controls.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview)}>
          <Switch aria-label="Small switch" size="sm" />
          <Switch aria-label="Default switch" size="md" />
        </div>
      </section>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>States</h2>
          <p {...stylex.props(storyStyles.description)}>
            Make checked and unavailable settings clearly distinguishable.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview)}>
          <Switch aria-label="Off" />
          <Switch aria-label="On" defaultChecked />
          <Switch aria-label="Unavailable" disabled />
        </div>
      </section>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Install</h2>
        </header>
        <CodeBlock
          code={`pnpm dlx @nuee/ui add ${registryName}`}
          label="Terminal"
          language="bash"
        />
      </section>
    </main>
  ),
};
