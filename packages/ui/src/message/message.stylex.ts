import { colorVars, spacingVars, typographyVars } from "@dumo/tokens/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  root: { display: "flex", flexDirection: "column", gap: spacingVars.space2, width: "100%" },
  incoming: { alignItems: "flex-start" },
  outgoing: { alignItems: "flex-end" },
  header: {
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeXs,
    fontWeight: typographyVars.fontWeightMedium,
  },
  content: { display: "flex", flexDirection: "column", gap: spacingVars.space2, width: "100%" },
  footer: { color: colorVars.fgTertiary, fontSize: typographyVars.fontSizeXs },
});
