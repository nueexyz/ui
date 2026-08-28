import * as stylex from "@stylexjs/stylex";
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
import { SpinnerExample, spinnerExampleCode } from "./examples/spinner.example";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Spinner");
export const SpinnerStory: Story = {
  name: "Spinner",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Spinner</h1>
        <p {...stylex.props(storyStyles.description)}>
          완료 시점을 예측하기 어려운 짧은 작업을 표시합니다.
        </p>
      </header>
      <ComponentExample>
        <SpinnerExample />
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
      <ComponentCode usage={spinnerExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
