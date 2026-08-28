import { Tabs, TabsContent, TabsList, TabsTrigger } from "@cachette/ui/tabs";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview, storyStyles } from "./story-layout/StoryLayout";

const meta = { title: "Components/Tabs", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <StoryPage title="Tabs" description="같은 맥락의 콘텐츠를 짧은 범주로 나누어 전환합니다.">
      <StoryPreview xstyle={storyStyles.componentWidth}>
        <Tabs defaultValue="account">
          <TabsList>
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
      </StoryPreview>
    </StoryPage>
  ),
};
