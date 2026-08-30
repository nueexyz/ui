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
import { Avatar, AvatarFallback } from "@dumo/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@dumo/ui/hover-card";
import {
  ContentRow,
  ContentRowContent,
  ContentRowDescription,
  ContentRowMedia,
  ContentRowTitle,
} from "@dumo/ui/content-row";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Hover Card");

function HoverCardExample() {
  return (
    <section {...stylex.props(storyStyles.section)}>
      <header {...stylex.props(storyStyles.sectionHeader)}>
        <h2 {...stylex.props(storyStyles.sectionTitle)}>Profile preview</h2>
        <p {...stylex.props(storyStyles.description)}>
          View details by hovering or moving keyboard focus.
        </p>
      </header>
      <div {...stylex.props(storyStyles.preview)}>
        <HoverCard>
          <HoverCardTrigger href="#">@dumo</HoverCardTrigger>
          <HoverCardContent align="start">
            <ContentRow size="sm">
              <ContentRowMedia variant="avatar">
                <Avatar>
                  <AvatarFallback>CA</AvatarFallback>
                </Avatar>
              </ContentRowMedia>
              <ContentRowContent>
                <ContentRowTitle>Dumo</ContentRowTitle>
                <ContentRowDescription>
                  A calm, consistent design system for product experiences
                </ContentRowDescription>
              </ContentRowContent>
            </ContentRow>
          </HoverCardContent>
        </HoverCard>
      </div>
    </section>
  );
}

const hoverCardExampleCode =
  'import { Avatar, AvatarFallback } from "@dumo/ui/avatar"\nimport { ContentRow, ContentRowContent, ContentRowDescription, ContentRowMedia, ContentRowTitle } from "@dumo/ui/content-row"\nimport { HoverCard, HoverCardContent, HoverCardTrigger } from "@dumo/ui/hover-card"\n\n<HoverCard>\n  <HoverCardTrigger href="#">@dumo</HoverCardTrigger>\n  <HoverCardContent align="start">\n    <ContentRow size="sm">\n      <ContentRowMedia variant="avatar"><Avatar><AvatarFallback>CA</AvatarFallback></Avatar></ContentRowMedia>\n      <ContentRowContent>\n        <ContentRowTitle>Dumo</ContentRowTitle>\n        <ContentRowDescription>A calm, consistent design system for product experiences</ContentRowDescription>\n      </ContentRowContent>\n    </ContentRow>\n  </HoverCardContent>\n</HoverCard>';

export const HoverCardStory: Story = {
  name: "Hover Card",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Hover Card</h1>
        <p {...stylex.props(storyStyles.description)}>
          Preview essential information before opening a link.
        </p>
      </header>
      <ComponentExample>
        <HoverCardExample />
      </ComponentExample>

      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Install</h2>
        </header>
        <CodeBlock
          code={`pnpm dlx @dumo/ui add ${componentDocument.registryName}`}
          label="Terminal"
          language="bash"
        />
      </section>
      <ComponentCode usage={hoverCardExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
