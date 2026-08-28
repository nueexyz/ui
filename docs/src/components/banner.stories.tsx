import { Banner } from "@cachette/ui/banner";
import { Icon } from "@cachette/ui/icon";
import { Link } from "@cachette/ui/link";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { StoryPage, StoryPreview, StorySection, storyStyles } from "./story-layout/StoryLayout";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const BannerStory: Story = {
  name: "Banner",
  render: () => (
    <StoryPage title="Banner" description="화면 안에서 현재 상태와 필요한 다음 행동을 전달합니다.">
      <StorySection title="의미" description="메시지의 중요도와 성격에 맞는 색을 사용합니다.">
        <StoryPreview xstyle={storyStyles.column}>
          <Banner
            description="새 버전을 지금 설치할 수 있습니다."
            icon={<Icon aria-hidden="true" name="info" weight="fill" />}
            title="업데이트가 준비됐어요."
          />
          <Banner
            description="5분 뒤 자동으로 로그아웃됩니다."
            icon={<Icon aria-hidden="true" name="warning" weight="fill" />}
            title="세션이 곧 만료돼요."
            variant="warning"
          />
          <Banner
            description="연결을 확인한 뒤 다시 시도해 주세요."
            icon={<Icon aria-hidden="true" name="error" weight="fill" />}
            title="변경사항을 저장하지 못했어요."
            variant="error"
          />
          <Banner
            description="오늘 오후 11시부터 약 10분 동안 이용할 수 없습니다."
            icon={<Icon aria-hidden="true" name="info" weight="fill" />}
            title="점검이 예정되어 있어요."
            variant="neutral"
          />
        </StoryPreview>
      </StorySection>
      <StorySection
        title="간결한 안내"
        description="좁은 화면에서는 핵심 설명과 행동만 표시합니다."
      >
        <StoryPreview xstyle={storyStyles.column}>
          <Banner
            action={
              <Link href="#" variant="current">
                DNS 관리
              </Link>
            }
            description="같은 이름의 DNS 레코드가 이미 있습니다."
            size="sm"
          />
        </StoryPreview>
      </StorySection>
    </StoryPage>
  ),
};
