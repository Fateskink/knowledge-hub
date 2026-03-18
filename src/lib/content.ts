import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ArticleMeta {
  title: string;
  description: string;
  category: string;
  author: string;
  date: string;
  readingTime: number;
  tags: string[];
  featured: boolean;
  order: number;
  slug: string;
  locale: string;
  level?: number;
  series?: string;
  seriesOrder?: number;
  seriesTitle?: string;
  sources?: { title: string; url: string }[];
}

export interface Article extends ArticleMeta {
  content: string;
}

const contentDir = path.join(process.cwd(), "content");

export function getArticleSlugs(locale: string, category: string): string[] {
  const dir = path.join(contentDir, locale, category);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getArticle(
  locale: string,
  category: string,
  slug: string
): Article | null {
  const filePath = path.join(contentDir, locale, category, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    title: data.title || "",
    description: data.description || "",
    category: data.category || category,
    author: data.author || "Knowledge Hub",
    date: data.date || "",
    readingTime: data.readingTime || Math.ceil(content.split(/\s+/).length / 200),
    tags: data.tags || [],
    featured: data.featured || false,
    order: data.order || 99,
    slug,
    locale,
    level: data.level || undefined,
    series: data.series || undefined,
    seriesOrder: data.seriesOrder || undefined,
    seriesTitle: data.seriesTitle || undefined,
    sources: data.sources || [],
    content,
  };
}

export function getArticlesByCategory(
  locale: string,
  category: string
): ArticleMeta[] {
  const slugs = getArticleSlugs(locale, category);
  return slugs
    .map((slug) => {
      const article = getArticle(locale, category, slug);
      if (!article) return null;
      const { content: _, ...meta } = article;
      return meta;
    })
    .filter(Boolean)
    .sort((a, b) => (a!.order ?? 99) - (b!.order ?? 99)) as ArticleMeta[];
}

export function getAllArticles(locale: string): ArticleMeta[] {
  const categories = getCategories();
  return categories.flatMap((cat) => getArticlesByCategory(locale, cat.slug));
}

export function getFeaturedArticles(locale: string): ArticleMeta[] {
  return getAllArticles(locale).filter((a) => a.featured);
}

export function getRelatedArticles(
  locale: string,
  category: string,
  currentSlug: string,
  limit = 3
): ArticleMeta[] {
  return getArticlesByCategory(locale, category)
    .filter((a) => a.slug !== currentSlug)
    .slice(0, limit);
}

export function getSeriesArticles(
  locale: string,
  seriesSlug: string
): ArticleMeta[] {
  return getAllArticles(locale)
    .filter((a) => a.series === seriesSlug)
    .sort((a, b) => (a.seriesOrder ?? 99) - (b.seriesOrder ?? 99));
}

export interface Category {
  slug: string;
  icon: string;
}

export function getCategories(): Category[] {
  return [
    { slug: "ai", icon: "Brain" },
    { slug: "programming", icon: "Code" },
    { slug: "web-development", icon: "Globe" },
    { slug: "hardware", icon: "Cpu" },
    { slug: "database", icon: "Database" },
    { slug: "networking", icon: "Radio" },
    { slug: "automation", icon: "Workflow" },
    { slug: "devops", icon: "Container" },
  ];
}

export function getCategoryArticleCount(
  locale: string,
  categorySlug: string
): number {
  return getArticleSlugs(locale, categorySlug).length;
}

export const LEVEL_LABELS: Record<string, Record<number, string>> = {
  vi: {
    1: "Khái niệm",
    2: "Bắt đầu",
    3: "Phát triển",
    4: "Chuyên sâu",
    5: "Vận hành",
  },
  en: {
    1: "Concept",
    2: "Getting Started",
    3: "Building",
    4: "Best Practices",
    5: "Production",
  },
};
