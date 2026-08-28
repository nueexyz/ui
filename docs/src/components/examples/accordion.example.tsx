import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@cachette/ui/accordion";
import { colorVars, spacingVars, typographyVars } from "@cachette/tokens/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "../story-layout/StoryLayout";
import { getComponentDocument } from "../story-layout/component-docs";

const componentDocument = getComponentDocument("Accordion");

const styles = stylex.create({
  disabledLabel: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space1,
  },
  disabledReason: {
    color: colorVars.fgDisabled,
    fontSize: typographyVars.fontSizeXs,
    fontWeight: typographyVars.fontWeightRegular,
  },
});

export function AccordionExample() {
  return (
    <>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>하나씩 열기</h2>
          <p {...stylex.props(storyStyles.description)}>한 번에 하나의 답변만 확인합니다.</p>
        </header>
        <div {...stylex.props(storyStyles.preview, storyStyles.componentWidth)}>
          <Accordion defaultValue={["shipping"]}>
            <AccordionItem value="shipping">
              <AccordionTrigger>배송은 얼마나 걸리나요?</AccordionTrigger>
              <AccordionContent>기본 배송은 영업일 기준 2~3일이 걸립니다.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="return">
              <AccordionTrigger>반품은 어떻게 신청하나요?</AccordionTrigger>
              <AccordionContent>
                주문 내역에서 반품할 상품과 사유를 선택해 신청할 수 있습니다.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem disabled value="member">
              <AccordionTrigger>
                <span {...stylex.props(styles.disabledLabel)}>
                  멤버 전용 혜택
                  <span {...stylex.props(styles.disabledReason)}>
                    멤버십 가입 후 이용할 수 있어요.
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent>멤버십 가입 후 확인할 수 있습니다.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>여러 개 열기</h2>
          <p {...stylex.props(storyStyles.description)}>
            서로 비교해야 하는 정보는 동시에 펼칠 수 있습니다.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview, storyStyles.componentWidth)}>
          <Accordion defaultValue={["email", "push"]} multiple>
            <AccordionItem value="email">
              <AccordionTrigger>이메일 알림</AccordionTrigger>
              <AccordionContent>주요 활동과 주간 요약을 이메일로 받습니다.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="push">
              <AccordionTrigger>푸시 알림</AccordionTrigger>
              <AccordionContent>마감과 댓글 알림을 바로 받습니다.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </>
  );
}

export const accordionExampleCode =
  'import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@cachette/ui/accordion"\n\n<Accordion defaultValue={["item-1"]}>\n  <AccordionItem value="item-1">\n    <AccordionTrigger>계정 설정</AccordionTrigger>\n    <AccordionContent>프로필과 알림 설정을 변경할 수 있습니다.</AccordionContent>\n  </AccordionItem>\n</Accordion>';
