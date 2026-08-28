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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@cachette/ui/tabs";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Tabs");

function TabsExample() {
  return (
    <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
      <Tabs defaultValue="account" variant="segmented">
        <TabsList aria-label="분할형 설정 메뉴">
          <TabsTrigger value="account">계정</TabsTrigger>
          <TabsTrigger value="security">보안</TabsTrigger>
          <TabsTrigger disabled value="billing">
            결제
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">이름과 프로필 정보를 관리합니다.</TabsContent>
        <TabsContent value="security">비밀번호와 로그인 기록을 관리합니다.</TabsContent>
        <TabsContent value="billing">결제 수단을 관리합니다.</TabsContent>
      </Tabs>
      <Tabs defaultValue="overview" variant="underline">
        <TabsList aria-label="밑줄형 프로젝트 메뉴">
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="activity">활동</TabsTrigger>
          <TabsTrigger disabled value="settings">
            설정
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">프로젝트의 주요 정보를 확인합니다.</TabsContent>
        <TabsContent value="activity">최근 변경 내역을 확인합니다.</TabsContent>
        <TabsContent value="settings">프로젝트 설정을 관리합니다.</TabsContent>
      </Tabs>
    </div>
  );
}

const tabsExampleCode =
  'import { Tabs, TabsContent, TabsList, TabsTrigger } from "@cachette/ui/tabs"\n\n<Tabs defaultValue="account" variant="segmented">\n  <TabsList>\n    <TabsTrigger value="account">계정</TabsTrigger>\n    <TabsTrigger value="security">보안</TabsTrigger>\n  </TabsList>\n  <TabsContent value="account">계정 설정</TabsContent>\n  <TabsContent value="security">보안 설정</TabsContent>\n</Tabs>';

export const TabsStory: Story = {
  name: "Tabs",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Tabs</h1>
        <p {...stylex.props(storyStyles.description)}>
          같은 맥락의 콘텐츠를 짧은 범주로 나누어 전환합니다.
        </p>
      </header>
      <ComponentExample>
        <TabsExample />
      </ComponentExample>

      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>설치</h2>
        </header>
        <CodeBlock
          code={`pnpm dlx @cachette/ui add ${componentDocument.registryName}`}
          label="터미널"
          language="bash"
        />
      </section>
      <ComponentCode usage={tabsExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
