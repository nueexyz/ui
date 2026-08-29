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
import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
} from "@dumo/ui/combobox";
import { Field, FieldDescription, FieldLabel } from "@dumo/ui/field";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Combobox");

const frameworks = ["React", "Vue", "Svelte", "Solid", "Angular"];

function ComboboxExample() {
  return (
    <div {...stylex.props(storyStyles.preview)}>
      <Field>
        <FieldLabel>Framework</FieldLabel>
        <Combobox items={frameworks}>
          <ComboboxInput placeholder="Search frameworks" />
          <ComboboxContent>
            <ComboboxEmpty>No matching frameworks.</ComboboxEmpty>
            <ComboboxCollection>
              {(framework: string) => (
                <ComboboxItem key={framework} value={framework}>
                  {framework}
                </ComboboxItem>
              )}
            </ComboboxCollection>
          </ComboboxContent>
        </Combobox>
        <FieldDescription>Select the framework used in your project.</FieldDescription>
      </Field>
    </div>
  );
}

const comboboxExampleCode =
  'import { Combobox, ComboboxCollection, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem } from "@dumo/ui/combobox"\nimport { Field, FieldDescription, FieldLabel } from "@dumo/ui/field"\n\nconst frameworks = ["React", "Vue", "Svelte"]\n\n<Field>\n  <FieldLabel>Framework</FieldLabel>\n  <Combobox items={frameworks}>\n    <ComboboxInput placeholder="Search frameworks" />\n    <ComboboxContent>\n      <ComboboxEmpty>No matching frameworks.</ComboboxEmpty>\n      <ComboboxCollection>\n        {(framework) => <ComboboxItem key={framework} value={framework}>{framework}</ComboboxItem>}\n      </ComboboxCollection>\n    </ComboboxContent>\n  </Combobox>\n  <FieldDescription>Select the framework used in your project.</FieldDescription>\n</Field>';

export const ComboboxStory: Story = {
  name: "Combobox",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Combobox</h1>
        <p {...stylex.props(storyStyles.description)}>
          Narrow a long list with search before choosing an option.
        </p>
      </header>
      <ComponentExample>
        <ComboboxExample />
      </ComponentExample>

      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Install</h2>
        </header>
        <CodeBlock
          code={`pnpm dlx @dumo/ui add ${componentDocument.registryName}`}
          label="Terminal"
          language="bash"
        />
      </section>
      <ComponentCode usage={comboboxExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
