import * as stylex from "@stylexjs/stylex";
import { DownloadSimpleIcon, FileIcon, PaperclipIcon, XIcon } from "@phosphor-icons/react";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@nuee/ui/attachment";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  storyStyles,
} from "./story-layout/StoryLayout";
import { AttachmentGroup } from "@nuee/ui/attachment";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const registryName = "attachment";

const styles = stylex.create({ image: { height: "100%", objectFit: "cover", width: "100%" } });

function AttachmentExample() {
  return (
    <section {...stylex.props(storyStyles.section)}>
      <header {...stylex.props(storyStyles.sectionHeader)}>
        <h2 {...stylex.props(storyStyles.sectionTitle)}>File list</h2>
        <p {...stylex.props(storyStyles.description)}>
          Present multiple files in a consistent, scannable list.
        </p>
      </header>
      <div {...stylex.props(storyStyles.preview)}>
        <AttachmentGroup>
          <Attachment size="sm">
            <AttachmentMedia>
              <PaperclipIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>meeting-notes.txt</AttachmentTitle>
              <AttachmentDescription>18 KB</AttachmentDescription>
            </AttachmentContent>
          </Attachment>
          <Attachment size="sm">
            <AttachmentMedia>
              <PaperclipIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>wireframes.fig</AttachmentTitle>
              <AttachmentDescription>8.1 MB</AttachmentDescription>
            </AttachmentContent>
          </Attachment>
          <Attachment size="sm">
            <AttachmentMedia variant="image">
              <img
                alt="Blue and purple abstract artwork"
                src="https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=192&q=80"
                {...stylex.props(styles.image)}
              />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>cover-art.png</AttachmentTitle>
              <AttachmentDescription>1.2 MB</AttachmentDescription>
            </AttachmentContent>
          </Attachment>
        </AttachmentGroup>
      </div>
    </section>
  );
}

const attachmentExampleCode =
  'import { PaperclipIcon } from "@phosphor-icons/react"\nimport {\n  Attachment,\n  AttachmentContent,\n  AttachmentDescription,\n  AttachmentMedia,\n  AttachmentTitle,\n} from "@nuee/ui/attachment"\n\n<Attachment>\n  <AttachmentMedia>\n    <PaperclipIcon />\n  </AttachmentMedia>\n  <AttachmentContent>\n    <AttachmentTitle>meeting-notes.txt</AttachmentTitle>\n    <AttachmentDescription>18 KB</AttachmentDescription>\n  </AttachmentContent>\n</Attachment>';

function FileAttachment({ error = false }: { error?: boolean }) {
  return (
    <Attachment state={error ? "error" : "done"}>
      <AttachmentMedia>
        <FileIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>project-proposal.pdf</AttachmentTitle>
        <AttachmentDescription>
          {error ? "Couldn’t upload the file. Try again." : "2.4 MB · Uploaded"}
        </AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Download file">
          <DownloadSimpleIcon />
        </AttachmentAction>
        <AttachmentAction aria-label="Remove attachment">
          <XIcon />
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
          Show an attachment’s name, size, status, and relevant actions together.
        </p>
      </header>
      <ComponentExample>
        <AttachmentExample />
      </ComponentExample>

      <ComponentCode usage={attachmentExampleCode} />
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Sizes</h2>
          <p {...stylex.props(storyStyles.description)}>
            Choose a density that keeps the file list scannable without overwhelming nearby content.
          </p>
        </header>
        <div
          {...stylex.props(storyStyles.preview, [storyStyles.column, storyStyles.componentWidth])}
        >
          <Attachment size="xs">Extra small attachment</Attachment>
          <Attachment size="sm">Small attachment</Attachment>
          <Attachment>Default attachment</Attachment>
        </div>
      </section>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Install</h2>
        </header>
        <CodeBlock
          code={`pnpm dlx @nuee/ui add ${registryName}`}
          label="Terminal"
          language="bash"
        />
      </section>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>States</h2>
          <p {...stylex.props(storyStyles.description)}>
            Distinguish success and errors with text as well as color.
          </p>
        </header>
        <div
          {...stylex.props(storyStyles.preview, [storyStyles.column, storyStyles.componentWidth])}
        >
          <FileAttachment />
          <FileAttachment error />
        </div>
      </section>
    </main>
  ),
};
