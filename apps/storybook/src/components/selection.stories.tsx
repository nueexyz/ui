import {
  colorVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@cachette/tokens/tokens.stylex";
import { Checkbox } from "@cachette/ui/checkbox";
import { Field, FieldDescription, FieldLabel } from "@cachette/ui/field";
import { NativeSelect, NativeSelectOption } from "@cachette/ui/native-select";
import { Progress } from "@cachette/ui/progress";
import { RadioGroup, RadioGroupItem } from "@cachette/ui/radio-group";
import { Slider } from "@cachette/ui/slider";
import { Switch } from "@cachette/ui/switch";
import { Toggle } from "@cachette/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@cachette/ui/toggle-group";
import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";

const meta = { title: "Components", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

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
  title: {
    fontSize: typographyVars.fontSizeXl,
    lineHeight: typographyVars.lineHeightTight,
    margin: 0,
  },
  description: {
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeSm,
    lineHeight: typographyVars.lineHeightNormal,
    margin: 0,
  },
  preview: {
    alignItems: "center",
    backgroundColor: colorVars.bgSurface,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.lg,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    display: "flex",
    flexWrap: "wrap",
    gap: spacingVars.space6,
    minHeight: "8rem",
    padding: spacingVars.space6,
  },
  column: { alignItems: "stretch", flexDirection: "column" },
  controlStack: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space3,
    maxWidth: sizeVars.contentSm,
    width: "100%",
  },
  option: {
    alignItems: "center",
    display: "flex",
    gap: spacingVars.space3,
    minHeight: sizeVars.touchTarget,
  },
  progress: { maxWidth: sizeVars.contentSm },
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
        <h1 {...stylex.props(styles.title)}>{title}</h1>
        <p {...stylex.props(styles.description)}>{description}</p>
      </header>
      {children}
    </main>
  );
}

export const CheckboxControl: Story = {
  name: "Checkbox",
  render: () => (
    <Page title="Checkbox" description="서로 독립적인 항목을 하나 이상 선택할 때 사용합니다.">
      <div {...stylex.props(styles.preview, styles.column)}>
        <label htmlFor="email-updates" {...stylex.props(styles.option)}>
          <Checkbox defaultChecked id="email-updates" />
          변경사항 이메일로 받기
        </label>
        <label htmlFor="admin-setting" {...stylex.props(styles.option)}>
          <Checkbox disabled id="admin-setting" />
          관리자가 설정한 항목
        </label>
      </div>
    </Page>
  ),
};

export const RadioGroupControl: Story = {
  name: "Radio Group",
  render: () => (
    <Page title="Radio Group" description="여러 선택지 중 하나만 결정할 때 사용합니다.">
      <div {...stylex.props(styles.preview, styles.column)}>
        <Field>
          <FieldLabel>알림 빈도</FieldLabel>
          <RadioGroup defaultValue="daily">
            <label htmlFor="frequency-daily" {...stylex.props(styles.option)}>
              <RadioGroupItem id="frequency-daily" value="daily" />
              매일
            </label>
            <label htmlFor="frequency-weekly" {...stylex.props(styles.option)}>
              <RadioGroupItem id="frequency-weekly" value="weekly" />
              매주
            </label>
            <label htmlFor="frequency-never" {...stylex.props(styles.option)}>
              <RadioGroupItem id="frequency-never" value="never" />
              받지 않기
            </label>
          </RadioGroup>
        </Field>
      </div>
    </Page>
  ),
};

export const SwitchControl: Story = {
  name: "Switch",
  render: () => (
    <Page title="Switch" description="변경 즉시 적용되는 설정을 켜거나 끕니다.">
      <div {...stylex.props(styles.preview, styles.column)}>
        <label htmlFor="activity-visibility" {...stylex.props(styles.option)}>
          <Switch defaultChecked id="activity-visibility" />
          활동 상태 공개
        </label>
        <label htmlFor="admin-only" {...stylex.props(styles.option)}>
          <Switch disabled id="admin-only" />
          관리자 전용 설정
        </label>
      </div>
    </Page>
  ),
};

export const SliderControl: Story = {
  name: "Slider",
  render: () => (
    <Page title="Slider" description="정해진 범위에서 값을 빠르게 조절합니다.">
      <div {...stylex.props(styles.preview, styles.column)}>
        <div {...stylex.props(styles.controlStack)}>
          <Field>
            <FieldLabel>알림 음량</FieldLabel>
            <Slider defaultValue={40} />
            <FieldDescription>키보드 방향키로 세밀하게 조절할 수 있습니다.</FieldDescription>
          </Field>
          <Field>
            <FieldLabel>가격 범위</FieldLabel>
            <Slider
              defaultValue={[20, 80]}
              getAriaLabel={(index) => (index === 0 ? "최저 가격" : "최고 가격")}
            />
          </Field>
        </div>
      </div>
    </Page>
  ),
};

export const ToggleControl: Story = {
  name: "Toggle",
  render: () => (
    <Page title="Toggle" description="선택적으로 적용할 보기나 편집 모드를 전환합니다.">
      <div {...stylex.props(styles.preview)}>
        <Toggle defaultPressed>굵게</Toggle>
        <Toggle variant="outline">기울임</Toggle>
      </div>
    </Page>
  ),
};

export const ToggleGroupControl: Story = {
  name: "Toggle Group",
  render: () => (
    <Page title="Toggle Group" description="서로 관련된 보기 옵션을 방향키로 탐색하고 선택합니다.">
      <div {...stylex.props(styles.preview)}>
        <ToggleGroup aria-label="텍스트 정렬" defaultValue={["left"]}>
          <ToggleGroupItem value="left">왼쪽</ToggleGroupItem>
          <ToggleGroupItem value="center">가운데</ToggleGroupItem>
          <ToggleGroupItem value="right">오른쪽</ToggleGroupItem>
        </ToggleGroup>
      </div>
    </Page>
  ),
};

export const ProgressControl: Story = {
  name: "Progress",
  render: () => (
    <Page title="Progress" description="완료 정도를 알 수 있는 작업의 진행 상태를 보여줍니다.">
      <div {...stylex.props(styles.preview, styles.column)}>
        <Progress aria-label="파일 업로드 진행률" value={64} xstyle={styles.progress} />
        <Progress aria-label="처리 중" value={null} xstyle={styles.progress} />
      </div>
    </Page>
  ),
};

export const NativeSelectControl: Story = {
  name: "Native Select",
  render: () => (
    <Page
      title="Native Select"
      description="운영체제의 익숙한 선택 화면을 그대로 사용할 때 적합합니다."
    >
      <div {...stylex.props(styles.preview)}>
        <Field>
          <FieldLabel>언어</FieldLabel>
          <NativeSelect defaultValue="ko">
            <NativeSelectOption value="ko">한국어</NativeSelectOption>
            <NativeSelectOption value="en">English</NativeSelectOption>
            <NativeSelectOption value="ja">日本語</NativeSelectOption>
          </NativeSelect>
        </Field>
      </div>
    </Page>
  ),
};
