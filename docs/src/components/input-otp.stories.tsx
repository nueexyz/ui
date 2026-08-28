import * as stylex from "@stylexjs/stylex";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@cachette/ui/input-otp";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "./story-layout/StoryLayout";
import { getComponentDocument } from "./story-layout/component-docs";
import { InputOTPExample, inputOTPExampleCode } from "./examples/input-otp.example";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Input OTP");

export const InputOTPStory: Story = {
  name: "Input OTP",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Input OTP</h1>
        <p {...stylex.props(storyStyles.description)}>
          문자나 인증 앱으로 받은 일회용 코드를 한 자리씩 입력합니다.
        </p>
      </header>
      <ComponentExample>
        <InputOTPExample />
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
      <ComponentCode usage={inputOTPExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
