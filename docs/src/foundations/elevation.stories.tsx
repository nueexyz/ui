import {
  colorVars,
  radiusVars,
  shadowVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@dumo/tokens/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

const meta = {
  title: "Foundations/Elevation",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const styles = stylex.create({
  page: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space8,
    marginInline: "auto",
    maxWidth: "72rem",
    padding: spacingVars.space8,
  },
  header: { display: "flex", flexDirection: "column", gap: spacingVars.space2 },
  heading: {
    fontSize: typographyVars.fontSizeXl,
    lineHeight: typographyVars.lineHeightTight,
    margin: 0,
  },
  introduction: {
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeSm,
    lineHeight: typographyVars.lineHeightNormal,
    margin: 0,
  },
  grid: {
    display: "grid",
    gap: spacingVars.space4,
    gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 1fr))",
  },
  example: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space3,
  },
  preview: {
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.lg,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    minHeight: "10rem",
    overflow: "hidden",
    padding: spacingVars.space4,
    position: "relative",
  },
  basement: { backgroundColor: colorVars.bgCanvas },
  defaultLayer: { backgroundColor: colorVars.bgSurface },
  floatingLayer: {
    backgroundColor: colorVars.bgRaised,
    boxShadow: shadowVars.floating,
  },
  overlayLayer: {
    backgroundColor: colorVars.bgRaised,
    boxShadow: shadowVars.overlay,
  },
  nestedLayer: {
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.md,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    color: colorVars.fgPrimary,
    padding: spacingVars.space4,
  },
  localLayer: {
    backgroundColor: colorVars.bgRaised,
    borderRadius: radiusVars.md,
    boxShadow: shadowVars.subtle,
    color: colorVars.fgPrimary,
    marginBlockStart: spacingVars.space4,
    padding: spacingVars.space4,
  },
  label: {
    color: colorVars.fgPrimary,
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightMedium,
  },
  description: {
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeXs,
    lineHeight: typographyVars.lineHeightNormal,
    margin: 0,
  },
  token: {
    color: colorVars.fgSecondary,
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    fontSize: typographyVars.fontSizeXs,
  },
  shadowPreview: (boxShadow: string) => ({
    backgroundColor: colorVars.bgRaised,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.lg,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    boxShadow,
    height: "8rem",
  }),
});

function Page({
  children,
  description,
  title,
}: {
  children: ReactNode;
  description: string;
  title: string;
}) {
  return (
    <main {...stylex.props(styles.page)}>
      <header {...stylex.props(styles.header)}>
        <h1 {...stylex.props(styles.heading)}>{title}</h1>
        <p {...stylex.props(styles.introduction)}>{description}</p>
      </header>
      {children}
    </main>
  );
}

function Example({
  children,
  description,
  name,
  token,
  value,
}: {
  children: ReactNode;
  description: string;
  name: string;
  token: string;
  value?: string;
}) {
  return (
    <article {...stylex.props(styles.example)}>
      {children}
      <strong {...stylex.props(styles.label)}>{name}</strong>
      <p {...stylex.props(styles.description)}>{description}</p>
      <code {...stylex.props(styles.token)}>{token}</code>
      {value ? <TokenValue token={value} /> : null}
    </article>
  );
}

function TokenValue({ token }: { token: string }) {
  const elementRef = useRef<HTMLElement>(null);
  const [value, setValue] = useState(token);

  useLayoutEffect(() => {
    const variableName = token.match(/var\((--[^,)]+)/)?.[1];
    const element = elementRef.current;
    const resolvedValue =
      variableName && element
        ? getComputedStyle(element).getPropertyValue(variableName).trim()
        : "";
    const nextValue = resolvedValue || token;

    setValue((currentValue) => (currentValue === nextValue ? currentValue : nextValue));
  }, [token]);

  return (
    <code ref={elementRef} {...stylex.props(styles.token)}>
      {value}
    </code>
  );
}

export const GlobalLevels: Story = {
  render: () => (
    <Page
      title="Global levels"
      description="화면 전체를 기준으로 콘텐츠가 놓이는 높이를 구분합니다. 높이는 배경, 그림자, 테두리를 함께 조합해 표현합니다."
    >
      <div {...stylex.props(styles.grid)}>
        <Example
          name="Basement"
          description="앱 셸과 화면의 가장 낮은 바닥입니다."
          token="colorVars.bgCanvas"
        >
          <div {...stylex.props(styles.preview, styles.basement)}>
            <div {...stylex.props(styles.nestedLayer, styles.defaultLayer)}>Default content</div>
          </div>
        </Example>
        <Example
          name="Default"
          description="페이지의 주요 콘텐츠가 놓이는 기본 높이입니다."
          token="colorVars.bgSurface"
        >
          <div {...stylex.props(styles.preview, styles.defaultLayer)}>
            <span {...stylex.props(styles.label)}>Main content</span>
          </div>
        </Example>
        <Example
          name="Modal"
          description="현재 흐름 위에 열리는 대화상자와 오버레이입니다."
          token="colorVars.bgRaised + shadowVars.overlay"
        >
          <div {...stylex.props(styles.preview, styles.basement)}>
            <div {...stylex.props(styles.nestedLayer, styles.overlayLayer)}>Dialog</div>
          </div>
        </Example>
        <Example
          name="Critical modal"
          description="반드시 먼저 확인해야 하는 흐름입니다. 표면은 Modal과 같고 스택 순서로 최상단에 둡니다."
          token="colorVars.bgRaised + shadowVars.overlay"
        >
          <div {...stylex.props(styles.preview, styles.basement)}>
            <div {...stylex.props(styles.nestedLayer, styles.overlayLayer)}>Critical dialog</div>
          </div>
        </Example>
      </div>
    </Page>
  ),
};

export const LocalLevels: Story = {
  render: () => (
    <Page
      title="Local levels"
      description="같은 화면 안에서 콘텐츠와 행동의 관계를 구분합니다. 그림자를 더해도 반드시 더 높은 전역 레이어가 되는 것은 아닙니다."
    >
      <div {...stylex.props(styles.grid)}>
        <Example
          name="Main content"
          description="현재 영역의 기준이 되는 콘텐츠입니다."
          token="colorVars.bgSurface"
        >
          <div {...stylex.props(styles.preview, styles.defaultLayer)}>
            <span {...stylex.props(styles.label)}>Content</span>
          </div>
        </Example>
        <Example
          name="Floating action"
          description="콘텐츠 위에 고정되거나 떠 있는 행동입니다."
          token="colorVars.bgRaised + shadowVars.subtle"
        >
          <div {...stylex.props(styles.preview, styles.defaultLayer)}>
            <div {...stylex.props(styles.localLayer)}>Floating action</div>
          </div>
        </Example>
        <Example
          name="Transient feedback"
          description="잠시 나타나는 토스트와 상태 메시지입니다."
          token="colorVars.bgRaised + shadowVars.overlay"
        >
          <div {...stylex.props(styles.preview, styles.defaultLayer)}>
            <div {...stylex.props(styles.nestedLayer, styles.overlayLayer)}>Changes saved</div>
          </div>
        </Example>
      </div>
    </Page>
  ),
};

const shadowTokens = [
  [
    "shadowVars.subtle",
    shadowVars.subtle,
    "콘텐츠 위에 고정된 행동이나 내비게이션의 경계를 보완합니다.",
  ],
  [
    "shadowVars.floating",
    shadowVars.floating,
    "메뉴와 팝오버처럼 콘텐츠 위에 떠 있는 요소를 구분합니다.",
  ],
  [
    "shadowVars.overlay",
    shadowVars.overlay,
    "대화상자와 토스트처럼 주의가 필요한 요소를 강조합니다.",
  ],
] as const;

export const Shadow: Story = {
  render: () => (
    <Page
      title="Shadow"
      description="그림자는 배경만으로 경계가 충분하지 않을 때 사용합니다. 다크 모드에서는 더 높은 불투명도로 깊이를 유지합니다."
    >
      <div {...stylex.props(styles.grid)}>
        {shadowTokens.map(([name, token, description]) => (
          <Example key={name} name={name} description={description} token={name} value={token}>
            <div {...stylex.props(styles.shadowPreview(token))} />
          </Example>
        ))}
      </div>
    </Page>
  ),
};
