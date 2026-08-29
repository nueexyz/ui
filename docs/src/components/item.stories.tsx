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
        <h2 {...stylex.props(storyStyles.sectionTitle)}>목록</h2>
        <p {...stylex.props(storyStyles.description)}>
          같은 성격의 항목은 일정한 간격과 정렬로 이어서 보여줍니다.
        </p>
      </header>
      <div {...stylex.props(storyStyles.preview, storyStyles.componentWidth)}>
        <ItemGroup>
          <Item variant="outline">
            <ItemMedia>
              <Icon name="folder" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>디자인 시스템</ItemTitle>
              <ItemDescription>마지막 수정: 오늘 오후 2:18</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button size="sm" variant="ghost">
                폴더 열기
              </Button>
            </ItemActions>
          </Item>
          <Item variant="muted">
            <ItemMedia variant="avatar">
              <Avatar>
                <AvatarFallback>민영</AvatarFallback>
              </Avatar>
            </ItemMedia>
            <ItemContent>
              <ItemTitle>정민영</ItemTitle>
              <ItemDescription>편집 권한이 있어요.</ItemDescription>
            </ItemContent>
          </Item>
        </ItemGroup>
      </div>
    </section>
  );
}

const itemExampleCode =
  'import { Button } from "@dumo/ui/button"\nimport { Icon } from "@dumo/ui/icon"\nimport { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "@dumo/ui/item"\n\n<ItemGroup>\n  <Item variant="outline">\n    <ItemMedia><Icon name="folder" /></ItemMedia>\n    <ItemContent><ItemTitle>디자인 시스템</ItemTitle><ItemDescription>마지막 수정: 오늘 오후 2:18</ItemDescription></ItemContent>\n    <ItemActions><Button size="sm" variant="ghost">폴더 열기</Button></ItemActions>\n  </Item>\n</ItemGroup>';

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
          code={`pnpm dlx @dumo/ui add ${componentDocument.registryName}`}
          label="터미널"
          language="bash"
        />
      </section>
      <ComponentCode usage={itemExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
