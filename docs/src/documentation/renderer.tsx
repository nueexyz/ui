import { MDXProvider } from "@mdx-js/react";
import { Docs, type DocsProps } from "@storybook/addon-docs/blocks";
import { Component, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { createRoot, type Root } from "react-dom/client";

import { documentationComponents } from "./components";
import { LocaleContext, ui } from "./locale";
import { useDocumentationGlobals } from "./useDocumentationGlobals";

class DocumentationErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    return this.state.error ? <p role="alert">{ui.documentError}</p> : this.props.children;
  }
}

function DocumentationRoot({ context, docsParameter }: DocsProps) {
  const { locale } = useDocumentationGlobals(context);
  return (
    <LocaleContext.Provider value={locale}>
      <DocumentationErrorBoundary key={new URLSearchParams(window.location.search).get("id")}>
        <MDXProvider components={documentationComponents}>
          <Docs context={context} docsParameter={docsParameter} />
        </MDXProvider>
      </DocumentationErrorBoundary>
    </LocaleContext.Provider>
  );
}

const roots = new WeakMap<HTMLElement, Root>();

// Keep the React root stable when Storybook rerenders docs after a globals update.
export const renderer = {
  async render(
    context: DocsProps["context"],
    docsParameter: DocsProps["docsParameter"],
    element: HTMLElement,
  ) {
    let root = roots.get(element);
    if (!root) {
      root = createRoot(element);
      roots.set(element, root);
    }
    flushSync(() =>
      root.render(<DocumentationRoot context={context} docsParameter={docsParameter} />),
    );
  },
  unmount(element: HTMLElement) {
    roots.get(element)?.unmount();
    roots.delete(element);
  },
};
