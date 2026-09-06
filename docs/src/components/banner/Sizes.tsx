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
export default function Sizes() {
  return (
    <div {...stylex.props(layout.preview, layout.column)}>
      <Banner description="A standard page-level message." title="Default" />
      <Banner description="A compact inline message." size="sm" title="Compact" />
    </div>
  );
}
