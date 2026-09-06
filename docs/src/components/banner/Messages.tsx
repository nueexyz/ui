import { spacingVars, typographyVars } from "@nuee/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { Banner } from "@/components/ui/banner";
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
  column: {
    alignItems: "stretch",
    flexDirection: "column",
  },
});
export default function Messages() {
  return (
    <div {...stylex.props(layout.preview, layout.column)}>
      <Banner description="An update is ready." title="Information" />
      <Banner description="Review this before continuing." title="Review needed" />
      <Banner description="Your changes could not be saved." title="Couldn’t save changes" />
      <Banner description="No action is required." title="All caught up" />
    </div>
  );
}
