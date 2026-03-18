import { getTranslations } from "next-intl/server";
import { BookOpen, Code, Brain, Users } from "lucide-react";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isVi = locale === "vi";

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-6 text-4xl font-bold">
        {isVi ? "Về Knowledge Hub" : "About Knowledge Hub"}
      </h1>

      <div className="prose prose-lg">
        <p className="text-lg text-muted">
          {isVi
            ? "Knowledge Hub là nền tảng chia sẻ kiến thức về AI và lập trình, được xây dựng với mục tiêu giúp mọi người tiếp cận công nghệ một cách dễ dàng và khoa học."
            : "Knowledge Hub is a knowledge-sharing platform about AI and programming, built with the goal of making technology accessible to everyone."}
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {[
            {
              icon: <Brain className="h-8 w-8 text-primary" />,
              title: isVi ? "AI & Machine Learning" : "AI & Machine Learning",
              desc: isVi
                ? "Giải thích các khái niệm AI từ cơ bản đến nâng cao"
                : "AI concepts explained from basics to advanced",
            },
            {
              icon: <Code className="h-8 w-8 text-primary" />,
              title: isVi ? "Lập trình" : "Programming",
              desc: isVi
                ? "Kiến thức lập trình thực tiễn và hiện đại"
                : "Practical and modern programming knowledge",
            },
            {
              icon: <BookOpen className="h-8 w-8 text-primary" />,
              title: isVi ? "Nội dung chất lượng" : "Quality Content",
              desc: isVi
                ? "Bài viết được nghiên cứu kỹ lưỡng với nguồn tham khảo"
                : "Well-researched articles with cited sources",
            },
            {
              icon: <Users className="h-8 w-8 text-primary" />,
              title: isVi ? "Song ngữ" : "Bilingual",
              desc: isVi
                ? "Hỗ trợ tiếng Việt và tiếng Anh"
                : "Vietnamese and English support",
            },
          ].map((item, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-6">
              {item.icon}
              <h3 className="mt-4 mb-2 text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
