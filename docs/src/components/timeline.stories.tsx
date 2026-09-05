import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineIndicator,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "@nuee/ui/timeline";
import { CheckIcon, ClockIcon, WarningIcon } from "@phosphor-icons/react";
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

const registryName = "timeline";

function TimelineExample() {
  return (
    <Timeline {...stylex.props(storyStyles.componentWidth)}>
      <TimelineItem>
        <TimelineIndicator variant="complete">
          <CheckIcon aria-hidden="true" />
        </TimelineIndicator>
        <TimelineContent>
          <TimelineTitle>Order confirmed</TimelineTitle>
          <TimelineDescription>Your payment was approved.</TimelineDescription>
          <TimelineTime dateTime="2026-09-05T09:20:00Z">9:20 AM</TimelineTime>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineIndicator variant="active">
          <ClockIcon aria-hidden="true" />
        </TimelineIndicator>
        <TimelineContent>
          <TimelineTitle>Preparing shipment</TimelineTitle>
          <TimelineDescription>Your items are being packed.</TimelineDescription>
          <TimelineTime dateTime="2026-09-05T10:05:00Z">10:05 AM</TimelineTime>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineIndicator variant="error">
          <WarningIcon aria-hidden="true" />
        </TimelineIndicator>
        <TimelineContent>
          <TimelineTitle>Address needs review</TimelineTitle>
          <TimelineDescription>Update the delivery address to continue.</TimelineDescription>
          <TimelineTime dateTime="2026-09-05T10:24:00Z">10:24 AM</TimelineTime>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineIndicator />
        <TimelineContent>
          <TimelineTitle>Delivered</TimelineTitle>
          <TimelineDescription>The final delivery update will appear here.</TimelineDescription>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}

const timelineExampleCode = `import { CheckIcon } from "@phosphor-icons/react";
import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineIndicator,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "@nuee/ui/timeline";

<Timeline>
  <TimelineItem>
    <TimelineIndicator variant="complete">
      <CheckIcon aria-hidden="true" />
    </TimelineIndicator>
    <TimelineContent>
      <TimelineTitle>Order confirmed</TimelineTitle>
      <TimelineDescription>Your payment was approved.</TimelineDescription>
      <TimelineTime dateTime="2026-09-05T09:20:00Z">9:20 AM</TimelineTime>
    </TimelineContent>
  </TimelineItem>
</Timeline>`;

export const TimelineStory: Story = {
  name: "Timeline",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Timeline</h1>
        <p {...stylex.props(storyStyles.description)}>
          Present ordered activity, status, and event history on a vertical axis.
        </p>
      </header>
      <ComponentExample>
        <TimelineExample />
      </ComponentExample>
      <ComponentCode usage={timelineExampleCode} />
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
