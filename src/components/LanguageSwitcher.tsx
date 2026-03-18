"use client";

import { useParams, usePathname } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { Globe } from "lucide-react";
import { getTranslatedPath } from "@/lib/slug-map";

export default function LanguageSwitcher() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const locale = params.locale as string;

  const switchLocale = () => {
    const newLocale = locale === "vi" ? "en" : "vi";
    const translatedPath = getTranslatedPath(pathname, locale, newLocale);
    router.replace(translatedPath, { locale: newLocale });
  };

  return (
    <button
      onClick={switchLocale}
      className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-secondary hover:text-foreground"
    >
      <Globe className="h-4 w-4" />
      {locale === "vi" ? "EN" : "VI"}
    </button>
  );
}
