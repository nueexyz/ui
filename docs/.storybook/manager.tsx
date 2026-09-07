import {
  BookOpenIcon,
  CubeIcon,
  PaletteIcon,
  TextTIcon,
  StackIcon,
  DiamondsFourIcon,
} from "@phosphor-icons/react";
import React from "react";
import { addons, types, useGlobals } from "storybook/manager-api";

import "./manager.css";
import { create } from "storybook/theming";

import { ui } from "../src/documentation/locale";

function SidebarLabel({ name, id, type }: { name: string; id: string; type: string }) {
  if (type !== "docs") return name;
  let Icon = BookOpenIcon;
  if (id.startsWith("components-")) Icon = CubeIcon;
  else if (id.startsWith("foundations-")) Icon = DiamondsFourIcon;
  if (id === "foundations-color--docs") Icon = PaletteIcon;
  if (id === "foundations-typography--docs") Icon = TextTIcon;
  if (id === "foundations-elevation--docs") Icon = StackIcon;
  return (
    <span className="nuee-sidebar-label">
      <Icon size={16} aria-hidden="true" />
      <span>{name}</span>
    </span>
  );
}

function DocumentationTools() {
  const [globals, updateGlobals] = useGlobals();
  const locale = globals.locale === "en" ? "en" : "ko";
  return (
    <div className="nuee-doc-tools">
      <select
        aria-label={ui.language}
        value={locale}
        onChange={(event) => updateGlobals({ locale: event.target.value })}
      >
        <option value="ko">한국어</option>
        <option value="en">English</option>
      </select>
      <select
        aria-label={ui.colorMode}
        value={globals.colorMode ?? "light"}
        onChange={(event) => updateGlobals({ colorMode: event.target.value })}
      >
        <option value="light">{ui.light}</option>
        <option value="dark">{ui.dark}</option>
      </select>
      <select
        aria-label={ui.motion}
        value={globals.motionPreference ?? "no-preference"}
        onChange={(event) => updateGlobals({ motionPreference: event.target.value })}
      >
        <option value="system">{ui.system}</option>
        <option value="reduce">{ui.reduce}</option>
        <option value="no-preference">{ui.allowMotion}</option>
      </select>
    </div>
  );
}

addons.register("nuee/documentation", () =>
  addons.add("nuee/documentation/preferences", {
    type: types.TOOL,
    title: "Documentation",
    render: DocumentationTools,
  }),
);

addons.setConfig({
  sidebar: {
    renderLabel: (item) => <SidebarLabel name={item.name} id={item.id} type={item.type} />,
  },
  theme: create({
    base: "light",
    brandTitle: "nuée",
    brandUrl: "?path=/docs/getting-started--docs",
    colorPrimary: "#171717",
    colorSecondary: "#171717",
    appBg: "#fafafa",
    appContentBg: "#ffffff",
    appBorderColor: "#e5e5e5",
    appBorderRadius: 8,
    fontBase: "var(--nuee-font-body)",
    fontCode: "var(--nuee-font-code)",
  }),
});
