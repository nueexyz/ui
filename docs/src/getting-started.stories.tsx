import {
  colorVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@dumo/tokens/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { CodeBlock, storyStyles } from "./components/story-layout/StoryLayout";

const meta = {
  title: "시작하기",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const config = `{
  "aliases": {
    "ui": "@/components/ui"
  }
}`;

const tsconfig = `{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}`;

const styles = stylex.create({
  configDetail: {
    backgroundColor: colorVars.bgSubtle,
    borderLeftColor: colorVars.strokeStrong,
    borderLeftStyle: "solid",
    borderLeftWidth: sizeVars.stroke,
    borderRadius: radiusVars.sm,
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space1,
    margin: 0,
    paddingBlock: spacingVars.space3,
    paddingInline: spacingVars.space4,
  },
  configField: {
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightMedium,
    margin: 0,
  },
  configDescription: {
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeSm,
    lineHeight: typographyVars.lineHeightNormal,
    margin: 0,
  },
  note: {
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeSm,
    lineHeight: typographyVars.lineHeightNormal,
    margin: 0,
  },
  path: {
    color: colorVars.fgPrimary,
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightMedium,
    margin: 0,
  },
});

export const GettingStarted: Story = {
  name: "시작하기",
  render: () => (
    <main {...stylex.props(storyStyles.page)}>
      <header {...stylex.props(storyStyles.header)}>
        <h1 {...stylex.props(storyStyles.title)}>시작하기</h1>
        <p {...stylex.props(storyStyles.description)}>
          프로젝트에 필요한 컴포넌트를 파일로 추가해 사용합니다.
        </p>
      </header>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>1. 초기화</h2>
          <p {...stylex.props(storyStyles.description)}>프로젝트 루트에서 한 번만 실행합니다.</p>
        </header>
        <CodeBlock code="pnpm dlx @dumo/ui init" label="터미널" language="bash" />
      </section>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>2. import 별칭</h2>
          <p {...stylex.props(storyStyles.description)}>
            init에서 입력한 UI import 별칭은 프로젝트 루트의 dumo.json에 저장됩니다.
          </p>
        </header>
        <CodeBlock code={config} label="dumo.json" language="json" />
        <dl {...stylex.props(styles.configDetail)}>
          <dt {...stylex.props(styles.configField)}>aliases.ui</dt>
          <dd {...stylex.props(styles.configDescription)}>
            추가된 UI 컴포넌트를 import할 때 사용하는 별칭입니다.
          </dd>
        </dl>
        <p {...stylex.props(styles.note)}>
          실제 파일 위치는 tsconfig.json 또는 jsconfig.json의 paths에서 정합니다.
        </p>
      </section>
      <section {...stylex.props(storyStyles.section)}>
        <header {...stylex.props(storyStyles.sectionHeader)}>
          <h2 {...stylex.props(storyStyles.sectionTitle)}>3. 파일 위치</h2>
          <p {...stylex.props(storyStyles.description)}>
            add 명령은 import 별칭과 paths를 함께 읽어 컴포넌트를 저장할 폴더를 찾습니다.
          </p>
        </header>
        <CodeBlock code={tsconfig} label="tsconfig.json" language="json" />
        <p {...stylex.props(styles.path)}>@/components/ui → src/components/ui</p>
        <p {...stylex.props(styles.note)}>
          별칭을 바꾸면 dumo.json과 tsconfig 또는 jsconfig의 paths를 함께 수정하세요. 이미 추가한
          파일은 자동으로 옮겨지지 않습니다.
        </p>
      </section>
    </main>
  ),
};
