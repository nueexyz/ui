import { spacingVars } from "@cachette/tokens/tokens.stylex";
import { Button } from "@cachette/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@cachette/ui/empty";
import { Icon } from "@cachette/ui/icon";
import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "../story-layout/StoryLayout";
import { getComponentDocument } from "../story-layout/component-docs";

const componentDocument = getComponentDocument("Empty");
const styles = stylex.create({ full: { width: "100%" }, content: { gap: spacingVars.space4 } });

export function EmptyExample() {
  return (
    <>
      <div {...stylex.props(storyStyles.preview)}>
        <Empty xstyle={styles.full}>
          <EmptyHeader>
            <EmptyMedia>
              <Icon aria-hidden="true" name="folder" />
            </EmptyMedia>
            <EmptyTitle>저장한 프로젝트가 없습니다</EmptyTitle>
            <EmptyDescription>
              자주 확인할 프로젝트를 저장하면 이곳에서 바로 열 수 있습니다.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent xstyle={styles.content}>
            <Button>프로젝트 저장하기</Button>
          </EmptyContent>
        </Empty>
      </div>
    </>
  );
}

export const emptyExampleCode =
  'import { Button } from "@cachette/ui/button"\nimport { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@cachette/ui/empty"\nimport { Icon } from "@cachette/ui/icon"\n\n<Empty>\n  <EmptyHeader>\n    <EmptyMedia><Icon aria-hidden="true" name="folder" /></EmptyMedia>\n    <EmptyTitle>저장한 프로젝트가 없습니다</EmptyTitle>\n    <EmptyDescription>자주 확인할 프로젝트를 저장하면 이곳에서 바로 열 수 있습니다.</EmptyDescription>\n  </EmptyHeader>\n  <EmptyContent><Button>프로젝트 저장하기</Button></EmptyContent>\n</Empty>';
