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
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@cachette/ui/context-menu";

const meta = {
  title: "Components",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Context Menu");

function ContextMenuExample() {
  return (
    <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
      <ContextMenu>
        <ContextMenuTrigger {...stylex.props(storyStyles.contextTarget)}>
          프로젝트-제안서.pdf
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>
            미리 보기<ContextMenuShortcut>Space</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            이름 바꾸기<ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>
            다운로드<ContextMenuShortcut>⌘D</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
}

const contextMenuExampleCode =
  'import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuTrigger } from "@cachette/ui/context-menu"\n\n<ContextMenu>\n  <ContextMenuTrigger>프로젝트-제안서.pdf</ContextMenuTrigger>\n  <ContextMenuContent>\n    <ContextMenuItem>미리 보기<ContextMenuShortcut>Space</ContextMenuShortcut></ContextMenuItem>\n    <ContextMenuItem>이름 바꾸기<ContextMenuShortcut>⌘R</ContextMenuShortcut></ContextMenuItem>\n    <ContextMenuSeparator />\n    <ContextMenuItem>다운로드<ContextMenuShortcut>⌘D</ContextMenuShortcut></ContextMenuItem>\n  </ContextMenuContent>\n</ContextMenu>';

export const ContextMenuStory: Story = {
  name: "Context Menu",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Context Menu</h1>
        <p {...stylex.props(storyStyles.description)}>
          선택한 영역과 직접 관련된 행동을 보조 클릭으로 엽니다.
        </p>
      </header>
      <ComponentExample>
        <ContextMenuExample />
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
      <ComponentCode usage={contextMenuExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
