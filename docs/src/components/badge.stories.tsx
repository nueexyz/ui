import { Badge } from "@nuee/ui/badge";
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

const registryName = "badge";

function BadgeExample() {
  return (
    <div {...stylex.props(storyStyles.preview)}>
      <Badge>In progress</Badge>
      <Badge variant="secondary">Draft</Badge>
      <Badge variant="destructive">Error</Badge>
      <Badge variant="outline">Unread</Badge>
      <Badge variant="ghost">Optional</Badge>
    </div>
  );
}

const badgeExampleCode = 'import { Badge } from "@nuee/ui/badge"\n\n<Badge>In progress</Badge>';

export const BadgeStory: Story = {
  name: "Badge",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Badge</h1>
        <p {...stylex.props(storyStyles.description)}>
          Display short information such as a status or category.
        </p>
      </header>
      <ComponentExample>
        <BadgeExample />
      </ComponentExample>

      <ComponentCode usage={badgeExampleCode} />
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Variants</h2>
          <p {...stylex.props(storyStyles.description)}>
            Match the badge treatment to the status or category it represents.
          </p>
        </header>
        <BadgeExample />
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
