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
              <FieldLegend>결제 정보</FieldLegend>
              <p {...stylex.props(storyStyles.description)}>
                결제 정보는 암호화되어 안전하게 처리됩니다.
              </p>
            </div>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="cardholder">카드 소유자 이름</FieldLabel>
                <Input id="cardholder" autoComplete="cc-name" defaultValue="김민영" />
              </Field>
              <Field invalid>
                <FieldLabel htmlFor="card-number">카드 번호</FieldLabel>
                <Input
                  id="card-number"
                  aria-invalid
                  autoComplete="cc-number"
                  defaultValue="1234 5678 9012"
                  inputMode="numeric"
                />
                <FieldDescription>숫자 16자리를 입력하세요.</FieldDescription>
                <FieldError>카드 번호가 완전하지 않습니다.</FieldError>
              </Field>
              <Field orientation="horizontal">
                <Checkbox id="billing-address" defaultChecked />
                <FieldContent>
                  <FieldTitle>배송지와 청구지 주소가 같습니다.</FieldTitle>
                  <FieldDescription>
                    다른 주소로 청구해야 한다면 선택을 해제하세요.
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
  'import { Checkbox } from "@dumo/ui/checkbox"\nimport {\n  Field,\n  FieldContent,\n  FieldDescription,\n  FieldError,\n  FieldGroup,\n  FieldLabel,\n  FieldLegend,\n  FieldSet,\n  FieldTitle,\n} from "@dumo/ui/field"\nimport { Input } from "@dumo/ui/input"\n\n<FieldSet>\n  <FieldLegend>결제 정보</FieldLegend>\n  <p>결제 정보는 암호화되어 안전하게 처리됩니다.</p>\n  <FieldGroup>\n    <Field>\n      <FieldLabel htmlFor="cardholder">카드 소유자 이름</FieldLabel>\n      <Input id="cardholder" autoComplete="cc-name" defaultValue="김민영" />\n    </Field>\n    <Field invalid>\n      <FieldLabel htmlFor="card-number">카드 번호</FieldLabel>\n      <Input\n        id="card-number"\n        aria-invalid\n        autoComplete="cc-number"\n        defaultValue="1234 5678 9012"\n        inputMode="numeric"\n      />\n      <FieldDescription>숫자 16자리를 입력하세요.</FieldDescription>\n      <FieldError>카드 번호가 완전하지 않습니다.</FieldError>\n    </Field>\n    <Field orientation="horizontal">\n      <Checkbox id="billing-address" defaultChecked />\n      <FieldContent>\n        <FieldTitle>배송지와 청구지 주소가 같습니다.</FieldTitle>\n        <FieldDescription>다른 주소로 청구해야 한다면 선택을 해제하세요.</FieldDescription>\n      </FieldContent>\n    </Field>\n  </FieldGroup>\n</FieldSet>';

export const FieldStory: Story = {
  name: "Field",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Field</h1>
        <p {...stylex.props(storyStyles.description)}>
          레이블, 설명, 입력, 오류를 하나의 접근 가능한 필드로 연결합니다.
        </p>
      </header>
      <ComponentExample>
        <FieldExample />
      </ComponentExample>

      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>설치</h2>
        </header>
        <CodeBlock
          code={`pnpm dlx @dumo/ui add ${componentDocument.registryName}`}
          label="터미널"
          language="bash"
        />
      </section>
      <ComponentCode usage={fieldExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
