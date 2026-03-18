import { NextRequest, NextResponse } from "next/server";
import { getAllArticles } from "@/lib/content";

export async function GET(request: NextRequest) {
  const locale = request.nextUrl.searchParams.get("locale") || "vi";
  const articles = getAllArticles(locale);
  return NextResponse.json(articles);
}
