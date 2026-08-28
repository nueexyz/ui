import { Tabs, TabsContent, TabsList, TabsTrigger } from "@cachette/ui/tabs";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview, storyStyles } from "./story-layout/StoryLayout";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const TabsStory: Story = {
  name: "Tabs",
  render: () => (
    <StoryPage title="Tabs" description="같은 맥락의 콘텐츠를 짧은 범주로 나누어 전환합니다.">
      <StoryPreview xstyle={storyStyles.column}>
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
      </StoryPreview>
    </StoryPage>
  ),
};
