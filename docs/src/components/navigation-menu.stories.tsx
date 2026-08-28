import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "./story-layout/StoryLayout";
import { getComponentDocument } from "./story-layout/component-docs";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@cachette/ui/navigation-menu";
import type { ReactNode } from "react";

const meta = {
  title: "Components",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

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

function NavigationMenuExample() {
  return (
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
              <ul {...stylex.props(storyStyles.navigationGrid, storyStyles.navigationGridCompact)}>
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
  );
}

const navigationMenuExampleCode =
  'import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuViewport } from "@cachette/ui/navigation-menu"\n\n<NavigationMenu>\n  <NavigationMenuList>\n    <NavigationMenuItem>\n      <NavigationMenuTrigger>제품</NavigationMenuTrigger>\n      <NavigationMenuContent>\n        <NavigationMenuLink href="#">디자인 토큰</NavigationMenuLink>\n        <NavigationMenuLink href="#">컴포넌트</NavigationMenuLink>\n      </NavigationMenuContent>\n    </NavigationMenuItem>\n    <NavigationMenuItem><NavigationMenuLink href="#">문서</NavigationMenuLink></NavigationMenuItem>\n  </NavigationMenuList>\n  <NavigationMenuViewport />\n</NavigationMenu>';

export const NavigationMenuStory: Story = {
  name: "Navigation Menu",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Navigation Menu</h1>
        <p {...stylex.props(storyStyles.description)}>
          사이트의 주요 영역과 하위 페이지를 탐색합니다.
        </p>
      </header>
      <ComponentExample>
        <NavigationMenuExample />
      </ComponentExample>

      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>설치</h2>
        </header>
        <CodeBlock
          code={`pnpm dlx @cachette/ui add ${componentDocument.registryName}`}
          label="터미널"
          language="bash"
        />
      </section>
      <ComponentCode usage={navigationMenuExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
