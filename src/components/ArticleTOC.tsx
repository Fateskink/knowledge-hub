"use client";

import TableOfContents from "./TableOfContents";

interface ArticleTOCProps {
  headings: { id: string; text: string; level: number }[];
}

export default function ArticleTOC({ headings }: ArticleTOCProps) {
  return <TableOfContents items={headings} />;
}
