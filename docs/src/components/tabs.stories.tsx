import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  storyStyles,
} from "./story-layout/StoryLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@nuee/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@nuee/ui/tabs";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const registryName = "tabs";

function TabsExample() {
  return (
    <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
      <Tabs defaultValue="overview" variant="segmented">
        <TabsList aria-label="Project sections">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
              <CardDescription>
                View key metrics and recent activity across your active projects.
              </CardDescription>
            </CardHeader>
            <CardContent>You have 12 active projects and 3 pending tasks.</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>
                Review trends across your projects and identify work that needs attention.
              </CardDescription>
            </CardHeader>
            <CardContent>Project activity increased 18% this week.</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>Create and share progress reports with your team.</CardDescription>
            </CardHeader>
            <CardContent>Your weekly report is ready to review.</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>
                Manage notifications and preferences for this project.
              </CardDescription>
            </CardHeader>
            <CardContent>Notifications are enabled for project updates.</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const tabsExampleCode =
  'import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@nuee/ui/card"\nimport { Tabs, TabsContent, TabsList, TabsTrigger } from "@nuee/ui/tabs"\n\n<Tabs defaultValue="overview">\n  <TabsList>\n    <TabsTrigger value="overview">Overview</TabsTrigger>\n    <TabsTrigger value="analytics">Analytics</TabsTrigger>\n    <TabsTrigger value="reports">Reports</TabsTrigger>\n    <TabsTrigger value="settings">Settings</TabsTrigger>\n  </TabsList>\n  <TabsContent value="overview">\n    <Card>\n      <CardHeader>\n        <CardTitle>Overview</CardTitle>\n        <CardDescription>View key metrics and recent activity.</CardDescription>\n      </CardHeader>\n      <CardContent>You have 12 active projects and 3 pending tasks.</CardContent>\n    </Card>\n  </TabsContent>\n</Tabs>';

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
          code={`pnpm dlx @nuee/ui add ${registryName}`}
          label="Terminal"
          language="bash"
        />
      </section>
    </main>
  ),
};
