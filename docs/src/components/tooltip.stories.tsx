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
import { Icon } from "@cachette/ui/icon";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@cachette/ui/tooltip";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const componentDocument = getComponentDocument("Tooltip");

function TooltipExample() {
  return (
    <section {...stylex.props(storyStyles.section)}>
      <header {...stylex.props(storyStyles.sectionHeader)}>
        <h2 {...stylex.props(storyStyles.sectionTitle)}>정렬</h2>
        <p {...stylex.props(storyStyles.description)}>
          트리거의 시작, 가운데, 끝을 기준으로 설명 위치를 맞춥니다.
        </p>
      </header>
      <div {...stylex.props(storyStyles.preview)}>
        <TooltipProvider delay={100}>
          {(
            [
              ["start", "왼쪽 정렬"],
              ["center", "가운데 정렬"],
              ["end", "오른쪽 정렬"],
            ] as const
          ).map(([align, label]) => (
            <Tooltip key={align}>
              <TooltipTrigger
                render={
                  <Button size="sm" variant="secondary">
                    {label}
                    <Icon aria-hidden="true" name="info" />
                  </Button>
                }
              />
              <TooltipContent align={align}>프로젝트 공개 범위를 변경합니다.</TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </section>
  );
}

const tooltipExampleCode =
  'import { Tooltip, TooltipContent, TooltipTrigger } from "@cachette/ui/tooltip"\n\n<Tooltip>\n  <TooltipTrigger aria-label="도움말">?</TooltipTrigger>\n  <TooltipContent>추가 정보를 확인합니다.</TooltipContent>\n</Tooltip>';

export const TooltipStory: Story = {
  name: "Tooltip",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>Tooltip</h1>
        <p {...stylex.props(storyStyles.description)}>
          아이콘이나 짧은 컨트롤의 의미를 한 문장으로 설명합니다.
        </p>
      </header>
      <ComponentExample>
        <TooltipExample />
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
      <ComponentCode usage={tooltipExampleCode} />
      <ComponentPropsTable props={componentDocument.props} />
    </main>
  ),
};
