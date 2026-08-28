import { Input } from "@cachette/ui/input";
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

const componentDocument = getComponentDocument("Input");

export function InputExample() {
  return (
    <>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>기본</h2>
          <p {...stylex.props(storyStyles.description)}>
            입력 전과 입력 후의 기본 표현을 비교합니다.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
          <div {...stylex.props(storyStyles.stack, storyStyles.formWidth)}>
            <Input aria-label="이름" placeholder="홍길동" />
            <Input aria-label="이메일" defaultValue="hello@cachette.dev" />
          </div>
        </div>
      </section>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>입력 유형</h2>
          <p {...stylex.props(storyStyles.description)}>
            입력 유형이 달라도 같은 크기와 상태 규칙을 유지합니다.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
          <div {...stylex.props(storyStyles.stack, storyStyles.formWidth)}>
            <label htmlFor="input-email" {...stylex.props(storyStyles.field)}>
              이메일
              <Input id="input-email" type="email" placeholder="hello@example.com" />
            </label>
            <label htmlFor="input-password" {...stylex.props(storyStyles.field)}>
              비밀번호
              <Input id="input-password" type="password" defaultValue="password" />
            </label>
          </div>
        </div>
      </section>
    </>
  );
}

export const inputExampleCode =
  'import { Input } from "@cachette/ui/input"\n\n<Input aria-label="이메일" placeholder="name@example.com" type="email" />';
