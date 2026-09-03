import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  storyStyles,
} from "./story-layout/StoryLayout";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@nuee/ui/pagination";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const registryName = "pagination";

function PaginationExample() {
  return (
    <section {...stylex.props(storyStyles.section)}>
      <header {...stylex.props(storyStyles.sectionHeader)}>
        <h2 {...stylex.props(storyStyles.sectionTitle)}>Default</h2>
        <p {...stylex.props(storyStyles.description)}>
          Indicate the current page through its selected state and accessibility information.
        </p>
      </header>
      <div {...stylex.props(storyStyles.preview)}>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
}

const paginationExampleCode =
  'import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@nuee/ui/pagination"\n\n<Pagination>\n  <PaginationContent>\n    <PaginationItem><PaginationPrevious href="#" /></PaginationItem>\n    <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>\n    <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>\n    <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>\n    <PaginationItem><PaginationEllipsis /></PaginationItem>\n    <PaginationItem><PaginationNext href="#" /></PaginationItem>\n  </PaginationContent>\n</Pagination>';

export const PaginationStory: Story = {
  name: "Pagination",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Pagination</h1>
        <p {...stylex.props(storyStyles.description)}>
          Show the current location and navigation range for paginated content.
        </p>
      </header>
      <ComponentExample>
        <PaginationExample />
      </ComponentExample>

      <ComponentCode usage={paginationExampleCode} />
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>Sizes</h2>
          <p {...stylex.props(storyStyles.description)}>
            Use icon links for compact page controls and default links when page numbers need text.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview)}>
          <PaginationLink href="#" size="icon" aria-label="Previous page">
            1
          </PaginationLink>
          <PaginationLink href="#" size="default">
            Page 1
          </PaginationLink>
        </div>
      </section>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>States</h2>
          <p {...stylex.props(storyStyles.description)}>
            Mark the current page so people can identify their location at a glance.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview)}>
          <PaginationLink href="#">1</PaginationLink>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
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
