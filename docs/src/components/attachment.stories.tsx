import * as stylex from "@stylexjs/stylex";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@cachette/ui/attachment";
import { Icon } from "@cachette/ui/icon";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "./story-layout/StoryLayout";
import { getComponentDocument } from "./story-layout/component-docs";
import { AttachmentExample, attachmentExampleCode } from "./examples/attachment.example";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Attachment");

function FileAttachment({ error = false }: { error?: boolean }) {
  return (
    <Attachment state={error ? "error" : "done"}>
      <AttachmentMedia>
        <Icon name="file" />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>프로젝트-제안서.pdf</AttachmentTitle>
        <AttachmentDescription>
          {error ? "업로드하지 못했어요. 다시 시도해 주세요." : "2.4 MB · 업로드 완료"}
        </AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="파일 다운로드">
          <Icon name="download" />
        </AttachmentAction>
        <AttachmentAction aria-label="첨부 파일 제거">
          <Icon name="close" />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  );
}

export const AttachmentStory: Story = {
  name: "Attachment",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Attachment</h1>
        <p {...stylex.props(storyStyles.description)}>
          첨부한 파일의 이름, 크기, 처리 상태와 관련 행동을 함께 보여줍니다.
        </p>
      </header>
      <ComponentExample>
        <AttachmentExample />
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
      <ComponentCode usage={attachmentExampleCode} />
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>States</h2>
          <p {...stylex.props(storyStyles.description)}>
            완료와 오류를 색상뿐 아니라 문구로도 구분합니다.
          </p>
        </header>
        <div
          {...stylex.props(storyStyles.preview, [storyStyles.column, storyStyles.componentWidth])}
        >
          <FileAttachment />
          <FileAttachment error />
        </div>
      </section>
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
