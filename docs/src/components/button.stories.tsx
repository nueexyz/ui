import * as stylex from "@stylexjs/stylex";
import { Button } from "@dumo/ui/button";
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

const componentDocument = getComponentDocument("Button");

function ButtonExample() {
  return (
    <div {...stylex.props(storyStyles.preview)}>
      <Button>저장하기</Button>
    </div>
  );
}

const buttonExampleCode =
  'import { Button } from "@dumo/ui/button"\n\n<Button>저장하기</Button>';

export const ButtonStory: Story = {
  name: "Button",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Button</h1>
        <p {...stylex.props(storyStyles.description)}>
          행동의 중요도, 크기, 상태에 따른 표현을 비교합니다.
        </p>
      </header>
      <ComponentExample>
        <ButtonExample />
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
      <ComponentCode usage={buttonExampleCode} />
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Variants</h2>
          <p {...stylex.props(storyStyles.description)}>
            행동의 우선순위와 위험도에 맞는 표현을 선택합니다.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview)}>
          <Button>저장하기</Button>
          <Button variant="secondary">미리보기</Button>
          <Button variant="ghost">닫기</Button>
          <Button variant="destructive">삭제하기</Button>
        </div>
      </section>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Variants</h2>
          <p {...stylex.props(storyStyles.description)}>
            강조 배경 위에서도 행동의 위계와 대비를 유지합니다.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview, storyStyles.inverse)}>
          <Button variant="secondary" xstyle={storyStyles.inverseSecondary}>
            이전으로
          </Button>
          <Button variant="ghost" xstyle={storyStyles.inverseGhost}>
            닫기
          </Button>
        </div>
      </section>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Sizes</h2>
          <p {...stylex.props(storyStyles.description)}>
            화면의 정보 밀도에 맞는 크기를 선택합니다.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview)}>
          <Button size="sm">저장하기</Button>
          <Button size="md">저장하기</Button>
          <Button size="lg">저장하기</Button>
        </div>
      </section>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>States</h2>
          <p {...stylex.props(storyStyles.description)}>
            사용 가능 여부와 처리 상태가 명확하게 구분되어야 합니다.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview)}>
          <Button>저장하기</Button>
          <Button disabled>저장할 수 없음</Button>
          <Button disabled variant="secondary">
            미리볼 수 없음
          </Button>
          <Button disabled variant="ghost">
            닫을 수 없음
          </Button>
          <Button isLoading>저장 중</Button>
        </div>
      </section>
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
