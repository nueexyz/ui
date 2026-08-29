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
import { Checkbox } from "@dumo/ui/checkbox";
import { colorVars } from "@dumo/tokens/tokens.stylex";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Checkbox");

const styles = stylex.create({
  disabledOption: { color: colorVars.fgDisabled, cursor: "not-allowed" },
});

function CheckboxExample() {
  return (
    <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
      <label htmlFor="email-updates" {...stylex.props(storyStyles.option)}>
        <Checkbox defaultChecked id="email-updates" />
        Receive updates by email
      </label>
      <label htmlFor="admin-setting" {...stylex.props(storyStyles.option, styles.disabledOption)}>
        <Checkbox disabled id="admin-setting" />
        Set by an administrator · Cannot be changed
      </label>
      <label
        htmlFor="required-setting"
        {...stylex.props(storyStyles.option, styles.disabledOption)}
      >
        <Checkbox defaultChecked disabled id="required-setting" />
        Required setting · Always on
      </label>
    </div>
  );
}

const checkboxExampleCode =
  'import { Checkbox } from "@dumo/ui/checkbox"\n\n<Checkbox aria-label="Agree to terms" />';

export const CheckboxStory: Story = {
  name: "Checkbox",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Checkbox</h1>
        <p {...stylex.props(storyStyles.description)}>
          Use to select one or more independent options.
        </p>
      </header>
      <ComponentExample>
        <CheckboxExample />
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
      <ComponentCode usage={checkboxExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
