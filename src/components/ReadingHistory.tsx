"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Link } from "@/i18n/routing";
import { Clock, History } from "lucide-react";

interface ReadHistoryItem {
  slug: string;
  category: string;
  title: string;
  readingTime: number;
  timestamp: number;
}

const STORAGE_KEY = "kh-reading-history";
const MAX_ITEMS = 20;

export function trackArticleRead(article: {
  slug: string;
  category: string;
  title: string;
  readingTime: number;
}) {
  if (typeof window === "undefined") return;

  const stored = localStorage.getItem(STORAGE_KEY);
  const history: ReadHistoryItem[] = stored ? JSON.parse(stored) : [];

  // Remove existing entry for same article
  const filtered = history.filter(
    (h) => !(h.slug === article.slug && h.category === article.category)
  );

  // Add to front
  filtered.unshift({
    ...article,
    timestamp: Date.now(),
  });

  // Keep max items
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(filtered.slice(0, MAX_ITEMS))
  );
}

export function getReadingHistory(): ReadHistoryItem[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export default function ReadingHistory() {
  const [history, setHistory] = useState<ReadHistoryItem[]>([]);
  const params = useParams();
  const locale = params.locale as string;

  useEffect(() => {
    setHistory(getReadingHistory());
  }, []);

  if (history.length < 3) return null;

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
