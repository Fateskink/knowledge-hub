"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Link } from "@/i18n/routing";
import { Search, BookOpen } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import DarkModeToggle from "./DarkModeToggle";
import { useState } from "react";
import SearchBar from "./SearchBar";

export default function Header() {
  const t = useTranslations("nav");
  const params = useParams();
  const locale = params.locale as string;
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Knowledge Hub
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            {t("home")}
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            {t("about")}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {showSearch ? (
            <SearchBar onClose={() => setShowSearch(false)} />
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className="rounded-lg p-2 text-muted transition-colors hover:bg-secondary hover:text-foreground"
              aria-label={t("search")}
            >
              <Search className="h-5 w-5" />
            </button>
          )}
          <DarkModeToggle />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
