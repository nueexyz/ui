import * as stylex from "@stylexjs/stylex";
import { Icon } from "@cachette/ui/icon";
import { Marker, MarkerContent, MarkerIcon } from "@cachette/ui/marker";
import { Spinner } from "@cachette/ui/spinner";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "../story-layout/StoryLayout";
import { getComponentDocument } from "../story-layout/component-docs";

const componentDocument = getComponentDocument("Marker");

export function MarkerExample() {
  return (
    <>
      <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
        <Marker>
          <MarkerIcon>
            <Spinner label="답변 작성 중" />
          </MarkerIcon>
          <MarkerContent>답변을 작성하고 있어요.</MarkerContent>
        </Marker>
      </div>
    </>
  );
}

export const markerExampleCode =
  'import { Marker, MarkerContent, MarkerIcon } from "@cachette/ui/marker"\nimport { Spinner } from "@cachette/ui/spinner"\n\n<Marker>\n  <MarkerIcon><Spinner label="답변 작성 중" /></MarkerIcon>\n  <MarkerContent>답변을 작성하고 있어요.</MarkerContent>\n</Marker>';
