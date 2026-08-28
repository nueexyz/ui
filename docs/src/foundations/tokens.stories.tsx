import {
  colorVars,
  motionVars,
  opacityVars,
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
  title: "Foundations/Tokens",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const move = stylex.keyframes({
  "0%": { transform: "translateX(0)" },
  "50%": { transform: "translateX(100%)" },
  "100%": { transform: "translateX(0)" },
});

const styles = stylex.create({
  page: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space8,
    marginInline: "auto",
    maxWidth: "64rem",
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
  list: {
    borderBlockStartColor: colorVars.strokeDefault,
    borderBlockStartStyle: "solid",
    borderBlockStartWidth: sizeVars.stroke,
    display: "flex",
    flexDirection: "column",
  },
  row: {
    alignItems: "center",
    borderBlockEndColor: colorVars.strokeDefault,
    borderBlockEndStyle: "solid",
    borderBlockEndWidth: sizeVars.stroke,
    display: "grid",
    gap: spacingVars.space4,
    gridTemplateColumns: "minmax(11rem, 1fr) minmax(11rem, 2fr)",
    minHeight: sizeVars.touchTarget,
    paddingBlock: spacingVars.space3,
  },
  metadata: { display: "flex", flexDirection: "column", gap: spacingVars.space1 },
  tokenName: {
    color: colorVars.fgPrimary,
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    fontSize: typographyVars.fontSizeSm,
  },
  usage: {
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeXs,
    lineHeight: typographyVars.lineHeightNormal,
  },
  value: {
    color: colorVars.fgTertiary,
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    fontSize: typographyVars.fontSizeXs,
  },
  preview: { color: colorVars.fgPrimary, minWidth: 0 },
  fontFamilySample: (fontFamily: string) => ({ fontFamily }),
  typeSample: (fontSize: string, fontWeight: string, lineHeight: string) => ({
    fontSize,
    fontWeight,
    lineHeight,
  }),
  measure: (width: string) => ({
    backgroundColor: colorVars.bgActionPrimary,
    borderRadius: radiusVars.full,
    height: sizeVars.stroke,
    width,
  }),
  sizeBox: (height: string, width: string) => ({
    alignItems: "center",
    backgroundColor: colorVars.bgSubtle,
    borderColor: colorVars.strokeDefault,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    display: "flex",
    height,
    justifyContent: "center",
    maxWidth: "100%",
    width,
  }),
  thickness: (height: string) => ({
    backgroundColor: colorVars.bgActionPrimary,
    borderRadius: radiusVars.full,
    height,
    maxWidth: sizeVars.contentSm,
    width: "100%",
  }),
  radiusBox: (borderRadius: string) => ({
    backgroundColor: colorVars.bgSubtle,
    borderColor: colorVars.strokeStrong,
    borderRadius,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    height: sizeVars.touchTarget,
    width: sizeVars.touchTarget,
  }),
  disabledSample: {
    backgroundColor: colorVars.bgActionPrimary,
    borderRadius: radiusVars.md,
    color: colorVars.fgInverse,
    opacity: opacityVars.disabled,
    paddingBlock: spacingVars.space2,
    paddingInline: spacingVars.space4,
    width: "fit-content",
  },
  motionTrack: {
    backgroundColor: colorVars.bgSubtle,
    borderRadius: radiusVars.full,
    maxWidth: sizeVars.contentSm,
    overflow: "hidden",
    padding: spacingVars.space1,
    width: "100%",
  },
  motionDot: (animationDuration: string) => ({
    animationDuration,
    animationIterationCount: "infinite",
    animationName: move,
    animationTimingFunction: motionVars.easingStandard,
    backgroundColor: colorVars.bgActionPrimary,
    borderRadius: radiusVars.full,
    height: sizeVars.iconMd,
    width: sizeVars.iconMd,
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
      <div {...stylex.props(styles.list)}>{children}</div>
    </main>
  );
}

function TokenRow({
  children,
  name,
  usage,
  value,
}: {
  children: ReactNode;
  name: string;
  usage: string;
  value: string;
}) {
  return (
    <div {...stylex.props(styles.row)}>
      <div {...stylex.props(styles.metadata)}>
        <code {...stylex.props(styles.tokenName)}>{name}</code>
        <span {...stylex.props(styles.usage)}>{usage}</span>
        <TokenValue token={value} />
      </div>
      <div {...stylex.props(styles.preview)}>{children}</div>
    </div>
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

const fontSizeTokens = [
  ["fontSizeXs", typographyVars.fontSizeXs, "보조 정보와 토큰 값"],
  ["fontSizeSm", typographyVars.fontSizeSm, "본문과 폼 레이블"],
  ["fontSizeMd", typographyVars.fontSizeMd, "강조 본문"],
  ["fontSizeLg", typographyVars.fontSizeLg, "섹션 제목"],
  ["fontSizeXl", typographyVars.fontSizeXl, "페이지 제목"],
] as const;

const lineHeightTokens = [
  ["lineHeightTight", typographyVars.lineHeightTight, "제목과 한 줄 텍스트"],
  ["lineHeightNormal", typographyVars.lineHeightNormal, "본문과 여러 줄 텍스트"],
] as const;

const fontWeightTokens = [
  ["fontWeightRegular", typographyVars.fontWeightRegular, "기본 본문"],
  ["fontWeightMedium", typographyVars.fontWeightMedium, "레이블과 약한 강조"],
  ["fontWeightSemibold", typographyVars.fontWeightSemibold, "제목과 강한 강조"],
] as const;

export const Typography: Story = {
  render: () => (
    <Page
      title="Typography"
      description="정보 위계와 읽기 흐름에 맞는 글자 크기, 굵기, 줄 높이를 사용합니다."
    >
      <TokenRow
        name="typographyVars.fontFamily"
        usage="제품 UI의 기본 서체"
        value={typographyVars.fontFamily}
      >
        <span {...stylex.props(styles.fontFamilySample(typographyVars.fontFamily))}>
          Cachette 가나다
        </span>
      </TokenRow>
      {fontSizeTokens.map(([name, value, usage]) => (
        <TokenRow key={name} name={`typographyVars.${name}`} usage={usage} value={value}>
          <span
            {...stylex.props(
              styles.typeSample(
                value,
                typographyVars.fontWeightRegular,
                typographyVars.lineHeightNormal,
              ),
            )}
          >
            Cachette 가나다
          </span>
        </TokenRow>
      ))}
      {lineHeightTokens.map(([name, value, usage]) => (
        <TokenRow key={name} name={`typographyVars.${name}`} usage={usage} value={value}>
          <span
            {...stylex.props(
              styles.typeSample(typographyVars.fontSizeSm, typographyVars.fontWeightRegular, value),
            )}
          >
            두 줄 텍스트의
            <br />줄 높이
          </span>
        </TokenRow>
      ))}
      {fontWeightTokens.map(([name, value, usage]) => (
        <TokenRow key={name} name={`typographyVars.${name}`} usage={usage} value={value}>
          <span
            {...stylex.props(
              styles.typeSample(typographyVars.fontSizeSm, value, typographyVars.lineHeightNormal),
            )}
          >
            Cachette 가나다
          </span>
        </TokenRow>
      ))}
    </Page>
  ),
};

const spacingTokens = [
  ["space0", spacingVars.space0, "간격 없음"],
  ["space1", spacingVars.space1, "아이콘 내부와 미세 조정"],
  ["space2", spacingVars.space2, "가까운 요소 사이"],
  ["space3", spacingVars.space3, "컨트롤 내부와 작은 그룹"],
  ["space4", spacingVars.space4, "기본 요소 사이"],
  ["space5", spacingVars.space5, "넓은 컨트롤 내부"],
  ["space6", spacingVars.space6, "카드 내부와 섹션 그룹"],
  ["space8", spacingVars.space8, "페이지 여백"],
  ["space10", spacingVars.space10, "큰 섹션 사이"],
  ["space12", spacingVars.space12, "화면 단위 구분"],
] as const;

export const Spacing: Story = {
  render: () => (
    <Page
      title="Spacing"
      description="4px 배수를 기준으로 요소 사이의 관계와 화면 밀도를 조절합니다."
    >
      {spacingTokens.map(([name, value, usage]) => (
        <TokenRow key={name} name={`spacingVars.${name}`} usage={usage} value={value}>
          <div {...stylex.props(styles.measure(value))} />
        </TokenRow>
      ))}
    </Page>
  ),
};

const sizeTokens = [
  ["controlSm", sizeVars.controlSm, "조밀한 컨트롤"],
  ["controlMd", sizeVars.controlMd, "기본 컨트롤"],
  ["controlLg", sizeVars.controlLg, "강조 컨트롤"],
  ["iconSm", sizeVars.iconSm, "작은 아이콘"],
  ["iconMd", sizeVars.iconMd, "기본 아이콘"],
  ["touchTarget", sizeVars.touchTarget, "최소 터치 영역"],
] as const;

const contentSizeTokens = [
  ["contentSm", sizeVars.contentSm, "좁은 콘텐츠 영역"],
  ["contentMd", sizeVars.contentMd, "기본 콘텐츠 영역"],
] as const;

const thicknessTokens = [
  ["stroke", sizeVars.stroke, "기본 테두리 두께"],
  ["focusRing", sizeVars.focusRing, "포커스 링 두께와 간격"],
] as const;

export const Size: Story = {
  render: () => (
    <Page title="Size" description="컨트롤과 아이콘의 크기를 일관되게 유지합니다.">
      {sizeTokens.map(([name, value, usage]) => (
        <TokenRow key={name} name={`sizeVars.${name}`} usage={usage} value={value}>
          <div {...stylex.props(styles.sizeBox(value, value))}>{name}</div>
        </TokenRow>
      ))}
      {contentSizeTokens.map(([name, value, usage]) => (
        <TokenRow key={name} name={`sizeVars.${name}`} usage={usage} value={value}>
          <div {...stylex.props(styles.sizeBox(sizeVars.controlMd, value))}>{name}</div>
        </TokenRow>
      ))}
      {thicknessTokens.map(([name, value, usage]) => (
        <TokenRow key={name} name={`sizeVars.${name}`} usage={usage} value={value}>
          <div {...stylex.props(styles.thickness(value))} />
        </TokenRow>
      ))}
    </Page>
  ),
};

const radiusTokens = [
  ["sm", radiusVars.sm, "작은 컨트롤"],
  ["md", radiusVars.md, "기본 컨트롤"],
  ["lg", radiusVars.lg, "카드와 큰 표면"],
  ["full", radiusVars.full, "원형 아이콘과 배지"],
] as const;

export const Radius: Story = {
  render: () => (
    <Page title="Radius" description="요소의 크기와 성격에 맞는 모서리 곡률을 사용합니다.">
      {radiusTokens.map(([name, value, usage]) => (
        <TokenRow key={name} name={`radiusVars.${name}`} usage={usage} value={value}>
          <div {...stylex.props(styles.radiusBox(value))} />
        </TokenRow>
      ))}
    </Page>
  ),
};

export const Opacity: Story = {
  render: () => (
    <Page title="Opacity" description="요소의 의미를 유지하면서 사용 가능 여부를 구분합니다.">
      <TokenRow
        name="opacityVars.disabled"
        usage="조작할 수 없는 컨트롤"
        value={opacityVars.disabled}
      >
        <div {...stylex.props(styles.disabledSample)}>Disabled</div>
      </TokenRow>
    </Page>
  ),
};

const motionTokens = [
  ["durationFast", motionVars.durationFast, "호버와 작은 상태 전환"],
  ["durationNormal", motionVars.durationNormal, "표면과 콘텐츠 전환"],
] as const;

export const Motion: Story = {
  render: () => (
    <Page title="Motion" description="변화는 빠르게 전달하되 콘텐츠 이해를 방해하지 않습니다.">
      {motionTokens.map(([name, duration, usage]) => (
        <TokenRow key={name} name={`motionVars.${name}`} usage={usage} value={duration}>
          <div {...stylex.props(styles.motionTrack)}>
            <div {...stylex.props(styles.motionDot(duration))} />
          </div>
        </TokenRow>
      ))}
      <TokenRow
        name="motionVars.easingStandard"
        usage="상태 변화의 기본 가속도"
        value={motionVars.easingStandard}
      >
        <div {...stylex.props(styles.motionTrack)}>
          <div {...stylex.props(styles.motionDot(motionVars.durationNormal))} />
        </div>
      </TokenRow>
    </Page>
  ),
};
