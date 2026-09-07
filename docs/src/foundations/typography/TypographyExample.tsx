import { colorVars, spacingVars, typographyVars } from "@nuee/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { Heading } from "@/components/ui/heading";

const styles = stylex.create({
  section: { display: "flex", flexDirection: "column", gap: spacingVars.space3 },
  body: {
    fontFamily: typographyVars.fontFamilyBody,
    fontSize: typographyVars.fontSizeMd,
    fontWeight: typographyVars.fontWeightRegular,
    lineHeight: typographyVars.lineHeightNormal,
    margin: 0,
  },
  description: {
    color: colorVars.fgSecondary,
    fontFamily: typographyVars.fontFamilyBody,
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightRegular,
    lineHeight: typographyVars.lineHeightNormal,
    margin: 0,
  },
});

export default function TypographyExample() {
  return (
    <section {...stylex.props(styles.section)}>
      <Heading level={2} size="section">
        Notifications
      </Heading>
      <p {...stylex.props(styles.body)}>Choose which project updates you receive.</p>
      <p {...stylex.props(styles.description)}>You can change these preferences at any time.</p>
    </section>
  );
}
