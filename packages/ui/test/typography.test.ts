import assert from "node:assert/strict";
import test from "node:test";

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { Heading } from "../dist/heading.js";

test("heading level remains independent of its visual size", () => {
  for (const size of ["page", "section", "subsection"] as const) {
    const html = renderToStaticMarkup(
      createElement(Heading, { level: 3, size, id: "settings" }, "Settings"),
    );
    assert.match(html, /^<h3\b/);
    assert.match(html, /id="settings"/);
    assert.doesNotMatch(html, /\b(?:size|level)=/);
  }
});
