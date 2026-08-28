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
import type { ReactNode } from "react";
import { StoryPage, StoryPreview, storyStyles } from "./story-layout/StoryLayout";

const meta = {
  title: "Components",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

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
                  <NavigationItem title="디자인 토큰">
                    색상과 간격의 공통 언어를 확인합니다.
                  </NavigationItem>
                  <NavigationItem title="컴포넌트">
                    제품 화면을 구성하는 요소를 살펴봅니다.
                  </NavigationItem>
                  <NavigationItem title="시작하기">
                    설치부터 첫 화면 구성까지 순서대로 안내합니다.
                  </NavigationItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>리소스</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul
                  {...stylex.props(storyStyles.navigationGrid, storyStyles.navigationGridCompact)}
                >
                  <NavigationItem title="설치 안내">
                    프로젝트에 필요한 패키지를 설치합니다.
                  </NavigationItem>
                  <NavigationItem title="사용 예시">
                    화면 구성에 필요한 조합을 확인합니다.
                  </NavigationItem>
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
