import Markdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { documentationComponents } from "./components";
import { useLocale } from "./locale";

export function Guideline({ content, english }: { content: string; english: string }) {
  const locale = useLocale();
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSlug]}
      components={documentationComponents}
    >
      {locale === "en" ? english : content}
    </Markdown>
  );
}
