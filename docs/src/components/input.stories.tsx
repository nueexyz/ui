import { Input } from "@nuee/ui/input";
import * as stylex from "@stylexjs/stylex";
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

const registryName = "input";

function InputExample() {
  return (
    <>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Default</h2>
          <p {...stylex.props(storyStyles.description)}>
            Compare the default treatment before and after entry.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
          <div {...stylex.props(storyStyles.stack, storyStyles.formWidth)}>
            <Input aria-label="Name" placeholder="Jordan Lee" />
            <Input aria-label="Email" defaultValue="hello@nuee.dev" />
          </div>
        </div>
      </section>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Input types</h2>
          <p {...stylex.props(storyStyles.description)}>
            Keep the same size and state rules across input types.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
          <div {...stylex.props(storyStyles.stack, storyStyles.formWidth)}>
            <label htmlFor="input-email" {...stylex.props(storyStyles.field)}>
              Email
              <Input id="input-email" type="email" placeholder="hello@example.com" />
            </label>
            <label htmlFor="input-password" {...stylex.props(storyStyles.field)}>
              Password
              <Input id="input-password" type="password" defaultValue="password" />
            </label>
          </div>
        </div>
      </section>
    </>
  );
}

const inputExampleCode =
  'import { Input } from "@nuee/ui/input"\n\n<Input aria-label="Email" placeholder="name@example.com" type="email" />';

export const InputStory: Story = {
  name: "Input",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Input</h1>
        <p {...stylex.props(storyStyles.description)}>
          Compare treatments by value, input type, and state.
        </p>
      </header>
      <ComponentExample>
        <InputExample />
      </ComponentExample>

      <ComponentCode usage={inputExampleCode} />
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
            Clearly distinguish error and disabled states from the default input.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
          <div {...stylex.props(storyStyles.stack, storyStyles.formWidth)}>
            <Input aria-label="Invalid email" aria-invalid defaultValue="min@" />
            <Input aria-label="Read-only name" disabled defaultValue="Jordan Lee" />
          </div>
        </div>
      </section>
    </main>
  ),
};
