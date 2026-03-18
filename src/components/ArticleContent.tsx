import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { mdxComponents } from "./mdx";
import ArticleTOC from "./ArticleTOC";

interface ArticleContentProps {
  content: string;
}

function extractHeadings(mdContent: string) {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: { id: string; text: string; level: number }[] = [];
  const idCounts = new Map<string, number>();
  let m;

  while ((m = headingRegex.exec(mdContent)) !== null) {
    const level = m[1].length;
    const text = m[2].replace(/[`*_~]/g, "");
    let id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    // Deduplicate IDs by appending a suffix
    const count = idCounts.get(id) || 0;
    idCounts.set(id, count + 1);
    if (count > 0) {
      id = `${id}-${count}`;
    }

    headings.push({ id, text, level });
  }

  return headings;
}

export default function ArticleContent({ content }: ArticleContentProps) {
  const headings = extractHeadings(content);

  return (
    <div className="flex gap-10">
      <div className="prose prose-lg min-w-0 flex-1 prose-headings:scroll-mt-20 prose-img:rounded-xl">
        <MDXRemote
          source={content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                rehypeSlug,
                [
                  rehypePrettyCode,
                  {
                    theme: "github-dark",
                    keepBackground: true,
                    defaultLang: "plaintext",
                  },
                ],
              ],
            },
          }}
        />
      </div>

      {headings.length > 0 && (
        <aside className="hidden w-56 shrink-0 xl:block">
          <ArticleTOC headings={headings} />
        </aside>
      )}
    </div>
  );
}
