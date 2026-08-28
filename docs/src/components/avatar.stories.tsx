import * as stylex from "@stylexjs/stylex";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@cachette/ui/avatar";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "./story-layout/StoryLayout";
import { getComponentDocument } from "./story-layout/component-docs";
import { AvatarExample, avatarExampleCode } from "./examples/avatar.example";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Avatar");

export const AvatarStory: Story = {
  name: "Avatar",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Avatar</h1>
        <p {...stylex.props(storyStyles.description)}>
          사람이나 팀을 이미지 또는 짧은 대체 문자로 나타냅니다.
        </p>
      </header>
      <ComponentExample>
        <AvatarExample />
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
      <ComponentCode usage={avatarExampleCode} />
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Sizes</h2>
          <p {...stylex.props(storyStyles.description)}>
            주변 콘텐츠의 밀도와 중요도에 맞는 크기를 선택합니다.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview)}>
          <Avatar size="sm">
            <AvatarFallback>MJ</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>민영</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarFallback>DS</AvatarFallback>
            <AvatarBadge />
          </Avatar>
        </div>
      </section>
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
