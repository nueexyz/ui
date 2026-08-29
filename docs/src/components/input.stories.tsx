import { Input } from "@dumo/ui/input";
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

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Input");

function InputExample() {
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
            <Input aria-label="이메일" defaultValue="hello@dumo.dev" />
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

const inputExampleCode =
  'import { Input } from "@dumo/ui/input"\n\n<Input aria-label="이메일" placeholder="name@example.com" type="email" />';

export const InputStory: Story = {
  name: "Input",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Input</h1>
        <p {...stylex.props(storyStyles.description)}>
          값의 유무, 입력 유형, 상태에 따른 표현을 비교합니다.
        </p>
      </header>
      <ComponentExample>
        <InputExample />
      </ComponentExample>

      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>설치</h2>
        </header>
        <CodeBlock
          code={`pnpm dlx @dumo/ui add ${componentDocument.registryName}`}
          label="터미널"
          language="bash"
        />
      </section>
      <ComponentCode usage={inputExampleCode} />
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>States</h2>
          <p {...stylex.props(storyStyles.description)}>
            오류와 비활성 상태를 기본 입력과 명확하게 구분합니다.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
          <div {...stylex.props(storyStyles.stack, storyStyles.formWidth)}>
            <Input aria-label="잘못 입력된 이메일" aria-invalid defaultValue="min@" />
            <Input aria-label="수정할 수 없는 이름" disabled defaultValue="홍길동" />
          </div>
        </div>
      </section>
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
