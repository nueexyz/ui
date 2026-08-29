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
import { Button } from "@dumo/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@dumo/ui/card";
import { Input } from "@dumo/ui/input";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Card");

function CardExample() {
  return (
    <>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Basic structure</h2>
          <p {...stylex.props(storyStyles.description)}>
            Combine a title, description, content, and actions to fit the task.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview)}>
          <div {...stylex.props(storyStyles.grid)}>
            <Card>
              <CardHeader>
                <CardTitle>Archive this project?</CardTitle>
                <CardDescription>Archived projects are hidden from the list.</CardDescription>
              </CardHeader>
              <CardContent>You can restore it anytime in Settings.</CardContent>
              <CardFooter>
                <Button variant="secondary">Cancel</Button>
                <Button>Archive</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Account creation form</h2>
          <p {...stylex.props(storyStyles.description)}>
            Group the fields and actions needed to create an account in one card.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview)}>
          <Card>
            <CardHeader>
              <CardTitle>Create account</CardTitle>
              <CardDescription>
                Enter the name and email you’ll use for the service.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form {...stylex.props(storyStyles.stack)}>
                <label htmlFor="account-name" {...stylex.props(storyStyles.field)}>
                  Name
                  <Input id="account-name" placeholder="Jordan Lee" />
                </label>
                <label htmlFor="account-email" {...stylex.props(storyStyles.field)}>
                  Email
                  <Input id="account-email" type="email" placeholder="hello@example.com" />
                </label>
              </form>
            </CardContent>
            <CardFooter>
              <Button variant="ghost">Cancel</Button>
              <Button>Create account</Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </>
  );
}

const cardExampleCode =
  'import { Card, CardContent, CardHeader, CardTitle } from "@dumo/ui/card"\n\n<Card>\n  <CardHeader>\n    <CardTitle>Project</CardTitle>\n  </CardHeader>\n  <CardContent>Enter the project details.</CardContent>\n</Card>';

export const CardStory: Story = {
  name: "Card",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Card</h1>
        <p {...stylex.props(storyStyles.description)}>
          Group the information and actions needed for one task.
        </p>
      </header>
      <ComponentExample>
        <CardExample />
      </ComponentExample>

      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Install</h2>
        </header>
        <CodeBlock
          code={`pnpm dlx @dumo/ui add ${componentDocument.registryName}`}
          label="Terminal"
          language="bash"
        />
      </section>
      <ComponentCode usage={cardExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
