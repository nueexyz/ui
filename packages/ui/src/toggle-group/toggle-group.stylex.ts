import { spacingVars } from "@cachette/tokens/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  root: { alignItems: "center", display: "flex", gap: spacingVars.space1, width: "fit-content" },
});
