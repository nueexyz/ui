import { spacingVars, typographyVars } from "@nuee/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Icon } from "@/components/ui/icon";
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
});
export default function Default() {
  return (
    <div {...stylex.props(layout.preview)}>
      <ButtonGroup aria-label="Navigate back">
        <Button size="icon-sm" variant="secondary" aria-label="Go back">
          <Icon aria-hidden="true" name="chevronLeft" />
        </Button>
      </ButtonGroup>
      <ButtonGroup aria-label="Message actions">
        <Button size="sm" variant="secondary">
          Archive
        </Button>
        <Button size="sm" variant="secondary">
          Report
        </Button>
      </ButtonGroup>
      <ButtonGroup aria-label="More actions">
        <Button size="sm" variant="secondary">
          Snooze
        </Button>
        <Button size="icon-sm" variant="secondary" aria-label="More actions">
          <Icon aria-hidden="true" name="moreHorizontal" />
        </Button>
      </ButtonGroup>
    </div>
  );
}
