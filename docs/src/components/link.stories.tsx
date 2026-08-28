import { Link } from "@cachette/ui/link";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { StoryPage, StoryPreview, StorySection, storyStyles } from "./story-layout/StoryLayout";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const LinkStory: Story = {
  name: "Link",
  render: () => (
    <StoryPage
      title="Link"
      description="현재 화면 안이나 외부 위치로 이동할 수 있는 텍스트 행동입니다."
    >
      <StorySection title="표현" description="주변 콘텐츠와 링크의 강조 수준에 맞게 선택합니다.">
        <StoryPreview>
          <Link href="#">기본 링크</Link>
          <span>
            현재 색상을 따르는{" "}
            <Link href="#" variant="current">
              링크
            </Link>
          </span>
          <Link href="#" variant="plain">
            밑줄 없는 링크
          </Link>
        </StoryPreview>
      </StorySection>
      <StorySection
        title="외부 이동"
        description="다른 사이트로 이동하면 아이콘으로 목적지를 구분합니다."
      >
        <StoryPreview xstyle={storyStyles.column}>
          <p>
            자세한 내용은{" "}
            <Link href="https://example.com" rel="noreferrer" target="_blank">
              외부 문서 <Link.ExternalIcon />
            </Link>
            에서 확인할 수 있습니다.
          </p>
        </StoryPreview>
      </StorySection>
    </StoryPage>
  ),
};
