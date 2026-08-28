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
import { Button } from "@cachette/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@cachette/ui/dropdown-menu";

const meta = {
  title: "Components",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Dropdown Menu");

function DropdownMenuExample() {
  return (
    <div {...stylex.props(storyStyles.preview)}>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="secondary">프로젝트 작업</Button>} />
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>웹사이트 개편</DropdownMenuLabel>
            <DropdownMenuItem>
              이름 바꾸기<DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              복제하기<DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem defaultChecked>즐겨찾기에 표시</DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem destructive>프로젝트 삭제하기</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const dropdownMenuExampleCode =
  'import { Button } from "@cachette/ui/button"\nimport { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@cachette/ui/dropdown-menu"\n\n<DropdownMenu>\n  <DropdownMenuTrigger render={<Button variant="secondary">프로젝트 작업</Button>} />\n  <DropdownMenuContent>\n    <DropdownMenuGroup>\n      <DropdownMenuLabel>웹사이트 개편</DropdownMenuLabel>\n      <DropdownMenuItem>이름 바꾸기<DropdownMenuShortcut>⌘R</DropdownMenuShortcut></DropdownMenuItem>\n      <DropdownMenuItem>복제하기<DropdownMenuShortcut>⌘D</DropdownMenuShortcut></DropdownMenuItem>\n    </DropdownMenuGroup>\n    <DropdownMenuSeparator />\n    <DropdownMenuCheckboxItem defaultChecked>즐겨찾기에 표시</DropdownMenuCheckboxItem>\n    <DropdownMenuSeparator />\n    <DropdownMenuItem destructive>프로젝트 삭제하기</DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>';

export const DropdownMenuStory: Story = {
  name: "Dropdown Menu",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Dropdown Menu</h1>
        <p {...stylex.props(storyStyles.description)}>
          현재 대상에 적용할 수 있는 행동과 설정을 버튼에서 엽니다.
        </p>
      </header>
      <ComponentExample>
        <DropdownMenuExample />
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
      <ComponentCode usage={dropdownMenuExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
