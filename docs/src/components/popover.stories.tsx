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
import { Button } from "@cachette/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@cachette/ui/popover";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Popover");

function PopoverExample() {
  return (
    <section {...stylex.props(storyStyles.section)}>
      <header {...stylex.props(storyStyles.sectionHeader)}>
        <h2 {...stylex.props(storyStyles.sectionTitle)}>정렬</h2>
        <p {...stylex.props(storyStyles.description)}>
          기본값은 트리거의 왼쪽 모서리에 맞추며 필요에 따라 가운데나 오른쪽으로 정렬합니다.
        </p>
      </header>
      <div {...stylex.props(storyStyles.preview)}>
        <Popover>
          <PopoverTrigger render={<Button variant="secondary">왼쪽 정렬</Button>} />
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>왼쪽 정렬</PopoverTitle>
              <PopoverDescription>Popover의 시작점을 트리거에 맞춥니다.</PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger render={<Button variant="secondary">가운데 정렬</Button>} />
          <PopoverContent align="center">
            <PopoverHeader>
              <PopoverTitle>가운데 정렬</PopoverTitle>
              <PopoverDescription>Popover의 가운데를 트리거에 맞춥니다.</PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger render={<Button variant="secondary">오른쪽 정렬</Button>} />
          <PopoverContent align="end">
            <PopoverHeader>
              <PopoverTitle>오른쪽 정렬</PopoverTitle>
              <PopoverDescription>Popover의 끝점을 트리거에 맞춥니다.</PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
      </div>
    </section>
  );
}

const popoverExampleCode =
  'import { Button } from "@cachette/ui/button"\nimport { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@cachette/ui/popover"\n\n<Popover>\n  <PopoverTrigger render={<Button variant="secondary">왼쪽 정렬</Button>} />\n  <PopoverContent>\n    <PopoverHeader>\n      <PopoverTitle>왼쪽 정렬</PopoverTitle>\n      <PopoverDescription>Popover의 시작점을 트리거에 맞춥니다.</PopoverDescription>\n    </PopoverHeader>\n  </PopoverContent>\n</Popover>';

export const PopoverStory: Story = {
  name: "Popover",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Popover</h1>
        <p {...stylex.props(storyStyles.description)}>
          현재 화면을 벗어나지 않고 보조 정보나 간단한 조작을 제공합니다.
        </p>
      </header>
      <ComponentExample>
        <PopoverExample />
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
      <ComponentCode usage={popoverExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
