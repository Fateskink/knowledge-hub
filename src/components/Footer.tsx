"use client";

import { useTranslations } from "next-intl";
import { Heart } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted">{t("description")}</p>
          <p className="flex items-center gap-1 text-sm text-muted">
            {t("madeWith")}{" "}
            <Heart className="h-4 w-4 fill-red-500 text-red-500" /> &{" "}
            <span className="font-medium text-primary">Next.js</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
