import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  storyStyles,
} from "./story-layout/StoryLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@nooeh/ui/accordion";
import { colorVars, spacingVars, typographyVars } from "@nooeh/tokens/tokens.stylex";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const registryName = "accordion";

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

function AccordionExample() {
  return (
    <>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Open one at a time</h2>
          <p {...stylex.props(storyStyles.description)}>Show one answer at a time.</p>
        </header>
        <div {...stylex.props(storyStyles.preview, storyStyles.componentWidth)}>
          <Accordion defaultValue={["shipping"]}>
            <AccordionItem value="shipping">
              <AccordionTrigger>How long does delivery take?</AccordionTrigger>
              <AccordionContent>Standard delivery takes 2–3 business days.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="return">
              <AccordionTrigger>How do I request a return?</AccordionTrigger>
              <AccordionContent>
                Select an item and reason from your order history to request a return.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem disabled value="member">
              <AccordionTrigger>
                <span {...stylex.props(styles.disabledLabel)}>
                  Members-only benefits
                  <span {...stylex.props(styles.disabledReason)}>Available after joining.</span>
                </span>
              </AccordionTrigger>
              <AccordionContent>Available after joining.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Open multiple items</h2>
          <p {...stylex.props(storyStyles.description)}>
            Open related information together when you need to compare it.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview, storyStyles.componentWidth)}>
          <Accordion defaultValue={["email", "push"]} multiple>
            <AccordionItem value="email">
              <AccordionTrigger>Email notifications</AccordionTrigger>
              <AccordionContent>
                Receive activity updates and weekly summaries by email.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="push">
              <AccordionTrigger>Push notifications</AccordionTrigger>
              <AccordionContent>
                Receive deadline and comment notifications right away.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </>
  );
}

const accordionExampleCode =
  'import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@nooeh/ui/accordion"\n\n<Accordion defaultValue={["item-1"]}>\n  <AccordionItem value="item-1">\n    <AccordionTrigger>Account settings</AccordionTrigger>\n    <AccordionContent>Update your profile and notification settings.</AccordionContent>\n  </AccordionItem>\n</Accordion>';

export const AccordionStory: Story = {
  name: "Accordion",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Accordion</h1>
        <p {...stylex.props(storyStyles.description)}>
          Collapse related information into headings to focus on what matters.
        </p>
      </header>
      <ComponentExample>
        <AccordionExample />
      </ComponentExample>

      <ComponentCode usage={accordionExampleCode} />
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Install</h2>
        </header>
        <CodeBlock
          code={`pnpm dlx @nooeh/ui add ${registryName}`}
          label="Terminal"
          language="bash"
        />
      </section>
    </main>
  ),
};
