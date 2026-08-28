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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@cachette/ui/collapsible";
import {
  colorVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@cachette/tokens/tokens.stylex";

const meta = {
  title: "Components",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Collapsible");

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

function CollapsibleExample() {
  return (
    <div {...stylex.props(storyStyles.preview, storyStyles.componentWidth)}>
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
    </div>
  );
}

const collapsibleExampleCode =
  'import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@cachette/ui/collapsible"\n\n<Collapsible>\n  <div>\n    <strong>주문 #4189</strong>\n    <CollapsibleTrigger aria-label="주문 상세 정보 열기" />\n  </div>\n  <p>상태: 배송 완료</p>\n  <CollapsibleContent>\n    <p>배송지: 서울시 성동구 성수이로 18</p>\n    <p>상품: 스튜디오 헤드폰 2개</p>\n  </CollapsibleContent>\n</Collapsible>';

export const CollapsibleStory: Story = {
  name: "Collapsible",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Collapsible</h1>
        <p {...stylex.props(storyStyles.description)}>
          보조 정보를 한 영역 안에서 간단히 접고 펼칩니다.
        </p>
      </header>
      <ComponentExample>
        <CollapsibleExample />
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
      <ComponentCode usage={collapsibleExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
