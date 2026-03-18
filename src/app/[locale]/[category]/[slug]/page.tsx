import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { getArticle, getRelatedArticles, getArticleSlugs, getCategories } from "@/lib/content";
import ArticleContent from "@/components/ArticleContent";
import Breadcrumb from "@/components/Breadcrumb";
import ArticleCard from "@/components/ArticleCard";
import { Clock, User, Calendar, Tag, ExternalLink } from "lucide-react";

export async function generateStaticParams() {
  const categories = getCategories();
  const params: { category: string; slug: string }[] = [];
  for (const cat of categories) {
    for (const locale of ["vi", "en"]) {
      const slugs = getArticleSlugs(locale, cat.slug);
      for (const slug of slugs) {
        params.push({ category: cat.slug, slug });
      }
    }
  }
  return params;
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; category: string; slug: string }>;
}) {
  const { locale, category, slug } = await params;
  const article = getArticle(locale, category, slug);
  if (!article) notFound();

  const t = await getTranslations("article");
  const tc = await getTranslations("categories");
  const related = getRelatedArticles(locale, category, slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Breadcrumb
        items={[
          { label: tc(`${category}.name`), href: `/${category}` },
          { label: article.title },
        ]}
      />

      <article className="mt-8">
        {/* Header */}
        <header className="mb-10">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-lg bg-primary/10 dark:bg-primary/[0.08] px-3 py-1 text-sm font-medium text-primary">
              {tc(`${category}.name`)}
            </span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-xs text-muted"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
            {article.title}
          </h1>
          <p className="mb-6 text-lg text-muted">{article.description}</p>
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted border-b border-border pb-6">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {article.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {article.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {article.readingTime} {t("readingTime")}
            </span>
          </div>
        </header>

        {/* Content with TOC */}
        <ArticleContent content={article.content} />

        {/* Sources */}
        {article.sources && article.sources.length > 0 && (
          <section className="mt-12 rounded-lg border border-border bg-secondary/30 dark:bg-secondary/20 p-6">
            <h2 className="mb-4 text-lg font-semibold">{t("sources")}</h2>
            <ul className="space-y-2">
              {article.sources.map((source, i) => (
                <li key={i}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    {source.title}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">{t("related")}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
