# Knowledge Hub - Project Instructions

## Khi viết bài viết mới
Sử dụng skill `write-article` (file `.claude/skills/write-article.md`).

### Quick Rules
1. Luôn viết song ngữ VI + EN
2. Tiếng Việt PHẢI có dấu đầy đủ
3. Mỗi bài cần có `level: 1-5` trong frontmatter
4. Nội dung dài → chia series với `series`, `seriesOrder`, `seriesTitle`
5. Tìm nguồn chính thống trước khi viết
6. Cập nhật `src/lib/slug-map.ts` khi thêm bài mới
7. `npm run build` phải pass sau khi thêm bài
