import {
  colorVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@cachette/tokens/tokens.stylex";
import { Button } from "@cachette/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@cachette/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@cachette/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@cachette/ui/tooltip";
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
    gap: spacingVars.space4,
    minHeight: "10rem",
    padding: spacingVars.space6,
  },
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
      <div {...stylex.props(styles.preview)}>{children}</div>
    </main>
  );
}

export const DialogOverlay: Story = {
  name: "Dialog",
  render: () => (
    <Page
      title="Dialog"
      description="현재 흐름을 잠시 멈추고 확인이나 입력이 필요한 작업을 표시합니다."
    >
      <Dialog>
        <DialogTrigger render={<Button>프로젝트 보관하기</Button>} />
        <DialogContent closeLabel="닫기">
          <DialogHeader>
            <DialogTitle>프로젝트를 보관할까요?</DialogTitle>
            <DialogDescription>
              보관한 프로젝트는 목록에서 숨겨지며 설정에서 복원할 수 있습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="secondary">취소</Button>} />
            <Button>보관하기</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Page>
  ),
};

export const PopoverOverlay: Story = {
  name: "Popover",
  render: () => (
    <Page
      title="Popover"
      description="현재 화면을 벗어나지 않고 보조 정보나 간단한 조작을 제공합니다."
    >
      <Popover>
        <PopoverTrigger render={<Button variant="secondary">공유 설정</Button>} />
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>링크 공유</PopoverTitle>
            <PopoverDescription>링크를 가진 사람은 프로젝트를 볼 수 있습니다.</PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    </Page>
  ),
};

export const TooltipOverlay: Story = {
  name: "Tooltip",
  render: () => (
    <Page title="Tooltip" description="아이콘이나 짧은 컨트롤의 의미를 한 문장으로 설명합니다.">
      <TooltipProvider delay={300}>
        <Tooltip>
          <TooltipTrigger render={<Button variant="ghost">?</Button>} />
          <TooltipContent>프로젝트 공개 범위를 변경합니다.</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Page>
  ),
};
