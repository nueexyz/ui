import * as stylex from "@stylexjs/stylex";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@cachette/ui/table";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "./story-layout/StoryLayout";
import { getComponentDocument } from "./story-layout/component-docs";
import { TableExample, tableExampleCode } from "./examples/table.example";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Table");

const rows = [
  { name: "브랜드 가이드", owner: "민영", status: "완료", updated: "8월 28일" },
  { name: "모바일 내비게이션", owner: "지우", status: "검토 중", updated: "8월 27일" },
  { name: "결제 화면", owner: "서준", status: "진행 중", updated: "8월 25일" },
];

export const TableStory: Story = {
  name: "Table",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Table</h1>
        <p {...stylex.props(storyStyles.description)}>
          여러 항목의 같은 속성을 행과 열로 비교할 수 있게 합니다.
        </p>
      </header>
      <ComponentExample>
        <TableExample />
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
      <ComponentCode usage={tableExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
