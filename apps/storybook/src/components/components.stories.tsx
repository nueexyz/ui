import {
  colorVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@cachette/tokens/tokens.stylex";
import { Button as ButtonComponent } from "@cachette/ui/button";
import {
  Card as CardComponent,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@cachette/ui/card";
import { Input as InputComponent } from "@cachette/ui/input";
import * as stylex from "@stylexjs/stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";

const meta = {
  title: "Components",
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
    maxWidth: "64rem",
    padding: spacingVars.space8,
  },
  pageHeader: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space2,
  },
  pageTitle: {
    fontSize: typographyVars.fontSizeXl,
    lineHeight: typographyVars.lineHeightTight,
    margin: 0,
  },
  pageDescription: {
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
  sectionHeader: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space1,
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
  preview: {
    alignItems: "center",
    backgroundColor: colorVars.bgSurface,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.lg,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    display: "flex",
    flexWrap: "wrap",
    gap: spacingVars.space3,
    minHeight: "7rem",
    padding: spacingVars.space6,
  },
  previewColumn: {
    alignItems: "stretch",
    flexDirection: "column",
  },
  inversePreview: {
    backgroundColor: colorVars.bgActionPrimary,
  },
  inputStack: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space3,
    maxWidth: sizeVars.contentSm,
    width: "100%",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space2,
  },
  label: {
    color: colorVars.fgPrimary,
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightMedium,
  },
  cardGrid: {
    alignItems: "start",
    display: "grid",
    gap: spacingVars.space4,
    gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))",
    width: "100%",
  },
  card: {
    maxWidth: sizeVars.contentSm,
  },
  cardContentText: {
    color: colorVars.fgPrimary,
    fontSize: typographyVars.fontSizeSm,
    lineHeight: typographyVars.lineHeightNormal,
    margin: 0,
  },
  footerEnd: {
    justifyContent: "flex-end",
  },
});

function PageHeader({ description, title }: { description: string; title: string }) {
  return (
    <header {...stylex.props(styles.pageHeader)}>
      <h1 {...stylex.props(styles.pageTitle)}>{title}</h1>
      <p {...stylex.props(styles.pageDescription)}>{description}</p>
    </header>
  );
}

function Section({
  children,
  description,
  title,
}: {
  children: ReactNode;
  description: string;
  title: string;
}) {
  return (
    <section {...stylex.props(styles.section)}>
      <header {...stylex.props(styles.sectionHeader)}>
        <h2 {...stylex.props(styles.sectionTitle)}>{title}</h2>
        <p {...stylex.props(styles.sectionDescription)}>{description}</p>
      </header>
      {children}
    </section>
  );
}

export const Button: Story = {
  render: () => (
    <main {...stylex.props(styles.page)}>
      <PageHeader
        title="Button"
        description="행동의 중요도, 크기, 상태에 따른 표현을 비교합니다."
      />

      <Section title="종류" description="행동의 우선순위와 위험도에 맞는 표현을 선택합니다.">
        <div {...stylex.props(styles.preview)}>
          <ButtonComponent>저장하기</ButtonComponent>
          <ButtonComponent variant="secondary">미리보기</ButtonComponent>
          <ButtonComponent variant="ghost">닫기</ButtonComponent>
          <ButtonComponent variant="destructive">삭제하기</ButtonComponent>
        </div>
      </Section>

      <Section title="크기" description="화면의 정보 밀도에 맞는 크기를 선택합니다.">
        <div {...stylex.props(styles.preview)}>
          <ButtonComponent size="sm">저장하기</ButtonComponent>
          <ButtonComponent size="md">저장하기</ButtonComponent>
          <ButtonComponent size="lg">저장하기</ButtonComponent>
        </div>
      </Section>

      <Section title="상태" description="사용 가능 여부와 처리 상태가 명확하게 구분되어야 합니다.">
        <div {...stylex.props(styles.preview)}>
          <ButtonComponent>저장하기</ButtonComponent>
          <ButtonComponent disabled>저장하기</ButtonComponent>
          <ButtonComponent isLoading>저장 중</ButtonComponent>
        </div>
      </Section>

      <Section title="강조 배경" description="강조 배경 위에서도 행동의 위계와 대비를 유지합니다.">
        <div {...stylex.props(styles.preview, styles.inversePreview)}>
          <ButtonComponent variant="secondary">이전으로</ButtonComponent>
          <ButtonComponent variant="ghost">닫기</ButtonComponent>
        </div>
      </Section>
    </main>
  ),
};

export const Input: Story = {
  render: () => (
    <main {...stylex.props(styles.page)}>
      <PageHeader
        title="Input"
        description="값의 유무, 입력 유형, 상태에 따른 표현을 비교합니다."
      />

      <Section title="기본" description="입력 전과 입력 후의 기본 표현을 비교합니다.">
        <div {...stylex.props(styles.preview, styles.previewColumn)}>
          <div {...stylex.props(styles.inputStack)}>
            <InputComponent aria-label="이름" placeholder="홍길동" />
            <InputComponent aria-label="이메일" defaultValue="hello@cachette.dev" />
          </div>
        </div>
      </Section>

      <Section
        title="입력 유형"
        description="입력 유형이 달라도 같은 크기와 상태 규칙을 유지합니다."
      >
        <div {...stylex.props(styles.preview, styles.previewColumn)}>
          <div {...stylex.props(styles.inputStack)}>
            <label htmlFor="input-email" {...stylex.props(styles.field)}>
              <span {...stylex.props(styles.label)}>이메일</span>
              <InputComponent id="input-email" type="email" placeholder="hello@example.com" />
            </label>
            <label htmlFor="input-password" {...stylex.props(styles.field)}>
              <span {...stylex.props(styles.label)}>비밀번호</span>
              <InputComponent id="input-password" type="password" defaultValue="password" />
            </label>
          </div>
        </div>
      </Section>

      <Section title="상태" description="오류와 비활성 상태를 기본 입력과 명확하게 구분합니다.">
        <div {...stylex.props(styles.preview, styles.previewColumn)}>
          <div {...stylex.props(styles.inputStack)}>
            <InputComponent aria-label="잘못 입력된 이메일" aria-invalid defaultValue="min@" />
            <InputComponent aria-label="수정할 수 없는 이름" disabled defaultValue="홍길동" />
          </div>
        </div>
      </Section>
    </main>
  ),
};

export const Card: Story = {
  render: () => (
    <main {...stylex.props(styles.page)}>
      <PageHeader title="Card" description="하나의 목적에 필요한 정보와 행동을 묶어 보여줍니다." />

      <Section
        title="기본 구조"
        description="제목, 설명, 본문, 행동 영역을 목적에 맞게 조합합니다."
      >
        <div {...stylex.props(styles.preview)}>
          <div {...stylex.props(styles.cardGrid)}>
            <CardComponent>
              <CardHeader>
                <CardTitle>프로젝트를 보관할까요?</CardTitle>
                <CardDescription>보관한 프로젝트는 목록에서 숨겨집니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <p {...stylex.props(styles.cardContentText)}>
                  보관한 프로젝트는 설정에서 언제든 다시 복원할 수 있습니다.
                </p>
              </CardContent>
              <CardFooter>
                <ButtonComponent variant="secondary">취소</ButtonComponent>
                <ButtonComponent>보관하기</ButtonComponent>
              </CardFooter>
            </CardComponent>
          </div>
        </div>
      </Section>

      <Section
        title="계정 생성 폼"
        description="계정을 만드는 데 필요한 입력과 행동을 하나의 카드에 묶습니다."
      >
        <div {...stylex.props(styles.preview)}>
          <CardComponent xstyle={styles.card}>
            <CardHeader>
              <CardTitle>계정 만들기</CardTitle>
              <CardDescription>서비스에서 사용할 이름과 이메일을 입력하세요.</CardDescription>
            </CardHeader>
            <CardContent>
              <form {...stylex.props(styles.inputStack)}>
                <label htmlFor="account-name" {...stylex.props(styles.field)}>
                  <span {...stylex.props(styles.label)}>이름</span>
                  <InputComponent id="account-name" placeholder="홍길동" />
                </label>
                <label htmlFor="account-email" {...stylex.props(styles.field)}>
                  <span {...stylex.props(styles.label)}>이메일</span>
                  <InputComponent id="account-email" type="email" placeholder="hello@example.com" />
                </label>
              </form>
            </CardContent>
            <CardFooter xstyle={styles.footerEnd}>
              <ButtonComponent variant="ghost">취소</ButtonComponent>
              <ButtonComponent>계정 만들기</ButtonComponent>
            </CardFooter>
          </CardComponent>
        </div>
      </Section>
    </main>
  ),
};
