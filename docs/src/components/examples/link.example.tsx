import * as stylex from "@stylexjs/stylex";
import { Link } from "@cachette/ui/link";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CodeBlock,
  ComponentCode,
  ComponentExample,
  ComponentPropsTable,
  storyStyles,
} from "../story-layout/StoryLayout";
import { getComponentDocument } from "../story-layout/component-docs";

const componentDocument = getComponentDocument("Link");

export function LinkExample() {
  return (
    <>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>외부 이동</h2>
          <p {...stylex.props(storyStyles.description)}>
            다른 사이트로 이동하면 아이콘으로 목적지를 구분합니다.
          </p>
        </header>
        <div {...stylex.props(storyStyles.preview, storyStyles.column)}>
          <p>
            자세한 내용은{" "}
            <Link href="https://example.com" rel="noreferrer" target="_blank">
              외부 문서 <Link.ExternalIcon />
            </Link>
            에서 확인할 수 있습니다.
          </p>
        </div>
      </section>
    </>
  );
}

export const linkExampleCode = 'import { Link } from "@cachette/ui/link"';
