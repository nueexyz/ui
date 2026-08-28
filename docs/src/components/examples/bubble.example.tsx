import * as stylex from "@stylexjs/stylex";
import { Bubble } from "@cachette/ui/bubble";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "../story-layout/StoryLayout";
import { getComponentDocument } from "../story-layout/component-docs";

const componentDocument = getComponentDocument("Bubble");

export function BubbleExample() {
  return (
    <>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>대화</h2>
          <p {...stylex.props(storyStyles.description)}>
            보낸 메시지와 받은 메시지는 정렬 방향으로 먼저 구분합니다.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
          <Bubble>오늘 회의 자료를 확인해 줄 수 있을까요?</Bubble>
          <Bubble side="outgoing" variant="outline">
            네, 오후 3시 전까지 의견을 남길게요.
          </Bubble>
        </div>
      </section>
    </>
  );
}

export const bubbleExampleCode =
  'import { Bubble } from "@cachette/ui/bubble"\n\n<Bubble>오늘 회의 자료를 확인해 줄 수 있을까요?</Bubble>';
