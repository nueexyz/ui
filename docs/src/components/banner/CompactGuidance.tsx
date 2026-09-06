import { spacingVars, typographyVars } from "@nuee/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { Banner } from "@/components/ui/banner";
import { Link } from "@/components/ui/link";
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
export default function CompactGuidance() {
  return (
    <div {...stylex.props(layout.preview, layout.column)}>
      <Banner
        action={
          <Link href="#" variant="current">
            Manage DNS
          </Link>
        }
        description="A DNS record with this name already exists."
        size="sm"
      />
    </div>
  );
}
