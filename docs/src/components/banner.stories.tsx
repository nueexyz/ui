import * as stylex from "@stylexjs/stylex";
import { Banner } from "@cachette/ui/banner";
import { Icon } from "@cachette/ui/icon";
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
import { BannerExample, bannerExampleCode } from "./examples/banner.example";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Banner");

export const BannerStory: Story = {
  name: "Banner",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Banner</h1>
        <p {...stylex.props(storyStyles.description)}>
          화면 안에서 현재 상태와 필요한 다음 행동을 전달합니다.
        </p>
      </header>
      <ComponentExample>
        <BannerExample />
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
      <ComponentCode usage={bannerExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
