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
} from "../story-layout/StoryLayout";
import { getComponentDocument } from "../story-layout/component-docs";

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

export function AttachmentExample() {
  return (
    <>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>파일 묶음</h2>
          <p {...stylex.props(storyStyles.description)}>
            여러 파일은 같은 구조로 이어서 확인할 수 있게 합니다.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview)}>
          <AttachmentGroup>
            <Attachment size="sm">
              <AttachmentMedia>
                <Icon name="paperclip" />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>회의록.txt</AttachmentTitle>
                <AttachmentDescription>18 KB</AttachmentDescription>
              </AttachmentContent>
            </Attachment>
            <Attachment size="sm">
              <AttachmentMedia>
                <Icon name="paperclip" />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>화면설계.fig</AttachmentTitle>
                <AttachmentDescription>8.1 MB</AttachmentDescription>
              </AttachmentContent>
            </Attachment>
          </AttachmentGroup>
        </div>
      </section>
    </>
  );
}

export const attachmentExampleCode =
  'import {\n  Attachment,\n  AttachmentContent,\n  AttachmentDescription,\n  AttachmentMedia,\n  AttachmentTitle,\n} from "@cachette/ui/attachment"\nimport { Icon } from "@cachette/ui/icon"\n\n<Attachment>\n  <AttachmentMedia>\n    <Icon name="paperclip" />\n  </AttachmentMedia>\n  <AttachmentContent>\n    <AttachmentTitle>회의록.txt</AttachmentTitle>\n    <AttachmentDescription>18 KB</AttachmentDescription>\n  </AttachmentContent>\n</Attachment>';
