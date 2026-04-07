# Raidexi

Raidexi là hệ thống full-stack hỗ trợ:

- đo thông số cơ thể từ camera bằng MediaPipe
- lưu lịch sử đo cho người dùng
- phân tích bảng size từ ảnh bằng Gemini
- ánh xạ size theo thương hiệu
- gợi ý size và mô tả độ fit bằng AI

Repo hiện được chia làm 2 phần chính:

- `FrontEnd/Raidexi`: ứng dụng web Next.js
- `Backend/Raidexi`: API ASP.NET Core

README này được viết lại dựa trên code đang có trong repo, ưu tiên phục vụ onboarding dev mới, chạy local, hiểu kiến trúc, nắm dependency thật sự đang được dùng, và nhận diện những điểm dễ lỗi khi cấu hình.

## 1. Mục tiêu dự án

Raidexi giải quyết bài toán chọn size quần áo dựa trên số đo cơ thể thay vì ước lượng cảm tính. Luồng chính của hệ thống:

1. Người dùng đăng ký hoặc đăng nhập.
2. Người dùng đo cơ thể bằng camera hoặc nhập luồng phân tích từ ảnh bảng size.
3. Hệ thống lưu dữ liệu đo và lịch sử phân tích.
4. Backend áp dụng rule size, mapping size và Gemini để sinh kết quả tư vấn.
5. Frontend hiển thị kết quả theo thương hiệu, dashboard cá nhân và dữ liệu đã lưu.

## 2. Kiến trúc tổng quan

### 2.1 Frontend

Frontend nằm tại `FrontEnd/Raidexi`, dùng:

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Axios
- Firebase Web SDK
- Framer Motion
- Zustand
- MediaPipe Pose

Vai trò chính:

- render landing page, login, signup, dashboard, brand pages
- kết nối camera và xử lý số đo phía client
- gọi backend để đăng nhập, lưu measurement, lấy brand profile
- gửi ảnh bảng size sang backend để Gemini trích xuất dữ liệu
- hiển thị kết quả phân tích, gợi ý size và lịch sử người dùng

### 2.2 Backend

Backend nằm tại `Backend/Raidexi`, dùng:

- ASP.NET Core trên .NET 10
- Entity Framework Core 10
- PostgreSQL
- MongoDB
- Firebase Admin SDK
- Google GenAI SDK
- MailKit
- Swagger / OpenAPI
- ASP.NET Rate Limiter

Vai trò chính:

- xác thực người dùng bằng email/password hoặc Firebase
- tạo JWT và lưu qua cookie
- quản lý user bằng PostgreSQL
- quản lý brand rule, universal size, mapping size, lịch sử đo và lịch sử phân tích bằng MongoDB
- gọi Gemini để:
  - trích xuất bảng size từ ảnh
  - sinh nhận xét fit và insight số đo
- cung cấp REST API cho frontend

## 3. Cấu trúc thư mục

```text
Raidexi/
|-- Backend/
|   |-- Dockerfile
|   `-- Raidexi/
|       |-- Application/
|       |-- Domain/
|       |-- Infrastructure/
|       |-- Migrations/
|       |-- Presentation/
|       |-- Properties/
|       |-- Program.cs
|       |-- appsettings.json
|       |-- appsettings.Development.json
|       `-- Raidexi.csproj
|-- FrontEnd/
|   |-- .env
|   `-- Raidexi/
|       |-- app/
|       |-- features/
|       |-- provider/
|       |-- Shared/
|       |-- public/
|       |-- next.config.ts
|       `-- package.json
|-- compose.yml
|-- License
`-- README.md
```

## 4. Các route và module chính

### 4.1 Frontend routes đang có

Trong `FrontEnd/Raidexi/app` hiện có các route:

- `/`
- `/AIAnalyzeImage`
- `/Architecture`
- `/Brand`
- `/Brand/result`
- `/Contact`
- `/Dashboard`
- `/Login`
- `/Measurements`
- `/PreviewMeasurement`
- `/SignUp`
- `/WorkFlow`

### 4.2 Frontend feature modules

Các feature chính trong `FrontEnd/Raidexi/features`:

- `Auth`: login, register, Google login bằng Firebase
- `Camera`: đo cơ thể từ camera, dựng viewport, tính số đo
- `Brand`: danh sách thương hiệu, bộ lọc, profile, tư vấn theo brand
- `AnalyzeFromPic`: hiển thị kết quả phân tích bảng size từ ảnh
- `DashboardUser`: dashboard hồ sơ và dữ liệu người dùng
- `Home`: landing page
- `Contact`: liên hệ
- `ArchitectureC`: thành phần giới thiệu kiến trúc
- `WorkFlow`: mô tả quy trình sản phẩm

### 4.3 Backend layers

Backend được tách theo layer:

- `Application`: DTO và interface service
- `Domain`: entity và domain contract
- `Infrastructure`: persistence, repository, security, AI, mail
- `Presentation`: controller HTTP

## 5. Công nghệ và dependency quan trọng

### 5.1 Frontend package đáng chú ý

Từ `FrontEnd/Raidexi/package.json`:

- `next`
- `react`, `react-dom`
- `firebase`
- `axios`
- `zustand`
- `framer-motion`
- `@mediapipe/pose`
- `@mediapipe/camera_utils`
- `jspdf`
- `@emailjs/browser`

### 5.2 Backend package đáng chú ý

Từ `Backend/Raidexi/Raidexi.csproj`:

- `Microsoft.EntityFrameworkCore`
- `Npgsql.EntityFrameworkCore.PostgreSQL`
- `MongoDB.Driver`
- `FirebaseAdmin`
- `Google.GenAI`
- `MailKit`
- `BCrypt.Net-Next`
- `DotNetEnv`
- `Swashbuckle.AspNetCore`

Lưu ý: trong `Backend/Raidexi/package.json` còn có dependency Node (`openai`, `chatgpt-api`), nhưng backend .NET hiện không dùng package.json đó để chạy ứng dụng chính.

## 6. Database và lưu trữ

### 6.1 PostgreSQL

Thông qua `AppDBContext`, PostgreSQL hiện giữ bảng:

- `Users`

Chức năng chính:

- lưu tài khoản người dùng
- phục vụ login/register/update user

### 6.2 MongoDB

Thông qua `MongoDbContext`, MongoDB đang dùng các collection:

- `UniversalSize`
- `BrandRUle`
- `CategoryRule`
- `SizeMapping`
- `BrandProfile`
- `MeasureDataUser`
- `DataBrandAnalysis`

Chức năng chính:

- định nghĩa size chuẩn
- mapping hệ size giữa các vùng
- rule theo category
- rule theo brand
- brand profile để hiển thị frontend
- lịch sử đo của user
- lịch sử kết quả phân tích theo thương hiệu

## 7. Xác thực và session

Hệ thống đang dùng JWT lưu qua cookie tên `access_token_client`.

Luồng hoạt động:

1. Người dùng login hoặc register.
2. Backend tạo JWT.
3. Backend set cookie `access_token_client`.
4. Những API tiếp theo đọc cookie để xác định user hiện tại.

Thiết lập cookie trong code hiện tại:

- `HttpOnly = true`
- `Secure = true`
- `SameSite = None`
- hạn dùng 7 ngày

Ý nghĩa thực tế:

- nếu chạy frontend/backend thuần HTTP ở local, cookie có thể không lưu hoặc không được browser gửi lại
- để login ổn định, cần đồng bộ CORS, domain, giao thức và `withCredentials`

## 8. AI và logic phân tích

### 8.1 Phân tích ảnh bảng size

API `POST /api/AnalysisDataMeasure/GetDataFromImage` nhận ảnh base64, sau đó backend gọi Gemini để trả về JSON cấu trúc bảng size.

Model hiện dùng:

- `gemini-3-flash-preview`

Output kỳ vọng:

- danh sách size
- range ngực, eo, mông, chiều cao, cân nặng
- các trường theo schema cố định để parse bằng `System.Text.Json`

### 8.2 Gợi ý size từ số đo cơ thể

API `POST /api/AnalysisDataMeasure/AISuggest`:

- đọc measurement từ user
- áp dụng `BrandRule`
- điều chỉnh nhẹ theo giới tính
- so khớp với `UniversalSize` + `CategoryRule`
- map sang hệ size mong muốn qua `SizeMapping`
- gọi Gemini để sinh:
  - `measurementInsight`
  - `productFitNote`
  - `expectedFit`

### 8.3 Gợi ý size từ ảnh bảng size + measurement

API `POST /api/AnalysisDataMeasure/AnalyseImage`:

- nhận bảng size đã được trích xuất từ ảnh
- nhận measurement người dùng
- chấm điểm fit theo từng dòng size
- chọn size tốt nhất
- tiếp tục gọi Gemini để sinh nhận xét AI

### 8.4 Rate limit

Endpoint `AISuggest` đang gắn policy `anon05`:

- tối đa 5 request / IP / 24 giờ

Nếu vượt ngưỡng, backend trả `429 Too Many Requests`.

## 9. API hiện có

### 9.1 User API

- `POST /api/User/Login`
- `POST /api/User/Register`
- `GET /api/User/GetUserData`
- `POST /api/User/Logout`
- `POST /api/User/LoginWithFirebase?token=...`
- `POST /api/User/SaveMeasure`
- `POST /api/User/SaveMeasureBrandSize`
- `GET /api/User/GetBrandSizeMeasure`
- `PUT /api/User/UpdateUser`

### 9.2 Mapping size API

- `GET /api/MappingSize/brand-profiles`
- `POST /api/MappingSize/AddBrandProfile`
- `POST /api/MappingSize/AddSizeMapping`
- `POST /api/MappingSize/AddUniversalSize`
- `POST /api/MappingSize/AddCategoryRule`
- `POST /api/MappingSize/AddBrandRule`

### 9.3 Analysis API

- `POST /api/AnalysisDataMeasure/AISuggest`
- `POST /api/AnalysisDataMeasure/GetDataFromImage`
- `POST /api/AnalysisDataMeasure/AnalyseImage`

### 9.4 Mail API

- `POST /api/Mail/send`

## 10. Biến môi trường và cấu hình

## 10.1 Frontend

Code frontend đang đọc các biến:

```env
NEXT_PUBLIC_RAIDEXI_API_BASE_URL=
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

Khuyến nghị đặt file tại:

- `FrontEnd/Raidexi/.env.local`

Ví dụ:

```env
NEXT_PUBLIC_RAIDEXI_API_BASE_URL=http://localhost:5000
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

Lưu ý rất quan trọng:

- repo hiện có file `FrontEnd/.env`, nhưng Next app thực tế nằm trong `FrontEnd/Raidexi`
- Dockerfile frontend đang dùng `NEXT_PUBLIC_API_URL`, nhưng code thật trong `Shared/Service/Api.ts` lại đọc `NEXT_PUBLIC_RAIDEXI_API_BASE_URL`
- nếu chỉ sửa `compose.yml` theo trạng thái hiện tại, frontend có thể vẫn fallback về `http://localhost:5000`

### 10.2 Backend

Backend load `.env` theo:

- `Backend/Raidexi/.env`

Các biến backend đang được code đọc:

```env
MongoUrl=
Databasename=
GEMINI_API_KEY=
MailAdmin=
MailAdminPassword=
CORS_ORIGINS=http://localhost:3000,https://localhost:3000
ENABLE_HTTPS_REDIRECTION=false

FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
FIREBASE_CLIENT_ID=
```

Giải thích:

- `MongoUrl`: connection string MongoDB
- `Databasename`: tên database MongoDB
- `GEMINI_API_KEY`: key Gemini
- `MailAdmin`: tài khoản SMTP
- `MailAdminPassword`: app password / mật khẩu SMTP
- `CORS_ORIGINS`: danh sách origin frontend, phân tách bởi dấu phẩy
- `ENABLE_HTTPS_REDIRECTION`: bật tắt `UseHttpsRedirection()`
- nhóm `FIREBASE_*`: service account tối thiểu để backend verify Firebase token

Ví dụ:

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

### 10.3 appsettings.json

Backend còn dùng:

- `ConnectionStrings:DefaultConnection`
- `Jwt:Key`

Khuyến nghị:

- không giữ secret production trong repo
- đưa connection string và JWT key về secret manager hoặc user secrets
- rotate toàn bộ secret thật nếu repo từng bị chia sẻ công khai

## 11. Yêu cầu môi trường

Để chạy local đầy đủ, cần có:

- Node.js 20 hoặc mới hơn
- npm
- .NET SDK 10
- PostgreSQL
- MongoDB
- tài khoản Firebase cấu hình Google Sign-In nếu muốn test login Google
- Gemini API key

Kiểm tra nhanh:

```powershell
node -v
npm -v
dotnet --version
```

## 12. Chạy local

### 12.1 Clone repo

```powershell
git clone <repo-url>
Set-Location K:\Project\Raidexi
```

### 12.2 Chạy backend

```powershell
Set-Location K:\Project\Raidexi\Backend\Raidexi
dotnet restore
dotnet run
```

Backend theo `launchSettings.json` chạy mặc định ở:

- `http://localhost:5000`
- `https://localhost:7133`

Swagger trong môi trường development:

- `http://localhost:5000/swagger`
- hoặc `https://localhost:7133/swagger`

Lưu ý:

- startup sẽ gọi `db.Database.Migrate()`
- PostgreSQL phải sẵn sàng trước khi app khởi động
- nếu thiếu `GEMINI_API_KEY` hoặc `FIREBASE_*`, backend có thể fail ngay khi start

### 12.3 Chạy frontend

```powershell
Set-Location K:\Project\Raidexi\FrontEnd\Raidexi
npm install
npm run dev
```

Frontend mặc định:

- `http://localhost:3000`

### 12.4 Cấu hình local được khuyến nghị

Để ít lỗi nhất khi chạy local:

- frontend: `NEXT_PUBLIC_RAIDEXI_API_BASE_URL=http://localhost:5000`
- backend: `CORS_ORIGINS=http://localhost:3000`
- backend: `ENABLE_HTTPS_REDIRECTION=false`

Nếu cần test cookie cross-site ổn định trên browser:

- cân nhắc chạy cả frontend và backend cùng HTTPS
- hoặc chỉnh lại chính sách cookie cho dev local

## 13. Chạy bằng Docker Compose

Repo có `compose.yml` tại root.

Chạy:

```powershell
Set-Location K:\Project\Raidexi
docker compose up --build
```

Compose hiện khai báo:

- backend publish cổng `5000`
- frontend publish cổng `3000`

Nhưng cần biết rõ:

- compose frontend đang truyền `NEXT_PUBLIC_API_URL`
- code frontend lại dùng `NEXT_PUBLIC_RAIDEXI_API_BASE_URL`
- nếu muốn Docker chạy đúng với code hiện tại, nên sửa compose và Dockerfile frontend để dùng cùng một tên biến môi trường

## 14. Luồng nghiệp vụ chính

### 14.1 Login / Register

1. Frontend gọi `POST /api/User/Login` hoặc `POST /api/User/Register`.
2. Backend kiểm tra user trong PostgreSQL.
3. Backend hash mật khẩu bằng BCrypt và tạo JWT.
4. JWT được lưu vào cookie `access_token_client`.
5. Frontend gọi `GET /api/User/GetUserData` để lấy hồ sơ và measurement.

### 14.2 Login bằng Google

1. Frontend mở popup Firebase Google Sign-In.
2. Frontend lấy Firebase ID token.
3. Frontend gọi `POST /api/User/LoginWithFirebase?token=...`.
4. Backend verify token qua Firebase Admin SDK.
5. Nếu user chưa có trong PostgreSQL thì tạo mới.
6. Backend tiếp tục phát JWT nội bộ qua cookie.

### 14.3 Đo cơ thể bằng camera

1. Frontend dùng MediaPipe Pose để lấy landmark.
2. Dữ liệu landmark được buffer nhiều frame.
3. Client tính ra:
   - shoulderWidth
   - chest
   - waist
   - hip
   - height
4. Frontend lưu measurement vào local state/localStorage.
5. Người dùng có thể gửi measurement lên backend qua `SaveMeasure`.

### 14.4 Phân tích bảng size từ ảnh

1. Người dùng upload ảnh hoặc chụp từ camera.
2. Frontend convert ảnh sang base64.
3. Gọi `POST /api/AnalysisDataMeasure/GetDataFromImage`.
4. Backend dùng Gemini để trích xuất bảng size dạng JSON.
5. Frontend hiển thị bảng size và cho user tiếp tục bước ước lượng size.

### 14.5 Gợi ý size theo thương hiệu

1. Người dùng chọn brand, giới tính, loại sản phẩm, hệ size đầu ra.
2. Frontend gửi measurement + custom data sang `AISuggest`.
3. Backend áp dụng:
   - `BrandRule`
   - `CategoryRule`
   - `UniversalSize`
   - `SizeMapping`
4. Backend gọi Gemini để sinh mô tả fit.
5. Frontend hiển thị kết quả tại `/Brand/result`.

## 15. Những file nên đọc đầu tiên

Nếu mới vào dự án, nên đọc theo thứ tự:

1. `FrontEnd/Raidexi/package.json`
2. `FrontEnd/Raidexi/app/layout.tsx`
3. `FrontEnd/Raidexi/Shared/Service/Api.ts`
4. `FrontEnd/Raidexi/provider/AuthProvider.tsx`
5. `FrontEnd/Raidexi/provider/BrandProvider.tsx`
6. `FrontEnd/Raidexi/features/Camera/hooks/HandleMeasureEstimate.tsx`
7. `Backend/Raidexi/Program.cs`
8. `Backend/Raidexi/Presentation/Controller/UserController.cs`
9. `Backend/Raidexi/Presentation/Controller/AnalysisDataMeasureController.cs`
10. `Backend/Raidexi/Infrastructure/Services/AuthService.cs`
11. `Backend/Raidexi/Infrastructure/Services/AnalyisService.cs`
12. `Backend/Raidexi/Infrastructure/Services/GeminiService.cs`

## 16. Các điểm cần lưu ý khi làm việc với code hiện tại

Đây là các điểm quan trọng mình xác nhận từ code hiện có:

- frontend đọc API base URL từ `NEXT_PUBLIC_RAIDEXI_API_BASE_URL`
- Dockerfile và `compose.yml` frontend lại đang dùng `NEXT_PUBLIC_API_URL`
- backend load `.env` ở `Backend/Raidexi/.env`
- cookie auth đang `Secure=true` + `SameSite=None`
- backend chỉ gọi `UseAuthorization()`, chưa cấu hình middleware xác thực JWT theo kiểu `AddAuthentication()`
- backend dựa vào việc tự đọc cookie trong service thay vì dùng `[Authorize]`
- startup backend tự chạy EF migration
- endpoint `AISuggest` bị rate limit 5 lần/ngày/IP
- Firebase Admin đang được tạo từ các biến `FIREBASE_*`, không còn dùng `FIREBASE_CREDENTIALS_JSON`
- frontend đang có default Firebase config hard-code trong `firebaseService.ts`
- mail service đang dùng Gmail SMTP `smtp.gmail.com:587`
- repo hiện có dấu hiệu chứa cấu hình thật trong một số file môi trường/cấu hình; nên rà soát và rotate secret

## 17. Hạn chế và rủi ro hiện tại

Đây không phải lỗi README mà là các rủi ro kỹ thuật nên biết khi onboard:

- chưa có test tự động trong repo
- chưa có seed script rõ ràng cho MongoDB
- chưa có `.env.example` chuẩn cho frontend và backend
- Docker env naming chưa đồng bộ với code
- auth flow phụ thuộc mạnh vào cookie cross-site, dễ lỗi khi local sai giao thức
- backend parse output AI khá chặt, nên prompt hoặc schema thay đổi dễ phát sinh lỗi runtime
- trong repo có nhiều file build/cache (`bin`, `obj`, `.next`, `node_modules`) làm cây thư mục rất lớn và dễ nhiễu khi tìm source

## 18. Khuyến nghị cải thiện tiếp theo

Nếu tiếp tục phát triển dự án, nên ưu tiên:

1. thêm `.env.example` cho cả frontend và backend
2. thống nhất tên biến môi trường API base URL giữa code, Dockerfile và compose
3. loại bỏ secret thật khỏi repo và rotate toàn bộ credential
4. bổ sung script seed MongoDB cho:
   - `UniversalSize`
   - `BrandRule`
   - `CategoryRule`
   - `SizeMapping`
   - `BrandProfile`
5. thêm test cho auth service, analysis service và API chính
6. làm rõ chiến lược auth local/dev/prod
7. dọn file build artefact khỏi version control nếu không cần

## 19. Bản quyền

Dự án đi kèm file `License` ở thư mục gốc.
