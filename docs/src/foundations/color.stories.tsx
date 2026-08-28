import { colorPaletteGroups } from "@cachette/tokens/color-palette";
import {
  colorVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@cachette/tokens/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

const meta = {
  title: "Foundations/Color",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const styles = stylex.create({
  page: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space10,
    marginInline: "auto",
    maxWidth: "72rem",
    padding: spacingVars.space8,
  },
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
  section: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space4,
  },
  sectionTitle: {
    fontSize: typographyVars.fontSizeLg,
    lineHeight: typographyVars.lineHeightTight,
    margin: 0,
  },
  sectionDescription: {
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeSm,
    lineHeight: typographyVars.lineHeightNormal,
    margin: 0,
  },
  grid: {
    display: "grid",
    gap: spacingVars.space3,
    gridTemplateColumns: "repeat(auto-fill, minmax(9rem, 1fr))",
  },
  swatch: (backgroundColor: string) => ({
    backgroundColor,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.md,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    height: "5rem",
  }),
  semanticSwatch: (backgroundColor: string, color: string) => ({
    alignItems: "flex-end",
    backgroundColor,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.md,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    color,
    display: "flex",
    height: "6rem",
    padding: spacingVars.space3,
  }),
  strokeSwatch: (borderColor: string) => ({
    backgroundColor: colorVars.bgSurface,
    borderColor,
    borderRadius: radiusVars.md,
    borderStyle: "solid",
    borderWidth: sizeVars.focusRing,
    height: "6rem",
  }),
  label: {
    display: "flex",
    flexDirection: "column",
    fontSize: typographyVars.fontSizeXs,
    gap: spacingVars.space1,
    lineHeight: typographyVars.lineHeightNormal,
    overflowWrap: "anywhere",
    paddingBlockStart: spacingVars.space2,
  },
  tokenName: {
    color: colorVars.fgPrimary,
    fontWeight: typographyVars.fontWeightMedium,
  },
  usage: { color: colorVars.fgSecondary },
  value: {
    color: colorVars.fgSecondary,
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  },
});

type TokenCardProps = {
  children: ReactNode;
  name: string;
  usage?: string;
  value?: string;
};

function TokenCard({ children, name, usage, value }: TokenCardProps) {
  return (
    <article>
      {children}
      <div {...stylex.props(styles.label)}>
        <span {...stylex.props(styles.tokenName)}>{name}</span>
        {usage ? <span {...stylex.props(styles.usage)}>{usage}</span> : null}
        {value ? <TokenValue token={value} /> : null}
      </div>
    </article>
  );
}

function TokenValue({ token }: { token: string }) {
  const elementRef = useRef<HTMLSpanElement>(null);
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
    <span ref={elementRef} {...stylex.props(styles.value)}>
      {value}
    </span>
  );
}

function Section({
  children,
  description,
  title,
}: {
  children: ReactNode;
  description?: string;
  title: string;
}) {
  return (
    <section {...stylex.props(styles.section)}>
      <div>
        <h2 {...stylex.props(styles.sectionTitle)}>{title}</h2>
        {description ? <p {...stylex.props(styles.sectionDescription)}>{description}</p> : null}
      </div>
      <div {...stylex.props(styles.grid)}>{children}</div>
    </section>
  );
}

function PrimitiveStory() {
  return (
    <main {...stylex.props(styles.page)}>
      <h1 {...stylex.props(styles.heading)}>Primitive</h1>
      <p {...stylex.props(styles.introduction)}>
        시맨틱 토큰을 만드는 원본 색상입니다. 제품 UI에서는 직접 사용하지 않습니다.
      </p>
      {Object.entries(colorPaletteGroups).map(([family, colors]) => (
        <Section key={family} title={family}>
          {Object.entries(colors).map(([step, value]) => (
            <TokenCard key={step} name={`${family}.${step}`} value={value}>
              <div {...stylex.props(styles.swatch(value))} />
            </TokenCard>
          ))}
        </Section>
      ))}
    </main>
  );
}

const backgroundTokens = [
  ["bgCanvas", colorVars.bgCanvas, colorVars.fgPrimary, "화면의 가장 낮은 배경"],
  ["bgSurface", colorVars.bgSurface, colorVars.fgPrimary, "기본 콘텐츠 배경"],
  ["bgSurfacePressed", colorVars.bgSurfacePressed, colorVars.fgPrimary, "기본 표면의 눌림 상태"],
  ["bgSubtle", colorVars.bgSubtle, colorVars.fgPrimary, "입력 영역과 약한 채움"],
  ["bgRaised", colorVars.bgRaised, colorVars.fgPrimary, "떠 있는 콘텐츠 배경"],
  ["bgRaisedPressed", colorVars.bgRaisedPressed, colorVars.fgPrimary, "떠 있는 표면의 눌림 상태"],
  ["bgActionPrimary", colorVars.bgActionPrimary, colorVars.fgInverse, "가장 중요한 행동의 배경"],
  ["bgFeedbackInfo", colorVars.bgFeedbackInfo, colorVars.fgFeedbackInfo, "정보 메시지 배경"],
  [
    "bgFeedbackSuccess",
    colorVars.bgFeedbackSuccess,
    colorVars.fgFeedbackSuccess,
    "성공 메시지 배경",
  ],
  [
    "bgFeedbackWarning",
    colorVars.bgFeedbackWarning,
    colorVars.fgFeedbackWarning,
    "주의 메시지 배경",
  ],
  ["bgFeedbackError", colorVars.bgFeedbackError, colorVars.fgFeedbackError, "오류 메시지 배경"],
] as const;

const foregroundTokens = [
  ["fgPrimary", colorVars.fgPrimary, colorVars.bgSurface, "기본 텍스트와 아이콘"],
  ["fgSecondary", colorVars.fgSecondary, colorVars.bgSurface, "보조 텍스트와 아이콘"],
  ["fgTertiary", colorVars.fgTertiary, colorVars.bgSurface, "플레이스홀더와 약한 정보"],
  ["fgDisabled", colorVars.fgDisabled, colorVars.bgSurface, "비활성 콘텐츠"],
  ["fgInverse", colorVars.fgInverse, colorVars.bgActionPrimary, "강조 배경 위 콘텐츠"],
  ["fgAction", colorVars.fgAction, colorVars.bgSurface, "행동과 링크"],
  ["fgFeedbackInfo", colorVars.fgFeedbackInfo, colorVars.bgFeedbackInfo, "정보 메시지 콘텐츠"],
  [
    "fgFeedbackSuccess",
    colorVars.fgFeedbackSuccess,
    colorVars.bgFeedbackSuccess,
    "성공 메시지 콘텐츠",
  ],
  [
    "fgFeedbackWarning",
    colorVars.fgFeedbackWarning,
    colorVars.bgFeedbackWarning,
    "주의 메시지 콘텐츠",
  ],
  ["fgFeedbackError", colorVars.fgFeedbackError, colorVars.bgFeedbackError, "오류 메시지 콘텐츠"],
] as const;

const strokeTokens = [
  ["strokeDefault", colorVars.strokeDefault, "기본 구분선"],
  ["strokeStrong", colorVars.strokeStrong, "강조 구분선"],
  ["strokeFocus", colorVars.strokeFocus, "포커스 링"],
  ["strokeAction", colorVars.strokeAction, "주요 행동의 테두리"],
  ["strokeFeedbackInfo", colorVars.strokeFeedbackInfo, "정보 메시지 테두리"],
  ["strokeFeedbackSuccess", colorVars.strokeFeedbackSuccess, "성공 메시지 테두리"],
  ["strokeFeedbackWarning", colorVars.strokeFeedbackWarning, "주의 메시지 테두리"],
  ["strokeFeedbackError", colorVars.strokeFeedbackError, "오류 메시지 테두리"],
] as const;

const interactionTokens = [
  ["interactionDefault", colorVars.interactionDefault, colorVars.fgPrimary, "기본 상태"],
  ["interactionHover", colorVars.interactionHover, colorVars.fgPrimary, "포인터가 올라간 상태"],
  ["interactionPressed", colorVars.interactionPressed, colorVars.fgPrimary, "누르고 있는 상태"],
  ["interactionSelected", colorVars.interactionSelected, colorVars.fgPrimary, "선택된 상태"],
  [
    "interactionDisabled",
    colorVars.interactionDisabled,
    colorVars.fgPrimary,
    "조작할 수 없는 상태",
  ],
  ["interactionFocus", colorVars.interactionFocus, colorVars.fgInverse, "키보드 포커스 상태"],
] as const;

function SemanticStory() {
  return (
    <main {...stylex.props(styles.page)}>
      <h1 {...stylex.props(styles.heading)}>Semantic</h1>
      <p {...stylex.props(styles.introduction)}>
        적용 위치와 역할을 이름에 담은 색상입니다. 테마가 바뀌어도 같은 토큰을 사용합니다.
      </p>
      <Section title="Background" description="레이어와 메시지 배경에 사용합니다.">
        {backgroundTokens.map(([name, token, foreground, usage]) => (
          <TokenCard key={name} name={name} usage={usage} value={token}>
            <div {...stylex.props(styles.semanticSwatch(token, foreground))}>Aa 가나다</div>
          </TokenCard>
        ))}
      </Section>
      <Section title="Foreground" description="텍스트와 아이콘에 사용합니다.">
        {foregroundTokens.map(([name, token, background, usage]) => (
          <TokenCard key={name} name={name} usage={usage} value={token}>
            <div {...stylex.props(styles.semanticSwatch(background, token))}>Aa 가나다</div>
          </TokenCard>
        ))}
      </Section>
      <Section title="Stroke" description="경계와 포커스를 표시합니다.">
        {strokeTokens.map(([name, token, usage]) => (
          <TokenCard key={name} name={name} usage={usage} value={token}>
            <div {...stylex.props(styles.strokeSwatch(token))} />
          </TokenCard>
        ))}
      </Section>
      <Section title="Interaction" description="조작에 따른 순간 상태를 겹쳐 표현합니다.">
        {interactionTokens.map(([name, token, foreground, usage]) => (
          <TokenCard key={name} name={name} usage={usage} value={token}>
            <div {...stylex.props(styles.semanticSwatch(token, foreground))}>{name}</div>
          </TokenCard>
        ))}
      </Section>
    </main>
  );
}

export const Primitive: Story = { render: () => <PrimitiveStory /> };
export const Semantic: Story = { render: () => <SemanticStory /> };
