import { spacingVars } from "@cachette/tokens/tokens.stylex";
import { Button } from "@cachette/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@cachette/ui/empty";
import { Icon } from "@cachette/ui/icon";
import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview } from "./story-layout/StoryLayout";
const meta = { title: "Components/Empty", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
const styles = stylex.create({ full: { width: "100%" }, content: { gap: spacingVars.space4 } });
export const Overview: Story = {
  render: () => (
    <StoryPage
      title="Empty"
      description="아직 표시할 내용이 없을 때 이유와 다음 행동을 안내합니다."
    >
      <StoryPreview>
        <Empty xstyle={styles.full}>
          <EmptyHeader>
            <EmptyMedia>
              <Icon aria-hidden="true" name="folder" />
            </EmptyMedia>
            <EmptyTitle>저장한 프로젝트가 없습니다</EmptyTitle>
            <EmptyDescription>
              자주 확인할 프로젝트를 저장하면 이곳에서 바로 열 수 있습니다.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent xstyle={styles.content}>
            <Button>프로젝트 저장하기</Button>
          </EmptyContent>
        </Empty>
      </StoryPreview>
    </StoryPage>
  ),
};
