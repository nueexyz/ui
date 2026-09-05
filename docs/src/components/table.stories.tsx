import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@nuee/ui/table";
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

const registryName = "table";

const rows = [
  { name: "Brand guide", owner: "Minyeong", status: "Complete", updated: "Aug 28" },
  { name: "Mobile navigation", owner: "Jiwoo", status: "In review", updated: "Aug 27" },
  { name: "Payment screen", owner: "Seojun", status: "In progress", updated: "Aug 25" },
];

function TableExample() {
  return (
    <section {...stylex.props(storyStyles.section)}>
      <header {...stylex.props(storyStyles.sectionHeader)}>
        <h2 {...stylex.props(storyStyles.sectionTitle)}>Projects</h2>
        <p {...stylex.props(storyStyles.description)}>
          Keep column titles short and clear, and align similar values in the same column.
        </p>
      </header>
      <div {...stylex.props(storyStyles.preview)}>
        <Table>
          <TableCaption>Three recently updated projects</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Updated</TableHead>
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
              <TableCell colSpan={3}>All projects</TableCell>
              <TableCell>3</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </section>
  );
}

const tableExampleCode =
  'import {\n  Table,\n  TableBody,\n  TableCaption,\n  TableCell,\n  TableFooter,\n  TableHead,\n  TableHeader,\n  TableRow,\n} from "@nuee/ui/table"\n\nconst rows = [\n  { name: "Brand guide", owner: "Minyeong", status: "Complete", updated: "Aug 28" },\n  { name: "Mobile navigation", owner: "Jiwoo", status: "In review", updated: "Aug 27" },\n  { name: "Payment screen", owner: "Seojun", status: "In progress", updated: "Aug 25" },\n]\n\n<Table>\n  <TableCaption>Three recently updated projects</TableCaption>\n  <TableHeader>\n    <TableRow>\n      <TableHead>Project</TableHead>\n      <TableHead>Owner</TableHead>\n      <TableHead>Status</TableHead>\n      <TableHead>Updated</TableHead>\n    </TableRow>\n  </TableHeader>\n  <TableBody>\n    {rows.map((row) => (\n      <TableRow key={row.name}>\n        <TableCell>{row.name}</TableCell>\n        <TableCell>{row.owner}</TableCell>\n        <TableCell>{row.status}</TableCell>\n        <TableCell>{row.updated}</TableCell>\n      </TableRow>\n    ))}\n  </TableBody>\n  <TableFooter>\n    <TableRow>\n      <TableCell colSpan={3}>All projects</TableCell>\n      <TableCell>3</TableCell>\n    </TableRow>\n  </TableFooter>\n</Table>';

export const TableStory: Story = {
  name: "Table",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Table</h1>
        <p {...stylex.props(storyStyles.description)}>
          Compare the same attributes across multiple items in rows and columns.
        </p>
      </header>
      <ComponentExample>
        <TableExample />
      </ComponentExample>

      <ComponentCode usage={tableExampleCode} />
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
