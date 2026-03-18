"use client";

import { useSearchParams, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import ArticleCard from "@/components/ArticleCard";
import type { ArticleMeta } from "@/lib/content";
import Fuse from "fuse.js";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("search");
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<ArticleMeta[]>([]);
  const [allArticles, setAllArticles] = useState<ArticleMeta[]>([]);
  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    fetch(`/api/articles?locale=${locale}`)
      .then((r) => r.json())
      .then(setAllArticles);
  }, [locale]);

  useEffect(() => {
    if (!searchQuery.trim() || allArticles.length === 0) {
      setResults([]);
      return;
    }
    const fuse = new Fuse(allArticles, {
      keys: ["title", "description", "tags", "category"],
      threshold: 0.4,
    });
    setResults(fuse.search(searchQuery).map((r) => r.item));
  }, [searchQuery, allArticles]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">{t("title")}</h1>

      <div className="mb-8 flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
        <Search className="h-5 w-5 text-muted" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t("placeholder")}
          className="flex-1 bg-transparent text-lg outline-none placeholder:text-muted"
          autoFocus
        />
      </div>

      {searchQuery.trim() && (
        <p className="mb-6 text-sm text-muted">
          {results.length} {t("results")}
        </p>
      )}

      {results.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : searchQuery.trim() ? (
        <p className="text-center text-muted py-12">{t("noResults")}</p>
      ) : null}
    </div>
  );
}
