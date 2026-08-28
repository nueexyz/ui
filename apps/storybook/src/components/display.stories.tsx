import {
  colorVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@cachette/tokens/tokens.stylex";
import { Alert as AlertComponent, AlertDescription, AlertTitle } from "@cachette/ui/alert";
import { AspectRatio as AspectRatioComponent } from "@cachette/ui/aspect-ratio";
import { Badge as BadgeComponent } from "@cachette/ui/badge";
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
import { Input } from "@cachette/ui/input";
import { Kbd as KbdComponent, KbdGroup } from "@cachette/ui/kbd";
import { Label as LabelComponent } from "@cachette/ui/label";
import { Separator as SeparatorComponent } from "@cachette/ui/separator";
import { Skeleton as SkeletonComponent } from "@cachette/ui/skeleton";
import { Spinner as SpinnerComponent } from "@cachette/ui/spinner";
import { Typography as TypographyComponent } from "@cachette/ui/typography";
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
    gap: spacingVars.space4,
    minHeight: "8rem",
    padding: spacingVars.space6,
  },
  column: { alignItems: "stretch", flexDirection: "column" },
  aspect: {
    alignItems: "center",
    backgroundColor: colorVars.bgSubtle,
    color: colorVars.fgSecondary,
    display: "flex",
    justifyContent: "center",
    maxWidth: sizeVars.contentSm,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space2,
    maxWidth: sizeVars.contentSm,
    width: "100%",
  },
  separatorRow: {
    alignItems: "center",
    display: "flex",
    gap: spacingVars.space4,
    height: sizeVars.touchTarget,
  },
  skeletonCard: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space3,
    maxWidth: sizeVars.contentSm,
    width: "100%",
  },
  skeletonTitle: { height: sizeVars.iconMd, width: "45%" },
  skeletonBody: { height: sizeVars.controlMd, width: "100%" },
  typographyStack: { display: "flex", flexDirection: "column", gap: spacingVars.space4 },
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

export const Alert: Story = {
  render: () => (
    <Page title="Alert" description="현재 상태와 필요한 다음 행동을 함께 전달합니다.">
      <div {...stylex.props(styles.preview, styles.column)}>
        <AlertComponent>
          <AlertTitle>변경사항을 저장했습니다.</AlertTitle>
          <AlertDescription>다른 화면으로 이동해도 저장된 내용이 유지됩니다.</AlertDescription>
        </AlertComponent>
        <AlertComponent variant="destructive">
          <AlertTitle>파일을 업로드하지 못했습니다.</AlertTitle>
          <AlertDescription>파일 크기를 확인한 뒤 다시 시도하세요.</AlertDescription>
        </AlertComponent>
      </div>
    </Page>
  ),
};

export const AspectRatio: Story = {
  render: () => (
    <Page title="Aspect Ratio" description="미디어 영역의 비율을 화면 크기와 관계없이 유지합니다.">
      <div {...stylex.props(styles.preview)}>
        <AspectRatioComponent ratio={16 / 9} xstyle={styles.aspect}>
          16:9
        </AspectRatioComponent>
      </div>
    </Page>
  ),
};

export const Badge: Story = {
  render: () => (
    <Page title="Badge" description="상태나 분류처럼 짧은 정보를 간결하게 표시합니다.">
      <div {...stylex.props(styles.preview)}>
        <BadgeComponent>진행 중</BadgeComponent>
        <BadgeComponent variant="secondary">초안</BadgeComponent>
        <BadgeComponent variant="destructive">오류</BadgeComponent>
        <BadgeComponent variant="outline">읽지 않음</BadgeComponent>
        <BadgeComponent variant="ghost">선택 사항</BadgeComponent>
      </div>
    </Page>
  ),
};

export const Kbd: Story = {
  render: () => (
    <Page title="Kbd" description="키보드 단축키와 입력 조합을 표시합니다.">
      <div {...stylex.props(styles.preview)}>
        <KbdGroup>
          <KbdComponent>⌘</KbdComponent>
          <KbdComponent>K</KbdComponent>
        </KbdGroup>
        <KbdGroup>
          <KbdComponent>⇧</KbdComponent>
          <KbdComponent>Enter</KbdComponent>
        </KbdGroup>
      </div>
    </Page>
  ),
};

export const Label: Story = {
  render: () => (
    <Page title="Label" description="입력할 정보와 컨트롤의 관계를 명확하게 안내합니다.">
      <div {...stylex.props(styles.preview, styles.column)}>
        <div {...stylex.props(styles.field)}>
          <LabelComponent htmlFor="display-name">표시 이름</LabelComponent>
          <Input id="display-name" placeholder="홍길동" />
        </div>
      </div>
    </Page>
  ),
};

export const Separator: Story = {
  render: () => (
    <Page title="Separator" description="서로 다른 정보 그룹의 경계를 표시합니다.">
      <div {...stylex.props(styles.preview, styles.column)}>
        <span>계정 정보</span>
        <SeparatorComponent />
        <div {...stylex.props(styles.separatorRow)}>
          <span>프로필</span>
          <SeparatorComponent orientation="vertical" />
          <span>보안</span>
        </div>
      </div>
    </Page>
  ),
};

export const Skeleton: Story = {
  render: () => (
    <Page title="Skeleton" description="콘텐츠 구조를 유지하며 불러오는 상태를 보여줍니다.">
      <div {...stylex.props(styles.preview)}>
        <div {...stylex.props(styles.skeletonCard)}>
          <SkeletonComponent xstyle={styles.skeletonTitle} />
          <SkeletonComponent xstyle={styles.skeletonBody} />
        </div>
      </div>
    </Page>
  ),
};

export const Spinner: Story = {
  render: () => (
    <Page title="Spinner" description="완료 시점을 예측하기 어려운 짧은 작업을 표시합니다.">
      <div {...stylex.props(styles.preview)}>
        <SpinnerComponent label="저장 중" />
        <Icon aria-hidden="true" name="check" />
      </div>
    </Page>
  ),
};

export const EmptyState: Story = {
  name: "Empty",
  render: () => (
    <Page title="Empty" description="아직 표시할 내용이 없을 때 이유와 다음 행동을 안내합니다.">
      <Empty>
        <EmptyHeader>
          <EmptyMedia>
            <Icon aria-hidden="true" name="folder" />
          </EmptyMedia>
          <EmptyTitle>저장한 프로젝트가 없습니다</EmptyTitle>
          <EmptyDescription>
            자주 확인할 프로젝트를 저장하면 이곳에서 바로 열 수 있습니다.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>프로젝트 저장하기</Button>
        </EmptyContent>
      </Empty>
    </Page>
  ),
};

export const Typography: Story = {
  render: () => (
    <Page title="Typography" description="정보의 위계와 용도에 맞는 글자 스타일을 사용합니다.">
      <div {...stylex.props(styles.preview, styles.column, styles.typographyStack)}>
        <TypographyComponent variant="display">제품의 핵심 제목</TypographyComponent>
        <TypographyComponent variant="title">화면 제목</TypographyComponent>
        <TypographyComponent variant="heading">콘텐츠 제목</TypographyComponent>
        <TypographyComponent>본문은 읽기 편한 크기와 줄 높이를 유지합니다.</TypographyComponent>
        <TypographyComponent variant="label">필드 레이블</TypographyComponent>
        <TypographyComponent variant="caption">업데이트: 방금 전</TypographyComponent>
        <TypographyComponent variant="code">pnpm storybook</TypographyComponent>
      </div>
    </Page>
  ),
};
