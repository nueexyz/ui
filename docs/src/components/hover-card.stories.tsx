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
import { Avatar, AvatarFallback } from "@cachette/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@cachette/ui/hover-card";
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@cachette/ui/item";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Hover Card");

function HoverCardExample() {
  return (
    <section {...stylex.props(storyStyles.section)}>
      <header {...stylex.props(storyStyles.sectionHeader)}>
        <h2 {...stylex.props(storyStyles.sectionTitle)}>프로필 미리 보기</h2>
        <p {...stylex.props(storyStyles.description)}>
          마우스를 올리거나 키보드로 초점을 이동해 내용을 확인합니다.
        </p>
      </header>
      <div {...stylex.props(storyStyles.preview)}>
        <HoverCard>
          <HoverCardTrigger href="#">@cachette</HoverCardTrigger>
          <HoverCardContent align="start">
            <Item size="sm">
              <ItemMedia variant="avatar">
                <Avatar>
                  <AvatarFallback>CA</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Cachette</ItemTitle>
                <ItemDescription>차분하고 일관된 제품 경험을 위한 디자인 시스템</ItemDescription>
              </ItemContent>
            </Item>
          </HoverCardContent>
        </HoverCard>
      </div>
    </section>
  );
}

const hoverCardExampleCode =
  'import { Avatar, AvatarFallback } from "@cachette/ui/avatar"\nimport { HoverCard, HoverCardContent, HoverCardTrigger } from "@cachette/ui/hover-card"\nimport { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@cachette/ui/item"\n\n<HoverCard>\n  <HoverCardTrigger href="#">@cachette</HoverCardTrigger>\n  <HoverCardContent align="start">\n    <Item size="sm">\n      <ItemMedia variant="avatar"><Avatar><AvatarFallback>CA</AvatarFallback></Avatar></ItemMedia>\n      <ItemContent>\n        <ItemTitle>Cachette</ItemTitle>\n        <ItemDescription>차분하고 일관된 제품 경험을 위한 디자인 시스템</ItemDescription>\n      </ItemContent>\n    </Item>\n  </HoverCardContent>\n</HoverCard>';

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
