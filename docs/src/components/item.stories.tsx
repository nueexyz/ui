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
import { Button } from "@dumo/ui/button";
import { Icon } from "@dumo/ui/icon";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@dumo/ui/item";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Item");

function ItemExample() {
  return (
    <section {...stylex.props(storyStyles.section)}>
      <header {...stylex.props(storyStyles.sectionHeader)}>
        <h2 {...stylex.props(storyStyles.sectionTitle)}>List</h2>
        <p {...stylex.props(storyStyles.description)}>
          Present related items with consistent spacing and alignment.
        </p>
      </header>
      <div {...stylex.props(storyStyles.preview, storyStyles.componentWidth)}>
        <ItemGroup>
          <Item variant="outline">
            <ItemMedia>
              <Icon name="folder" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Design system</ItemTitle>
              <ItemDescription>Last edited today at 2:18 PM</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button size="sm" variant="ghost">
                Open folder
              </Button>
            </ItemActions>
          </Item>
          <Item variant="muted">
            <ItemMedia variant="avatar">
              <Avatar>
                <AvatarFallback>MY</AvatarFallback>
              </Avatar>
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Minyeong Jeong</ItemTitle>
              <ItemDescription>Can edit</ItemDescription>
            </ItemContent>
          </Item>
        </ItemGroup>
      </div>
    </section>
  );
}

const itemExampleCode =
  'import { Button } from "@dumo/ui/button"\nimport { Icon } from "@dumo/ui/icon"\nimport { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "@dumo/ui/item"\n\n<ItemGroup>\n  <Item variant="outline">\n    <ItemMedia><Icon name="folder" /></ItemMedia>\n    <ItemContent><ItemTitle>Design system</ItemTitle><ItemDescription>Last edited today at 2:18 PM</ItemDescription></ItemContent>\n    <ItemActions><Button size="sm" variant="ghost">Open folder</Button></ItemActions>\n  </Item>\n</ItemGroup>';

export const ItemStory: Story = {
  name: "Item",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Item</h1>
        <p {...stylex.props(storyStyles.description)}>
          Group information, supporting text, and related actions into a repeatable row.
        </p>
      </header>
      <ComponentExample>
        <ItemExample />
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
      <ComponentCode usage={itemExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
