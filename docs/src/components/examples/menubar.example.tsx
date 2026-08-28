import * as stylex from "@stylexjs/stylex";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@cachette/ui/menubar";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "../story-layout/StoryLayout";
import { getComponentDocument } from "../story-layout/component-docs";

const componentDocument = getComponentDocument("Menubar");

export function MenubarExample() {
  return (
    <>
      <div {...stylex.props(storyStyles.preview)}>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>파일</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                새 문서<MenubarShortcut>⌘N</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                열기<MenubarShortcut>⌘O</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                저장<MenubarShortcut>⌘S</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>편집</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                실행 취소<MenubarShortcut>⌘Z</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                다시 실행<MenubarShortcut>⇧⌘Z</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </>
  );
}

export const menubarExampleCode =
  'import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "@cachette/ui/menubar"\n\n<Menubar>\n  <MenubarMenu>\n    <MenubarTrigger>파일</MenubarTrigger>\n    <MenubarContent>\n      <MenubarItem>새 문서<MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>\n      <MenubarItem>열기<MenubarShortcut>⌘O</MenubarShortcut></MenubarItem>\n      <MenubarSeparator />\n      <MenubarItem>저장<MenubarShortcut>⌘S</MenubarShortcut></MenubarItem>\n    </MenubarContent>\n  </MenubarMenu>\n</Menubar>';
