import { Button } from "@nuee/ui/button";
import { ButtonGroup } from "@nuee/ui/button-group";
import { Icon } from "@nuee/ui/icon";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as stylex from "@stylexjs/stylex";

import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  storyStyles,
} from "./story-layout/StoryLayout";

const meta = {
  title: "Components",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const registryName = "button-group";

const buttonGroupExampleCode = `import { Button } from "@nuee/ui/button"
import { ButtonGroup } from "@nuee/ui/button-group"
import { Icon } from "@nuee/ui/icon"

<div>
  <ButtonGroup aria-label="Navigate back">
    <Button size="icon-sm" variant="secondary" aria-label="Go back">
      <Icon aria-hidden="true" name="chevronLeft" />
    </Button>
  </ButtonGroup>

  <ButtonGroup aria-label="Message actions">
    <Button size="sm" variant="secondary">Archive</Button>
    <Button size="sm" variant="secondary">Report</Button>
  </ButtonGroup>

  <ButtonGroup aria-label="More actions">
    <Button size="sm" variant="secondary">Snooze</Button>
    <Button size="icon-sm" variant="secondary" aria-label="More actions">
      <Icon aria-hidden="true" name="moreHorizontal" />
    </Button>
  </ButtonGroup>
</div>`;

export const ButtonGroupStory: Story = {
  name: "Button Group",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Button Group</h1>
        <p {...stylex.props(storyStyles.description)}>
          Group actions that serve the same purpose into one control.
        </p>
      </header>
      <ComponentExample>
        <div {...stylex.props(storyStyles.preview)}>
          <ButtonGroup aria-label="Navigate back">
            <Button size="icon-sm" variant="secondary" aria-label="Go back">
              <Icon aria-hidden="true" name="chevronLeft" />
            </Button>
          </ButtonGroup>
          <ButtonGroup aria-label="Message actions">
            <Button size="sm" variant="secondary">
              Archive
            </Button>
            <Button size="sm" variant="secondary">
              Report
            </Button>
          </ButtonGroup>
          <ButtonGroup aria-label="More actions">
            <Button size="sm" variant="secondary">
              Snooze
            </Button>
            <Button size="icon-sm" variant="secondary" aria-label="More actions">
              <Icon aria-hidden="true" name="moreHorizontal" />
            </Button>
          </ButtonGroup>
        </div>
      </ComponentExample>

      <ComponentCode usage={buttonGroupExampleCode} />
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
