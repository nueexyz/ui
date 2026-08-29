import {
  colorVars,
  motionVars,
  opacityVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@dumo/tokens/tokens.stylex";
import { Button } from "@dumo/ui/button";
import { Icon } from "@dumo/ui/icon";
import { Input } from "@dumo/ui/input";
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
    "@media (max-width: 40rem)": {
      alignItems: "stretch",
      gridTemplateColumns: "minmax(0, 1fr)",
    },
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
  contentSample: (width: string) => ({
    alignItems: "center",
    backgroundColor: colorVars.bgSubtle,
    borderColor: colorVars.strokeDefault,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    display: "flex",
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeXs,
    height: sizeVars.controlLg,
    justifyContent: "center",
    maxWidth: "100%",
    width,
  }),
  iconSample: (size: string) => ({ height: size, width: size }),
  touchTarget: {
    alignItems: "center",
    borderColor: colorVars.strokeStrong,
    borderRadius: radiusVars.md,
    borderStyle: "dashed",
    borderWidth: sizeVars.stroke,
    display: "inline-flex",
    height: sizeVars.touchTarget,
    justifyContent: "center",
    width: sizeVars.touchTarget,
  },
  strokeSample: (borderWidth: string) => ({
    alignItems: "center",
    borderColor: colorVars.strokeStrong,
    borderRadius: radiusVars.md,
    borderStyle: "solid",
    borderWidth,
    display: "inline-flex",
    fontSize: typographyVars.fontSizeXs,
    height: sizeVars.controlLg,
    paddingInline: spacingVars.space4,
  }),
  focusSample: (outlineWidth: string) => ({
    alignItems: "center",
    backgroundColor: colorVars.bgSurface,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.md,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    display: "inline-flex",
    fontSize: typographyVars.fontSizeXs,
    height: sizeVars.controlMd,
    outlineColor: colorVars.strokeFocus,
    outlineOffset: sizeVars.stroke,
    outlineStyle: "solid",
    outlineWidth,
    paddingInline: spacingVars.space4,
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
          Dumo 가나다
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
            Dumo 가나다
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
            Dumo 가나다
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

const contentSizeTokens = [
  ["contentSm", sizeVars.contentSm, "팝오버와 좁은 패널"],
  ["contentMd", sizeVars.contentMd, "다이얼로그와 기본 패널"],
] as const;

export const Size: Story = {
  render: () => (
    <Page
      title="Size"
      description="크기 토큰은 컨트롤의 높이, 아이콘의 표시 크기, 실제 조작 영역을 각각 정의합니다."
    >
      <TokenRow
        name="sizeVars.controlSm"
        usage="툴바와 조밀한 화면의 컨트롤"
        value={sizeVars.controlSm}
      >
        <Button size="sm" variant="secondary">
          작은 버튼
        </Button>
      </TokenRow>
      <TokenRow
        name="sizeVars.controlMd"
        usage="폼과 일반 화면의 기본 컨트롤"
        value={sizeVars.controlMd}
      >
        <Input aria-label="기본 입력 예시" placeholder="기본 입력" />
      </TokenRow>
      <TokenRow
        name="sizeVars.controlLg"
        usage="여유가 필요한 단독 컨트롤"
        value={sizeVars.controlLg}
      >
        <Button size="lg" variant="secondary">
          큰 버튼
        </Button>
      </TokenRow>
      <TokenRow name="sizeVars.iconSm" usage="작은 컨트롤 안의 보조 아이콘" value={sizeVars.iconSm}>
        <Icon
          aria-label="작은 정보 아이콘"
          name="info"
          {...stylex.props(styles.iconSample(sizeVars.iconSm))}
        />
      </TokenRow>
      <TokenRow name="sizeVars.iconMd" usage="기본 컨트롤 안의 아이콘" value={sizeVars.iconMd}>
        <Icon
          aria-label="기본 정보 아이콘"
          name="info"
          {...stylex.props(styles.iconSample(sizeVars.iconMd))}
        />
      </TokenRow>
      <TokenRow
        name="sizeVars.touchTarget"
        usage="아이콘 버튼의 최소 조작 영역"
        value={sizeVars.touchTarget}
      >
        <span {...stylex.props(styles.touchTarget)}>
          <Icon
            aria-hidden="true"
            name="info"
            {...stylex.props(styles.iconSample(sizeVars.iconMd))}
          />
        </span>
      </TokenRow>
      {contentSizeTokens.map(([name, value, usage]) => (
        <TokenRow key={name} name={`sizeVars.${name}`} usage={usage} value={value}>
          <div {...stylex.props(styles.contentSample(value))}>{usage}</div>
        </TokenRow>
      ))}
      <TokenRow name="sizeVars.stroke" usage="컨트롤과 표면의 기본 테두리" value={sizeVars.stroke}>
        <span {...stylex.props(styles.strokeSample(sizeVars.stroke))}>기본 테두리</span>
      </TokenRow>
      <TokenRow
        name="sizeVars.focusRing"
        usage="키보드 포커스를 나타내는 링"
        value={sizeVars.focusRing}
      >
        <span {...stylex.props(styles.focusSample(sizeVars.focusRing))}>키보드 포커스</span>
      </TokenRow>
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
  ["durationSlow", motionVars.durationSlow, "Dialog와 Toast처럼 큰 표면 전환"],
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
      <TokenRow
        name="motionVars.easingEnter"
        usage="새 요소가 나타날 때"
        value={motionVars.easingEnter}
      >
        <div {...stylex.props(styles.motionTrack)}>
          <div {...stylex.props(styles.motionDot(motionVars.durationNormal))} />
        </div>
      </TokenRow>
      <TokenRow name="motionVars.easingExit" usage="요소가 사라질 때" value={motionVars.easingExit}>
        <div {...stylex.props(styles.motionTrack)}>
          <div {...stylex.props(styles.motionDot(motionVars.durationFast))} />
        </div>
      </TokenRow>
    </Page>
  ),
};
