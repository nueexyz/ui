import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@nuee/ui/input-otp";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as stylex from "@stylexjs/stylex";

import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  storyStyles,
} from "./story-layout/StoryLayout";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const registryName = "input-otp";

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
  'import { InputOTP, InputOTPGroup, InputOTPSlot } from "@nuee/ui/input-otp"\n\n<InputOTP aria-label="6-digit verification code" length={6}>\n  <InputOTPGroup>\n    {Array.from({ length: 6 }, (_, index) => <InputOTPSlot key={index} />)}\n  </InputOTPGroup>\n</InputOTP>';

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

      <ComponentCode usage={inputOTPExampleCode} />
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
