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
import { Field, FieldLabel } from "@nooeh/ui/field";
import { RadioGroup, RadioGroupItem } from "@nooeh/ui/radio-group";

const meta = {
  title: "Components",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Radio Group");

function RadioGroupExample() {
  return (
    <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
      <Field>
        <FieldLabel>Notification frequency</FieldLabel>
        <RadioGroup defaultValue="daily">
          <label htmlFor="frequency-daily" {...stylex.props(storyStyles.option)}>
            <RadioGroupItem id="frequency-daily" value="daily" />
            Daily
          </label>
          <label htmlFor="frequency-weekly" {...stylex.props(storyStyles.option)}>
            <RadioGroupItem id="frequency-weekly" value="weekly" />
            Weekly
          </label>
          <label htmlFor="frequency-never" {...stylex.props(storyStyles.option)}>
            <RadioGroupItem id="frequency-never" value="never" />
            Never
          </label>
        </RadioGroup>
      </Field>
    </div>
  );
}

const radioGroupExampleCode =
  'import { Field, FieldLabel } from "@nooeh/ui/field"\nimport { RadioGroup, RadioGroupItem } from "@nooeh/ui/radio-group"\n\n<Field>\n  <FieldLabel>Notification frequency</FieldLabel>\n  <RadioGroup defaultValue="daily">\n    <label><RadioGroupItem value="daily" />Daily</label>\n    <label><RadioGroupItem value="weekly" />Weekly</label>\n    <label><RadioGroupItem value="never" />Never</label>\n  </RadioGroup>\n</Field>';

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

      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Install</h2>
        </header>
        <CodeBlock
          code={`pnpm dlx @nooeh/ui add ${componentDocument.registryName}`}
          label="Terminal"
          language="bash"
        />
      </section>
      <ComponentCode usage={radioGroupExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
