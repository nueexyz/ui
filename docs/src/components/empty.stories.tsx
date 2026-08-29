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
          <EmptyTitle>No saved projects</EmptyTitle>
          <EmptyDescription>
            Save projects you visit often to open them here quickly.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent xstyle={styles.content}>
          <Button>Save project</Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}

const emptyExampleCode =
  'import { Button } from "@dumo/ui/button"\nimport { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@dumo/ui/empty"\nimport { Icon } from "@dumo/ui/icon"\n\n<Empty>\n  <EmptyHeader>\n    <EmptyMedia><Icon aria-hidden="true" name="folder" /></EmptyMedia>\n    <EmptyTitle>No saved projects</EmptyTitle>\n    <EmptyDescription>Save projects you visit often to open them here quickly.</EmptyDescription>\n  </EmptyHeader>\n  <EmptyContent><Button>Save project</Button></EmptyContent>\n</Empty>';

export const EmptyStory: Story = {
  name: "Empty",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Empty</h1>
        <p {...stylex.props(storyStyles.description)}>
          Explain why there is no content yet and what to do next.
        </p>
      </header>
      <ComponentExample>
        <EmptyExample />
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
      <ComponentCode usage={emptyExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
