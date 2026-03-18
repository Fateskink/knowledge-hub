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

export interface Category {
  slug: string;
  icon: string;
}

export function getCategories(): Category[] {
  return [
    { slug: "claude-code", icon: "Terminal" },
    { slug: "ai-basics", icon: "Brain" },
    { slug: "programming", icon: "Code" },
    { slug: "web-development", icon: "Globe" },
    { slug: "hardware", icon: "Cpu" },
    { slug: "database", icon: "Database" },
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
