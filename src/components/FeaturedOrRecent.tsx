"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Link } from "@/i18n/routing";
import { Clock, History, Star } from "lucide-react";
import ArticleCard from "./ArticleCard";
import { getReadingHistory } from "./ReadingHistory";
import type { ArticleMeta } from "@/lib/content";

interface FeaturedOrRecentProps {
  featured: ArticleMeta[];
  featuredLabel: string;
}

interface ReadHistoryItem {
  slug: string;
  category: string;
  title: string;
  readingTime: number;
  timestamp: number;
}

export default function FeaturedOrRecent({
  featured,
  featuredLabel,
}: FeaturedOrRecentProps) {
  const [history, setHistory] = useState<ReadHistoryItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const params = useParams();
  const locale = params.locale as string;

  useEffect(() => {
    setHistory(getReadingHistory());
    setMounted(true);
  }, []);

  // Show reading history if >= 3 articles read
  if (mounted && history.length >= 3) {
    const recent = history.slice(0, 3);
    return (
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-8 flex items-center gap-2 text-2xl font-bold">
          <History className="h-6 w-6 text-primary" />
          {locale === "vi" ? "Đọc gần đây" : "Recently Read"}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recent.map((item) => (
            <Link
              key={`${item.category}-${item.slug}`}
              href={`/${item.category}/${item.slug}`}
              className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:bg-card-hover hover:shadow-lg hover:shadow-primary/5 dark:hover:shadow-none"
            >
              <div className="mb-3">
                <span className="rounded-md bg-primary/10 dark:bg-primary/[0.08] px-2 py-0.5 text-xs font-medium text-primary">
                  {item.category}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {item.title}
              </h3>
              <div className="mt-auto flex items-center text-xs text-muted">
                <Clock className="mr-1 h-3.5 w-3.5" />
                {item.readingTime} min
              </div>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  // Default: show featured articles
  if (featured.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="mb-8 flex items-center gap-2 text-2xl font-bold">
        <Star className="h-6 w-6 text-primary" />
        {featuredLabel}
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.slice(0, 3).map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
