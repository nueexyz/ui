import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@nuee/ui/input-group";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as stylex from "@stylexjs/stylex";

import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  storyStyles,
} from "./story-layout/StoryLayout";

const meta = {
  title: "Components",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const registryName = "input-group";

function InputGroupExample() {
  return (
    <section {...stylex.props(storyStyles.section)}>
      <header {...stylex.props(storyStyles.sectionHeader)}>
        <h2 {...stylex.props(storyStyles.sectionTitle)}>Address input</h2>
        <p {...stylex.props(storyStyles.description)}>
          Separate fixed prefixes from the entered value.
        </p>
      </header>
      <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
        <div {...stylex.props(storyStyles.formWidth)}>
          <InputGroup>
            <InputGroupAddon align="inline-start">
              <InputGroupText>https://</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput aria-label="Web address" placeholder="example.com" />
            <InputGroupAddon align="inline-end">
              <InputGroupButton>Copy</InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
    </section>
  );
}

const inputGroupExampleCode =
  'import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from "@nuee/ui/input-group"\n\n<InputGroup>\n  <InputGroupAddon align="inline-start"><InputGroupText>https://</InputGroupText></InputGroupAddon>\n  <InputGroupInput aria-label="Web address" placeholder="example.com" />\n  <InputGroupAddon align="inline-end"><InputGroupButton>Copy</InputGroupButton></InputGroupAddon>\n</InputGroup>';

export const InputGroupStory: Story = {
  name: "Input Group",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Input Group</h1>
        <p {...stylex.props(storyStyles.description)}>
          Place input context and supporting actions on one control surface.
        </p>
      </header>
      <ComponentExample>
        <InputGroupExample />
      </ComponentExample>

      <ComponentCode usage={inputGroupExampleCode} />
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
    </main>
  ),
};
