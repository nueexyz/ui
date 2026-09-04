import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  storyStyles,
} from "./story-layout/StoryLayout";
import { Banner } from "@nuee/ui/banner";
import { Link } from "@nuee/ui/link";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const registryName = "banner";

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
          <Banner description="A new version is ready to install." title="Update available" />
          <Banner
            description="You will be signed out automatically in 5 minutes."
            title="Your session expires soon"
          />
          <Banner
            description="Check your connection and try again."
            title="Couldn’t save changes"
          />
          <Banner
            description="The service will be unavailable for about 10 minutes starting at 11 PM."
            title="Scheduled maintenance"
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
  'import { Banner } from "@nuee/ui/banner"\nimport { Link } from "@nuee/ui/link"';

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

      <ComponentCode usage={bannerExampleCode} />
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Messages</h2>
          <p {...stylex.props(storyStyles.description)}>
            Keep the message focused on the current state and the next action.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
          <Banner description="An update is ready." title="Information" />
          <Banner description="Review this before continuing." title="Review needed" />
          <Banner description="Your changes could not be saved." title="Couldn’t save changes" />
          <Banner description="No action is required." title="All caught up" />
        </div>
      </section>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Sizes</h2>
          <p {...stylex.props(storyStyles.description)}>
            Use the compact size when a page needs to preserve vertical space.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
          <Banner description="A standard page-level message." title="Default" />
          <Banner description="A compact inline message." size="sm" title="Compact" />
        </div>
      </section>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Install</h2>
        </header>
        <CodeBlock
          code={`pnpm dlx @nuee/ui add ${registryName}`}
          label="Terminal"
          language="bash"
        />
      </section>
    </main>
  ),
};
