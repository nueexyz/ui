import { Field, FieldDescription, FieldLabel } from "@cachette/ui/field";
import { Slider } from "@cachette/ui/slider";
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
import { SliderExample, sliderExampleCode } from "./examples/slider.example";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Slider");
export const SliderStory: Story = {
  name: "Slider",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Slider</h1>
        <p {...stylex.props(storyStyles.description)}>정해진 범위에서 값을 빠르게 조절합니다.</p>
      </header>
      <ComponentExample>
        <SliderExample />
      </ComponentExample>

      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>설치</h2>
        </header>
        <CodeBlock
          code={`pnpm dlx @cachette/ui add ${componentDocument.registryName}`}
          label="터미널"
          language="bash"
        />
      </section>
      <ComponentCode usage={sliderExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
