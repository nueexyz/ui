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
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@dumo/ui/breadcrumb";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Breadcrumb");

function BreadcrumbExample() {
  return (
    <>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>기본</h2>
          <p {...stylex.props(storyStyles.description)}>
            가장 가까운 상위 경로부터 현재 페이지까지 표시합니다.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview)}>
          <Breadcrumb aria-label="현재 위치">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">프로젝트</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">디자인 시스템</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>컴포넌트</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>경로 축약</h2>
          <p {...stylex.props(storyStyles.description)}>
            경로가 길면 중간 단계를 줄여 현재 위치를 우선 보여줍니다.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview)}>
          <Breadcrumb aria-label="현재 위치">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">문서</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbEllipsis />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>접근성</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>
    </>
  );
}

const breadcrumbExampleCode =
  'import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@dumo/ui/breadcrumb"\n\n<Breadcrumb aria-label="현재 위치">\n  <BreadcrumbList>\n    <BreadcrumbItem><BreadcrumbLink href="#">프로젝트</BreadcrumbLink></BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem><BreadcrumbLink href="#">디자인 시스템</BreadcrumbLink></BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem><BreadcrumbPage>컴포넌트</BreadcrumbPage></BreadcrumbItem>\n  </BreadcrumbList>\n</Breadcrumb>';

export const BreadcrumbStory: Story = {
  name: "Breadcrumb",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Breadcrumb</h1>
        <p {...stylex.props(storyStyles.description)}>
          현재 위치와 상위 경로를 한눈에 파악하고 이동할 수 있게 합니다.
        </p>
      </header>
      <ComponentExample>
        <BreadcrumbExample />
      </ComponentExample>

      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>설치</h2>
        </header>
        <CodeBlock
          code={`pnpm dlx @dumo/ui add ${componentDocument.registryName}`}
          label="터미널"
          language="bash"
        />
      </section>
      <ComponentCode usage={breadcrumbExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
