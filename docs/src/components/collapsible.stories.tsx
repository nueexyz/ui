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
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "./story-layout/StoryLayout";
import { getComponentDocument } from "./story-layout/component-docs";
import { CollapsibleExample, collapsibleExampleCode } from "./examples/collapsible.example";

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
