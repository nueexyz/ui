import * as stylex from "@stylexjs/stylex";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@cachette/ui/breadcrumb";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "../story-layout/StoryLayout";
import { getComponentDocument } from "../story-layout/component-docs";

const componentDocument = getComponentDocument("Breadcrumb");

export function BreadcrumbExample() {
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

export const breadcrumbExampleCode =
  'import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@cachette/ui/breadcrumb"\n\n<Breadcrumb aria-label="현재 위치">\n  <BreadcrumbList>\n    <BreadcrumbItem><BreadcrumbLink href="#">프로젝트</BreadcrumbLink></BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem><BreadcrumbLink href="#">디자인 시스템</BreadcrumbLink></BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem><BreadcrumbPage>컴포넌트</BreadcrumbPage></BreadcrumbItem>\n  </BreadcrumbList>\n</Breadcrumb>';
