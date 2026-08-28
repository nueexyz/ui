import * as stylex from "@stylexjs/stylex";
import { Button } from "@cachette/ui/button";
import { ButtonGroup, ButtonGroupText } from "@cachette/ui/button-group";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "../story-layout/StoryLayout";
import { getComponentDocument } from "../story-layout/component-docs";

const componentDocument = getComponentDocument("Button Group");

export function ButtonGroupExample() {
  return (
    <>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>관련 행동</h2>
          <p {...stylex.props(storyStyles.description)}>
            가장 자주 사용하는 행동을 먼저 배치합니다.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview)}>
          <ButtonGroup aria-label="문서 작업">
            <ButtonGroupText>문서</ButtonGroupText>
            <Button variant="ghost">공유하기</Button>
            <Button variant="ghost">내보내기</Button>
          </ButtonGroup>
        </div>
      </section>
    </>
  );
}

export const buttonGroupExampleCode =
  'import { Button } from "@cachette/ui/button"\nimport { ButtonGroup, ButtonGroupText } from "@cachette/ui/button-group"\n\n<ButtonGroup aria-label="문서 작업">\n  <ButtonGroupText>문서</ButtonGroupText>\n  <Button variant="ghost">공유하기</Button>\n  <Button variant="ghost">내보내기</Button>\n</ButtonGroup>';
