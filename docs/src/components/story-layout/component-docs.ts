type ComponentDocument = {
  registryName: string;
  usage: string;
};

const componentDocuments: Record<string, ComponentDocument> = {
  Accordion: {
    registryName: "accordion",
    usage: `import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@cachette/ui/accordion"

<Accordion defaultValue={["item-1"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger>계정 설정</AccordionTrigger>
    <AccordionContent>프로필과 알림 설정을 변경할 수 있습니다.</AccordionContent>
  </AccordionItem>
</Accordion>`,
  },
  "Alert Dialog": {
    registryName: "alert-dialog",
    usage: `import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@cachette/ui/alert-dialog"

<AlertDialog>
  <AlertDialogTrigger>프로젝트 삭제</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>프로젝트를 삭제할까요?</AlertDialogTitle>
      <AlertDialogDescription>삭제한 프로젝트는 복구할 수 없습니다.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>취소</AlertDialogCancel>
      <AlertDialogAction>삭제</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
  },
  Button: {
    registryName: "button",
    usage: `import { Button } from "@cachette/ui/button"

<Button>저장하기</Button>`,
  },
  Card: {
    registryName: "card",
    usage: `import { Card, CardContent, CardHeader, CardTitle } from "@cachette/ui/card"

<Card>
  <CardHeader>
    <CardTitle>프로젝트</CardTitle>
  </CardHeader>
  <CardContent>프로젝트 내용을 입력하세요.</CardContent>
</Card>`,
  },
  Checkbox: {
    registryName: "checkbox",
    usage: `import { Checkbox } from "@cachette/ui/checkbox"

<Checkbox aria-label="이용 약관에 동의" />`,
  },
  Dialog: {
    registryName: "dialog",
    usage: `import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@cachette/ui/dialog"

<Dialog>
  <DialogTrigger>프로필 열기</DialogTrigger>
  <DialogContent>
    <DialogTitle>프로필</DialogTitle>
  </DialogContent>
</Dialog>`,
  },
  Direction: {
    registryName: "direction",
    usage: `import { DirectionProvider } from "@cachette/ui/direction"

<DirectionProvider direction="rtl">콘텐츠</DirectionProvider>`,
  },
  Input: {
    registryName: "input",
    usage: `import { Input } from "@cachette/ui/input"

<Input aria-label="이메일" placeholder="name@example.com" type="email" />`,
  },
  "Input OTP": {
    registryName: "input-otp",
    usage: `import { InputOTP, InputOTPGroup, InputOTPSlot } from "@cachette/ui/input-otp"

<InputOTP aria-label="6자리 인증 코드" length={6}>
  <InputOTPGroup>
    {Array.from({ length: 6 }, (_, index) => <InputOTPSlot key={index} />)}
  </InputOTPGroup>
</InputOTP>`,
  },
  Select: {
    registryName: "select",
    usage: `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@cachette/ui/select"

<Select defaultValue="design">
  <SelectTrigger aria-label="팀 선택">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="design">디자인</SelectItem>
    <SelectItem value="development">개발</SelectItem>
  </SelectContent>
</Select>`,
  },
  Tabs: {
    registryName: "tabs",
    usage: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@cachette/ui/tabs"

<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">계정</TabsTrigger>
    <TabsTrigger value="security">보안</TabsTrigger>
  </TabsList>
  <TabsContent value="account">계정 설정</TabsContent>
  <TabsContent value="security">보안 설정</TabsContent>
</Tabs>`,
  },
  Toast: {
    registryName: "toast",
    usage: `import { Button } from "@cachette/ui/button"
import { toast, Toaster } from "@cachette/ui/toast"

<>
  <Button onClick={() => toast.add({ title: "저장했어요." })}>저장하기</Button>
  <Toaster position="bottom-right" />
</>`,
  },
  Tooltip: {
    registryName: "tooltip",
    usage: `import { Tooltip, TooltipContent, TooltipTrigger } from "@cachette/ui/tooltip"

<Tooltip>
  <TooltipTrigger aria-label="도움말">?</TooltipTrigger>
  <TooltipContent>추가 정보를 확인합니다.</TooltipContent>
</Tooltip>`,
  },
};

function getRegistryName(title: string) {
  return title.toLowerCase().replaceAll(" ", "-");
}

function getComponentName(title: string) {
  return title.replaceAll(" ", "");
}

export function getComponentDocument(title: string): ComponentDocument {
  const document = componentDocuments[title];
  if (document) return document;

  const componentName = getComponentName(title);
  const registryName = getRegistryName(title);

  return {
    registryName,
    usage: `import { ${componentName} } from "@cachette/ui/${registryName}"

<${componentName} />`,
  };
}
