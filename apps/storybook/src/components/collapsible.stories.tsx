import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@cachette/ui/collapsible";
import {
  colorVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@cachette/tokens/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview, storyStyles } from "./story-layout/StoryLayout";

const meta = {
  title: "Components",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const styles = stylex.create({
  header: {
    alignItems: "center",
    display: "flex",
    gap: spacingVars.space4,
    justifyContent: "space-between",
    paddingInline: spacingVars.space4,
  },
  title: {
    color: colorVars.fgPrimary,
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightSemibold,
    margin: 0,
  },
  detail: {
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.md,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    display: "flex",
    fontSize: typographyVars.fontSizeSm,
    justifyContent: "space-between",
    paddingBlock: spacingVars.space2,
    paddingInline: spacingVars.space4,
  },
  detailGroup: { display: "flex", flexDirection: "column", gap: spacingVars.space1 },
  detailLabel: { color: colorVars.fgSecondary },
  detailValue: { color: colorVars.fgPrimary, fontWeight: typographyVars.fontWeightMedium },
});

export const CollapsibleStory: Story = {
  name: "Collapsible",
  render: () => (
    <StoryPage title="Collapsible" description="보조 정보를 한 영역 안에서 간단히 접고 펼칩니다.">
      <StoryPreview xstyle={storyStyles.componentWidth}>
        <Collapsible>
          <div {...stylex.props(styles.header)}>
            <h3 {...stylex.props(styles.title)}>주문 #4189</h3>
            <CollapsibleTrigger aria-label="주문 상세 정보 열기" />
          </div>
          <div {...stylex.props(styles.detail)}>
            <span {...stylex.props(styles.detailLabel)}>상태</span>
            <span {...stylex.props(styles.detailValue)}>배송 완료</span>
          </div>
          <CollapsibleContent>
            <div {...stylex.props(styles.detailGroup, styles.detail)}>
              <span {...stylex.props(styles.detailValue)}>배송지</span>
              <span {...stylex.props(styles.detailLabel)}>서울시 성동구 성수이로 18</span>
            </div>
            <div {...stylex.props(styles.detailGroup, styles.detail)}>
              <span {...stylex.props(styles.detailValue)}>상품</span>
              <span {...stylex.props(styles.detailLabel)}>스튜디오 헤드폰 2개</span>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </StoryPreview>
    </StoryPage>
  ),
};
