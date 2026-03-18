---
name: write-article
description: Skill để viết bài viết cho Knowledge Hub - trang chia sẻ kiến thức công nghệ song ngữ VI/EN
---

# Knowledge Hub Article Writer

## Tổng Quan

Skill này hướng dẫn viết bài viết cho trang Knowledge Hub. Mỗi chủ đề công nghệ quan trọng cần được triển khai theo **5 levels** từ khái niệm đến vận hành thực tế.

## Hệ Thống Level

### Level 1 - Khái Niệm (Concept)
- **Mục tiêu:** Người đọc hiểu "cái này là gì" và "tại sao cần biết"
- **Nội dung:** Định nghĩa, lịch sử, so sánh với công nghệ tương tự, use cases
- **Đối tượng:** Người mới bắt đầu, chưa biết gì về chủ đề
- **Frontmatter:** `level: 1`
- **Ví dụ:** "Docker là gì?", "SQL vs NoSQL - Khái niệm cơ bản"

### Level 2 - Hello World (Getting Started)
- **Mục tiêu:** Người đọc có thể cài đặt, chạy thử, làm được ví dụ đầu tiên
- **Nội dung:** Cài đặt, cấu hình ban đầu, ví dụ hello world, cấu trúc project cơ bản
- **Đối tượng:** Người muốn bắt tay vào thử
- **Frontmatter:** `level: 2`
- **Ví dụ:** "Bắt đầu với Docker - Container đầu tiên", "Viết query SQL đầu tiên"

### Level 3 - Phát Triển (Building Real Things)
- **Mục tiêu:** Người đọc xây dựng được thứ thực tế, vượt qua mức hello world
- **Nội dung:** Ví dụ thực tế, project patterns, tích hợp với hệ thống khác, workflows
- **Đối tượng:** Người đã biết cơ bản, muốn làm dự án thật
- **Frontmatter:** `level: 3`
- **Ví dụ:** "Docker Compose - Xây dựng ứng dụng multi-container", "Thiết kế schema database cho e-commerce"

### Level 4 - Chuyên Sâu (Best Practices & Patterns)
- **Mục tiêu:** Người đọc viết code/cấu hình chất lượng cao, tránh sai lầm phổ biến
- **Nội dung:** Best practices, anti-patterns, design patterns, performance tuning, security
- **Đối tượng:** Người có kinh nghiệm, muốn nâng cao chất lượng
- **Frontmatter:** `level: 4`
- **Ví dụ:** "Docker Best Practices - Tối ưu Dockerfile", "SQL Anti-Patterns và cách tránh"

### Level 5 - Vận Hành (Production & Operations)
- **Mục tiêu:** Người đọc hiểu cách vận hành ở production, xử lý sự cố, scale
- **Nội dung:** Monitoring, scaling, disaster recovery, debugging production issues, war stories
- **Đối tượng:** DevOps, tech lead, người chịu trách nhiệm hệ thống production
- **Frontmatter:** `level: 5`
- **Ví dụ:** "Docker ở Production - Orchestration và Monitoring", "PostgreSQL Operations - Vacuum, Replication, Backup"

## Quy Trình Viết Bài

### Bước 1: Nghiên Cứu (QUAN TRỌNG NHẤT)
1. **Xác định chủ đề và level** - Chủ đề gì? Level mấy?
2. **Tìm kiếm nguồn chính thống** - Official docs, RFC, IEEE, university courses, sách kinh điển
3. **Cross-check thông tin** - Không dựa vào 1 nguồn duy nhất, đối chiếu nhiều nguồn
4. **Ghi chú các sources** - Mỗi claim quan trọng cần có nguồn

### Bước 2: Lập Plan
1. **Outline bài viết** - Các heading chính, flow logic
2. **Ước lượng độ dài** - Nếu > 2000 từ → chia thành series nhiều bài
3. **Xác định components** - Cần Diagram ở đâu, ComparisonTable cho gì, Callout loại nào
4. **Review plan** - Đảm bảo flow hợp lý, không thiếu nội dung quan trọng

### Bước 3: Viết Bài
1. **Song ngữ** - Luôn viết cả VI và EN
2. **VI phải có dấu đầy đủ** - KHÔNG BAO GIỜ viết tiếng Việt không dấu
3. **Code examples thực tế** - Chạy được, không pseudo-code trừ khi giải thích thuật toán
4. **Diagrams có ý nghĩa** - Minh họa flow, architecture, quan hệ giữa components

### Bước 4: Kiểm Tra
1. Frontmatter đầy đủ (đặc biệt level, series nếu có)
2. Sources chính thống
3. Dấu tiếng Việt
4. Code examples chính xác
5. Slug-map cập nhật

## Series - Chia Bài Dài Thành Chuỗi

Khi nội dung quá dài cho 1 bài (> 2000 từ), chia thành series:

```yaml
# Bài 1 trong series
series: "docker"
seriesOrder: 1
seriesTitle: "Docker Từ Zero Đến Production"

# Bài 2 trong series
series: "docker"
seriesOrder: 2
seriesTitle: "Docker Từ Zero Đến Production"
```

**Quy tắc series:**
- Mỗi bài trong series tương ứng 1 level (nhưng không bắt buộc)
- `series` là slug dùng chung cho cả chuỗi
- `seriesOrder` xác định thứ tự
- `seriesTitle` là tên hiển thị của series
- Series có thể cross-category (ví dụ Docker series có bài ở devops và programming)

## Frontmatter Schema Đầy Đủ

```yaml
---
title: "Tiêu đề bài viết"           # Bắt buộc
description: "Mô tả ngắn"           # Bắt buộc
category: "ai"                       # Bắt buộc: ai, programming, web-development, hardware, database, networking, automation, devops
author: "Knowledge Hub"              # Mặc định
date: "2026-03-18"                   # Bắt buộc: YYYY-MM-DD
readingTime: 10                      # Phút đọc
tags: ["tag1", "tag2"]               # Tags tìm kiếm
featured: false                      # Hiện trên trang chủ
order: 1                             # Thứ tự trong category
level: 1                             # 1-5, xem hệ thống level ở trên
series: "docker"                     # Slug series (nếu thuộc series)
seriesOrder: 1                       # Thứ tự trong series
seriesTitle: "Docker Từ A Đến Z"     # Tên series hiển thị
sources:
  - title: "Nguồn tham khảo"
    url: "https://..."
---
```

## MDX Components Có Sẵn

```mdx
<Callout type="info|tip|warning|danger">Nội dung</Callout>

<ComparisonTable
  headers={["Tiêu chí", "A", "B"]}
  rows={[["hàng 1", "a1", "b1"]]}
/>

<Diagram chart="graph LR\n    A[Node] --> B[Node]" />

<Quote author="Tác giả" source="Nguồn">Trích dẫn</Quote>
```

## Danh Mục Hiện Tại

| Category | Slug | Mô tả |
|----------|------|-------|
| AI | `ai` | AI, ML, Claude Code, LLM, Prompt Engineering |
| Lập Trình | `programming` | Python, Git, Algorithms, Design Patterns, Memory, Concurrency |
| Web Development | `web-development` | HTML/CSS, JavaScript, React, Next.js |
| Phần Cứng | `hardware` | CPU, RAM, Transistor, GPU, Năng lượng |
| Database | `database` | SQL/NoSQL, Indexing, Transactions, Vector DB |
| Networking | `networking` | WebSocket, TCP/IP, Message Queue |
| Automation | `automation` | n8n, Airflow, Spark, MQTT, Event-Driven |
| DevOps | `devops` | Docker, K8s, CI/CD, Linux, VPS Deploy |

## Checklist Trước Khi Hoàn Thành

- [ ] Bài VI có dấu tiếng Việt đầy đủ
- [ ] Bài EN tương ứng đã viết
- [ ] Frontmatter đầy đủ (title, description, category, date, level, tags, sources)
- [ ] Sources là nguồn chính thống (official docs, RFC, IEEE, sách)
- [ ] Code examples chạy được
- [ ] Diagrams minh họa rõ ràng
- [ ] slug-map.ts đã cập nhật
- [ ] `npm run build` pass

## Ví Dụ: Plan Series "Docker Từ Zero Đến Production"

| Bài | Level | Slug VI | Nội dung |
|-----|:-----:|---------|----------|
| 1 | 1 | docker-la-gi | Container là gì, Docker vs VM, use cases |
| 2 | 2 | bat-dau-voi-docker | Cài đặt, docker run, images, containers |
| 3 | 3 | docker-compose-thuc-te | Multi-container apps, networks, volumes |
| 4 | 4 | docker-best-practices | Multi-stage builds, security, image optimization |
| 5 | 5 | docker-production | Orchestration, monitoring, logging, CI/CD |

## Nguyên Tắc Nội Dung

1. **Chính xác hơn toàn diện** - Thà thiếu còn hơn sai
2. **Practical hơn theoretical** - Luôn có code/config chạy được
3. **Cite sources** - Mỗi claim kỹ thuật quan trọng cần nguồn
4. **Đừng đoán** - Không chắc thì tìm kiếm, không tìm được thì nói rõ
5. **Cập nhật** - Công nghệ thay đổi nhanh, ghi rõ version/date
