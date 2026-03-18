"use client";

import Giscus from "@giscus/react";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";

export default function GiscusComments() {
  const params = useParams();
  const pathname = usePathname();
  const locale = (params.locale as string) || "vi";
  const [theme, setTheme] = useState("dark_dimmed");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark_dimmed" : "light");

    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark_dimmed" : "light");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    setMounted(true);
    return () => observer.disconnect();
  }, []);

  if (!mounted) return null;

  const isVi = locale === "vi";

  return (
    <div className="mt-12 border-t border-border pt-8">
      <h3 className="mb-6 flex items-center gap-2 text-xl font-bold">
        <MessageSquare className="h-5 w-5 text-primary" />
        {isVi ? "Bình luận" : "Comments"}
      </h3>

      <Giscus
        key={pathname}
        repo="Fateskink/knowledge-hub"
        repoId="R_kgDORqaUDQ"
        category="General"
        categoryId="DIC_kwDORqaUDc4C4sNC"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme}
        lang={isVi ? "vi" : "en"}
        loading="lazy"
      />

      <p className="mt-4 text-center text-xs text-muted">
        {isVi
          ? "Đăng nhập GitHub để bình luận"
          : "Sign in with GitHub to comment"}
        {" — "}
        <a
          href="https://giscus.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Giscus
        </a>
      </p>
    </div>
  );
}
