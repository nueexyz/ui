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
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@dumo/ui/input-otp";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Input OTP");

function InputOTPExample() {
  return (
    <section {...stylex.props(storyStyles.section)}>
      <header {...stylex.props(storyStyles.sectionHeader)}>
        <h2 {...stylex.props(storyStyles.sectionTitle)}>6-digit verification code</h2>
        <p {...stylex.props(storyStyles.description)}>
          Pasting a code distributes it across the slots automatically.
        </p>
      </header>
      <div {...stylex.props(storyStyles.preview)}>
        <InputOTP aria-label="6-digit verification code" length={6}>
          <InputOTPGroup>
            <InputOTPSlot />
            <InputOTPSlot />
            <InputOTPSlot />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot />
            <InputOTPSlot />
            <InputOTPSlot />
          </InputOTPGroup>
        </InputOTP>
      </div>
    </section>
  );
}

const inputOTPExampleCode =
  'import { InputOTP, InputOTPGroup, InputOTPSlot } from "@dumo/ui/input-otp"\n\n<InputOTP aria-label="6-digit verification code" length={6}>\n  <InputOTPGroup>\n    {Array.from({ length: 6 }, (_, index) => <InputOTPSlot key={index} />)}\n  </InputOTPGroup>\n</InputOTP>';

export const InputOTPStory: Story = {
  name: "Input OTP",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Input OTP</h1>
        <p {...stylex.props(storyStyles.description)}>
          Enter a one-time code from a text message or authenticator app one digit at a time.
        </p>
      </header>
      <ComponentExample>
        <InputOTPExample />
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
      <ComponentCode usage={inputOTPExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
