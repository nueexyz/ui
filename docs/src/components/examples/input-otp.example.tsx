import * as stylex from "@stylexjs/stylex";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@cachette/ui/input-otp";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "../story-layout/StoryLayout";
import { getComponentDocument } from "../story-layout/component-docs";

const componentDocument = getComponentDocument("Input OTP");

export function InputOTPExample() {
  return (
    <>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>6자리 인증 코드</h2>
          <p {...stylex.props(storyStyles.description)}>
            코드를 붙여 넣으면 각 칸에 자동으로 나뉘어 입력됩니다.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview)}>
          <InputOTP aria-label="6자리 인증 코드" length={6}>
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
    </>
  );
}

export const inputOTPExampleCode =
  'import { InputOTP, InputOTPGroup, InputOTPSlot } from "@cachette/ui/input-otp"\n\n<InputOTP aria-label="6자리 인증 코드" length={6}>\n  <InputOTPGroup>\n    {Array.from({ length: 6 }, (_, index) => <InputOTPSlot key={index} />)}\n  </InputOTPGroup>\n</InputOTP>';
