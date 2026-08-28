import { colorVars, motionVars, spacingVars, typographyVars } from "@cachette/tokens/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  container: { overflowX: "auto", position: "relative", width: "100%" },
  table: {
    borderCollapse: "collapse",
    captionSide: "bottom",
    color: colorVars.fgPrimary,
    fontSize: typographyVars.fontSizeSm,
    width: "100%",
  },
  header: {
    borderBottomColor: colorVars.strokeDefault,
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
  },
  body: {},
  footer: {
    backgroundColor: colorVars.bgSubtle,
    borderTopColor: colorVars.strokeDefault,
    borderTopStyle: "solid",
    borderTopWidth: 1,
    fontWeight: typographyVars.fontWeightMedium,
  },
  row: {
    borderBottomColor: colorVars.strokeDefault,
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    transitionDuration: motionVars.durationFast,
    transitionProperty: "background-color",
    transitionTimingFunction: motionVars.easingStandard,
    backgroundColor: {
      default: "transparent",
      ":hover": colorVars.interactionHover,
    },
  },
  head: {
    color: colorVars.fgSecondary,
    fontWeight: typographyVars.fontWeightMedium,
    height: "2.5rem",
    paddingInline: spacingVars.space3,
    textAlign: "left",
    verticalAlign: "middle",
    whiteSpace: "nowrap",
  },
  cell: {
    paddingBlock: spacingVars.space3,
    paddingInline: spacingVars.space3,
    verticalAlign: "middle",
    whiteSpace: "nowrap",
  },
  caption: {
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeSm,
    marginTop: spacingVars.space4,
    textAlign: "left",
  },
});
