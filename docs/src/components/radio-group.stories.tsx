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
import { Field, FieldLabel } from "@cachette/ui/field";
import { RadioGroup, RadioGroupItem } from "@cachette/ui/radio-group";

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
        <FieldLabel>알림 빈도</FieldLabel>
        <RadioGroup defaultValue="daily">
          <label htmlFor="frequency-daily" {...stylex.props(storyStyles.option)}>
            <RadioGroupItem id="frequency-daily" value="daily" />
            매일
          </label>
          <label htmlFor="frequency-weekly" {...stylex.props(storyStyles.option)}>
            <RadioGroupItem id="frequency-weekly" value="weekly" />
            매주
          </label>
          <label htmlFor="frequency-never" {...stylex.props(storyStyles.option)}>
            <RadioGroupItem id="frequency-never" value="never" />
            받지 않기
          </label>
        </RadioGroup>
      </Field>
    </div>
  );
}

const radioGroupExampleCode =
  'import { Field, FieldLabel } from "@cachette/ui/field"\nimport { RadioGroup, RadioGroupItem } from "@cachette/ui/radio-group"\n\n<Field>\n  <FieldLabel>알림 빈도</FieldLabel>\n  <RadioGroup defaultValue="daily">\n    <label><RadioGroupItem value="daily" />매일</label>\n    <label><RadioGroupItem value="weekly" />매주</label>\n    <label><RadioGroupItem value="never" />받지 않기</label>\n  </RadioGroup>\n</Field>';

export const RadioGroupStory: Story = {
  name: "Radio Group",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Radio Group</h1>
        <p {...stylex.props(storyStyles.description)}>
          여러 선택지 중 하나만 결정할 때 사용합니다.
        </p>
      </header>
      <ComponentExample>
        <RadioGroupExample />
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
      <ComponentCode usage={radioGroupExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
