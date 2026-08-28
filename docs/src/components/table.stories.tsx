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
import { StoryPage, StoryPreview, StorySection } from "./story-layout/StoryLayout";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const rows = [
  { name: "브랜드 가이드", owner: "민영", status: "완료", updated: "8월 28일" },
  { name: "모바일 내비게이션", owner: "지우", status: "검토 중", updated: "8월 27일" },
  { name: "결제 화면", owner: "서준", status: "진행 중", updated: "8월 25일" },
];

export const TableStory: Story = {
  name: "Table",
  render: () => (
    <StoryPage title="Table" description="여러 항목의 같은 속성을 행과 열로 비교할 수 있게 합니다.">
      <StorySection
        title="프로젝트"
        description="열 제목은 짧고 명확하게 쓰고, 같은 종류의 값은 같은 열에 정렬합니다."
      >
        <StoryPreview>
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
        </StoryPreview>
      </StorySection>
    </StoryPage>
  ),
};
