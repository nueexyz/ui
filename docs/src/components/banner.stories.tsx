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
import { Banner } from "@nooeh/ui/banner";
import { Icon } from "@nooeh/ui/icon";
import { Link } from "@nooeh/ui/link";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Banner");

function BannerExample() {
  return (
    <>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Meaning</h2>
          <p {...stylex.props(storyStyles.description)}>
            Use colors that match the message’s importance and intent.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
          <Banner
            description="A new version is ready to install."
            icon={<Icon aria-hidden="true" name="info" weight="fill" />}
            title="Update available"
          />
          <Banner
            description="You will be signed out automatically in 5 minutes."
            icon={<Icon aria-hidden="true" name="warning" weight="fill" />}
            title="Your session expires soon"
            variant="warning"
          />
          <Banner
            description="Check your connection and try again."
            icon={<Icon aria-hidden="true" name="error" weight="fill" />}
            title="Couldn’t save changes"
            variant="error"
          />
          <Banner
            description="The service will be unavailable for about 10 minutes starting at 11 PM."
            icon={<Icon aria-hidden="true" name="info" weight="fill" />}
            title="Scheduled maintenance"
            variant="neutral"
          />
        </div>
      </section>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Compact guidance</h2>
          <p {...stylex.props(storyStyles.description)}>
            Show only the essential message and action on narrow screens.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
          <Banner
            action={
              <Link href="#" variant="current">
                Manage DNS
              </Link>
            }
            description="A DNS record with this name already exists."
            size="sm"
          />
        </div>
      </section>
    </>
  );
}

const bannerExampleCode =
  'import { Banner } from "@nooeh/ui/banner"\nimport { Icon } from "@nooeh/ui/icon"\nimport { Link } from "@nooeh/ui/link"';

export const BannerStory: Story = {
  name: "Banner",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Banner</h1>
        <p {...stylex.props(storyStyles.description)}>
          Communicate the current state and next action within the page.
        </p>
      </header>
      <ComponentExample>
        <BannerExample />
      </ComponentExample>

      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Install</h2>
        </header>
        <CodeBlock
          code={`pnpm dlx @nooeh/ui add ${componentDocument.registryName}`}
          label="Terminal"
          language="bash"
        />
      </section>
      <ComponentCode usage={bannerExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
