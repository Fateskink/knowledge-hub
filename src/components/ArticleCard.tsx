import { Link } from "@/i18n/routing";
import { Clock, ArrowRight } from "lucide-react";
import type { ArticleMeta } from "@/lib/content";

interface ArticleCardProps {
  article: ArticleMeta;
  compact?: boolean;
}

export default function ArticleCard({ article, compact }: ArticleCardProps) {
  return (
    <Link
      href={`/${article.category}/${article.slug}`}
      className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:bg-card-hover hover:shadow-lg hover:shadow-primary/5 dark:hover:shadow-none"
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-md bg-primary/10 dark:bg-primary/[0.08] px-2 py-0.5 text-xs font-medium text-primary">
          {article.category}
        </span>
        {article.featured && (
          <span className="rounded-md bg-accent/10 dark:bg-accent/[0.08] px-2 py-0.5 text-xs font-medium text-accent">
            Featured
          </span>
        )}
      </div>

      <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
        {article.title}
      </h3>

      {!compact && (
        <p className="mb-4 text-sm text-muted line-clamp-2 flex-1">
          {article.description}
        </p>
      )}

      <div className="flex items-center justify-between text-xs text-muted">
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          {article.readingTime} min
        </span>
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
