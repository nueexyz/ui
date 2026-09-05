import { Avatar, AvatarFallback } from "@nuee/ui/avatar";
import { Button } from "@nuee/ui/button";
import {
  ContentRow,
  ContentRowActions,
  ContentRowContent,
  ContentRowDescription,
  ContentRowGroup,
  ContentRowMedia,
  ContentRowTitle,
} from "@nuee/ui/content-row";
import { DotsThreeIcon, FolderIcon } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as stylex from "@stylexjs/stylex";

import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  storyStyles,
} from "./story-layout/StoryLayout";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const registryName = "content-row";

function ContentRowExample() {
  return (
    <section {...stylex.props(storyStyles.section)}>
      <header {...stylex.props(storyStyles.sectionHeader)}>
        <h2 {...stylex.props(storyStyles.sectionTitle)}>List</h2>
        <p {...stylex.props(storyStyles.description)}>
          Present related items with consistent spacing and alignment.
        </p>
      </header>
      <div {...stylex.props(storyStyles.preview, storyStyles.componentWidth)}>
        <ContentRowGroup>
          <ContentRow variant="outline">
            <ContentRowMedia>
              <FolderIcon aria-hidden="true" />
            </ContentRowMedia>
            <ContentRowContent>
              <ContentRowTitle>Design system</ContentRowTitle>
              <ContentRowDescription>Last edited today at 2:18 PM</ContentRowDescription>
            </ContentRowContent>
            <ContentRowActions>
              <Button aria-label="More actions" size="icon-xs" variant="ghost">
                <DotsThreeIcon aria-hidden="true" size="1rem" />
              </Button>
            </ContentRowActions>
          </ContentRow>
          <ContentRow variant="muted">
            <ContentRowMedia variant="avatar">
              <Avatar>
                <AvatarFallback>MY</AvatarFallback>
              </Avatar>
            </ContentRowMedia>
            <ContentRowContent>
              <ContentRowTitle>Minyeong Jeong</ContentRowTitle>
              <ContentRowDescription>Can edit</ContentRowDescription>
            </ContentRowContent>
          </ContentRow>
        </ContentRowGroup>
      </div>
    </section>
  );
}

const contentRowExampleCode =
  'import { DotsThreeIcon, FolderIcon } from "@phosphor-icons/react"\nimport { Button } from "@nuee/ui/button"\nimport { ContentRow, ContentRowActions, ContentRowContent, ContentRowDescription, ContentRowGroup, ContentRowMedia, ContentRowTitle } from "@nuee/ui/content-row"\n\n<ContentRowGroup>\n  <ContentRow variant="outline">\n    <ContentRowMedia><FolderIcon aria-hidden="true" /></ContentRowMedia>\n    <ContentRowContent><ContentRowTitle>Design system</ContentRowTitle><ContentRowDescription>Last edited today at 2:18 PM</ContentRowDescription></ContentRowContent>\n    <ContentRowActions>\n      <Button aria-label="More actions" size="icon-sm" variant="ghost">\n        <DotsThreeIcon aria-hidden="true" size="1rem" />\n      </Button>\n    </ContentRowActions>\n  </ContentRow>\n</ContentRowGroup>';

export const ContentRowStory: Story = {
  name: "Content Row",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Content Row</h1>
        <p {...stylex.props(storyStyles.description)}>
          Group information, supporting text, and related actions into a repeatable row.
        </p>
      </header>
      <ComponentExample>
        <ContentRowExample />
      </ComponentExample>

      <ComponentCode usage={contentRowExampleCode} />
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Action alignment</h2>
          <p {...stylex.props(storyStyles.description)}>
            Titles and action labels share their first baseline across button sizes. Descriptions
            can wrap without changing that alignment.
          </p>
        </header>
        <ContentRowGroup>
          {(["sm", "md", "lg"] as const).map((size) => (
            <ContentRow key={size} variant="outline">
              <ContentRowContent>
                <ContentRowTitle>Project settings</ContentRowTitle>
                <ContentRowDescription>
                  Review project access and notification preferences.
                  <br />
                  Changes apply to everyone in the workspace.
                </ContentRowDescription>
              </ContentRowContent>
              <ContentRowActions>
                <Button size={size} variant="secondary">
                  Edit
                </Button>
              </ContentRowActions>
            </ContentRow>
          ))}
        </ContentRowGroup>
      </section>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Variants</h2>
          <p {...stylex.props(storyStyles.description)}>
            Choose a surface that fits the row’s grouping and emphasis in its parent layout.
          </p>
        </header>
        <div
          {...stylex.props(storyStyles.preview, [storyStyles.column, storyStyles.componentWidth])}
        >
          <ContentRow>Default row</ContentRow>
          <ContentRow variant="muted">Muted row</ContentRow>
          <ContentRow variant="outline">Outlined row</ContentRow>
        </div>
      </section>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Sizes</h2>
          <p {...stylex.props(storyStyles.description)}>
            Choose a row density that matches the amount of information in the list.
          </p>
        </header>
        <div
          {...stylex.props(storyStyles.preview, [storyStyles.column, storyStyles.componentWidth])}
        >
          <ContentRow size="xs">Extra small row</ContentRow>
          <ContentRow size="sm">Small row</ContentRow>
          <ContentRow>Default row</ContentRow>
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
