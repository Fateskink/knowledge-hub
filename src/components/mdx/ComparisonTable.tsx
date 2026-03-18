interface ComparisonTableProps {
  headers?: string[];
  rows?: string[][];
}

export default function ComparisonTable({ headers, rows }: ComparisonTableProps) {
  if (!headers || !rows) return null;

  return (
    <div className="not-prose my-6 overflow-x-auto rounded-xl border border-border shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-secondary/70 dark:bg-secondary/50">
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-foreground/80"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row, i) => (
            <tr key={i} className="transition-colors hover:bg-secondary/30 dark:hover:bg-secondary/20">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-4 py-3 ${
                    j === 0
                      ? "font-medium text-foreground/90"
                      : "text-muted"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
