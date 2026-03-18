import { getTranslations } from "next-intl/server";
import { getArticlesByCategory, getCategories } from "@/lib/content";
import ArticleCard from "@/components/ArticleCard";
import Breadcrumb from "@/components/Breadcrumb";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const categories = getCategories();
  return categories.map((cat) => ({ category: cat.slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;
  const validCategories = getCategories().map((c) => c.slug);
  if (!validCategories.includes(category)) {
    notFound();
  }

  const tc = await getTranslations("categories");
  const articles = getArticlesByCategory(locale, category);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Breadcrumb items={[{ label: tc(`${category}.name`) }]} />

      <div className="mt-8 mb-10">
        <h1 className="text-3xl font-bold mb-2">{tc(`${category}.name`)}</h1>
        <p className="text-muted text-lg">{tc(`${category}.description`)}</p>
      </div>

      {articles.length === 0 ? (
        <p className="text-muted">No articles yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
