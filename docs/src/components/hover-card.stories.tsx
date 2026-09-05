import {
  ContentRow,
  ContentRowContent,
  ContentRowDescription,
  ContentRowTitle,
} from "@nuee/ui/content-row";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@nuee/ui/hover-card";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as stylex from "@stylexjs/stylex";

import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  storyStyles,
} from "./story-layout/StoryLayout";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const registryName = "hover-card";

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
          <HoverCardTrigger href="#">@nuee</HoverCardTrigger>
          <HoverCardContent align="start">
            <ContentRow size="sm">
              <ContentRowContent>
                <ContentRowTitle>Nuee</ContentRowTitle>
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
  'import { Avatar, AvatarFallback } from "@nuee/ui/avatar"\nimport { ContentRow, ContentRowContent, ContentRowDescription, ContentRowMedia, ContentRowTitle } from "@nuee/ui/content-row"\nimport { HoverCard, HoverCardContent, HoverCardTrigger } from "@nuee/ui/hover-card"\n\n<HoverCard>\n  <HoverCardTrigger href="#">@nuee</HoverCardTrigger>\n  <HoverCardContent align="start">\n    <ContentRow size="sm">\n      <ContentRowMedia variant="avatar"><Avatar><AvatarFallback>CA</AvatarFallback></Avatar></ContentRowMedia>\n      <ContentRowContent>\n        <ContentRowTitle>Nuee</ContentRowTitle>\n        <ContentRowDescription>A calm, consistent design system for product experiences</ContentRowDescription>\n      </ContentRowContent>\n    </ContentRow>\n  </HoverCardContent>\n</HoverCard>';

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

      <ComponentCode usage={hoverCardExampleCode} />
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Install</h2>
        </header>
        <CodeBlock
          code={`pnpm dlx @nuee/ui add ${registryName}`}
          label="Terminal"
          language="bash"
        />
      </section>
    </main>
  ),
};
