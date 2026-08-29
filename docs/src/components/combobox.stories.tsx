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
        <FieldLabel>프레임워크</FieldLabel>
        <Combobox items={frameworks}>
          <ComboboxInput placeholder="프레임워크 검색" />
          <ComboboxContent>
            <ComboboxEmpty>일치하는 프레임워크가 없습니다.</ComboboxEmpty>
            <ComboboxCollection>
              {(framework: string) => (
                <ComboboxItem key={framework} value={framework}>
                  {framework}
                </ComboboxItem>
              )}
            </ComboboxCollection>
          </ComboboxContent>
        </Combobox>
        <FieldDescription>프로젝트에서 사용하는 프레임워크를 선택하세요.</FieldDescription>
      </Field>
    </div>
  );
}

const comboboxExampleCode =
  'import { Combobox, ComboboxCollection, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem } from "@dumo/ui/combobox"\nimport { Field, FieldDescription, FieldLabel } from "@dumo/ui/field"\n\nconst frameworks = ["React", "Vue", "Svelte"]\n\n<Field>\n  <FieldLabel>프레임워크</FieldLabel>\n  <Combobox items={frameworks}>\n    <ComboboxInput placeholder="프레임워크 검색" />\n    <ComboboxContent>\n      <ComboboxEmpty>일치하는 프레임워크가 없습니다.</ComboboxEmpty>\n      <ComboboxCollection>\n        {(framework) => <ComboboxItem key={framework} value={framework}>{framework}</ComboboxItem>}\n      </ComboboxCollection>\n    </ComboboxContent>\n  </Combobox>\n  <FieldDescription>프로젝트에서 사용하는 프레임워크를 선택하세요.</FieldDescription>\n</Field>';

export const ComboboxStory: Story = {
  name: "Combobox",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Combobox</h1>
        <p {...stylex.props(storyStyles.description)}>
          선택지가 많을 때 검색으로 범위를 좁혀 항목을 고릅니다.
        </p>
      </header>
      <ComponentExample>
        <ComboboxExample />
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
      <ComponentCode usage={comboboxExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
