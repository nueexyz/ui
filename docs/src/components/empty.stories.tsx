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
import { spacingVars } from "@dumo/tokens/tokens.stylex";
import { Button } from "@dumo/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@dumo/ui/empty";
import { Icon } from "@dumo/ui/icon";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Empty");

const styles = stylex.create({ full: { width: "100%" }, content: { gap: spacingVars.space4 } });

function EmptyExample() {
  return (
    <div {...stylex.props(storyStyles.preview)}>
      <Empty xstyle={styles.full}>
        <EmptyHeader>
          <EmptyMedia>
            <Icon aria-hidden="true" name="folder" />
          </EmptyMedia>
          <EmptyTitle>저장한 프로젝트가 없습니다</EmptyTitle>
          <EmptyDescription>
            자주 확인할 프로젝트를 저장하면 이곳에서 바로 열 수 있습니다.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent xstyle={styles.content}>
          <Button>프로젝트 저장하기</Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}

const emptyExampleCode =
  'import { Button } from "@dumo/ui/button"\nimport { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@dumo/ui/empty"\nimport { Icon } from "@dumo/ui/icon"\n\n<Empty>\n  <EmptyHeader>\n    <EmptyMedia><Icon aria-hidden="true" name="folder" /></EmptyMedia>\n    <EmptyTitle>저장한 프로젝트가 없습니다</EmptyTitle>\n    <EmptyDescription>자주 확인할 프로젝트를 저장하면 이곳에서 바로 열 수 있습니다.</EmptyDescription>\n  </EmptyHeader>\n  <EmptyContent><Button>프로젝트 저장하기</Button></EmptyContent>\n</Empty>';

export const EmptyStory: Story = {
  name: "Empty",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Empty</h1>
        <p {...stylex.props(storyStyles.description)}>
          아직 표시할 내용이 없을 때 이유와 다음 행동을 안내합니다.
        </p>
      </header>
      <ComponentExample>
        <EmptyExample />
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
      <ComponentCode usage={emptyExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
