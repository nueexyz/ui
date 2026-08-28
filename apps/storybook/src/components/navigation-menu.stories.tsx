import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@cachette/ui/navigation-menu";
import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview, storyStyles } from "./story-layout/StoryLayout";

const meta = {
  title: "Components",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const NavigationMenuStory: Story = {
  name: "Navigation Menu",
  render: () => (
    <StoryPage title="Navigation Menu" description="사이트의 주요 영역과 하위 페이지를 탐색합니다.">
      <StoryPreview>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>제품</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul {...stylex.props(storyStyles.navigationGrid)}>
                  <li>
                    <NavigationMenuLink href="#">
                      <span {...stylex.props(storyStyles.navigationTitle)}>디자인 토큰</span>
                      <span {...stylex.props(storyStyles.navigationDescription)}>
                        색상과 간격의 공통 언어를 확인합니다.
                      </span>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink href="#">
                      <span {...stylex.props(storyStyles.navigationTitle)}>컴포넌트</span>
                      <span {...stylex.props(storyStyles.navigationDescription)}>
                        제품 화면을 구성하는 요소를 살펴봅니다.
                      </span>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#">문서</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
          <NavigationMenuViewport />
        </NavigationMenu>
      </StoryPreview>
    </StoryPage>
  ),
};
