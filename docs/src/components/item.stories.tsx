import * as stylex from "@stylexjs/stylex";
import { Avatar, AvatarFallback } from "@cachette/ui/avatar";
import { Button } from "@cachette/ui/button";
import { Icon } from "@cachette/ui/icon";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@cachette/ui/item";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "./story-layout/StoryLayout";
import { getComponentDocument } from "./story-layout/component-docs";
import { ItemExample, itemExampleCode } from "./examples/item.example";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Item");

export const ItemStory: Story = {
  name: "Item",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Item</h1>
        <p {...stylex.props(storyStyles.description)}>
          정보, 보조 설명, 관련 행동을 반복 가능한 한 줄 구조로 묶습니다.
        </p>
      </header>
      <ComponentExample>
        <ItemExample />
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
      <ComponentCode usage={itemExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
