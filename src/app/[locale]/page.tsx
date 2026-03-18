import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getAllArticles, getFeaturedArticles, getCategories, getCategoryArticleCount } from "@/lib/content";
import ArticleCard from "@/components/ArticleCard";
import ReadingHistory from "@/components/ReadingHistory";
import FeaturedOrRecent from "@/components/FeaturedOrRecent";
import { ArrowRight, Terminal, Brain, Code, Container, Globe, Cpu, Database, Workflow } from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  "claude-code": <Terminal className="h-8 w-8" />,
  "ai-basics": <Brain className="h-8 w-8" />,
  programming: <Code className="h-8 w-8" />,
  "web-development": <Globe className="h-8 w-8" />,
  hardware: <Cpu className="h-8 w-8" />,
  database: <Database className="h-8 w-8" />,
  automation: <Workflow className="h-8 w-8" />,
  devops: <Container className="h-8 w-8" />,
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("home");
  const tc = await getTranslations("categories");
  const featured = getFeaturedArticles(locale);
  const allArticles = getAllArticles(locale);
  const categories = getCategories();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 dark:from-primary/[0.03] dark:to-accent/[0.03] py-20">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h1 className="mb-4 text-5xl font-bold tracking-tight md:text-6xl">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t("hero.title")}
            </span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted">
            {t("hero.subtitle")}
          </p>
          <Link
            href="/claude-code"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white dark:text-background transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25 dark:hover:shadow-primary/10"
          >
            {t("hero.cta")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/10 dark:bg-primary/[0.04] blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-accent/10 dark:bg-accent/[0.04] blur-3xl" />
      </section>

      {/* Reading History (replaces Featured when >= 3 articles read) or Featured */}
      <FeaturedOrRecent featured={featured} featuredLabel={t("featured")} />

      {/* Categories */}
      <section className="bg-secondary/30 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-8 text-2xl font-bold">{t("categories")}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => {
              const count = getCategoryArticleCount(locale, cat.slug);
              return (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="mb-4 text-primary">{categoryIcons[cat.slug]}</div>
                  <h3 className="mb-1 text-lg font-semibold group-hover:text-primary transition-colors">
                    {tc(`${cat.slug}.name`)}
                  </h3>
                  <p className="mb-3 text-sm text-muted flex-1">
                    {tc(`${cat.slug}.description`)}
                  </p>
                  <span className="text-xs text-muted">
                    {count} {t("articles")}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-8 text-2xl font-bold">{t("latest")}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allArticles.slice(0, 6).map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}
