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
          <FieldLabel>알림 음량</FieldLabel>
          <Slider defaultValue={40} />
          <FieldDescription>키보드 방향키로 세밀하게 조절할 수 있습니다.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel>가격 범위</FieldLabel>
          <Slider
            defaultValue={[20, 80]}
            getAriaLabel={(index) => (index === 0 ? "최저 가격" : "최고 가격")}
          />
        </Field>
      </div>
    </div>
  );
}

const sliderExampleCode =
  'import { Slider } from "@dumo/ui/slider"\n\n<Slider aria-label="볼륨" defaultValue={40} />';

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
          code={`pnpm dlx @dumo/ui add ${componentDocument.registryName}`}
          label="터미널"
          language="bash"
        />
      </section>
      <ComponentCode usage={sliderExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
