import * as stylex from "@stylexjs/stylex";
import { Avatar, AvatarFallback } from "@cachette/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@cachette/ui/hover-card";
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@cachette/ui/item";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "./story-layout/StoryLayout";
import { getComponentDocument } from "./story-layout/component-docs";
import { HoverCardExample, hoverCardExampleCode } from "./examples/hover-card.example";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Hover Card");

export const HoverCardStory: Story = {
  name: "Hover Card",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Hover Card</h1>
        <p {...stylex.props(storyStyles.description)}>
          링크를 열기 전에 대상의 핵심 정보를 미리 확인할 수 있게 합니다.
        </p>
      </header>
      <ComponentExample>
        <HoverCardExample />
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
      <ComponentCode usage={hoverCardExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
