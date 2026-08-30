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
        description: "Indicates the information type and importance.",
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
        description: "Indicates an action's priority and risk level.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        defaultValue: '"md"',
        description: "Adjusts the size for the screen's information density.",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Prevents interaction.",
      },
      {
        name: "isLoading",
        type: "boolean",
        defaultValue: "false",
        description: "Displays an in-progress state.",
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
        description: "Arranges related actions horizontally or vertically.",
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
        description: "Sets the layout direction for controls and descriptions.",
      },
      {
        name: "invalid",
        type: "boolean",
        defaultValue: "false",
        description: "Displays an error state.",
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
        description: "Communicates an error state.",
      },
    ],
  },
  "Hover Card": {
    registryName: "hover-card",
  },
  "Input Group": {
    registryName: "input-group",
  },
  "Content Row": {
    registryName: "content-row",
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
        description: "Styles the table container, including horizontal scrolling.",
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
