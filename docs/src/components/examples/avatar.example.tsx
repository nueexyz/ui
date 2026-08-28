import * as stylex from "@stylexjs/stylex";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@cachette/ui/avatar";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "../story-layout/StoryLayout";
import { getComponentDocument } from "../story-layout/component-docs";

const componentDocument = getComponentDocument("Avatar");

export function AvatarExample() {
  return (
    <>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>그룹</h2>
          <p {...stylex.props(storyStyles.description)}>
            함께 참여한 사람을 한 묶음으로 보여줍니다.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview)}>
          <AvatarGroup>
            <Avatar>
              <AvatarFallback>김</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>이</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>박</AvatarFallback>
            </Avatar>
            <AvatarGroupCount>+4</AvatarGroupCount>
          </AvatarGroup>
        </div>
      </section>
    </>
  );
}

export const avatarExampleCode =
  'import { Avatar, AvatarFallback } from "@cachette/ui/avatar"\n\n<Avatar>\n  <AvatarFallback>MY</AvatarFallback>\n</Avatar>';
