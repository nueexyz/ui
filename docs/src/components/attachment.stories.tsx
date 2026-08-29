import * as stylex from "@stylexjs/stylex";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@dumo/ui/attachment";
import { Icon } from "@dumo/ui/icon";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "./story-layout/StoryLayout";
import { getComponentDocument } from "./story-layout/component-docs";
import { AttachmentGroup } from "@dumo/ui/attachment";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Attachment");

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
              <Icon name="paperclip" />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>meeting-notes.txt</AttachmentTitle>
              <AttachmentDescription>18 KB</AttachmentDescription>
            </AttachmentContent>
          </Attachment>
          <Attachment size="sm">
            <AttachmentMedia>
              <Icon name="paperclip" />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>wireframes.fig</AttachmentTitle>
              <AttachmentDescription>8.1 MB</AttachmentDescription>
            </AttachmentContent>
          </Attachment>
        </AttachmentGroup>
      </div>
    </section>
  );
}

const attachmentExampleCode =
  'import {\n  Attachment,\n  AttachmentContent,\n  AttachmentDescription,\n  AttachmentMedia,\n  AttachmentTitle,\n} from "@dumo/ui/attachment"\nimport { Icon } from "@dumo/ui/icon"\n\n<Attachment>\n  <AttachmentMedia>\n    <Icon name="paperclip" />\n  </AttachmentMedia>\n  <AttachmentContent>\n    <AttachmentTitle>meeting-notes.txt</AttachmentTitle>\n    <AttachmentDescription>18 KB</AttachmentDescription>\n  </AttachmentContent>\n</Attachment>';

function FileAttachment({ error = false }: { error?: boolean }) {
  return (
    <Attachment state={error ? "error" : "done"}>
      <AttachmentMedia>
        <Icon name="file" />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>project-proposal.pdf</AttachmentTitle>
        <AttachmentDescription>
          {error ? "Couldn’t upload the file. Try again." : "2.4 MB · Uploaded"}
        </AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Download file">
          <Icon name="download" />
        </AttachmentAction>
        <AttachmentAction aria-label="Remove attachment">
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
          Show an attachment’s name, size, status, and relevant actions together.
        </p>
      </header>
      <ComponentExample>
        <AttachmentExample />
      </ComponentExample>

      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Install</h2>
        </header>
        <CodeBlock
          code={`pnpm dlx @dumo/ui add ${componentDocument.registryName}`}
          label="Terminal"
          language="bash"
        />
      </section>
      <ComponentCode usage={attachmentExampleCode} />
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
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
