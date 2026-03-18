"use client";

import { ArrowRight, ArrowDown } from "lucide-react";

interface MermaidDiagramProps {
  chart: string;
}

interface ParsedNode {
  id: string;
  label: string;
}

interface ParsedEdge {
  from: string;
  to: string;
  label?: string;
}

function parseChart(chart: string): {
  nodes: ParsedNode[];
  edges: ParsedEdge[];
  direction: "LR" | "TD";
  subgraphs: { title: string; nodeIds: string[] }[];
} {
  // Normalize literal \n to real newlines
  const normalized = chart.replace(/\\n/g, "\n").replace(/\\t/g, "  ");
  const lines = normalized.split("\n").map((l) => l.trim()).filter(Boolean);

  const nodes = new Map<string, string>();
  const edges: ParsedEdge[] = [];
  const subgraphs: { title: string; nodeIds: string[] }[] = [];
  let direction: "LR" | "TD" = "TD";
  let currentSubgraph: { title: string; nodeIds: string[] } | null = null;

  for (const line of lines) {
    // Direction
    if (/^graph\s+(LR|TD|TB|RL|BT)/i.test(line)) {
      const d = line.match(/graph\s+(LR|TD|TB|RL|BT)/i)?.[1]?.toUpperCase();
      direction = d === "LR" || d === "RL" ? "LR" : "TD";
      continue;
    }

    // Subgraph
    if (/^subgraph\s+/i.test(line)) {
      const title = line.replace(/^subgraph\s+/i, "").replace(/["']/g, "");
      currentSubgraph = { title, nodeIds: [] };
      continue;
    }
    if (/^end$/i.test(line)) {
      if (currentSubgraph) {
        subgraphs.push(currentSubgraph);
        currentSubgraph = null;
      }
      continue;
    }

    // Edges: A --> B, A -->|label| B, A --> B[Label]
    const edgeMatch = line.match(
      /(\w+)(?:\[.*?\])?\s*--+>?\s*(?:\|([^|]*)\|\s*)?(\w+)(?:\[(.*?)\])?/
    );
    if (edgeMatch) {
      const [, fromId, edgeLabel, toId, toLabel] = edgeMatch;
      if (!nodes.has(fromId)) {
        // Try to extract label from the line
        const fromLabelMatch = line.match(new RegExp(`${fromId}\\[([^\\]]+)\\]`));
        nodes.set(fromId, fromLabelMatch ? fromLabelMatch[1] : fromId);
      }
      const label = toLabel || nodes.get(toId) || toId;
      nodes.set(toId, label);
      edges.push({ from: fromId, to: toId, label: edgeLabel });
      if (currentSubgraph) {
        if (!currentSubgraph.nodeIds.includes(fromId)) currentSubgraph.nodeIds.push(fromId);
        if (!currentSubgraph.nodeIds.includes(toId)) currentSubgraph.nodeIds.push(toId);
      }
      continue;
    }

    // Standalone node: A[Label]
    const nodeMatch = line.match(/^(\w+)\[(.*?)\]/);
    if (nodeMatch) {
      nodes.set(nodeMatch[1], nodeMatch[2]);
      if (currentSubgraph && !currentSubgraph.nodeIds.includes(nodeMatch[1])) {
        currentSubgraph.nodeIds.push(nodeMatch[1]);
      }
    }
  }

  return {
    nodes: Array.from(nodes.entries()).map(([id, label]) => ({ id, label })),
    edges,
    direction,
    subgraphs,
  };
}

const nodeColors = [
  "bg-indigo-50 border-indigo-200 text-indigo-800 dark:bg-indigo-950/25 dark:border-indigo-800/40 dark:text-indigo-300",
  "bg-cyan-50 border-cyan-200 text-cyan-800 dark:bg-cyan-950/25 dark:border-cyan-800/40 dark:text-cyan-300",
  "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/25 dark:border-emerald-800/40 dark:text-emerald-300",
  "bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-950/25 dark:border-amber-800/40 dark:text-amber-300",
  "bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-950/25 dark:border-rose-800/40 dark:text-rose-300",
  "bg-violet-50 border-violet-200 text-violet-800 dark:bg-violet-950/25 dark:border-violet-800/40 dark:text-violet-300",
  "bg-sky-50 border-sky-200 text-sky-800 dark:bg-sky-950/25 dark:border-sky-800/40 dark:text-sky-300",
  "bg-teal-50 border-teal-200 text-teal-800 dark:bg-teal-950/25 dark:border-teal-800/40 dark:text-teal-300",
];

export default function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const { nodes, edges, direction } = parseChart(chart);

  if (nodes.length === 0) {
    return null;
  }

  // Simple linear flow rendering
  // Build ordered list from edges
  const orderedIds: string[] = [];
  if (edges.length > 0) {
    const visited = new Set<string>();
    // Find start node (appears as 'from' but not as 'to', or first edge's from)
    const toSet = new Set(edges.map((e) => e.to));
    let startId = edges[0].from;
    for (const e of edges) {
      if (!toSet.has(e.from)) {
        startId = e.from;
        break;
      }
    }
    // BFS traversal
    const queue = [startId];
    while (queue.length > 0) {
      const current = queue.shift()!;
      if (visited.has(current)) continue;
      visited.add(current);
      orderedIds.push(current);
      for (const e of edges) {
        if (e.from === current && !visited.has(e.to)) {
          queue.push(e.to);
        }
      }
    }
    // Add any remaining nodes not in edges
    for (const n of nodes) {
      if (!visited.has(n.id)) orderedIds.push(n.id);
    }
  } else {
    orderedIds.push(...nodes.map((n) => n.id));
  }

  const nodeMap = new Map(nodes.map((n) => [n.id, n.label]));
  const isHorizontal = direction === "LR";
  const Arrow = isHorizontal ? ArrowRight : ArrowDown;

  return (
    <div className="not-prose my-6 overflow-x-auto rounded-xl border border-border bg-gradient-to-br from-secondary/30 to-secondary/10 p-6">
      <div
        className={`flex items-center justify-center gap-2 ${
          isHorizontal ? "flex-row flex-wrap" : "flex-col"
        }`}
      >
        {orderedIds.map((id, i) => {
          const label = nodeMap.get(id) || id;
          const colorClass = nodeColors[i % nodeColors.length];
          const edgeToThis = edges.find((e) => e.to === id);

          return (
            <div
              key={id}
              className={`flex items-center gap-2 ${
                isHorizontal ? "flex-row" : "flex-col"
              }`}
            >
              {i > 0 && (
                <div className="flex flex-col items-center gap-0.5">
                  <Arrow className="h-4 w-4 text-muted" />
                  {edgeToThis?.label && (
                    <span className="text-[10px] text-muted whitespace-nowrap">
                      {edgeToThis.label}
                    </span>
                  )}
                </div>
              )}
              <div
                className={`rounded-lg border-2 px-4 py-2.5 text-center text-sm font-medium shadow-sm ${colorClass}`}
              >
                {label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
