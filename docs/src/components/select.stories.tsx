import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  storyStyles,
} from "./story-layout/StoryLayout";
import { Field, FieldDescription, FieldLabel } from "@nooeh/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@nooeh/ui/select";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const registryName = "select";

function SelectExample() {
  return (
    <div {...stylex.props(storyStyles.preview)}>
      <Field>
        <FieldLabel>Theme</FieldLabel>
        <Select
          defaultValue="system"
          items={{ dark: "Dark", light: "Light", system: "System setting" }}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Display mode</SelectLabel>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System setting</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectItem disabled value="contrast">
              High contrast
            </SelectItem>
          </SelectContent>
        </Select>
        <FieldDescription>The selected theme is saved on this device.</FieldDescription>
      </Field>
    </div>
  );
}

const selectExampleCode =
  'import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@nooeh/ui/select"\n\n<Select defaultValue="design">\n  <SelectTrigger aria-label="Select team">\n    <SelectValue />\n  </SelectTrigger>\n  <SelectContent>\n    <SelectItem value="design">Design</SelectItem>\n    <SelectItem value="development">Development</SelectItem>\n  </SelectContent>\n</Select>';

export const SelectStory: Story = {
  name: "Select",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Select</h1>
        <p {...stylex.props(storyStyles.description)}>Choose one option from a defined list.</p>
      </header>
      <ComponentExample>
        <SelectExample />
      </ComponentExample>

      <ComponentCode usage={selectExampleCode} />
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
