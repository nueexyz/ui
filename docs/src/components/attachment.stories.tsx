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
import { StoryPage, StoryPreview, StorySection, storyStyles } from "./story-layout/StoryLayout";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

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
    <StoryPage
      title="Attachment"
      description="첨부한 파일의 이름, 크기, 처리 상태와 관련 행동을 함께 보여줍니다."
    >
      <StorySection title="상태" description="완료와 오류를 색상뿐 아니라 문구로도 구분합니다.">
        <StoryPreview xstyle={[storyStyles.column, storyStyles.componentWidth]}>
          <FileAttachment />
          <FileAttachment error />
        </StoryPreview>
      </StorySection>
      <StorySection
        title="파일 묶음"
        description="여러 파일은 같은 구조로 이어서 확인할 수 있게 합니다."
      >
        <StoryPreview>
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
        </StoryPreview>
      </StorySection>
    </StoryPage>
  ),
};
