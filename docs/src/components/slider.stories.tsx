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
import { Field, FieldDescription, FieldLabel } from "@dumo/ui/field";
import { Slider } from "@dumo/ui/slider";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Slider");

function SliderExample() {
  return (
    <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
      <div {...stylex.props(storyStyles.stack, storyStyles.formWidth)}>
        <Field>
          <FieldLabel>Notification volume</FieldLabel>
          <Slider defaultValue={40} />
          <FieldDescription>Use the arrow keys for fine adjustments.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel>Price range</FieldLabel>
          <Slider
            defaultValue={[20, 80]}
            getAriaLabel={(index) => (index === 0 ? "Minimum price" : "Maximum price")}
          />
        </Field>
      </div>
    </div>
  );
}

const sliderExampleCode =
  'import { Slider } from "@dumo/ui/slider"\n\n<Slider aria-label="Volume" defaultValue={40} />';

export const SliderStory: Story = {
  name: "Slider",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Slider</h1>
        <p {...stylex.props(storyStyles.description)}>
          Quickly adjust a value within a defined range.
        </p>
      </header>
      <ComponentExample>
        <SliderExample />
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
      <ComponentCode usage={sliderExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
