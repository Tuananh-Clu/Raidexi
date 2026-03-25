# Raidexi

<div align="center">

![Raidexi Logo](./FrontEnd/Raidexi/public/logo.png)

**Nền tảng đo số đo cơ thể bằng AI và gợi ý kích cỡ theo thương hiệu**

Monorepo gồm frontend Next.js và backend ASP.NET Core phục vụ bài toán đo cơ thể, phân tích bảng size và đề xuất size theo brand.

</div>

## Mục lục

- [1. Giới thiệu](#1-giới-thiệu)
- [2. Bài toán và mục tiêu](#2-bài-toán-và-mục-tiêu)
- [3. Phạm vi tính năng](#3-phạm-vi-tính-năng)
- [4. Kiến trúc hệ thống](#4-kiến-trúc-hệ-thống)
- [5. Công nghệ sử dụng](#5-công-nghệ-sử-dụng)
- [6. Cấu trúc thư mục](#6-cấu-trúc-thư-mục)
- [7. Luồng nghiệp vụ chi tiết](#7-luồng-nghiệp-vụ-chi-tiết)
- [8. API chính](#8-api-chính)
- [9. Dữ liệu và lưu trữ](#9-dữ-liệu-và-lưu-trữ)
- [10. Cài đặt và chạy local](#10-cài-đặt-và-chạy-local)
- [11. Biến môi trường và cấu hình](#11-biến-môi-trường-và-cấu-hình)
- [12. Kiểm tra sau khi setup](#12-kiểm-tra-sau-khi-setup)
- [13. Lưu ý hiện trạng dự án](#13-lưu-ý-hiện-trạng-dự-án)
- [14. Troubleshooting](#14-troubleshooting)
- [15. Hướng phát triển tiếp theo](#15-hướng-phát-triển-tiếp-theo)
- [16. Đóng góp](#16-đóng-góp)
- [17. License](#17-license)

## 1. Giới thiệu

Raidexi là dự án hỗ trợ người dùng lấy số đo cơ thể và chuyển đổi số đo đó thành đề xuất kích cỡ quần áo theo thương hiệu. Hệ thống kết hợp:

- Computer Vision với MediaPipe Pose để lấy landmark cơ thể từ webcam.
- Logic tính số đo và đối sánh size ở frontend/backend.
- AI Gemini để sinh nhận xét fit và trích xuất bảng size từ ảnh.
- Backend ASP.NET Core để xác thực người dùng, lưu dữ liệu đo và phục vụ API.

Repository này được tổ chức theo dạng monorepo:

- `FrontEnd/Raidexi`: giao diện người dùng, trải nghiệm đo và trang phân tích.
- `Backend/Raidexi`: Web API xử lý nghiệp vụ, xác thực, phân tích size, mail, cache và truy cập dữ liệu.

## 2. Bài toán và mục tiêu

### Bài toán

Khi mua quần áo online, người dùng thường gặp các vấn đề:

- Không biết chính xác số đo cơ thể của mình.
- Mỗi thương hiệu có bảng size khác nhau.
- Size `M` của brand này không đồng nghĩa với size `M` của brand khác.
- Việc đọc bảng size thủ công gây mất thời gian và dễ sai lệch.

### Mục tiêu của dự án

Raidexi hướng tới việc:

- Tự động hóa quá trình lấy số đo cơ thể từ webcam hoặc ảnh.
- Chuẩn hóa việc suy luận size theo giới tính, loại sản phẩm và brand.
- Trả về kết quả dễ hiểu gồm size đề xuất, mức độ phù hợp và nhận xét khi mặc.
- Lưu lịch sử để người dùng có thể tái sử dụng số đo cho các lần phân tích sau.

## 3. Phạm vi tính năng

### Tính năng cho người dùng

- Đăng ký và đăng nhập bằng email/password.
- Đăng nhập bằng Firebase token.
- Đo số đo cơ thể từ webcam.
- Xem trước dữ liệu đo và sử dụng lại cho bước phân tích.
- Phân tích từ ảnh bảng size hoặc ảnh sản phẩm có thông tin size.
- Nhận gợi ý size theo brand và loại sản phẩm.
- Xem dashboard và lịch sử dữ liệu phân tích theo tài khoản.
- Gửi form liên hệ tại trang `Contact`.

### Tính năng backend

- Xác thực người dùng và lưu profile.
- Lưu dữ liệu số đo và lịch sử phân tích brand-size.
- Đối sánh size theo category rules, brand rules và size mappings.
- Gọi Gemini để sinh nhận xét fit.
- Gọi Gemini để trích xuất bảng size từ ảnh.
- Giới hạn tốc độ với anonymous request ở API gợi ý size.
- Cache dữ liệu rules/mappings để giảm truy vấn lặp lại.

## 4. Kiến trúc hệ thống

### Tổng quan kiến trúc

```text
User
  |
  v
Next.js Frontend
  |-- Webcam + MediaPipe Pose
  |-- Image-based analysis flow
  |-- Auth / Dashboard / Brand pages
  |
  v
ASP.NET Core API
  |-- UserController
  |-- AnalysisDataMeasureController
  |-- MappingSizeController
  |-- MailController
  |
  +--> PostgreSQL (user, auth, measure data)
  +--> MongoDB (brand profiles, rules, size mappings)
  +--> Gemini API (fit insight, extract size chart from image)
  +--> Firebase Admin (token verification)
```

### Cách phân lớp backend

Backend đang đi theo cấu trúc gần với Clean Architecture:

- `Application`: DTO và interface nghiệp vụ.
- `Domain`: entity và hợp đồng domain.
- `Infrastructure`: persistence, security, service xử lý chính.
- `Presentation`: controller và presentation services.

### Trách nhiệm từng phần

#### Frontend

- Điều phối UI, state, form và trải nghiệm người dùng.
- Khởi tạo camera và MediaPipe Pose.
- Hiển thị landmark, countdown, trạng thái đo.
- Gọi API backend để phân tích size và lưu dữ liệu.

#### Backend

- Nhận dữ liệu số đo từ frontend.
- Điều chỉnh số đo theo brand và gender.
- Tính size phù hợp theo category rule.
- Sinh phần nhận xét AI bằng Gemini.
- Xử lý lưu trữ, xác thực, giới hạn truy cập và mail.

## 5. Công nghệ sử dụng

### Frontend

- Next.js `16.1.1`
- React `19.2.3`
- TypeScript `5`
- Tailwind CSS `4.1.18`
- Framer Motion `12.26.2`
- Zustand `5.0.10`
- Firebase `12.7.0`
- Axios `1.13.2`
- MediaPipe Pose `0.5.1675469404`
- MediaPipe Camera Utils `0.3.1675466862`
- Lucide React `0.562.0`
- React Hot Toast `2.6.0`

### Backend

- ASP.NET Core trên `.NET 10`
- Entity Framework Core `10.0.1`
- Npgsql + PostgreSQL
- MongoDB Driver `3.5.2`
- Firebase Admin `3.4.0`
- Google.GenAI `0.13.1`
- JWT `11.0.0`
- BCrypt.Net-Next `4.0.3`
- MailKit `4.14.1`
- Swagger / OpenAPI

## 6. Cấu trúc thư mục

```text
Raidexi/
|-- FrontEnd/
|   `-- Raidexi/
|       |-- app/                         # App Router pages
|       |-- features/
|       |   |-- Camera/                 # Luồng đo bằng webcam
|       |   |-- AnalyzeFromPic/         # Luồng phân tích từ ảnh
|       |   |-- Auth/                   # Đăng nhập/đăng ký
|       |   |-- Brand/                  # Chọn brand và hiển thị kết quả
|       |   |-- DashboardUser/          # Dashboard người dùng
|       |   |-- Home/                   # Landing page
|       |   |-- Contact/                # Liên hệ
|       |   `-- WorkFlow/               # Giải thích quy trình
|       |-- provider/                   # Context providers
|       |-- Shared/
|       |   |-- Components/             # UI dùng chung
|       |   |-- Service/                # API, mail, firebase, router
|       |   |-- store/                  # Global stores
|       |   `-- Ui/                     # UI helpers / toast
|       `-- public/                     # Asset tĩnh
|-- Backend/
|   `-- Raidexi/
|       |-- Application/                # DTOs và application contracts
|       |-- Domain/                     # Entities và interfaces
|       |-- Infrastructure/
|       |   |-- Persistence/            # EF Core, Mongo access, repository
|       |   |-- Security/               # JWT, hashing
|       |   `-- Services/               # Analysis, Auth, Gemini, Mail
|       |-- Presentation/
|       |   |-- Controller/             # API controllers
|       |   `-- Services/               # Cache services
|       |-- Migrations/                 # EF migrations
|       `-- Program.cs                  # Startup / DI / middleware
|-- README.md
`-- License
```

## 7. Luồng nghiệp vụ chi tiết

### 7.1 Luồng đo bằng webcam

Luồng webcam nằm chủ yếu ở `features/Camera` và `provider/BodyMeasureEstimate.tsx`.

#### Trình tự xử lý

1. Người dùng mở trang `Measurements`.
2. Frontend bật camera và khởi tạo MediaPipe Pose.
3. UI hiển thị countdown 5 giây chuẩn bị.
4. Sau countdown, hệ thống bắt đầu thu frame pose world landmarks.
5. Các frame hợp lệ được đưa vào buffer.
6. Khi đạt đủ số frame mục tiêu, frontend tính số đo từ landmark trung bình.
7. Kết quả được lưu vào provider/localStorage và dùng cho bước phân tích tiếp theo.

#### Chi tiết logic đo

Một số điểm đáng chú ý từ implementation hiện tại:

- MediaPipe chạy với `modelComplexity = 2`, `minDetectionConfidence = 0.7`, `minTrackingConfidence = 0.7`.
- Buffer mục tiêu đang dùng `TARGET_FRAMES = 50`.
- Hệ thống hiện chỉ nhận posture `BODY` khi độ lệch trục `z` giữa hai vai đủ nhỏ.
- Số đo được ước lượng từ các landmark chính: vai, hông, mũi, gối.
- Chu vi được tính xấp xỉ theo ellipse circumference.
- Có thêm hệ số scale riêng cho từng vùng như vai, eo, hông, chiều cao.

#### Công thức đang dùng

- `shoulderWidth`: khoảng cách 3D giữa hai vai, nhân hệ số `1.38`.
- `chest`, `waist`, `hip`: tính chu vi ellipse từ width/depth rồi nhân hệ số scale.
- `height`: suy ra từ khoảng cách theo trục `y` giữa mũi và trung điểm gối, sau đó quy đổi sang cm.

### 7.2 Luồng gợi ý size theo brand

Luồng này đi qua `provider/AISuggestSize.tsx` ở frontend và `AnalyisService.cs` ở backend.

#### Input

- Brand.
- Dữ liệu số đo cơ thể.
- Tùy chọn người dùng: `gender`, `typeProduct`, `sizeOutput`.

#### Xử lý ở backend

1. Tải `BrandRule` tương ứng với brand.
2. Điều chỉnh số đo thô theo brand rule.
3. Điều chỉnh nhẹ theo giới tính bằng `AdjustByGenderSlight()`.
4. Chọn trọng số theo loại sản phẩm:
   - `top`: ưu tiên `Chest`, `ShoulderWidth`.
   - `bottom`: ưu tiên `Waist`, `Hip`.
   - `dress`: cân bằng `Chest`, `Waist`, `Hip`.
5. Tính `fit percent` cho từng size bằng `CalculateRangeFit()`.
6. Chọn size có điểm cao nhất.
7. Map từ universal size sang size output mong muốn nếu có.
8. Gọi Gemini để sinh nhận xét `measurementInsight`, `productFitNote`, `expectedFit`.

#### Cách diễn giải độ phù hợp

Backend đang ánh xạ `FitPercent` thành nhãn như sau:

- `>= 90`: Rất vừa vặn
- `>= 80`: Vừa vặn
- `>= 70`: Tạm ổn
- `>= 60`: Hơi lệch
- `>= 50`: Không khuyến nghị
- `< 50`: Không phù hợp

### 7.3 Luồng phân tích từ ảnh

Luồng này dùng khi người dùng có ảnh chứa bảng size hoặc dữ liệu size.

#### Các bước

1. Frontend gửi base64 ảnh lên `POST /api/AnalysisDataMeasure/GetDataFromImage`.
2. Backend gọi Gemini Vision để trích xuất bảng size thành JSON chuẩn.
3. Frontend hoặc backend tiếp tục gửi dữ liệu đó vào `POST /api/AnalysisDataMeasure/AnalyseImage`.
4. Backend so điểm từng size dựa trên `Chest`, `Waist`, `Hip`.
5. Trả về `ResultAnalysis` giống luồng gợi ý size thông thường.

#### Prompt ảnh hiện tại

Gemini được yêu cầu trả về đúng JSON có các field như:

- `size_us`
- `size_uk`
- `size_eu`
- `chest_min_cm`, `chest_max_cm`
- `height_min_cm`, `height_max_cm`
- `weight_min_kg`, `weight_max_kg`
- `waist_min_cm`, `waist_max_cm`
- `hip_min_cm`, `hip_max_cm`

### 7.4 Luồng xác thực

Backend có các endpoint cho:

- Login bằng email/password.
- Register.
- Login bằng Firebase token.
- Logout.
- Lấy user data.
- Cập nhật thông tin người dùng.

Dữ liệu đo và kết quả phân tích có thể được lưu gắn với tài khoản sau đăng nhập.

## 8. API chính

## 8.1 User API

Base route: `/api/User`

- `POST /Login`
- `POST /Register`
- `POST /LoginWithFirebase`
- `GET /GetUserData`
- `POST /Logout`
- `POST /SaveMeasure`
- `POST /SaveMeasureBrandSize`
- `GET /GetBrandSizeMeasure`
- `PUT /UpdateUser`

### Ví dụ request đăng nhập

```json
{
  "email": "user@example.com",
  "password": "your_password"
}
```

## 8.2 Analysis API

Base route: `/api/AnalysisDataMeasure`

- `POST /AISuggest`
- `POST /GetDataFromImage`
- `POST /AnalyseImage`

### Ví dụ request `AISuggest`

```json
{
  "brand": "Zara",
  "userCustom": {
    "gender": "female",
    "typeProduct": "dress",
    "sizeOutput": "US"
  },
  "dataMeasure": {
    "shoulderWidth": 39,
    "chest": 84,
    "waist": 67,
    "hip": 90,
    "height": 160
  }
}
```

### Ví dụ response `ResultAnalysis`

```json
{
  "analysisCode": "4f5ddf4a-6f08-4e51-b6fc-55fca5b43b4c",
  "analysisDate": "2026-03-25T12:34:56Z",
  "typeCustom": {
    "gender": "female",
    "typeProduct": "dress",
    "sizeOutput": "US"
  },
  "fitSuggest": "Vừa vặn",
  "sizeSuggest": "M",
  "reliableRate": 84,
  "fitSuggestFromAI": {
    "measurementInsight": {
      "content": "Chiều cao và vòng ngực cho thấy form áo sẽ lên cân đối, thân áo không quá ngắn."
    },
    "productFitNote": {
      "content": "Khi mặc sẽ có độ ôm vừa, dễ vận động và ít bị bó phần thân trên."
    },
    "expectedFit": {
      "content": "Regular"
    }
  }
}
```

### Ví dụ request `GetDataFromImage`

Body là chuỗi base64 của ảnh:

```json
"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ..."
```

### Ví dụ request `AnalyseImage`

```json
{
  "measureData": {
    "shoulderWidth": 39,
    "chest": 84,
    "waist": 67,
    "hip": 90,
    "height": 160
  },
  "customizeDataAiSuggest": {
    "gender": "female",
    "typeProduct": "dress",
    "sizeOutput": "US"
  },
  "sizeAnalysisResponse": {
    "sizes": [
      {
        "size_us": "S",
        "size_uk": 8,
        "size_eu": 36,
        "chest_min_cm": 82,
        "chest_max_cm": 86,
        "height_min_cm": 158,
        "height_max_cm": 162,
        "weight_min_kg": null,
        "weight_max_kg": null,
        "waist_min_cm": 64,
        "waist_max_cm": 68,
        "hip_min_cm": 88,
        "hip_max_cm": 92
      }
    ]
  }
}
```

## 8.3 Brand Mapping API

Base route: `/api/MappingSize`

- `GET /brand-profiles`
- `POST /AddBrandProfile`
- `POST /AddSizeMapping`
- `POST /AddUniversalSize`
- `POST /AddCategoryRule`
- `POST /AddBrandRule`

## 8.4 Mail API

Base route: `/api/Mail`

- `POST /send`

## 9. Dữ liệu và lưu trữ

### PostgreSQL

Được dùng cho dữ liệu quan hệ, chủ yếu gồm:

- Tài khoản người dùng.
- Thông tin hồ sơ.
- Dữ liệu số đo lưu theo user.
- Dữ liệu brand-size người dùng đã phân tích.

### MongoDB

Được dùng cho dữ liệu linh hoạt liên quan đến size system:

- Brand profiles.
- Brand rules.
- Universal sizes.
- Category rules.
- Size mappings.

### Cache

`CacheAnalysisDataService` được dùng để cache rule và mapping, giúp giảm truy vấn lặp cho các endpoint phân tích.

## 10. Cài đặt và chạy local

### 10.1 Yêu cầu hệ thống

- Node.js `20+`
- npm `10+`
- .NET SDK `10.0`
- PostgreSQL
- MongoDB
- Trình duyệt hiện đại có hỗ trợ webcam

### 10.2 Chạy frontend

```bash
cd FrontEnd/Raidexi
npm install
npm run dev
```

Frontend mặc định chạy tại:

- [http://localhost:3000](http://localhost:3000)

### 10.3 Chạy backend

```bash
cd Backend/Raidexi
dotnet restore
dotnet run --urls http://localhost:5000
```

Swagger development:

- [http://localhost:5000/swagger](http://localhost:5000/swagger)

### 10.4 Thứ tự khuyến nghị khi chạy local

1. Khởi động PostgreSQL và MongoDB.
2. Thiết lập biến môi trường backend.
3. Chạy backend trước.
4. Chạy frontend sau.
5. Kiểm tra Swagger rồi mới test luồng UI.

## 11. Biến môi trường và cấu hình

## 11.1 Backend

Backend đang đọc cấu hình từ `appsettings.json` và biến môi trường.

Các giá trị tối thiểu cần có:

```env
# PostgreSQL
ConnectionStrings__DefaultConnection=Host=...;Port=5432;Database=...;Username=...;Password=...

# MongoDB
MongoUrl=mongodb://localhost:27017
Databasename=raidexi

# Firebase Admin service account JSON string
FIREBASE_CREDENTIALS_JSON={...json...}

# Gemini
GEMINI_API_KEY=your_gemini_api_key

# Mail
MailAdmin=your_email@example.com
MailAdminPassword=your_app_password
```

Ngoài ra backend còn dùng khóa JWT ở `appsettings.json` với key:

- `Jwt:Key`

## 11.2 Frontend

Hiện tại frontend chưa dùng đầy đủ `.env.local` cho các cấu hình quan trọng. Một số thông tin đang hardcode trực tiếp trong source.

Về mặt chuẩn dự án, nên hướng tới mẫu cấu hình như sau:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=...
NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
```

Lưu ý: mẫu trên là định hướng chuẩn hóa, không phải toàn bộ code hiện tại đã đọc những biến này.

## 12. Kiểm tra sau khi setup

Sau khi chạy xong local, nên kiểm tra lần lượt:

1. Mở frontend và xác nhận landing page render bình thường.
2. Mở backend Swagger để kiểm tra API đã khởi động.
3. Test `POST /api/User/Register` hoặc đăng ký qua UI.
4. Mở trang `Measurements` và cho phép truy cập camera.
5. Thực hiện một lượt đo để kiểm tra localStorage và provider state.
6. Gọi `GET /api/MappingSize/brand-profiles` để xác nhận MongoDB hoạt động.
7. Gửi thử `POST /api/AnalysisDataMeasure/AISuggest` với payload mẫu.

## 13. Lưu ý hiện trạng dự án

Đây là các điểm rất quan trọng để onboard đúng với code hiện tại:

- Frontend đang hardcode `BASE_URL = "http://localhost:5000"` trong `FrontEnd/Raidexi/Shared/Service/Api.ts`.
- Frontend đang hardcode cấu hình Firebase trong `FrontEnd/Raidexi/Shared/Service/firebaseService.ts`.
- Service gửi mail phía frontend đang hardcode thông tin EmailJS trong `FrontEnd/Raidexi/Shared/Service/MailService.ts`.
- Backend đang cấu hình CORS cho `https://localhost:3000`, trong khi frontend local thường chạy `http://localhost:3000`.
- `dotnet run` sẽ tự gọi migration PostgreSQL khi API khởi động.
- API `AISuggest` có rate limiting `5 request / 24h` cho anonymous client theo IP.
- Hiện chưa thấy test suite hoặc script test riêng cho frontend/backend trong repo.

## 14. Troubleshooting

### Backend không lên

- Kiểm tra .NET SDK có đúng version `10.0`.
- Kiểm tra đủ biến môi trường bắt buộc như `FIREBASE_CREDENTIALS_JSON`, `GEMINI_API_KEY`, `MongoUrl`.
- Kiểm tra PostgreSQL có kết nối được không.
- Đọc log startup để xác định service nào fail trong DI hoặc migration.

### Frontend gọi API lỗi CORS

- Kiểm tra backend có đang chạy ở `http://localhost:5000`.
- Kiểm tra `BASE_URL` trong `FrontEnd/Raidexi/Shared/Service/Api.ts`.
- Cập nhật `WithOrigins(...)` trong `Backend/Raidexi/Program.cs` nếu frontend đang chạy bằng `http` thay vì `https`.

### Login Firebase không hoạt động

- Kiểm tra Firebase project frontend có đúng với service account backend đang verify.
- Kiểm tra biến `FIREBASE_CREDENTIALS_JSON` có chứa JSON hợp lệ và không bị lỗi escape `\n`.

### Gemini trả lỗi

- Kiểm tra `GEMINI_API_KEY`.
- Kiểm tra mạng outbound từ máy chạy backend.
- Xem log backend để biết lỗi xảy ra ở bước tạo prompt, gọi model hay parse JSON.

### Camera không hoạt động

- Kiểm tra quyền camera của trình duyệt.
- Tắt ứng dụng khác đang dùng webcam.
- Dùng Chrome hoặc Edge bản mới để giảm lỗi tương thích MediaPipe.

### Phân tích size không ra kết quả hợp lý

- Kiểm tra dữ liệu `BrandRule`, `CategoryRule`, `UniversalSize`, `SizeMapping` trong MongoDB.
- Kiểm tra `gender`, `typeProduct`, `sizeOutput` có khớp dữ liệu backend không.
- Kiểm tra ảnh đầu vào có đủ rõ nếu dùng luồng phân tích từ ảnh.

## 15. Hướng phát triển tiếp theo

Để dự án đạt mức production-ready hơn, nên ưu tiên các hạng mục sau:

- Tách toàn bộ config nhạy cảm khỏi source code và chuyển sang env.
- Đồng bộ CORS, base URL và scheme `http/https` giữa frontend và backend.
- Bổ sung tài liệu seed dữ liệu MongoDB.
- Bổ sung unit test cho `AnalyisService` và integration test cho API chính.
- Tách riêng DTO public API và model nội bộ rõ ràng hơn.
- Chuẩn hóa naming giữa frontend/backend, đặc biệt ở các field JSON và type.
- Thêm logging có cấu trúc cho các luồng phân tích.
- Bổ sung Docker Compose để chạy local với PostgreSQL và MongoDB dễ hơn.

## 16. Đóng góp

Quy trình đề xuất khi đóng góp:

1. Tạo branch mới từ nhánh đang làm việc.
2. Mô tả rõ mục tiêu thay đổi.
3. Kiểm tra lại các luồng bị ảnh hưởng.
4. Cập nhật tài liệu nếu có thay đổi API hoặc cấu hình.
5. Mở pull request kèm ảnh chụp màn hình hoặc payload minh họa nếu cần.

## 17. License

Repository hiện có file `License` tại thư mục gốc. Hãy đọc kỹ file này trước khi tái sử dụng hoặc phân phối mã nguồn.
