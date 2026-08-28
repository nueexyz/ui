import { Textarea } from "@cachette/ui/textarea";
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

const componentDocument = getComponentDocument("Textarea");

export function TextareaExample() {
  return (
    <>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>기본</h2>
          <p {...stylex.props(storyStyles.description)}>
            플레이스홀더는 입력 형식을 보여주는 짧은 예시로 사용합니다.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
          <div {...stylex.props(storyStyles.stack, storyStyles.formWidth)}>
            <Textarea aria-label="메모" placeholder="회의에서 결정한 내용을 적어 주세요." />
            <Textarea
              aria-label="수정할 수 없는 메모"
              disabled
              defaultValue="검토가 끝난 메모입니다."
            />
          </div>
        </div>
      </section>
    </>
  );
}

export const textareaExampleCode =
  'import { Textarea } from "@cachette/ui/textarea"\n\n<>\n  <Textarea aria-label="메모" placeholder="회의에서 결정한 내용을 적어 주세요." />\n  <Textarea aria-label="수정할 수 없는 메모" disabled defaultValue="검토가 끝난 메모입니다." />\n</>';
