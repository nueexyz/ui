import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  storyStyles,
} from "./story-layout/StoryLayout";
import { Field, FieldLabel } from "@nooeh/ui/field";
import { Label } from "@nooeh/ui/label";
import { RadioGroup, RadioGroupItem } from "@nooeh/ui/radio-group";

const meta = {
  title: "Components",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const registryName = "radio-group";

function RadioGroupExample() {
  return (
    <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
      <Field>
        <FieldLabel>Notification frequency</FieldLabel>
        <RadioGroup defaultValue="daily">
          <Label {...stylex.props(storyStyles.option)}>
            <RadioGroupItem value="daily" />
            Daily
          </Label>
          <Label {...stylex.props(storyStyles.option)}>
            <RadioGroupItem value="weekly" />
            Weekly
          </Label>
          <Label {...stylex.props(storyStyles.option)}>
            <RadioGroupItem value="never" />
            Never
          </Label>
        </RadioGroup>
      </Field>
    </div>
  );
}

const radioGroupExampleCode =
  'import { Field, FieldLabel } from "@nooeh/ui/field"\nimport { Label } from "@nooeh/ui/label"\nimport { RadioGroup, RadioGroupItem } from "@nooeh/ui/radio-group"\n\n<Field>\n  <FieldLabel>Notification frequency</FieldLabel>\n  <RadioGroup defaultValue="daily">\n    <Label>\n      <RadioGroupItem value="daily" />\n      Daily\n    </Label>\n    <Label>\n      <RadioGroupItem value="weekly" />\n      Weekly\n    </Label>\n  </RadioGroup>\n</Field>';

export const RadioGroupStory: Story = {
  name: "Radio Group",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Radio Group</h1>
        <p {...stylex.props(storyStyles.description)}>
          Use it when exactly one option must be selected.
        </p>
      </header>
      <ComponentExample>
        <RadioGroupExample />
      </ComponentExample>

      <ComponentCode usage={radioGroupExampleCode} />
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
