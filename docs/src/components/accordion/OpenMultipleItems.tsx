import { spacingVars, typographyVars } from "@nuee/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import {
  Accordion,
  AccordionPanel,
  AccordionContent,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
} from "@/components/ui/accordion";
const layout = stylex.create({
  preview: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    fontSize: typographyVars.fontSizeSm,
    gap: spacingVars.space3,
    lineHeight: typographyVars.lineHeightNormal,
    justifyContent: "center",
    width: "100%",
  },
  componentWidth: {
    maxWidth: "28rem",
    width: "100%",
  },
});
export default function OpenMultipleItems() {
  return (
    <div {...stylex.props(layout.preview, layout.componentWidth)}>
      <Accordion defaultValue={["email", "push"]} multiple>
        <AccordionItem value="email">
          <AccordionHeader>
            <AccordionTrigger>Email notifications</AccordionTrigger>
          </AccordionHeader>
          <AccordionPanel>
            <AccordionContent>
              Receive activity updates and weekly summaries by email.
            </AccordionContent>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="push">
          <AccordionHeader>
            <AccordionTrigger>Push notifications</AccordionTrigger>
          </AccordionHeader>
          <AccordionPanel>
            <AccordionContent>
              Receive deadline and comment notifications right away.
            </AccordionContent>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
