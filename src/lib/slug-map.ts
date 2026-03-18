// Maps Vietnamese slugs to English slugs and vice versa
// Key format: "category/slug"

const viToEn: Record<string, string> = {
  // Claude Code
  "claude-code/gioi-thieu-claude-code": "claude-code/introduction-to-claude-code",
  "claude-code/skills-va-plugins": "claude-code/skills-and-plugins",
  "claude-code/models-opus-sonnet-haiku": "claude-code/models-opus-sonnet-haiku",
  "claude-code/agents-tools-cli": "claude-code/agents-tools-cli",
  "claude-code/hooks-va-slash-commands": "claude-code/hooks-and-slash-commands",
  "claude-code/mcp-servers": "claude-code/mcp-servers",
  "claude-code/cau-hinh-va-tuy-chinh": "claude-code/configuration-and-customization",
  // AI Basics
  "ai-basics/ai-la-gi": "ai-basics/what-is-ai",
  "ai-basics/llm-hoat-dong-nhu-the-nao": "ai-basics/how-llms-work",
  "ai-basics/prompt-engineering-co-ban": "ai-basics/prompt-engineering-basics",
  "ai-basics/ai-agents-giai-thich": "ai-basics/ai-agents-explained",
  "ai-basics/rag-la-gi": "ai-basics/what-is-rag",
  "ai-basics/so-sanh-cac-ai-models": "ai-basics/comparing-ai-models",
  "ai-basics/an-toan-va-dao-duc-ai": "ai-basics/ai-safety-and-ethics",
  // Programming
  "programming/bat-dau-voi-lap-trinh": "programming/getting-started-with-programming",
  "programming/giai-thuat-co-ban": "programming/basic-algorithms",
  "programming/python-co-ban": "programming/python-basics",
  "programming/git-va-github": "programming/git-and-github",
  "programming/design-patterns": "programming/design-patterns",
  "programming/quan-ly-bo-nho": "programming/memory-management",
  "programming/con-tro-trong-lap-trinh": "programming/pointers-in-programming",
  "programming/concurrency-da-luong": "programming/concurrency-and-multithreading",
  "programming/mo-hinh-mvc": "programming/mvc-pattern",
  "programming/domain-driven-design": "programming/domain-driven-design",
  "programming/buffer-va-tran-buffer": "programming/buffers-and-buffer-overflow",
  "programming/ma-hoa-du-lieu-va-base64": "programming/data-encoding-and-base64",
  "programming/du-lieu-nhi-phan-hinh-anh-am-thanh": "programming/binary-data-images-audio",
  // Web Development
  "web-development/html-css-co-ban": "web-development/html-css-basics",
  "web-development/javascript-hien-dai": "web-development/modern-javascript",
  "web-development/react-cho-nguoi-moi": "web-development/react-for-beginners",
  "web-development/nextjs-va-server-components": "web-development/nextjs-and-server-components",
  // Hardware
  "hardware/kien-truc-may-tinh": "hardware/computer-architecture",
  "hardware/cpu-hoat-dong-nhu-the-nao": "hardware/how-cpus-work",
  "hardware/bong-ban-dan-va-chip": "hardware/transistors-and-chips",
  "hardware/ram-va-bo-nho": "hardware/ram-and-memory",
  "hardware/mach-dien-tu-va-cong-logic": "hardware/circuits-and-logic-gates",
  "hardware/man-hinh-cam-ung": "hardware/touchscreens-explained",
  "hardware/the-tu-va-nfc": "hardware/magnetic-cards-and-nfc",
  "hardware/gpu-va-xu-ly-song-song": "hardware/gpu-and-parallel-computing",
  "hardware/nang-luong-va-dien-toan": "hardware/energy-and-computing",
  // Database & Realtime
  "database/sql-va-nosql": "database/sql-vs-nosql",
  "database/supabase-nen-tang-backend": "database/supabase-backend-platform",
  "database/websocket-va-realtime": "database/websocket-and-realtime",
  "database/tcp-ip-va-mang": "database/tcp-ip-and-networking",
  "database/message-queue-rabbitmq-kafka": "database/message-queues-rabbitmq-kafka",
  "database/redis-va-caching": "database/redis-and-caching",
  "database/vector-hoa-va-embeddings": "database/vectorization-and-embeddings",
  "database/vector-database": "database/vector-database",
  "database/xay-dung-database-engine": "database/building-a-database-engine",
  "database/sql-va-database-engine": "database/sql-and-database-engine",
  "database/transaction-va-rollback": "database/transactions-and-rollback",
  "database/index-trong-database": "database/database-indexing",
  // Automation
  "automation/n8n-tu-dong-hoa": "automation/n8n-workflow-automation",
  "automation/apache-airflow": "automation/apache-airflow",
  "automation/apache-spark": "automation/apache-spark",
  "automation/mqtt-iot-protocol": "automation/mqtt-iot-protocol",
  "automation/event-driven-architecture": "automation/event-driven-architecture",
  // DevOps
  "devops/racknerd-vps-deploy": "devops/racknerd-vps-deploy",
  "devops/rackspace-spot": "devops/rackspace-spot",
  "devops/docker-co-ban": "devops/docker-basics",
  "devops/ci-cd-pipeline": "devops/ci-cd-pipeline",
  "devops/kubernetes-co-ban": "devops/kubernetes-basics",
  "devops/linux-command-line": "devops/linux-command-line",
};

// Build reverse map
const enToVi: Record<string, string> = {};
for (const [vi, en] of Object.entries(viToEn)) {
  enToVi[en] = vi;
}

export function getTranslatedPath(
  currentPath: string,
  fromLocale: string,
  toLocale: string
): string {
  // Remove the locale prefix: /vi/claude-code/slug -> claude-code/slug
  const pathWithoutLocale = currentPath.replace(`/${fromLocale}`, "").replace(/^\//, "");

  if (!pathWithoutLocale || pathWithoutLocale === "") return "/";

  // Check if this is an article path (category/slug)
  const map = fromLocale === "vi" ? viToEn : enToVi;
  const translated = map[pathWithoutLocale];

  if (translated) {
    return `/${translated}`;
  }

  // For non-article paths (category pages, about, search), keep same path
  return `/${pathWithoutLocale}`;
}
