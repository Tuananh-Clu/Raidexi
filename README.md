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

- [✨ Tính năng nổi bật](#-tính-năng-nổi-bật)
- [🛠 Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [🏗 Kiến trúc hệ thống](#-kiến-trúc-hệ-thống)
- [🚀 Hướng dẫn cài đặt & Chạy Local](#-hướng-dẫn-cài-đặt--chạy-local)
- [🐳 Chạy bằng Docker](#-chạy-bằng-docker)
- [⚙️ Cấu hình biến môi trường](#️-cấu-hình-biến-môi-trường)
- [💡 Luồng nghiệp vụ chính](#-luồng-nghiệp-vụ-chính)
- [📂 Cấu trúc thư mục](#-cấu-trúc-thư-mục)
- [📝 Bản quyền](#-bản-quyền)

---

## ✨ Tính năng nổi bật

- 📷 **Đo thông số cơ thể từ Camera**: Tự động nhận diện và trích xuất các số đo cơ thể (ngực, eo, mông, chiều cao, vai...) ngay trên trình duyệt bằng MediaPipe.
- 🖼️ **Phân tích bảng size từ Ảnh**: Dễ dàng trích xuất dữ liệu từ hình ảnh bảng size quần áo thông qua sức mạnh của Google Gemini AI.
- 🤖 **Tư vấn size bằng AI**: Gợi ý size quần áo phù hợp dựa trên sự kết hợp giữa số đo người dùng, dữ liệu thương hiệu và phân tích chuyên sâu về độ fit từ AI.
- 📊 **Quản lý lịch sử và Hồ sơ cá nhân**: Lưu trữ lịch sử đo lường, theo dõi sự thay đổi của chỉ số cơ thể.
- 🔐 **Xác thực linh hoạt**: Hỗ trợ đăng nhập truyền thống (Email/Password) và đăng nhập nhanh qua Google (Firebase Authentication).

## 🛠 Công nghệ sử dụng

### 🎨 Frontend (Next.js App Router)
- **Framework**: Next.js 16, React 19
- **Ngôn ngữ**: TypeScript
- **Styling & Animation**: Tailwind CSS 4, Framer Motion
- **State Management**: Zustand
- **Computer Vision**: `@mediapipe/pose`, `@mediapipe/camera_utils`
- **Khác**: Firebase Web SDK, Axios, jsPDF

### ⚙️ Backend (ASP.NET Core)
- **Framework**: ASP.NET Core (.NET 10)
- **Ngôn ngữ**: C#
- **ORM**: Entity Framework Core 10
- **Database**:
  - **PostgreSQL**: Quản lý thông tin User & Authentication.
  - **MongoDB**: Quản lý Rule thương hiệu, Mapping size, và Lịch sử đo của người dùng.
- **AI Integration**: Google GenAI SDK (Sử dụng model `gemini-3-flash-preview`)
- **Khác**: Firebase Admin SDK, MailKit, JWT Authentication, ASP.NET Rate Limiter

---

## 🏗 Kiến trúc hệ thống

Hệ thống được chia làm hai phần chính hoạt động độc lập và giao tiếp với nhau qua REST API:

1. **Frontend (`FrontEnd/Raidexi`)**: Đảm nhận render giao diện UI/UX. Truy cập luồng camera, tính toán số đo trực tiếp tại client (giảm tải cho server). Gọi backend API để lưu trữ, xác thực và lấy dữ liệu phân tích.
2. **Backend (`Backend/Raidexi`)**: Cung cấp API mạnh mẽ, thiết kế theo chuẩn **Clean Architecture** gồm các layer: Application, Domain, Infrastructure, Presentation. Đảm nhận logic nghiệp vụ phức tạp, phân quyền JWT, tương tác với Google Gemini và quản lý CSDL kép (PostgreSQL + MongoDB).

---

## 🚀 Hướng dẫn cài đặt & Chạy Local

### 📌 Yêu cầu môi trường
- [Node.js](https://nodejs.org/) (Phiên bản v20 trở lên)
- [.NET 10 SDK](https://dotnet.microsoft.com/)
- [PostgreSQL](https://www.postgresql.org/) & [MongoDB](https://www.mongodb.com/) đang hoạt động
- Tài khoản Firebase (Đã bật tính năng Google Sign-In)
- Google Gemini API Key

### 1. Clone Repository
```bash
git clone https://github.com/your-username/raidexi.git
cd raidexi
```

### 2. Thiết lập Backend
```bash
cd Backend/Raidexi
dotnet restore
dotnet run
```
*Backend sẽ chạy mặc định tại `http://localhost:5000` và `https://localhost:7133`.*
*Bạn có thể xem toàn bộ API Docs thông qua Swagger tại: `http://localhost:5000/swagger`.*

> **Lưu ý**: PostgreSQL cần được khởi chạy và cấu hình kết nối chuẩn xác. Entity Framework sẽ tự động chạy migration khi ứng dụng khởi động.

### 3. Thiết lập Frontend
```bash
cd ../../FrontEnd/Raidexi
npm install
npm run dev
```
*Frontend sẽ chạy tại `http://localhost:3000`.*

---

## 🐳 Chạy bằng Docker

Dự án đã tích hợp sẵn Docker Compose để bạn có thể khởi chạy nhanh toàn bộ môi trường và dịch vụ chỉ với một lệnh.

```bash
docker compose up --build
```
- **Backend API**: Truy cập tại `http://localhost:5000`
- **Frontend App**: Truy cập tại `http://localhost:3000`

*(Hãy đảm bảo bạn đã cung cấp đầy đủ các biến môi trường trong file `compose.yml` trước khi build).*

---

## ⚙️ Cấu hình biến môi trường

Hệ thống yêu cầu các biến môi trường để kết nối database và các dịch vụ bên ngoài.

<details>
<summary><b>🛠 Frontend <code>.env.local</code> (Tạo tại <code>FrontEnd/Raidexi/.env.local</code>)</b></summary>

```env
NEXT_PUBLIC_RAIDEXI_API_BASE_URL=http://localhost:5000
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```
</details>

<details>
<summary><b>🛠 Backend <code>.env</code> (Tạo tại <code>Backend/Raidexi/.env</code>)</b></summary>

```env
MongoUrl=mongodb://localhost:27017
Databasename=raidexi
GEMINI_API_KEY=your_gemini_api_key
MailAdmin=your_mail@gmail.com
MailAdminPassword=your_mail_app_password
CORS_ORIGINS=http://localhost:3000,https://localhost:3000
ENABLE_HTTPS_REDIRECTION=false

FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your_project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your_client_id
```
</details>

> **Bảo mật**: Các chuỗi kết nối (`ConnectionStrings`) và `Jwt:Key` hiện được cấu hình trong `appsettings.json`. Đối với môi trường Production, vui lòng sử dụng Secret Manager hoặc các cơ chế quản lý biến môi trường bảo mật hơn.

---

## 💡 Luồng nghiệp vụ chính

<details>
<summary><b>1. Đo cơ thể bằng Camera</b></summary>

- 🖥️ Client kích hoạt **MediaPipe Pose** nhận diện các điểm mốc (landmarks) trên cơ thể.
- ⏱️ Qua xử lý buffer của nhiều frame ảnh liên tiếp, thuật toán tính toán ra số đo chuẩn xác: Vai, Ngực, Eo, Mông, Chiều cao.
- 💾 Dữ liệu được lưu trữ trên giao diện và sẵn sàng gửi lên Backend để cập nhật vào hồ sơ người dùng.
</details>

<details>
<summary><b>2. Phân tích bảng size (Hình ảnh -> JSON)</b></summary>

- 📤 Người dùng tải lên ảnh chứa bảng size của một thương hiệu bất kỳ.
- 🔄 Frontend chuyển đổi ảnh thành định dạng Base64 và gửi yêu cầu API.
- 🧠 Backend sử dụng **Gemini AI** để trích xuất toàn bộ thông tin trong bảng size, tự động chuẩn hóa và trả về định dạng JSON cấu trúc sẵn cho UI hiển thị.
</details>

<details>
<summary><b>3. AI Tư vấn Size & Gợi ý độ Fit</b></summary>

- ⚙️ Khi có yêu cầu tư vấn, Backend kết hợp các nguồn dữ liệu: Số đo cá nhân + Bảng size thương hiệu + Các bộ quy tắc quy đổi size.
- 💬 Dữ liệu được gửi qua Gemini AI để phân tích sự phù hợp.
- ✅ Kết quả trả về gồm: Size gợi ý chuẩn nhất kèm theo lời khuyên chi tiết về cảm giác mặc (ví dụ: "Size M sẽ hơi chật eo nhưng vừa vặn phần ngực").
</details>

---

## 📂 Cấu trúc thư mục

```text
Raidexi/
├── Backend/
│   ├── Dockerfile
│   └── Raidexi/
│       ├── Application/    # Data Transfer Objects, Interface Services
│       ├── Domain/         # Entities, Các quy tắc nghiệp vụ Core
│       ├── Infrastructure/ # Database Contexts (EF, Mongo), Firebase, AI Services
│       ├── Presentation/   # REST API Controllers
│       ├── Program.cs      # Entry point
│       └── appsettings.json
├── FrontEnd/
│   ├── .env
│   └── Raidexi/
│       ├── app/            # Next.js 16 App Router (Pages, Layouts)
│       ├── features/       # Phân tách logic theo chức năng: Auth, Camera, Brand...
│       ├── provider/       # React Context Providers
│       ├── Shared/         # Core API Service, Utilities dùng chung
│       └── next.config.ts
├── compose.yml             # Cấu hình Docker Compose
├── License                 # Giấy phép phần mềm
└── README.md               # Tài liệu dự án
```

---

## 📝 Bản quyền

Dự án được phân phối dưới giấy phép đi kèm. Vui lòng xem file `License` ở thư mục gốc để biết thêm chi tiết.

<div align="center">
  <br />
  <i>Được phát triển với ❤️ bởi đội ngũ Raidexi.</i>
</div>
