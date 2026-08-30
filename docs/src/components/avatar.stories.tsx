import * as stylex from "@stylexjs/stylex";
import { Avatar, AvatarBadge, AvatarFallback } from "@nooeh/ui/avatar";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "./story-layout/StoryLayout";
import { getComponentDocument } from "./story-layout/component-docs";
import { AvatarGroup, AvatarGroupCount } from "@nooeh/ui/avatar";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Avatar");

function AvatarExample() {
  return (
    <section {...stylex.props(storyStyles.section)}>
      <header {...stylex.props(storyStyles.sectionHeader)}>
        <h2 {...stylex.props(storyStyles.sectionTitle)}>Group</h2>
        <p {...stylex.props(storyStyles.description)}>
          Show people who participated together as a group.
        </p>
      </header>
      <div {...stylex.props(storyStyles.preview)}>
        <AvatarGroup>
          <Avatar>
            <AvatarFallback>JL</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>SK</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>MH</AvatarFallback>
          </Avatar>
          <AvatarGroupCount>+4</AvatarGroupCount>
        </AvatarGroup>
      </div>
    </section>
  );
}

const avatarExampleCode =
  'import { Avatar, AvatarFallback } from "@nooeh/ui/avatar"\n\n<Avatar>\n  <AvatarFallback>MY</AvatarFallback>\n</Avatar>';

export const AvatarStory: Story = {
  name: "Avatar",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Avatar</h1>
        <p {...stylex.props(storyStyles.description)}>
          Represent a person or team with an image or brief fallback text.
        </p>
      </header>
      <ComponentExample>
        <AvatarExample />
      </ComponentExample>

      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Install</h2>
        </header>
        <CodeBlock
          code={`pnpm dlx @nooeh/ui add ${componentDocument.registryName}`}
          label="Terminal"
          language="bash"
        />
      </section>
      <ComponentCode usage={avatarExampleCode} />
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Sizes</h2>
          <p {...stylex.props(storyStyles.description)}>
            Choose a size that matches the surrounding content and importance.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview)}>
          <Avatar size="sm">
            <AvatarFallback>MJ</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>MY</AvatarFallback>
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
