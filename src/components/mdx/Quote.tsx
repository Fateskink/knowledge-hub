import { Quote as QuoteIcon } from "lucide-react";

interface QuoteProps {
  children: React.ReactNode;
  author?: string;
  source?: string;
}

export default function Quote({ children, author, source }: QuoteProps) {
  return (
    <blockquote className="not-prose my-6 border-l-4 border-primary/60 dark:border-primary/40 bg-secondary/50 dark:bg-secondary/30 p-4 pl-6 rounded-r-lg">
      <QuoteIcon className="mb-2 h-5 w-5 text-primary/30 dark:text-primary/20" />
      <div className="text-foreground/85 italic leading-relaxed">{children}</div>
      {(author || source) && (
        <footer className="mt-2 text-sm text-muted">
          {author && <span className="font-medium">&mdash; {author}</span>}
          {source && <span>, {source}</span>}
        </footer>
      )}
    </blockquote>
  );
}
