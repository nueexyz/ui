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
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@dumo/ui/item";

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
            <Item size="sm">
              <ItemMedia variant="avatar">
                <Avatar>
                  <AvatarFallback>CA</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Dumo</ItemTitle>
                <ItemDescription>
                  A calm, consistent design system for product experiences
                </ItemDescription>
              </ItemContent>
            </Item>
          </HoverCardContent>
        </HoverCard>
      </div>
    </section>
  );
}

const hoverCardExampleCode =
  'import { Avatar, AvatarFallback } from "@dumo/ui/avatar"\nimport { HoverCard, HoverCardContent, HoverCardTrigger } from "@dumo/ui/hover-card"\nimport { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@dumo/ui/item"\n\n<HoverCard>\n  <HoverCardTrigger href="#">@dumo</HoverCardTrigger>\n  <HoverCardContent align="start">\n    <Item size="sm">\n      <ItemMedia variant="avatar"><Avatar><AvatarFallback>CA</AvatarFallback></Avatar></ItemMedia>\n      <ItemContent>\n        <ItemTitle>Dumo</ItemTitle>\n        <ItemDescription>A calm, consistent design system for product experiences</ItemDescription>\n      </ItemContent>\n    </Item>\n  </HoverCardContent>\n</HoverCard>';

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
