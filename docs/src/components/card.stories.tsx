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
import { Button } from "@dumo/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@dumo/ui/card";
import { Input } from "@dumo/ui/input";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Card");

function CardExample() {
  return (
    <>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>기본 구조</h2>
          <p {...stylex.props(storyStyles.description)}>
            제목, 설명, 본문, 행동 영역을 목적에 맞게 조합합니다.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview)}>
          <div {...stylex.props(storyStyles.grid)}>
            <Card>
              <CardHeader>
                <CardTitle>프로젝트를 보관할까요?</CardTitle>
                <CardDescription>보관한 프로젝트는 목록에서 숨겨집니다.</CardDescription>
              </CardHeader>
              <CardContent>설정에서 언제든 다시 복원할 수 있습니다.</CardContent>
              <CardFooter>
                <Button variant="secondary">취소</Button>
                <Button>보관하기</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>계정 생성 폼</h2>
          <p {...stylex.props(storyStyles.description)}>
            계정을 만드는 데 필요한 입력과 행동을 하나의 카드에 묶습니다.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview)}>
          <Card>
            <CardHeader>
              <CardTitle>계정 만들기</CardTitle>
              <CardDescription>서비스에서 사용할 이름과 이메일을 입력하세요.</CardDescription>
            </CardHeader>
            <CardContent>
              <form {...stylex.props(storyStyles.stack)}>
                <label htmlFor="account-name" {...stylex.props(storyStyles.field)}>
                  이름
                  <Input id="account-name" placeholder="홍길동" />
                </label>
                <label htmlFor="account-email" {...stylex.props(storyStyles.field)}>
                  이메일
                  <Input id="account-email" type="email" placeholder="hello@example.com" />
                </label>
              </form>
            </CardContent>
            <CardFooter>
              <Button variant="ghost">취소</Button>
              <Button>계정 만들기</Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </>
  );
}

const cardExampleCode =
  'import { Card, CardContent, CardHeader, CardTitle } from "@dumo/ui/card"\n\n<Card>\n  <CardHeader>\n    <CardTitle>프로젝트</CardTitle>\n  </CardHeader>\n  <CardContent>프로젝트 내용을 입력하세요.</CardContent>\n</Card>';

export const CardStory: Story = {
  name: "Card",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Card</h1>
        <p {...stylex.props(storyStyles.description)}>
          하나의 목적에 필요한 정보와 행동을 묶어 보여줍니다.
        </p>
      </header>
      <ComponentExample>
        <CardExample />
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
      <ComponentCode usage={cardExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
