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
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@dumo/ui/field";
import { Input } from "@dumo/ui/input";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Field");

function FieldExample() {
  return (
    <section {...stylex.props(storyStyles.section)}>
      <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
        <form {...stylex.props(storyStyles.formWidth)}>
          <FieldSet>
            <div>
              <FieldLegend>Payment details</FieldLegend>
              <p {...stylex.props(storyStyles.description)}>
                Payment details are encrypted and handled securely.
              </p>
            </div>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="cardholder">Cardholder name</FieldLabel>
                <Input id="cardholder" autoComplete="cc-name" defaultValue="Jordan Lee" />
              </Field>
              <Field invalid>
                <FieldLabel htmlFor="card-number">Card number</FieldLabel>
                <Input
                  id="card-number"
                  aria-invalid
                  autoComplete="cc-number"
                  defaultValue="1234 5678 9012"
                  inputMode="numeric"
                />
                <FieldDescription>Enter all 16 digits.</FieldDescription>
                <FieldError>The card number is incomplete.</FieldError>
              </Field>
              <Field orientation="horizontal">
                <Checkbox id="billing-address" defaultChecked />
                <FieldContent>
                  <FieldTitle>Billing address is the same as shipping address.</FieldTitle>
                  <FieldDescription>
                    Clear this option to use a different billing address.
                  </FieldDescription>
                </FieldContent>
              </Field>
            </FieldGroup>
          </FieldSet>
        </form>
      </div>
    </section>
  );
}

const fieldExampleCode =
  'import { Checkbox } from "@dumo/ui/checkbox"\nimport {\n  Field,\n  FieldContent,\n  FieldDescription,\n  FieldError,\n  FieldGroup,\n  FieldLabel,\n  FieldLegend,\n  FieldSet,\n  FieldTitle,\n} from "@dumo/ui/field"\nimport { Input } from "@dumo/ui/input"\n\n<FieldSet>\n  <FieldLegend>Payment details</FieldLegend>\n  <p>Payment details are encrypted and handled securely.</p>\n  <FieldGroup>\n    <Field>\n      <FieldLabel htmlFor="cardholder">Cardholder name</FieldLabel>\n      <Input id="cardholder" autoComplete="cc-name" defaultValue="Jordan Lee" />\n    </Field>\n    <Field invalid>\n      <FieldLabel htmlFor="card-number">Card number</FieldLabel>\n      <Input\n        id="card-number"\n        aria-invalid\n        autoComplete="cc-number"\n        defaultValue="1234 5678 9012"\n        inputMode="numeric"\n      />\n      <FieldDescription>Enter all 16 digits.</FieldDescription>\n      <FieldError>The card number is incomplete.</FieldError>\n    </Field>\n    <Field orientation="horizontal">\n      <Checkbox id="billing-address" defaultChecked />\n      <FieldContent>\n        <FieldTitle>Billing address is the same as shipping address.</FieldTitle>\n        <FieldDescription>Clear this option to use a different billing address.</FieldDescription>\n      </FieldContent>\n    </Field>\n  </FieldGroup>\n</FieldSet>';

export const FieldStory: Story = {
  name: "Field",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Field</h1>
        <p {...stylex.props(storyStyles.description)}>
          Connect labels, descriptions, inputs, and errors in one accessible field.
        </p>
      </header>
      <ComponentExample>
        <FieldExample />
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
      <ComponentCode usage={fieldExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
