type ComponentDocument = {
  props?: readonly {
    defaultValue?: string;
    description: string;
    name: string;
    type: string;
  }[];
  registryName: string;
};

const componentDocuments: Record<string, ComponentDocument> = {
  Accordion: {
    registryName: "accordion",
  },
  "Alert Dialog": {
    registryName: "alert-dialog",
  },
  "Aspect Ratio": {
    registryName: "aspect-ratio",
  },
  Attachment: {
    registryName: "attachment",
  },
  Avatar: {
    registryName: "avatar",
  },
  Banner: {
    registryName: "banner",
  },
  Badge: {
    registryName: "badge",
    props: [
      {
        name: "variant",
        type: '"default" | "secondary" | "destructive" | "outline" | "ghost"',
        defaultValue: '"default"',
        description: "정보의 성격과 중요도를 나타냅니다.",
      },
    ],
  },
  Button: {
    registryName: "button",
    props: [
      {
        name: "variant",
        type: '"primary" | "secondary" | "ghost" | "destructive"',
        defaultValue: '"primary"',
        description: "행동의 중요도와 위험도를 나타냅니다.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        defaultValue: '"md"',
        description: "화면의 정보 밀도에 맞춰 크기를 조절합니다.",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "상호작용을 막습니다.",
      },
      {
        name: "isLoading",
        type: "boolean",
        defaultValue: "false",
        description: "진행 중 상태를 표시합니다.",
      },
    ],
  },
  Breadcrumb: {
    registryName: "breadcrumb",
  },
  Bubble: {
    registryName: "bubble",
  },
  "Button Group": {
    registryName: "button-group",
    props: [
      {
        name: "orientation",
        type: '"horizontal" | "vertical"',
        defaultValue: '"horizontal"',
        description: "관련 행동을 가로 또는 세로로 정렬합니다.",
      },
    ],
  },
  Card: {
    registryName: "card",
  },
  Checkbox: {
    registryName: "checkbox",
  },
  Collapsible: {
    registryName: "collapsible",
  },
  Combobox: {
    registryName: "combobox",
  },
  "Context Menu": {
    registryName: "context-menu",
  },
  Dialog: {
    registryName: "dialog",
  },
  "Dropdown Menu": {
    registryName: "dropdown-menu",
  },
  Empty: {
    registryName: "empty",
  },
  Field: {
    registryName: "field",
    props: [
      {
        name: "orientation",
        type: '"vertical" | "horizontal"',
        defaultValue: '"vertical"',
        description: "컨트롤과 설명의 배치 방향을 정합니다.",
      },
      {
        name: "invalid",
        type: "boolean",
        defaultValue: "false",
        description: "오류 상태를 표시합니다.",
      },
    ],
  },
  Input: {
    registryName: "input",
    props: [
      {
        name: "aria-invalid",
        type: "boolean",
        defaultValue: "false",
        description: "오류 상태를 알립니다.",
      },
    ],
  },
  "Hover Card": {
    registryName: "hover-card",
  },
  "Input Group": {
    registryName: "input-group",
  },
  Item: {
    registryName: "item",
  },
  Kbd: {
    registryName: "kbd",
  },
  Label: {
    registryName: "label",
  },
  Link: {
    registryName: "link",
  },
  "Input OTP": {
    registryName: "input-otp",
  },
  Select: {
    registryName: "select",
  },
  "Scroll Area": {
    registryName: "scroll-area",
  },
  Tabs: {
    registryName: "tabs",
  },
  Table: {
    registryName: "table",
    props: [
      {
        name: "containerClassName",
        type: "string",
        description: "가로 스크롤을 포함한 테이블 컨테이너를 꾸밉니다.",
      },
    ],
  },
  Toast: {
    registryName: "toast",
  },
  Tooltip: {
    registryName: "tooltip",
  },
  Typography: {
    registryName: "typography",
  },
};

function getRegistryName(title: string) {
  return title.toLowerCase().replaceAll(" ", "-");
}

export function getComponentDocument(title: string): ComponentDocument {
  const document = componentDocuments[title];
  const registryName = getRegistryName(title);

  return {
    registryName: document?.registryName ?? registryName,
    props: document?.props,
  };
}
