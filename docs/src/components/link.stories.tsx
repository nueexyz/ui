import * as stylex from "@stylexjs/stylex";
import { Link } from "@nuee/ui/link";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  storyStyles,
} from "./story-layout/StoryLayout";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const registryName = "link";

function LinkExample() {
  return (
    <section {...stylex.props(storyStyles.section)}>
      <header {...stylex.props(storyStyles.sectionHeader)}>
        <h2 {...stylex.props(storyStyles.sectionTitle)}>External navigation</h2>
        <p {...stylex.props(storyStyles.description)}>
          Use an icon to distinguish destinations outside the current site.
        </p>
      </header>
      <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
        <p>
          Learn more in the{" "}
          <Link href="https://example.com" rel="noreferrer" target="_blank">
            external documentation <Link.ExternalIcon />
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

const linkExampleCode = 'import { Link } from "@nuee/ui/link"';

export const LinkStory: Story = {
  name: "Link",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Link</h1>
        <p {...stylex.props(storyStyles.description)}>
          A text action that navigates within the current screen or to an external location.
        </p>
      </header>
      <ComponentExample>
        <LinkExample />
      </ComponentExample>

      <ComponentCode usage={linkExampleCode} />
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
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Variants</h2>
          <p {...stylex.props(storyStyles.description)}>
            Choose a treatment that matches the surrounding content and link emphasis.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview)}>
          <Link href="#">Default link</Link>
          <span>
            Inherit the current color{" "}
            <Link href="#" variant="current">
              link
            </Link>
          </span>
          <Link href="#" variant="plain">
            Link without underline
          </Link>
        </div>
      </section>
    </main>
  ),
};
