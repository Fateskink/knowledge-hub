import { Info, AlertTriangle, Lightbulb, AlertCircle } from "lucide-react";

const styles = {
  info: {
    bg: "bg-blue-50/80 dark:bg-blue-950/20",
    border: "border-blue-200 dark:border-blue-900/50",
    icon: <Info className="h-5 w-5 text-blue-500 dark:text-blue-400" />,
    title: "text-blue-800 dark:text-blue-300",
  },
  warning: {
    bg: "bg-amber-50/80 dark:bg-amber-950/20",
    border: "border-amber-200 dark:border-amber-900/50",
    icon: <AlertTriangle className="h-5 w-5 text-amber-500 dark:text-amber-400" />,
    title: "text-amber-800 dark:text-amber-300",
  },
  tip: {
    bg: "bg-emerald-50/80 dark:bg-emerald-950/20",
    border: "border-emerald-200 dark:border-emerald-900/50",
    icon: <Lightbulb className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />,
    title: "text-emerald-800 dark:text-emerald-300",
  },
  danger: {
    bg: "bg-red-50/80 dark:bg-red-950/20",
    border: "border-red-200 dark:border-red-900/50",
    icon: <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400" />,
    title: "text-red-800 dark:text-red-300",
  },
};

interface CalloutProps {
  type?: keyof typeof styles;
  title?: string;
  children: React.ReactNode;
}

export default function Callout({ type = "info", title, children }: CalloutProps) {
  const s = styles[type];

  return (
    <div className={`not-prose my-6 rounded-xl border ${s.border} ${s.bg} p-4`}>
      <div className="flex gap-3">
        <div className="mt-0.5 shrink-0">{s.icon}</div>
        <div className="min-w-0">
          {title && (
            <p className={`mb-1 font-semibold ${s.title}`}>{title}</p>
          )}
          <div className="text-sm leading-relaxed text-foreground/80 [&>p]:m-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
