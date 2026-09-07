import { colorVars, sizeVars, typographyVars } from "@nuee/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { TokenRow } from "../../documentation/TokenRow";
const styles = stylex.create({
  list: {
    borderBlockStartColor: colorVars.strokeDefault,
    borderBlockStartStyle: "solid",
    borderBlockStartWidth: sizeVars.stroke,
    display: "flex",
    flexDirection: "column",
  },
  fontFamilySample: (fontFamily: string) => ({
    display: "block",
    fontFamily,
  }),
  typeSample: (fontSize: string, fontWeight: string, lineHeight: string) => ({
    display: "block",
    fontSize,
    fontWeight,
    lineHeight,
  }),
});
const fontSizeTokens = [
  ["fontSizeXs", typographyVars.fontSizeXs, "Supporting information and token values"],
  ["fontSizeSm", typographyVars.fontSizeSm, "Body text and form labels"],
  ["fontSizeMd", typographyVars.fontSizeMd, "Emphasized body text"],
  ["fontSizeLg", typographyVars.fontSizeLg, "Section headings"],
  ["fontSizeXl", typographyVars.fontSizeXl, "Page titles"],
] as const;
const lineHeightTokens = [
  ["lineHeightTight", typographyVars.lineHeightTight, "Headings and single-line text"],
  ["lineHeightNormal", typographyVars.lineHeightNormal, "Body text and multi-line text"],
] as const;
const fontWeightTokens = [
  ["fontWeightRegular", typographyVars.fontWeightRegular, "Default body text"],
  ["fontWeightMedium", typographyVars.fontWeightMedium, "Labels and subtle emphasis"],
  ["fontWeightSemibold", typographyVars.fontWeightSemibold, "Headings and strong emphasis"],
] as const;
export function Typography() {
  return (
    <div {...stylex.props(styles.list)}>
      <TokenRow
        name="typographyVars.fontFamilyBody"
        usage="Body text, form controls, and product UI"
        value={typographyVars.fontFamilyBody}
      >
        <span {...stylex.props(styles.fontFamilySample(typographyVars.fontFamilyBody))}>
          nuée Aa Bb
        </span>
      </TokenRow>
      <TokenRow
        name="typographyVars.fontFamilyHeading"
        usage="Display, title, and heading text"
        value={typographyVars.fontFamilyHeading}
      >
        <span {...stylex.props(styles.fontFamilySample(typographyVars.fontFamilyHeading))}>
          nuée Aa Bb
        </span>
      </TokenRow>
      {fontSizeTokens.map(([name, value, usage]) => (
        <TokenRow key={name} name={`typographyVars.${name}`} usage={usage} value={value}>
          <span
            {...stylex.props(
              styles.typeSample(
                value,
                typographyVars.fontWeightRegular,
                typographyVars.lineHeightNormal,
              ),
            )}
          >
            nuée Aa Bb
          </span>
        </TokenRow>
      ))}
      {lineHeightTokens.map(([name, value, usage]) => (
        <TokenRow key={name} name={`typographyVars.${name}`} usage={usage} value={value}>
          <span
            {...stylex.props(
              styles.typeSample(typographyVars.fontSizeSm, typographyVars.fontWeightRegular, value),
            )}
          >
            Line height for
            <br />
            two-line text
          </span>
        </TokenRow>
      ))}
      {fontWeightTokens.map(([name, value, usage]) => (
        <TokenRow key={name} name={`typographyVars.${name}`} usage={usage} value={value}>
          <span
            {...stylex.props(
              styles.typeSample(typographyVars.fontSizeSm, value, typographyVars.lineHeightNormal),
            )}
          >
            nuée Aa Bb
          </span>
        </TokenRow>
      ))}
    </div>
  );
}
