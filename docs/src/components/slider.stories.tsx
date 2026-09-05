import { Field, FieldDescription, FieldLabel } from "@nuee/ui/field";
import { Slider } from "@nuee/ui/slider";
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

const registryName = "slider";

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
  'import { Slider } from "@nuee/ui/slider"\n\n<Slider aria-label="Volume" defaultValue={40} />';

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

      <ComponentCode usage={sliderExampleCode} />
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>States</h2>
          <p {...stylex.props(storyStyles.description)}>
            Keep an unavailable value distinct from an adjustable one.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
          <Slider aria-label="Adjustable volume" defaultValue={[60]} />
          <Slider aria-label="Unavailable volume" defaultValue={[60]} disabled />
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
