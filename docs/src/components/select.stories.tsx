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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@dumo/ui/select";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Select");

function SelectExample() {
  return (
    <div {...stylex.props(storyStyles.preview)}>
      <Field>
        <FieldLabel>테마</FieldLabel>
        <Select
          defaultValue="system"
          items={{ dark: "다크", light: "라이트", system: "시스템 설정" }}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>화면 모드</SelectLabel>
              <SelectItem value="light">라이트</SelectItem>
              <SelectItem value="dark">다크</SelectItem>
              <SelectItem value="system">시스템 설정</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectItem disabled value="contrast">
              고대비
            </SelectItem>
          </SelectContent>
        </Select>
        <FieldDescription>선택한 테마는 이 기기에 저장됩니다.</FieldDescription>
      </Field>
    </div>
  );
}

const selectExampleCode =
  'import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@dumo/ui/select"\n\n<Select defaultValue="design">\n  <SelectTrigger aria-label="팀 선택">\n    <SelectValue />\n  </SelectTrigger>\n  <SelectContent>\n    <SelectItem value="design">디자인</SelectItem>\n    <SelectItem value="development">개발</SelectItem>\n  </SelectContent>\n</Select>';

export const SelectStory: Story = {
  name: "Select",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Select</h1>
        <p {...stylex.props(storyStyles.description)}>정해진 선택지 중 하나를 고릅니다.</p>
      </header>
      <ComponentExample>
        <SelectExample />
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
      <ComponentCode usage={selectExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
