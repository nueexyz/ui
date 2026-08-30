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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@nooeh/ui/collapsible";
import {
  colorVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@nooeh/tokens/tokens.stylex";

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
          <h3 {...stylex.props(styles.title)}>Order #4189</h3>
          <CollapsibleTrigger aria-label="Show order details" />
        </div>
        <div {...stylex.props(styles.detail)}>
          <span {...stylex.props(styles.detailLabel)}>Status</span>
          <span {...stylex.props(styles.detailValue)}>Delivered</span>
        </div>
        <CollapsibleContent>
          <div {...stylex.props(styles.detailGroup, styles.detail)}>
            <span {...stylex.props(styles.detailValue)}>Shipping address</span>
            <span {...stylex.props(styles.detailLabel)}>18 Seongsui-ro, Seongdong-gu, Seoul</span>
          </div>
          <div {...stylex.props(styles.detailGroup, styles.detail)}>
            <span {...stylex.props(styles.detailValue)}>Items</span>
            <span {...stylex.props(styles.detailLabel)}>2 studio headphones</span>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

const collapsibleExampleCode =
  'import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@nooeh/ui/collapsible"\n\n<Collapsible>\n  <div>\n    <strong>Order #4189</strong>\n    <CollapsibleTrigger aria-label="Show order details" />\n  </div>\n  <p>Status: Delivered</p>\n  <CollapsibleContent>\n    <p>Shipping address: 18 Seongsui-ro, Seongdong-gu, Seoul</p>\n    <p>Items: 2 studio headphones</p>\n  </CollapsibleContent>\n</Collapsible>';

export const CollapsibleStory: Story = {
  name: "Collapsible",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Collapsible</h1>
        <p {...stylex.props(storyStyles.description)}>
          Expand and collapse supporting information within one area.
        </p>
      </header>
      <ComponentExample>
        <CollapsibleExample />
      </ComponentExample>

      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Install</h2>
        </header>
        <CodeBlock
          code={`pnpm dlx @nooeh/ui add ${componentDocument.registryName}`}
          label="Terminal"
          language="bash"
        />
      </section>
      <ComponentCode usage={collapsibleExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
