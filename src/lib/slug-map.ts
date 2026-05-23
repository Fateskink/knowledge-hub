// Maps Vietnamese slugs to English slugs and vice versa
// Key format: "category/slug"

const viToEn: Record<string, string> = {
  // AI (merged from claude-code + ai-basics)
  "ai/gioi-thieu-claude-code": "ai/introduction-to-claude-code",
  "ai/skills-va-plugins": "ai/skills-and-plugins",
  "ai/models-opus-sonnet-haiku": "ai/models-opus-sonnet-haiku",
  "ai/agents-tools-cli": "ai/agents-tools-cli",
  "ai/hooks-va-slash-commands": "ai/hooks-and-slash-commands",
  "ai/mcp-servers": "ai/mcp-servers",
  "ai/cau-hinh-va-tuy-chinh": "ai/configuration-and-customization",
  "ai/ai-la-gi": "ai/what-is-ai",
  "ai/llm-hoat-dong-nhu-the-nao": "ai/how-llms-work",
  "ai/prompt-engineering-co-ban": "ai/prompt-engineering-basics",
  "ai/ai-agents-giai-thich": "ai/ai-agents-explained",
  "ai/rag-la-gi": "ai/what-is-rag",
  "ai/so-sanh-cac-ai-models": "ai/comparing-ai-models",
  "ai/an-toan-va-dao-duc-ai": "ai/ai-safety-and-ethics",
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
  // Database
  "database/sql-va-nosql": "database/sql-vs-nosql",
  "database/supabase-nen-tang-backend": "database/supabase-backend-platform",
  "database/redis-va-caching": "database/redis-and-caching",
  "database/vector-hoa-va-embeddings": "database/vectorization-and-embeddings",
  "database/vector-database": "database/vector-database",
  "database/xay-dung-database-engine": "database/building-a-database-engine",
  "database/sql-va-database-engine": "database/sql-and-database-engine",
  "database/transaction-va-rollback": "database/transactions-and-rollback",
  "database/index-trong-database": "database/database-indexing",
  // Networking
  "networking/websocket-va-realtime": "networking/websocket-and-realtime",
  "networking/tcp-ip-va-mang": "networking/tcp-ip-and-networking",
  "networking/message-queue-rabbitmq-kafka": "networking/message-queues-rabbitmq-kafka",
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
  "devops/docker-sau-hau-truong": "devops/docker-under-the-hood",
  "devops/ci-cd-pipeline": "devops/ci-cd-pipeline",
  "devops/kubernetes-co-ban": "devops/kubernetes-basics",
  "devops/linux-command-line": "devops/linux-command-line",
  // Flutter
  "flutter/flutter-rendering-pipeline": "flutter/flutter-rendering-pipeline",
  "flutter/widget-lifecycle": "flutter/widget-lifecycle",
  "flutter/buildcontext": "flutter/buildcontext",
  "flutter/constraint-layout-system": "flutter/constraint-layout-system",
  "flutter/riverpod-architecture": "flutter/riverpod-architecture",
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
  const pathWithoutLocale = currentPath.replace(`/${fromLocale}`, "").replace(/^\//, "");

  if (!pathWithoutLocale || pathWithoutLocale === "") return "/";

  const map = fromLocale === "vi" ? viToEn : enToVi;
  const translated = map[pathWithoutLocale];

  if (translated) {
    return `/${translated}`;
  }

  return `/${pathWithoutLocale}`;
}
