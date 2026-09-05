import { Button } from "@nuee/ui/button";
import { Spinner } from "@nuee/ui/spinner";
import { PlusIcon } from "@phosphor-icons/react";
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

const registryName = "button";

function ButtonExample() {
  return (
    <div {...stylex.props(storyStyles.preview)}>
      <Button>Save</Button>
    </div>
  );
}

const buttonExampleCode = 'import { Button } from "@nuee/ui/button"\n\n<Button>Save</Button>';

export const ButtonStory: Story = {
  name: "Button",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Button</h1>
        <p {...stylex.props(storyStyles.description)}>
          Compare presentations by action priority, size, and state.
        </p>
      </header>
      <ComponentExample>
        <ButtonExample />
      </ComponentExample>

      <ComponentCode usage={buttonExampleCode} />
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
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Variants</h2>
          <p {...stylex.props(storyStyles.description)}>
            Choose a treatment that matches an action’s priority and risk.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview)}>
          <Button>Save</Button>
          <Button variant="secondary">Preview</Button>
          <Button variant="ghost">Close</Button>
          <Button variant="destructive">Delete</Button>
        </div>
      </section>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Sizes</h2>
          <p {...stylex.props(storyStyles.description)}>
            Choose a size that matches the screen’s information density.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview)}>
          <Button size="sm">Save</Button>
          <Button size="md">Save</Button>
          <Button size="lg">Save</Button>
        </div>
      </section>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Icon buttons</h2>
          <p {...stylex.props(storyStyles.description)}>
            Use an icon size and an accessible name when the action has no text label.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview)}>
          <Button aria-label="Add item" size="icon-xs">
            <PlusIcon aria-hidden="true" />
          </Button>
          <Button aria-label="Add item" size="icon-sm">
            <PlusIcon aria-hidden="true" />
          </Button>
          <Button aria-label="Add item" size="icon">
            <PlusIcon aria-hidden="true" />
          </Button>
          <Button aria-label="Add item" size="icon-lg">
            <PlusIcon aria-hidden="true" />
          </Button>
        </div>
      </section>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>States</h2>
          <p {...stylex.props(storyStyles.description)}>
            Availability and processing state should be clearly distinguishable.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview)}>
          <Button>Save</Button>
          <Button disabled>Save unavailable</Button>
          <Button disabled variant="secondary">
            Preview unavailable
          </Button>
          <Button disabled variant="ghost">
            Close unavailable
          </Button>
          <Button disabled>
            <Spinner aria-hidden="true" label="" />
            Saving
          </Button>
        </div>
      </section>
    </main>
  ),
};
