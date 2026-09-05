import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@nuee/ui/navigation-menu";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";

import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  storyStyles,
} from "./story-layout/StoryLayout";

const meta = {
  title: "Components",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const registryName = "navigation-menu";

function NavigationItem({ children, title }: { children: ReactNode; title: string }) {
  return (
    <li>
      <NavigationMenuLink href="#">
        <span {...stylex.props(storyStyles.navigationContent)}>
          <span {...stylex.props(storyStyles.navigationTitle)}>{title}</span>
          <span {...stylex.props(storyStyles.navigationDescription)}>{children}</span>
        </span>
      </NavigationMenuLink>
    </li>
  );
}

function NavigationMenuExample() {
  return (
    <div {...stylex.props(storyStyles.preview)}>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Product</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul {...stylex.props(storyStyles.navigationGrid)}>
                <NavigationItem title="Design tokens">
                  Explore the shared language of color and spacing.
                </NavigationItem>
                <NavigationItem title="Components">
                  Explore the building blocks of product screens.
                </NavigationItem>
                <NavigationItem title="Getting started">
                  Follow the steps from installation to your first screen.
                </NavigationItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul {...stylex.props(storyStyles.navigationGrid, storyStyles.navigationGridCompact)}>
                <NavigationItem title="Installation">
                  Install the packages your project needs.
                </NavigationItem>
                <NavigationItem title="Examples">
                  Review useful combinations for building screens.
                </NavigationItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#">Documentation</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuViewport />
      </NavigationMenu>
    </div>
  );
}

const navigationMenuExampleCode =
  'import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuViewport } from "@nuee/ui/navigation-menu"\n\n<NavigationMenu>\n  <NavigationMenuList>\n    <NavigationMenuItem>\n      <NavigationMenuTrigger>Product</NavigationMenuTrigger>\n      <NavigationMenuContent>\n        <NavigationMenuLink href="#">Design tokens</NavigationMenuLink>\n        <NavigationMenuLink href="#">Components</NavigationMenuLink>\n      </NavigationMenuContent>\n    </NavigationMenuItem>\n    <NavigationMenuItem><NavigationMenuLink href="#">Documentation</NavigationMenuLink></NavigationMenuItem>\n  </NavigationMenuList>\n  <NavigationMenuViewport />\n</NavigationMenu>';

export const NavigationMenuStory: Story = {
  name: "Navigation Menu",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Navigation Menu</h1>
        <p {...stylex.props(storyStyles.description)}>
          Navigate a site’s primary areas and nested pages.
        </p>
      </header>
      <ComponentExample>
        <NavigationMenuExample />
      </ComponentExample>

      <ComponentCode usage={navigationMenuExampleCode} />
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Install</h2>
        </header>
        <CodeBlock
          code={`pnpm dlx @nuee/ui add ${registryName}`}
          label="Terminal"
          language="bash"
        />
      </section>
    </main>
  ),
};
