import * as stylex from "@stylexjs/stylex";
import { Icon } from "@nooeh/ui/icon";
import { Marker, MarkerContent, MarkerIcon } from "@nooeh/ui/marker";
import { Spinner } from "@nooeh/ui/spinner";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "./story-layout/StoryLayout";
import { getComponentDocument } from "./story-layout/component-docs";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Marker");

function MarkerExample() {
  return (
    <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
      <Marker>
        <MarkerIcon>
          <Spinner label="Writing a reply" />
        </MarkerIcon>
        <MarkerContent>Writing a reply.</MarkerContent>
      </Marker>
    </div>
  );
}

const markerExampleCode =
  'import { Marker, MarkerContent, MarkerIcon } from "@nooeh/ui/marker"\nimport { Spinner } from "@nooeh/ui/spinner"\n\n<Marker>\n  <MarkerIcon><Spinner label="Writing a reply" /></MarkerIcon>\n  <MarkerContent>Writing a reply.</MarkerContent>\n</Marker>';

export const MarkerStory: Story = {
  name: "Marker",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Marker</h1>
        <p {...stylex.props(storyStyles.description)}>
          Mark points and sections where state changes in a conversation or activity flow.
        </p>
      </header>
      <ComponentExample>
        <MarkerExample />
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
      <ComponentCode usage={markerExampleCode} />
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Variants</h2>
          <p {...stylex.props(storyStyles.description)}>
            Choose default, outline, or separator treatments to fit the surrounding structure.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
          <Marker>
            <MarkerIcon>
              <Spinner label="Writing a reply" />
            </MarkerIcon>
            <MarkerContent>Writing a reply.</MarkerContent>
          </Marker>
          <Marker variant="border">
            <MarkerIcon>
              <Icon name="branch" />
            </MarkerIcon>
            <MarkerContent>Started a new task flow.</MarkerContent>
          </Marker>
          <Marker variant="separator">
            <MarkerContent>Unread messages</MarkerContent>
          </Marker>
        </div>
      </section>
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
