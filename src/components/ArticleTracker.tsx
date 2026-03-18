"use client";

import { useEffect } from "react";
import { trackArticleRead } from "./ReadingHistory";

interface ArticleTrackerProps {
  slug: string;
  category: string;
  title: string;
  readingTime: number;
}

export default function ArticleTracker({
  slug,
  category,
  title,
  readingTime,
}: ArticleTrackerProps) {
  useEffect(() => {
    trackArticleRead({ slug, category, title, readingTime });
  }, [slug, category, title, readingTime]);

  return null;
}
