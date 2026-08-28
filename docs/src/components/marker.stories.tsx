import * as stylex from "@stylexjs/stylex";
import { Icon } from "@cachette/ui/icon";
import { Marker, MarkerContent, MarkerIcon } from "@cachette/ui/marker";
import { Spinner } from "@cachette/ui/spinner";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "./story-layout/StoryLayout";
import { getComponentDocument } from "./story-layout/component-docs";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Marker");

function MarkerExample() {
  return (
    <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
      <Marker>
        <MarkerIcon>
          <Spinner label="답변 작성 중" />
        </MarkerIcon>
        <MarkerContent>답변을 작성하고 있어요.</MarkerContent>
      </Marker>
    </div>
  );
}

const markerExampleCode =
  'import { Marker, MarkerContent, MarkerIcon } from "@cachette/ui/marker"\nimport { Spinner } from "@cachette/ui/spinner"\n\n<Marker>\n  <MarkerIcon><Spinner label="답변 작성 중" /></MarkerIcon>\n  <MarkerContent>답변을 작성하고 있어요.</MarkerContent>\n</Marker>';

export const MarkerStory: Story = {
  name: "Marker",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Marker</h1>
        <p {...stylex.props(storyStyles.description)}>
          대화나 활동 흐름에서 상태가 바뀌는 지점과 구간을 표시합니다.
        </p>
      </header>
      <ComponentExample>
        <MarkerExample />
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
      <ComponentCode usage={markerExampleCode} />
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Variants</h2>
          <p {...stylex.props(storyStyles.description)}>
            주변 콘텐츠의 구조에 맞춰 기본, 경계선, 구분선 표현을 선택합니다.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
          <Marker>
            <MarkerIcon>
              <Spinner label="답변 작성 중" />
            </MarkerIcon>
            <MarkerContent>답변을 작성하고 있어요.</MarkerContent>
          </Marker>
          <Marker variant="border">
            <MarkerIcon>
              <Icon name="branch" />
            </MarkerIcon>
            <MarkerContent>새 작업 흐름을 시작했어요.</MarkerContent>
          </Marker>
          <Marker variant="separator">
            <MarkerContent>읽지 않은 메시지</MarkerContent>
          </Marker>
        </div>
      </section>
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
