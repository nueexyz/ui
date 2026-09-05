import {
  colorVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@nuee/tokens/semantic.stylex";
import { Icon, iconRegistry } from "@nuee/ui/icon";
import type { IconName } from "@nuee/ui/icon";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as stylex from "@stylexjs/stylex";

const meta = {
  title: "Foundations/Icon",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const iconNames = Object.keys(iconRegistry) as IconName[];

const styles = stylex.create({
  page: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space6,
    padding: spacingVars.space8,
  },
  heading: {
    fontSize: typographyVars.fontSizeXl,
    margin: 0,
  },
  introduction: {
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeSm,
    lineHeight: typographyVars.lineHeightNormal,
    margin: 0,
  },
  grid: {
    display: "grid",
    gap: spacingVars.space3,
    gridTemplateColumns: "repeat(auto-fill, minmax(8rem, 1fr))",
  },
  item: {
    alignItems: "center",
    backgroundColor: colorVars.bgSurface,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.md,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space3,
    padding: spacingVars.space4,
  },
  name: {
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeXs,
  },
});

export const Registry: Story = {
  render: () => (
    <main {...stylex.props(styles.page)}>
      <h1 {...stylex.props(styles.heading)}>Phosphor Icon Registry</h1>
      <p {...stylex.props(styles.introduction)}>
        Browse icons and their names for product interfaces.
      </p>
      <div {...stylex.props(styles.grid)}>
        {iconNames.map((name) => (
          <div key={name} {...stylex.props(styles.item)}>
            <Icon aria-hidden="true" name={name} size={24} />
            <span {...stylex.props(styles.name)}>{name}</span>
          </div>
        ))}
      </div>
    </main>
  ),
};
