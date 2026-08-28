import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@cachette/ui/accordion";
import { colorVars, spacingVars, typographyVars } from "@cachette/tokens/tokens.stylex";
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
import { AccordionExample, accordionExampleCode } from "./examples/accordion.example";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Accordion");

const styles = stylex.create({
  disabledLabel: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space1,
  },
  disabledReason: {
    color: colorVars.fgDisabled,
    fontSize: typographyVars.fontSizeXs,
    fontWeight: typographyVars.fontWeightRegular,
  },
});

export const AccordionStory: Story = {
  name: "Accordion",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Accordion</h1>
        <p {...stylex.props(storyStyles.description)}>
          관련 정보를 제목 단위로 접고 펼쳐 필요한 내용에 집중하게 합니다.
        </p>
      </header>
      <ComponentExample>
        <AccordionExample />
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
      <ComponentCode usage={accordionExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
