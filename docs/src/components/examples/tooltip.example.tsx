import * as stylex from "@stylexjs/stylex";
import { Button } from "@cachette/ui/button";
import { Icon } from "@cachette/ui/icon";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@cachette/ui/tooltip";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "../story-layout/StoryLayout";
import { getComponentDocument } from "../story-layout/component-docs";

const componentDocument = getComponentDocument("Tooltip");

export function TooltipExample() {
  return (
    <>
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
    </>
  );
}

export const tooltipExampleCode =
  'import { Tooltip, TooltipContent, TooltipTrigger } from "@cachette/ui/tooltip"\n\n<Tooltip>\n  <TooltipTrigger aria-label="도움말">?</TooltipTrigger>\n  <TooltipContent>추가 정보를 확인합니다.</TooltipContent>\n</Tooltip>';
