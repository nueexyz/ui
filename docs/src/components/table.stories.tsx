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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@dumo/ui/table";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Table");

const rows = [
  { name: "브랜드 가이드", owner: "민영", status: "완료", updated: "8월 28일" },
  { name: "모바일 내비게이션", owner: "지우", status: "검토 중", updated: "8월 27일" },
  { name: "결제 화면", owner: "서준", status: "진행 중", updated: "8월 25일" },
];

function TableExample() {
  return (
    <section {...stylex.props(storyStyles.section)}>
      <header {...stylex.props(storyStyles.sectionHeader)}>
        <h2 {...stylex.props(storyStyles.sectionTitle)}>프로젝트</h2>
        <p {...stylex.props(storyStyles.description)}>
          열 제목은 짧고 명확하게 쓰고, 같은 종류의 값은 같은 열에 정렬합니다.
        </p>
      </header>
      <div {...stylex.props(storyStyles.preview)}>
        <Table>
          <TableCaption>최근 업데이트된 프로젝트 3개</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>프로젝트</TableHead>
              <TableHead>담당자</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>업데이트</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.owner}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.updated}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>전체 프로젝트</TableCell>
              <TableCell>3개</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </section>
  );
}

const tableExampleCode =
  'import {\n  Table,\n  TableBody,\n  TableCaption,\n  TableCell,\n  TableFooter,\n  TableHead,\n  TableHeader,\n  TableRow,\n} from "@dumo/ui/table"\n\nconst rows = [\n  { name: "브랜드 가이드", owner: "민영", status: "완료", updated: "8월 28일" },\n  { name: "모바일 내비게이션", owner: "지우", status: "검토 중", updated: "8월 27일" },\n  { name: "결제 화면", owner: "서준", status: "진행 중", updated: "8월 25일" },\n]\n\n<Table>\n  <TableCaption>최근 업데이트된 프로젝트 3개</TableCaption>\n  <TableHeader>\n    <TableRow>\n      <TableHead>프로젝트</TableHead>\n      <TableHead>담당자</TableHead>\n      <TableHead>상태</TableHead>\n      <TableHead>업데이트</TableHead>\n    </TableRow>\n  </TableHeader>\n  <TableBody>\n    {rows.map((row) => (\n      <TableRow key={row.name}>\n        <TableCell>{row.name}</TableCell>\n        <TableCell>{row.owner}</TableCell>\n        <TableCell>{row.status}</TableCell>\n        <TableCell>{row.updated}</TableCell>\n      </TableRow>\n    ))}\n  </TableBody>\n  <TableFooter>\n    <TableRow>\n      <TableCell colSpan={3}>전체 프로젝트</TableCell>\n      <TableCell>3개</TableCell>\n    </TableRow>\n  </TableFooter>\n</Table>';

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
          code={`pnpm dlx @dumo/ui add ${componentDocument.registryName}`}
          label="터미널"
          language="bash"
        />
      </section>
      <ComponentCode usage={tableExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
