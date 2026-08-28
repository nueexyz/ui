import * as stylex from "@stylexjs/stylex";
import { Link } from "@cachette/ui/link";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "./story-layout/StoryLayout";
import { getComponentDocument } from "./story-layout/component-docs";
import { LinkExample, linkExampleCode } from "./examples/link.example";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Link");

export const LinkStory: Story = {
  name: "Link",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Link</h1>
        <p {...stylex.props(storyStyles.description)}>
          현재 화면 안이나 외부 위치로 이동할 수 있는 텍스트 행동입니다.
        </p>
      </header>
      <ComponentExample>
        <LinkExample />
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
      <ComponentCode usage={linkExampleCode} />
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Variants</h2>
          <p {...stylex.props(storyStyles.description)}>
            주변 콘텐츠와 링크의 강조 수준에 맞게 선택합니다.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview)}>
          <Link href="#">기본 링크</Link>
          <span>
            현재 색상을 따르는{" "}
            <Link href="#" variant="current">
              링크
            </Link>
          </span>
          <Link href="#" variant="plain">
            밑줄 없는 링크
          </Link>
        </div>
      </section>
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
