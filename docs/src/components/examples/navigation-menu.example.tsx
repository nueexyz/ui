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
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "../story-layout/StoryLayout";
import { getComponentDocument } from "../story-layout/component-docs";

const componentDocument = getComponentDocument("Navigation Menu");

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

export function NavigationMenuExample() {
  return (
    <>
      <div {...stylex.props(storyStyles.preview)}>
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
      </div>
    </>
  );
}

export const navigationMenuExampleCode =
  'import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuViewport } from "@cachette/ui/navigation-menu"\n\n<NavigationMenu>\n  <NavigationMenuList>\n    <NavigationMenuItem>\n      <NavigationMenuTrigger>제품</NavigationMenuTrigger>\n      <NavigationMenuContent>\n        <NavigationMenuLink href="#">디자인 토큰</NavigationMenuLink>\n        <NavigationMenuLink href="#">컴포넌트</NavigationMenuLink>\n      </NavigationMenuContent>\n    </NavigationMenuItem>\n    <NavigationMenuItem><NavigationMenuLink href="#">문서</NavigationMenuLink></NavigationMenuItem>\n  </NavigationMenuList>\n  <NavigationMenuViewport />\n</NavigationMenu>';
