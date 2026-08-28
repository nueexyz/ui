import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@cachette/ui/context-menu";
import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "../story-layout/StoryLayout";
import { getComponentDocument } from "../story-layout/component-docs";

const componentDocument = getComponentDocument("Context Menu");

export function ContextMenuExample() {
  return (
    <>
      <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
        <ContextMenu>
          <ContextMenuTrigger {...stylex.props(storyStyles.contextTarget)}>
            프로젝트-제안서.pdf
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>
              미리 보기<ContextMenuShortcut>Space</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              이름 바꾸기<ContextMenuShortcut>⌘R</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>
              다운로드<ContextMenuShortcut>⌘D</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>
    </>
  );
}

export const contextMenuExampleCode =
  'import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuTrigger } from "@cachette/ui/context-menu"\n\n<ContextMenu>\n  <ContextMenuTrigger>프로젝트-제안서.pdf</ContextMenuTrigger>\n  <ContextMenuContent>\n    <ContextMenuItem>미리 보기<ContextMenuShortcut>Space</ContextMenuShortcut></ContextMenuItem>\n    <ContextMenuItem>이름 바꾸기<ContextMenuShortcut>⌘R</ContextMenuShortcut></ContextMenuItem>\n    <ContextMenuSeparator />\n    <ContextMenuItem>다운로드<ContextMenuShortcut>⌘D</ContextMenuShortcut></ContextMenuItem>\n  </ContextMenuContent>\n</ContextMenu>';
