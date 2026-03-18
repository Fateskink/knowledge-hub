import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { getArticle, getRelatedArticles, getArticleSlugs, getCategories, getSeriesArticles, LEVEL_LABELS } from "@/lib/content";
import ArticleContent from "@/components/ArticleContent";
import Breadcrumb from "@/components/Breadcrumb";
import ArticleCard from "@/components/ArticleCard";
import GiscusComments from "@/components/GiscusComments";
import ArticleTracker from "@/components/ArticleTracker";
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string; slug: string }>;
}) {
  const { locale, category, slug } = await params;
  const article = getArticle(locale, category, slug);
  if (!article) return {};

  return {
    title: `${article.title} - Knowledge Hub`,
    description: article.description,
    keywords: article.tags,
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      siteName: "Knowledge Hub",
      publishedTime: article.date,
      tags: article.tags,
      locale: locale === "vi" ? "vi_VN" : "en_US",
    },
    twitter: {
      card: "summary",
      title: article.title,
      description: article.description,
    },
  };
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
  const seriesArticles = article.series
    ? getSeriesArticles(locale, article.series)
    : [];

  return (
    <>
      <ArticleTracker
        slug={slug}
        category={category}
        title={article.title}
        readingTime={article.readingTime}
      />
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Breadcrumb
          items={[
            { label: tc(`${category}.name`), href: `/${category}` },
            { label: article.title },
          ]}
        />

        <article className="mt-8">
          <header className="mb-10">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-lg bg-primary/10 dark:bg-primary/[0.08] px-3 py-1 text-sm font-medium text-primary">
                {tc(`${category}.name`)}
              </span>
              {article.level && (
                <span className="rounded-lg bg-accent/10 dark:bg-accent/[0.08] px-3 py-1 text-sm font-medium text-accent">
                  Lv.{article.level} - {LEVEL_LABELS[locale]?.[article.level] || ""}
                </span>
              )}
              {article.seriesTitle && (
                <span className="rounded-lg bg-emerald-100 dark:bg-emerald-900/20 px-3 py-1 text-sm font-medium text-emerald-700 dark:text-emerald-400">
                  {article.seriesTitle} ({article.seriesOrder}/{seriesArticles.length})
                </span>
              )}
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

          <ArticleContent content={article.content} />

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

        {/* Series Navigation */}
        {seriesArticles.length > 1 && (
          <section className="mt-12 rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-lg font-bold">
              {article.seriesTitle || (locale === "vi" ? "Series bài viết" : "Article Series")}
            </h3>
            <ol className="space-y-2">
              {seriesArticles.map((sa, i) => (
                <li key={sa.slug}>
                  {sa.slug === slug ? (
                    <span className="flex items-center gap-2 rounded-lg bg-primary/10 dark:bg-primary/[0.08] px-3 py-2 text-sm font-medium text-primary">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white dark:text-background">
                        {i + 1}
                      </span>
                      {sa.title}
                    </span>
                  ) : (
                    <a
                      href={`/${locale}/${sa.category}/${sa.slug}`}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium text-muted">
                        {i + 1}
                      </span>
                      {sa.title}
                    </a>
                  )}
                </li>
              ))}
            </ol>
          </section>
        )}

        <GiscusComments />
      </div>
    </>
  );
}
