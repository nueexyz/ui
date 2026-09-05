import { Calendar } from "@nuee/ui/calendar";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as stylex from "@stylexjs/stylex";
import { useState } from "react";

import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  storyStyles,
} from "./story-layout/StoryLayout";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const registryName = "calendar";

function CalendarExample() {
  const [date, setDate] = useState<Date>();

  return (
    <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
      <Calendar mode="single" onSelect={setDate} selected={date} />
    </div>
  );
}

const calendarExampleCode =
  'import { Calendar } from "@nuee/ui/calendar"\n\n<Calendar mode="single" selected={date} onSelect={setDate} />';

export const CalendarStory: Story = {
  name: "Calendar",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Calendar</h1>
        <p {...stylex.props(storyStyles.description)}>
          Display a calendar for selecting one or more dates.
        </p>
      </header>
      <ComponentExample>
        <CalendarExample />
      </ComponentExample>
      <ComponentCode usage={calendarExampleCode} />
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Range selection</h2>
          <p {...stylex.props(storyStyles.description)}>
            Set the selection mode to range when a start and end date belong together.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview)}>
          <Calendar mode="range" numberOfMonths={2} />
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
