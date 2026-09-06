import Markdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { documentationComponents } from "./components";
import { useLocale } from "./locale";
import korean from "./locales/content.ko.json";

const translations: Record<string, string> = korean;

export function LocalizedMarkdown({ text }: { text: string }) {
  const locale = useLocale();
  const content = locale === "ko" ? (translations[text] ?? text) : text;
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSlug]}
      components={documentationComponents}
    >
      {content}
    </Markdown>
  );
}
