import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  storyStyles,
} from "./story-layout/StoryLayout";
import { Spinner } from "@nooeh/ui/spinner";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const registryName = "spinner";

function SpinnerExample() {
  return (
    <div {...stylex.props(storyStyles.preview)}>
      <Spinner label="Saving" />
    </div>
  );
}

const spinnerExampleCode =
  'import { Spinner } from "@nooeh/ui/spinner"\n\n<Spinner label="Saving" />';

export const SpinnerStory: Story = {
  name: "Spinner",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Spinner</h1>
        <p {...stylex.props(storyStyles.description)}>
          Indicate short work whose completion time is hard to predict.
        </p>
      </header>
      <ComponentExample>
        <SpinnerExample />
      </ComponentExample>

      <ComponentCode usage={spinnerExampleCode} />
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Install</h2>
        </header>
        <CodeBlock
          code={`pnpm dlx @nooeh/ui add ${registryName}`}
          label="Terminal"
          language="bash"
        />
      </section>
    </main>
  ),
};
