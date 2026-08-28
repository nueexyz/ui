import { Icon } from "@cachette/ui/icon";
import { Marker, MarkerContent, MarkerIcon } from "@cachette/ui/marker";
import { Spinner } from "@cachette/ui/spinner";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview, StorySection, storyStyles } from "./story-layout/StoryLayout";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const MarkerStory: Story = {
  name: "Marker",
  render: () => (
    <StoryPage
      title="Marker"
      description="대화나 활동 흐름에서 상태가 바뀌는 지점과 구간을 표시합니다."
    >
      <StorySection
        title="표현"
        description="주변 콘텐츠의 구조에 맞춰 기본, 경계선, 구분선 표현을 선택합니다."
      >
        <StoryPreview xstyle={storyStyles.column}>
          <Marker>
            <MarkerIcon>
              <Spinner label="답변 작성 중" />
            </MarkerIcon>
            <MarkerContent>답변을 작성하고 있어요.</MarkerContent>
          </Marker>
          <Marker variant="border">
            <MarkerIcon>
              <Icon name="branch" />
            </MarkerIcon>
            <MarkerContent>새 작업 흐름을 시작했어요.</MarkerContent>
          </Marker>
          <Marker variant="separator">
            <MarkerContent>읽지 않은 메시지</MarkerContent>
          </Marker>
        </StoryPreview>
      </StorySection>
    </StoryPage>
  ),
};
