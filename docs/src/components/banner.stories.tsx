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
import { Banner } from "@cachette/ui/banner";
import { Icon } from "@cachette/ui/icon";
import { Link } from "@cachette/ui/link";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Banner");

function BannerExample() {
  return (
    <>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>의미</h2>
          <p {...stylex.props(storyStyles.description)}>
            메시지의 중요도와 성격에 맞는 색을 사용합니다.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
          <Banner
            description="새 버전을 지금 설치할 수 있습니다."
            icon={<Icon aria-hidden="true" name="info" weight="fill" />}
            title="업데이트가 준비됐어요."
          />
          <Banner
            description="5분 뒤 자동으로 로그아웃됩니다."
            icon={<Icon aria-hidden="true" name="warning" weight="fill" />}
            title="세션이 곧 만료돼요."
            variant="warning"
          />
          <Banner
            description="연결을 확인한 뒤 다시 시도해 주세요."
            icon={<Icon aria-hidden="true" name="error" weight="fill" />}
            title="변경사항을 저장하지 못했어요."
            variant="error"
          />
          <Banner
            description="오늘 오후 11시부터 약 10분 동안 이용할 수 없습니다."
            icon={<Icon aria-hidden="true" name="info" weight="fill" />}
            title="점검이 예정되어 있어요."
            variant="neutral"
          />
        </div>
      </section>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>간결한 안내</h2>
          <p {...stylex.props(storyStyles.description)}>
            좁은 화면에서는 핵심 설명과 행동만 표시합니다.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
          <Banner
            action={
              <Link href="#" variant="current">
                DNS 관리
              </Link>
            }
            description="같은 이름의 DNS 레코드가 이미 있습니다."
            size="sm"
          />
        </div>
      </section>
    </>
  );
}

const bannerExampleCode =
  'import { Banner } from "@cachette/ui/banner"\nimport { Icon } from "@cachette/ui/icon"\nimport { Link } from "@cachette/ui/link"';

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
