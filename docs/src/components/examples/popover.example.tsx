import * as stylex from "@stylexjs/stylex";
import { Button } from "@cachette/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@cachette/ui/popover";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "../story-layout/StoryLayout";
import { getComponentDocument } from "../story-layout/component-docs";

const componentDocument = getComponentDocument("Popover");

export function PopoverExample() {
  return (
    <>
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
    </>
  );
}

export const popoverExampleCode =
  'import { Button } from "@cachette/ui/button"\nimport { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@cachette/ui/popover"\n\n<Popover>\n  <PopoverTrigger render={<Button variant="secondary">왼쪽 정렬</Button>} />\n  <PopoverContent>\n    <PopoverHeader>\n      <PopoverTitle>왼쪽 정렬</PopoverTitle>\n      <PopoverDescription>Popover의 시작점을 트리거에 맞춥니다.</PopoverDescription>\n    </PopoverHeader>\n  </PopoverContent>\n</Popover>';
