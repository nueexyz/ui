import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  storyStyles,
} from "./story-layout/StoryLayout";
import { ScrollArea } from "@nooeh/ui/scroll-area";
import { Separator } from "@nooeh/ui/separator";
import { spacingVars } from "@nooeh/tokens/semantic.stylex";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const registryName = "scroll-area";

const styles = stylex.create({
  viewport: { height: "14rem", width: "20rem" },
  item: { paddingBlock: spacingVars.space3 },
});

const activities = [
  "Completed the deployment checklist.",
  "Sent a design review request.",
  "Updated the sign-in screen.",
  "Invited a new member to the project.",
  "Added a user interview to the calendar.",
  "Shared the development environment setup.",
  "Reviewed the error report.",
  "Updated the prototype link.",
  "Reviewed this week’s goals.",
  "Recorded decisions in the meeting notes.",
  "Updated the brand guidelines.",
  "Confirmed the next release date.",
];

function ScrollAreaExample() {
  return (
    <section {...stylex.props(storyStyles.section)}>
      <header {...stylex.props(storyStyles.sectionHeader)}>
        <h2 {...stylex.props(storyStyles.sectionTitle)}>Activity</h2>
        <p {...stylex.props(storyStyles.description)}>
          The scrollbar appears when needed without changing the content width.
        </p>
      </header>
      <div {...stylex.props(storyStyles.preview)}>
        <ScrollArea xstyle={styles.viewport}>
          {activities.map((activity, index) => (
            <div key={index}>
              <div {...stylex.props(styles.item)}>{activity}</div>
              {index < 11 ? <Separator /> : null}
            </div>
          ))}
        </ScrollArea>
      </div>
    </section>
  );
}

const scrollAreaExampleCode =
  'import { ScrollArea } from "@nooeh/ui/scroll-area"\nimport { Separator } from "@nooeh/ui/separator"\n\nconst activities = [\n  "Completed the deployment checklist.",\n  "Sent a design review request.",\n  "Updated the sign-in screen.",\n]\n\n<ScrollArea style={{ height: "14rem", width: "20rem" }}>\n  {activities.map((activity, index) => (\n    <div key={activity}>\n      <div style={{ paddingBlock: "0.75rem" }}>{activity}</div>\n      {index < activities.length - 1 ? <Separator /> : null}\n    </div>\n  ))}\n</ScrollArea>';

export const ScrollAreaStory: Story = {
  name: "Scroll Area",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Scroll Area</h1>
        <p {...stylex.props(storyStyles.description)}>
          Explore long content by scrolling within a defined area.
        </p>
      </header>
      <ComponentExample>
        <ScrollAreaExample />
      </ComponentExample>

      <ComponentCode usage={scrollAreaExampleCode} />
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
