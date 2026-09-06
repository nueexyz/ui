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
export default function Default() {
  return (
    <div {...stylex.props(layout.preview, layout.column)}>
      <Banner description="A new version is ready to install." title="Update available" />
      <Banner
        description="You will be signed out automatically in 5 minutes."
        title="Your session expires soon"
      />
      <Banner description="Check your connection and try again." title="Couldn’t save changes" />
      <Banner
        description="The service will be unavailable for about 10 minutes starting at 11 PM."
        title="Scheduled maintenance"
      />
    </div>
  );
}
