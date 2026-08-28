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
} from "./story-layout/StoryLayout";
import { getComponentDocument } from "./story-layout/component-docs";
import { BreadcrumbExample, breadcrumbExampleCode } from "./examples/breadcrumb.example";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Breadcrumb");

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
          code={`pnpm dlx @cachette/ui add ${componentDocument.registryName}`}
          label="터미널"
          language="bash"
        />
      </section>
      <ComponentCode usage={breadcrumbExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
