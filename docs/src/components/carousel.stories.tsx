import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  storyStyles,
} from "./story-layout/StoryLayout";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@nuee/ui/carousel";
import { colorVars, spacingVars, typographyVars } from "@nuee/tokens/semantic.stylex";

const styles = stylex.create({
  carousel: { maxWidth: "25rem" },
  slide: {
    alignItems: "center",
    backgroundColor: colorVars.bgSubtle,
    display: "flex",
    fontSize: typographyVars.fontSizeXl,
    fontWeight: typographyVars.fontWeightSemibold,
    height: "12rem",
    justifyContent: "center",
    padding: spacingVars.space6,
  },
});

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const registryName = "carousel";

function CarouselExample() {
  return (
    <div {...stylex.props(storyStyles.preview)}>
      <Carousel xstyle={styles.carousel}>
        <CarouselContent>
          {["1", "2", "3", "4", "5"].map((item) => (
            <CarouselItem key={item} xstyle={styles.slide}>
              Slide {item}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

const carouselExampleCode =
  'import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@nuee/ui/carousel"\n\n<Carousel>\n  <CarouselContent>\n    <CarouselItem>First slide</CarouselItem>\n    <CarouselItem>Second slide</CarouselItem>\n  </CarouselContent>\n  <CarouselPrevious />\n  <CarouselNext />\n</Carousel>';

export const CarouselStory: Story = {
  name: "Carousel",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Carousel</h1>
        <p {...stylex.props(storyStyles.description)}>
          Browse a sequence of related content with buttons or a swipe.
        </p>
      </header>
      <ComponentExample>
        <CarouselExample />
      </ComponentExample>
      <ComponentCode usage={carouselExampleCode} />
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
