"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

export default function SearchBar({ onClose }: { onClose: () => void }) {
  const t = useTranslations("search");
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/${locale}/search?q=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5">
        <Search className="h-4 w-4 text-muted" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("placeholder")}
          className="w-40 bg-transparent text-sm outline-none placeholder:text-muted md:w-60"
        />
      </div>
      <button
        type="button"
        onClick={onClose}
        className="rounded-lg p-1.5 text-muted hover:bg-secondary"
      >
        <X className="h-4 w-4" />
      </button>
    </form>
  );
}
