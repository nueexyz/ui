import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  storyStyles,
} from "./story-layout/StoryLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@nooeh/ui/tabs";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const registryName = "tabs";

function TabsExample() {
  return (
    <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
      <Tabs defaultValue="account" variant="segmented">
        <TabsList aria-label="Segmented settings menu">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger disabled value="billing">
            Billing
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">Manage your name and profile information.</TabsContent>
        <TabsContent value="security">Manage passwords and sign-in history.</TabsContent>
        <TabsContent value="billing">Manage payment methods.</TabsContent>
      </Tabs>
      <Tabs defaultValue="overview" variant="underline">
        <TabsList aria-label="Underline project menu">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger disabled value="settings">
            Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">Review the project’s key information.</TabsContent>
        <TabsContent value="activity">Review recent changes.</TabsContent>
        <TabsContent value="settings">Manage project settings.</TabsContent>
      </Tabs>
    </div>
  );
}

const tabsExampleCode =
  'import { Tabs, TabsContent, TabsList, TabsTrigger } from "@nooeh/ui/tabs"\n\n<Tabs defaultValue="account" variant="segmented">\n  <TabsList>\n    <TabsTrigger value="account">Account</TabsTrigger>\n    <TabsTrigger value="security">Security</TabsTrigger>\n  </TabsList>\n  <TabsContent value="account">Account settings</TabsContent>\n  <TabsContent value="security">Security settings</TabsContent>\n</Tabs>';

export const TabsStory: Story = {
  name: "Tabs",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Tabs</h1>
        <p {...stylex.props(storyStyles.description)}>
          Switch between related content organized into concise categories.
        </p>
      </header>
      <ComponentExample>
        <TabsExample />
      </ComponentExample>

      <ComponentCode usage={tabsExampleCode} />
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Variants</h2>
          <p {...stylex.props(storyStyles.description)}>
            Use segmented tabs for enclosed choices and underline tabs for navigation within a page.
          </p>
        </header>
        <TabsExample />
      </section>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>States</h2>
          <p {...stylex.props(storyStyles.description)}>
            Keep the current tab and unavailable destinations clearly distinguishable.
          </p>
        </header>
        <Tabs defaultValue="account" variant="segmented">
          <TabsList aria-label="Account settings">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger disabled value="billing">
              Billing
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">Account settings</TabsContent>
          <TabsContent value="billing">Billing settings</TabsContent>
        </Tabs>
      </section>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Install</h2>
        </header>
        <CodeBlock
          code={`pnpm dlx @nooeh/ui add ${registryName}`}
          label="Terminal"
          language="bash"
        />
      </section>
    </main>
  ),
};
