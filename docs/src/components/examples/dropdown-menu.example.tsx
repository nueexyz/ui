import * as stylex from "@stylexjs/stylex";
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
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "../story-layout/StoryLayout";
import { getComponentDocument } from "../story-layout/component-docs";

const componentDocument = getComponentDocument("Dropdown Menu");

export function DropdownMenuExample() {
  return (
    <>
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
    </>
  );
}

export const dropdownMenuExampleCode =
  'import { Button } from "@cachette/ui/button"\nimport { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@cachette/ui/dropdown-menu"\n\n<DropdownMenu>\n  <DropdownMenuTrigger render={<Button variant="secondary">프로젝트 작업</Button>} />\n  <DropdownMenuContent>\n    <DropdownMenuGroup>\n      <DropdownMenuLabel>웹사이트 개편</DropdownMenuLabel>\n      <DropdownMenuItem>이름 바꾸기<DropdownMenuShortcut>⌘R</DropdownMenuShortcut></DropdownMenuItem>\n      <DropdownMenuItem>복제하기<DropdownMenuShortcut>⌘D</DropdownMenuShortcut></DropdownMenuItem>\n    </DropdownMenuGroup>\n    <DropdownMenuSeparator />\n    <DropdownMenuCheckboxItem defaultChecked>즐겨찾기에 표시</DropdownMenuCheckboxItem>\n    <DropdownMenuSeparator />\n    <DropdownMenuItem destructive>프로젝트 삭제하기</DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>';
