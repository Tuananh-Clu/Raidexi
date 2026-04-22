<div align="center">
  <h1>✨ Raidexi</h1>
  <p><b>Hệ thống tư vấn chọn size quần áo thông minh ứng dụng AI & Computer Vision</b></p>

  <p>
    <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/.NET-10.0-512BD4?style=for-the-badge&logo=dotnet" alt=".NET" />
    <img src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/Gemini_AI-8E75B2?style=for-the-badge&logo=google&logoColor=white" alt="Gemini AI" />
  </p>
</div>

<br />

**Raidexi** giải quyết bài toán chọn size quần áo dựa trên số đo cơ thể thực tế thay vì ước lượng cảm tính. Bằng cách kết hợp **MediaPipe Pose** để đo kích thước từ camera và **Google Gemini AI** để trích xuất dữ liệu bảng size từ hình ảnh, Raidexi mang đến giải pháp tư vấn size chính xác, tiện lợi và được cá nhân hóa cho từng người dùng.

## 📋 Mục lục
- [1. Tính năng nổi bật](#1-tính-năng-nổi-bật)
- [2. Kiến trúc tổng quan](#2-kiến-trúc-tổng-quan)
- [3. Cấu trúc thư mục](#3-cấu-trúc-thư-mục)
- [4. Database và Lưu trữ](#4-database-và-lưu-trữ)
- [5. Danh sách API chi tiết](#5-danh-sách-api-chi-tiết)
- [6. Luồng nghiệp vụ (Workflows)](#6-luồng-nghiệp-vụ-workflows)
- [7. Hướng dẫn cài đặt & Chạy Local](#7-hướng-dẫn-cài-đặt--chạy-local)
- [8. Chạy bằng Docker Compose](#8-chạy-bằng-docker-compose)
- [9. Cấu hình biến môi trường](#9-cấu-hình-biến-môi-trường)
- [10. Các điểm cần lưu ý](#10-các-điểm-cần-lưu-ý)

---

## 1. Tính năng nổi bật

- 📷 **Đo thông số cơ thể từ Camera**: Tự động nhận diện và trích xuất các số đo cơ thể (ngực, eo, mông, chiều cao, vai...) ngay trên trình duyệt bằng MediaPipe.
- 🖼️ **Phân tích bảng size từ Ảnh**: Trích xuất dữ liệu từ hình ảnh bảng size quần áo thông qua Google Gemini AI.
- 🤖 **Tư vấn size bằng AI**: Gợi ý size quần áo phù hợp dựa trên số đo người dùng, dữ liệu thương hiệu và phân tích độ fit từ AI.
- 📊 **Quản lý lịch sử và Hồ sơ cá nhân**: Lưu trữ lịch sử đo lường, theo dõi thay đổi chỉ số cơ thể.
- 🔐 **Xác thực linh hoạt**: Hỗ trợ đăng nhập truyền thống (Email/Password) và đăng nhập nhanh qua Google (Firebase Authentication).

---

## 2. Kiến trúc tổng quan

Hệ thống được chia làm hai phần chính hoạt động độc lập và giao tiếp qua REST API.

### 2.1 Frontend (`FrontEnd/Raidexi`)
Sử dụng **Next.js 16 App Router** và **React 19** với ngôn ngữ **TypeScript**. Các package chính:
- `next`, `react`, `react-dom`
- `tailwindcss` (Tailwind CSS 4), `framer-motion` (UI/Animation)
- `zustand` (State Management)
- `@mediapipe/pose`, `@mediapipe/camera_utils` (Xử lý Camera & Computer Vision)
- `firebase` (Xác thực Google)
- `axios` (Gọi API), `jspdf` (Xuất PDF)

**Vai trò chính:** Render giao diện, xử lý luồng camera đo cơ thể trực tiếp tại client, gọi backend để lưu trữ dữ liệu và lấy kết quả phân tích AI.

### 2.2 Backend (`Backend/Raidexi`)
Sử dụng **ASP.NET Core (.NET 10)**, xây dựng theo mô hình **Clean Architecture** (Presentation, Application, Domain, Infrastructure). Các package chính:
- `Microsoft.EntityFrameworkCore`, `Npgsql.EntityFrameworkCore.PostgreSQL`
- `MongoDB.Driver`
- `FirebaseAdmin` (Xác thực JWT từ Frontend)
- `Google.GenAI` (Tích hợp Gemini AI)
- `MailKit` (Gửi email)
- `BCrypt.Net-Next` (Hash mật khẩu)

**Vai trò chính:** Cung cấp REST API, xử lý nghiệp vụ phức tạp, phân quyền bằng JWT, tương tác với Google Gemini và quản lý database PostgreSQL + MongoDB.

---

## 3. Cấu trúc thư mục

### 3.1 Cấu trúc dự án tổng quát
```text
Raidexi/
├── Backend/
│   ├── Dockerfile
│   └── Raidexi/
│       ├── Application/    # Định nghĩa DTOs và Interface Services
│       ├── Domain/         # Entities cốt lõi, Domain Contract
│       ├── Infrastructure/ # DB Context, Persistence, External APIs (AI, Mail, Firebase)
│       ├── Migrations/     # Các file EF Core Migrations
│       ├── Presentation/   # Controller HTTP xử lý Request
│       ├── Program.cs      # Entry point (DI, Middleware)
│       └── appsettings.json
├── FrontEnd/
│   ├── .env
│   └── Raidexi/
│       ├── app/            # Cấu trúc Routing Next.js (pages, layouts)
│       ├── features/       # Modules theo tính năng (Auth, Camera, Brand, AnalyzeFromPic, Dashboard)
│       ├── provider/       # Context Providers (Auth, Brand)
│       ├── Shared/         # Core API Services, Utility functions
│       ├── public/         # Tài nguyên tĩnh
│       ├── package.json
│       └── next.config.ts
├── compose.yml             # File cấu hình Docker Compose
├── License                 # Giấy phép
└── README.md
```

---

## 4. Database và Lưu trữ

Dự án sử dụng kiến trúc đa cơ sở dữ liệu để tối ưu hóa việc lưu trữ:

### 4.1 PostgreSQL
Quản lý thông tin cốt lõi (User, Authentication) thông qua `AppDBContext`.
- **Bảng `Users`**: Lưu tài khoản, email, mật khẩu (đã hash), phục vụ quá trình Login/Register.

### 4.2 MongoDB
Quản lý dữ liệu linh hoạt (NoSQL) liên quan đến hệ thống đo lường và thương hiệu thông qua `MongoDbContext`. Các collection bao gồm:
- **`UniversalSize`**: Định nghĩa size chuẩn.
- **`BrandRule`**: Quy tắc phân loại và tính toán theo từng thương hiệu.
- **`CategoryRule`**: Quy tắc theo loại sản phẩm.
- **`SizeMapping`**: Ánh xạ hệ size (Ví dụ: EU sang US).
- **`BrandProfile`**: Hồ sơ hiển thị của thương hiệu trên Frontend.
- **`MeasureDataUser`**: Lịch sử đo cơ thể của người dùng.
- **`DataBrandAnalysis`**: Lịch sử kết quả AI phân tích theo thương hiệu.

---

## 5. Danh sách API chi tiết

Các API sử dụng JWT Token lưu qua Cookie `access_token_client`.

### 5.1 User & Auth API
- `POST /api/User/Login`: Đăng nhập cơ bản.
- `POST /api/User/Register`: Đăng ký tài khoản.
- `POST /api/User/LoginWithFirebase?token=...`: Đăng nhập qua Firebase Google Token.
- `GET /api/User/GetUserData`: Lấy thông tin người dùng.
- `POST /api/User/Logout`: Đăng xuất (xóa Cookie).
- `POST /api/User/SaveMeasure`: Lưu thông số đo lường của User.
- `POST /api/User/SaveMeasureBrandSize`: Lưu lịch sử chọn size brand.
- `GET /api/User/GetBrandSizeMeasure`: Xem lịch sử chọn size brand.
- `PUT /api/User/UpdateUser`: Cập nhật thông tin User.

### 5.2 Analysis & AI API
- `POST /api/AnalysisDataMeasure/GetDataFromImage`: Nhận ảnh Base64, gọi Gemini trả về JSON cấu trúc bảng size.
- `POST /api/AnalysisDataMeasure/AISuggest`: Nhận measurement và Brand, áp dụng logic tính toán và gọi Gemini trả về độ Fit (Rate limit 5 requests/IP/24h).
- `POST /api/AnalysisDataMeasure/AnalyseImage`: Gợi ý size trực tiếp từ ảnh bảng size + measurement người dùng.

### 5.3 Mapping Size API (MongoDB)
- `GET /api/MappingSize/brand-profiles`: Lấy danh sách Brand Profile.
- `POST /api/MappingSize/AddBrandProfile`: Thêm Brand mới.
- `POST /api/MappingSize/AddSizeMapping`: Thêm quy tắc Size Mapping.
- `POST /api/MappingSize/AddUniversalSize`: Thêm Universal Size.
- `POST /api/MappingSize/AddCategoryRule`: Thêm Category Rule.
- `POST /api/MappingSize/AddBrandRule`: Thêm Brand Rule.

### 5.4 Mail API
- `POST /api/Mail/send`: Endpoint gửi thư hệ thống.

---

## 6. Luồng nghiệp vụ (Workflows)

### 6.1 Luồng Xác thực (Login với Firebase)
Sử dụng Firebase để xác thực ở Client và Admin SDK để cấp JWT ở Backend.

```mermaid
sequenceDiagram
    participant U as User (Browser)
    participant F as Frontend
    participant B as Backend (PostgreSQL)
    participant FB as Firebase

    U->>F: Bấm "Đăng nhập với Google"
    F->>FB: Yêu cầu popup Google Auth
    FB-->>F: Trả về Firebase ID Token
    F->>B: POST /api/User/LoginWithFirebase (kèm ID Token)
    B->>FB: Verify Token bằng Firebase Admin SDK
    FB-->>B: Xác nhận Token hợp lệ
    B->>B: Tìm hoặc tạo User trong PostgreSQL
    B->>B: Sinh JWT nội bộ
    B-->>F: Trả về Set-Cookie: access_token_client (HttpOnly, Secure)
    F->>B: GET /api/User/GetUserData (Kèm Cookie JWT)
    B-->>F: Trả về Profile User
    F-->>U: Chuyển hướng tới trang Dashboard
```

### 6.2 Luồng Trích xuất Bảng Size bằng AI
Tận dụng khả năng đọc hiểu tài liệu của Gemini-3-flash-preview.

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant AI as Gemini AI

    U->>F: Upload ảnh bảng size (Size chart)
    F->>F: Chuyển đổi file ảnh sang chuỗi Base64
    F->>B: POST /api/AnalysisDataMeasure/GetDataFromImage
    B->>AI: Gửi Base64 image + System Prompt trích xuất JSON
    AI-->>B: Trả về dữ liệu dạng JSON thô
    B->>B: Parse JSON và Validate Schema
    B-->>F: Trả về Response chứa các cột size chuẩn hóa
    F-->>U: Render bảng dữ liệu trên UI
```

### 6.3 Luồng AI Tư vấn Size
Kết hợp logic tính toán truyền thống (MongoDB Rules) và AI (Gemini).

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend (MongoDB)
    participant AI as Gemini AI

    U->>F: Chọn Brand, Item, Nhập số đo cơ thể
    F->>B: POST /api/AnalysisDataMeasure/AISuggest
    B->>B: Truy vấn BrandRule, CategoryRule, SizeMapping
    B->>B: Áp dụng thuật toán chọn ra Size sơ bộ tốt nhất
    B->>AI: Gửi Context (Số đo User + Size chuẩn) yêu cầu đánh giá
    AI-->>B: Sinh Measurement Insight & Fit Note (Rộng/chật ở đâu)
    B-->>F: Trả về Size phù hợp nhất + Đánh giá chi tiết của AI
    F-->>U: Hiển thị trên màn hình kết quả tư vấn
```

---

## 7. Hướng dẫn cài đặt & Chạy Local

### Yêu cầu tiên quyết
- Node.js (v20 trở lên) & npm
- .NET 10 SDK
- PostgreSQL & MongoDB
- Tài khoản Firebase (để test Google Login)
- Gemini API Key

### Khởi chạy Backend
```bash
# Clone repo
git clone <repo-url>
cd Raidexi/Backend/Raidexi

# Restore packages & chạy dự án
dotnet restore
dotnet run
```
API sẽ chạy ở `http://localhost:5000` và `https://localhost:7133`.
Truy cập Swagger tại `http://localhost:5000/swagger`.
*(Lưu ý: EF Core sẽ tự động chạy Migration khi ứng dụng khởi động. Bạn phải chắc chắn PostgreSQL đã sẵn sàng).*

### Khởi chạy Frontend
```bash
cd ../../FrontEnd/Raidexi
npm install
npm run dev
```
Giao diện Web sẽ khởi chạy tại `http://localhost:3000`.

---

## 8. Chạy bằng Docker Compose

Repo đã cấu hình sẵn `compose.yml`. Bạn chỉ cần:
```bash
cd Raidexi
docker compose up --build
```
Hệ thống sẽ build và chạy:
- Backend: Cổng `5000`
- Frontend: Cổng `3000`

---

## 9. Cấu hình biến môi trường

Đây là các cấu hình chi tiết (không ẩn) mà ứng dụng cần.

### 9.1 Frontend: `FrontEnd/Raidexi/.env.local`
Tạo file `.env.local` trong thư mục `FrontEnd/Raidexi/` chứa các key sau:
```env
# Địa chỉ Backend API
NEXT_PUBLIC_RAIDEXI_API_BASE_URL=http://localhost:5000

# Cấu hình Firebase Web SDK
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```
*(Lưu ý: Dockerfile FE đang dùng `NEXT_PUBLIC_API_URL` nhưng code thật lại dùng `NEXT_PUBLIC_RAIDEXI_API_BASE_URL`)*.

### 9.2 Backend: `Backend/Raidexi/.env`
Tạo file `.env` trong `Backend/Raidexi/`:
```env
# MongoDB config
MongoUrl=mongodb://localhost:27017
Databasename=raidexi

# AI Service
GEMINI_API_KEY=your_gemini_api_key

# Mail Service (SMTP)
MailAdmin=your_mail@gmail.com
MailAdminPassword=your_mail_app_password

# Cors / Security
CORS_ORIGINS=http://localhost:3000,https://localhost:3000
ENABLE_HTTPS_REDIRECTION=false

# Cấu hình Firebase Admin SDK
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your_project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your_client_id
```

### 9.3 Backend `appsettings.json`
Ngoài `.env`, các thông tin quan trọng khác nằm trong `Backend/Raidexi/appsettings.json`:
- `ConnectionStrings:DefaultConnection` (Chuỗi kết nối PostgreSQL).
- `Jwt:Key` (Khóa ký JWT nội bộ).

---

## 10. Các điểm cần lưu ý

1. **Vấn đề Cookie Auth (Cross-site):** Cookie JWT được set `Secure = true` và `SameSite = None`. Nếu chạy Local ở giao thức HTTP (thay vì HTTPS), trình duyệt có thể chặn không lưu Cookie. Khuyến nghị chạy Local qua HTTPS hoặc tắt cờ Secure trong môi trường Development.
2. **Rate Limit ở Endpoint AI:** Endpoint `/api/AnalysisDataMeasure/AISuggest` được cài policy `anon05` (Giới hạn tối đa 5 requests / IP / 24 giờ). Vượt quá sẽ trả lỗi 429.
3. **Quản lý dữ liệu NoSQL (MongoDB):** Hiện tại hệ thống chưa có Script Seed sẵn cho các bảng Collection của MongoDB (UniversalSize, BrandRule, SizeMapping...). Nếu mới setup, bạn cần dùng API POST liên quan (mục 5.3) để khởi tạo các rule hệ thống trước khi Test tính năng Gợi ý Size.

---
<div align="center">
  <i>Được phát triển với ❤️ bởi đội ngũ Raidexi.</i>
</div>
