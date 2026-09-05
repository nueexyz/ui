import { DatePicker } from "@nuee/ui/date-picker";
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

const registryName = "date-picker";

function DatePickerExample() {
  const [date, setDate] = useState<Date>();

  return (
    <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
      <DatePicker onValueChange={setDate} value={date} />
    </div>
  );
}

const datePickerExampleCode =
  'import { DatePicker } from "@nuee/ui/date-picker"\n\n<DatePicker value={date} onValueChange={setDate} />';

export const DatePickerStory: Story = {
  name: "Date Picker",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Date Picker</h1>
        <p {...stylex.props(storyStyles.description)}>
          Select a date from a calendar that opens from a compact trigger.
        </p>
      </header>
      <ComponentExample>
        <DatePickerExample />
      </ComponentExample>
      <ComponentCode usage={datePickerExampleCode} />
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
