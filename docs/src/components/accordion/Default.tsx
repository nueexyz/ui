import { colorVars, spacingVars, typographyVars } from "@nuee/tokens/semantic.stylex";
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
export default function Default() {
  return (
    <div {...stylex.props(layout.preview, layout.componentWidth)}>
      <Accordion defaultValue={["shipping"]}>
        <AccordionItem value="shipping">
          <AccordionHeader>
            <AccordionTrigger>How long does delivery take?</AccordionTrigger>
          </AccordionHeader>
          <AccordionPanel>
            <AccordionContent>Standard delivery takes 2–3 business days.</AccordionContent>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="return">
          <AccordionHeader>
            <AccordionTrigger>How do I request a return?</AccordionTrigger>
          </AccordionHeader>
          <AccordionPanel>
            <AccordionContent>
              Select an item and reason from your order history to request a return.
            </AccordionContent>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem disabled value="member">
          <AccordionHeader>
            <AccordionTrigger>
              <span {...stylex.props(styles.disabledLabel)}>
                Members-only benefits
                <span {...stylex.props(styles.disabledReason)}>Available after joining.</span>
              </span>
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionPanel>
            <AccordionContent>Available after joining.</AccordionContent>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
