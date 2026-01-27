# Raidexi - AI Body Measurement System

<div align="center">

![Raidexi Logo](./FrontEnd/Raidexi/public/logo.png)

**Hệ thống đo lường cơ thể chính xác bằng AI, chuyển đổi số đo thành kích cỡ cụ thể của từng thương hiệu**

[Features](#-tính-năng) • [Tech Stack](#-tech-stack) • [Installation](#-cài-đặt) • [Usage](#-sử-dụng) • [Architecture](#-kiến-trúc) • [Contributing](#-đóng-góp)

</div>

---

## 📋 Giới thiệu

**Raidexi** là một hệ thống đo lường cơ thể thông minh sử dụng công nghệ AI và Computer Vision. Hệ thống cho phép người dùng đo lường các chỉ số cơ thể (ngực, eo, hông) một cách chính xác chỉ bằng camera webcam, sau đó chuyển đổi số đo thành kích cỡ phù hợp với từng thương hiệu thời trang.

### Vấn đề giải quyết

- ❌ Loại bỏ sự mơ hồ khi đoán mò kích cỡ quần áo
- ✅ Cung cấp số đo chính xác dựa trên dữ liệu khách quan
- ✅ Tự động đề xuất size phù hợp cho từng thương hiệu
- ✅ Trải nghiệm đo lường nhanh chóng, không cần thiết bị chuyên dụng

---

## ✨ Tính năng

### 🎯 Tính năng chính

- **📸 Đo lường bằng Camera**: Sử dụng MediaPipe Pose để nhận diện và đo lường cơ thể từ webcam
- **📏 Đo lường tự động**: Tự động tính toán chu vi ngực, eo, hông từ pose landmarks
- **🏷️ Đề xuất Size theo Brand**: AI đề xuất size phù hợp dựa trên số đo và thương hiệu
- **👤 Quản lý Profile**: Lưu trữ và quản lý số đo cá nhân
- **🔐 Xác thực người dùng**: Hệ thống đăng nhập/đăng ký với Firebase Authentication
- **📊 Dashboard**: Theo dõi lịch sử đo lường và số đo

### 🎨 Giao diện

- **Modern UI/UX**: Thiết kế hiện đại với Tailwind CSS
- **Responsive Design**: Tối ưu cho mọi thiết bị
- **Real-time Feedback**: Hiển thị trực tiếp quá trình đo lường
- **Dark Theme**: Giao diện tối với accent màu vàng đồng (brass)

---

## ?? Tech Stack

### Frontend

- **Framework**: [Next.js 16.1.1](https://nextjs.org/) với React 19.2.3
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4.1.18
- **Animation**: Framer Motion 12.26.2
- **State Management**: 
  - React Context API
  - Zustand 5.0.10
- **Computer Vision**: 
  - [MediaPipe Pose](https://google.github.io/mediapipe/solutions/pose) 0.5.1675469404
  - [MediaPipe Camera Utils](https://google.github.io/mediapipe/solutions/camera_utils) 0.3.1675466862
- **Authentication**: Firebase 12.7.0
- **HTTP Client**: Axios 1.13.2
- **Notifications**: React Hot Toast 2.6.0
- **Icons**: Lucide React 0.562.0

### Backend

- **Framework**: .NET 10.0 (ASP.NET Core)
- **Language**: C#
- **Database**: 
  - PostgreSQL (Entity Framework Core) - User data, authentication
  - MongoDB - Brand rules, size mappings, analysis data
- **Authentication**: 
  - JWT Bearer Tokens
  - Firebase Admin SDK (Google Sign-In)
  - BCrypt password hashing
- **AI Integration**: 
  - Google Gemini 3 Flash Preview API
  - Custom prompt engineering
- **Caching**: In-memory cache cho brand rules và size mappings
- **Rate Limiting**: Fixed window (5 requests/24h cho anonymous users)
- **API Documentation**: Swagger/OpenAPI
- **Location**: `Backend/Raidexi/`

#### Backend Dependencies

- **Google.GenAI** 0.13.1 - Gemini AI integration
- **FirebaseAdmin** 3.4.0 - Firebase authentication
- **JWT** 11.0.0 - Token generation
- **BCrypt.Net-Next** 4.0.3 - Password hashing
- **MongoDB.Driver** 3.5.2 - MongoDB operations
- **Npgsql.EntityFrameworkCore.PostgreSQL** 10.0.0 - PostgreSQL provider
- **Microsoft.EntityFrameworkCore** 10.0.1 - ORM
- **Swashbuckle.AspNetCore** 10.1.0 - Swagger documentation

### Development Tools

- **Linting**: ESLint 9
- **Package Manager**: npm
- **Version Control**: Git

---

## 📦 Cài đặt

### Yêu cầu hệ thống

- Node.js >= 18.x
- npm >= 9.x
- Webcam/Camera để đo lường
- Trình duyệt hiện đại (Chrome, Firefox, Edge, Safari)

### Cài đặt Frontend

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd Raidexi/FrontEnd/Raidexi
   ```

2. **Cài đặt dependencies**
   ```bash
   npm install
   ```

3. **Cấu hình Firebase** (nếu chưa có)
   - Tạo project trên [Firebase Console](https://console.firebase.google.com/)
   - Lấy Firebase config và thêm vào file cấu hình

4. **Chạy development server**
   ```bash
   npm run dev
   ```

5. **Mở trình duyệt**
   ```
   http://localhost:3000
   ```

### Cài đặt Backend (.NET)

1. **Di chuyển vào thư mục Backend**
   ```bash
   cd Backend/Raidexi
   ```

2. **Restore packages**
   ```bash
   dotnet restore
   ```

3. **Chạy ứng dụng**
   ```bash
   dotnet run
   ```

---

## 🚀 Sử dụng

### Quy trình đo lường

1. **Đăng nhập/Đăng ký**
   - Truy cập trang Login hoặc SignUp
   - Tạo tài khoản mới hoặc đăng nhập

2. **Bắt đầu đo lường**
   - Điều hướng đến trang `/Measurements`
   - Nhập chiều cao của bạn (cm)
   - Click "CAPTURE IMAGE" để mở camera

3. **Thực hiện đo lường**
   - Đứng trong khung hình với tư thế FRONT (mặt trước)
   - Chờ đếm ngược 3 giây
   - Giữ nguyên tư thế trong 15 giây để thu thập dữ liệu FRONT
   - Chuyển sang tư thế SIDE (mặt bên)
   - Giữ nguyên tư thế đến khi hoàn tất

4. **Xem kết quả**
   - Hệ thống tự động tính toán:
     - Chu vi ngực (Chest)
     - Chu vi eo (Waist)
     - Chu vi hông (Hip)
   - Kết quả hiển thị trên Control Panel

5. **Đề xuất Size**
   - Chọn thương hiệu tại trang `/Brand`
   - Hệ thống sẽ đề xuất size phù hợp dựa trên số đo

### Tư thế đo lường

- **FRONT (Mặt trước)**: Đứng thẳng, mặt hướng camera, hai tay để tự nhiên
- **SIDE (Mặt bên)**: Xoay người 90 độ, mặt bên hướng camera

---

## 🏗 Kiến trúc

### Cấu trúc thư mục

```
Raidexi/
├── FrontEnd/
│   └── Raidexi/
│       ├── app/                    # Next.js App Router
│       │   ├── page.tsx            # Trang chủ
│       │   ├── Login/              # Trang đăng nhập
│       │   ├── SignUp/             # Trang đăng ký
│       │   ├── Measurements/       # Trang đo lường
│       │   ├── Dashboard/          # Dashboard người dùng
│       │   ├── Brand/              # Quản lý thương hiệu
│       │   ├── WorkFlow/           # Giải thích quy trình
│       │   └── Architecture/       # Kiến trúc hệ thống
│       │
│       ├── features/               # Feature modules
│       │   ├── Camera/             # Module đo lường camera
│       │   │   ├── components/    # ViewPort, ControlPanel
│       │   │   └── hook/           # Custom hooks
│       │   ├── Auth/               # Module xác thực
│       │   ├── Brand/              # Module thương hiệu
│       │   ├── Home/               # Module trang chủ
│       │   ├── DashboardUser/      # Module dashboard
│       │   └── WorkFlow/           # Module workflow
│       │
│       ├── provider/               # Context Providers
│       │   ├── AuthProvider.tsx
│       │   ├── BodyMeasureEstimate.tsx
│       │   ├── BrandProvider.tsx
│       │   └── AISuggestSize.tsx
│       │
│       ├── Shared/                 # Shared components & utilities
│       │   ├── Components/        # NavBar, Footer, LoadingScreen
│       │   ├── Service/            # API, Firebase, Router services
│       │   ├── store/              # Zustand stores
│       │   └── Ui/                 # Shared UI components
│       │
│       └── public/                 # Static assets
│
└── Backend/
    └── Raidexi/                    # .NET Backend
```

### Luồng dữ liệu

```
User → Camera → MediaPipe Pose → Pose Landmarks → 
Calculate Measurements → Context Provider → 
Display Results → AI Size Suggestion → Brand Matching
```

### Components chính

- **ViewPort**: Component hiển thị camera và canvas vẽ landmarks
- **ControlPanel**: Panel điều khiển đo lường và hiển thị kết quả
- **BodyMeasureEstimateProvider**: Context quản lý state đo lường
- **BrandProvider**: Context quản lý thông tin thương hiệu

---

## 🔬 Chi tiết Cơ chế Hoạt động

### 📸 Hệ thống Camera & MediaPipe Pose

#### Cấu trúc Component

```
ViewPort Component
??? MediaPipe Camera Utils
?   ??? Video Stream (640x480)
?   ??? Frame Capture (30fps)
??? MediaPipe Pose Detection
?   ??? Model: Pose Landmark Detection
?   ??? Model Complexity: 2 (High accuracy)
?   ??? Confidence Threshold: 0.7
??? Canvas Rendering
    ??? Real-time Landmark Visualization
    ??? Measurement Status Display
```

#### Quy trình Thu thập Dữ liệu

**1. Khởi tạo Camera**
```typescript
// MediaPipe Camera được khởi tạo với video element
mpCameraRef.current = new camera.Camera(videoRef.current, {
  onFrame: async () => {
    await poseRef.current.send({ image: videoRef.current });
  },
  width: 640,
  height: 480,
});
```

**2. Pose Detection Pipeline**
- Mỗi frame được gửi đến MediaPipe Pose
- Pose model trả về 33 landmarks (điểm mốc trên cơ thể)
- Landmarks được normalize về tọa độ [0, 1] với depth (z-axis)

**3. Tư thế Detection**
```typescript
function detectPose(lm: Landmark[]) {
  const leftShoulder = lm[11];
  const rightShoulder = lm[12];
  
  // Tính toán khoảng cách và độ sâu
  const dx = Math.abs(leftShoulder.x - rightShoulder.x);
  const dz = Math.abs(leftShoulder.z - rightShoulder.z);
  
  // Phân loại: FRONT, SIDE, hoặc INVALID
  if (dz / dx > 2.2 && dx < 0.04) return "SIDE";
  if (dz < 0.05) return "FRONT";
  return "UNKNOWN";
}
```

**4. Buffer Management**
- **FrontBuffer**: Lưu trữ 10-20 frames tư thế FRONT
- **SideBuffer**: Lưu trữ 10-20 frames tư thế SIDE
- Chỉ frames hợp lệ (đúng tư thế) được thêm vào buffer
- Buffer tự động giới hạn tối đa 20 frames

### 📏 Quá trình Đo lường & Tính toán

#### Thu thập Dữ liệu

**Phase 1: Countdown (3 giây)**
- Hiển thị đếm ngược để người dùng chuẩn bị
- Reset các buffers và states

**Phase 2: FRONT Pose Collection (15 giây)**
- Thu thập frames khi `countdown > 10`
- Chỉ lưu frames có `type === "FRONT"`
- Hiển thị progress: "Đang Thu Thập Dữ Liệu FRONT"
- Khi đủ 10 frames: "Đã Thu Thập Đủ Dữ Liệu FRONT"

**Phase 3: SIDE Pose Collection (5 giây còn lại)**
- Chuyển sang thu thập frames SIDE
- Hiển thị: "Đang Thu Thập Dữ Liệu SIDE"
- Khi đủ 10 frames: "Đã Thu Thập Đủ Dữ Liệu SIDE"

#### Tính toán Measurements

**1. Extract Key Measurements**

```typescript
// Tính chiều rộng/độ sâu từ landmarks
function extractAxis(frames, type, L, R) {
  const values = frames.map(lm => 
    type === "FRONT" 
      ? Math.abs(lm[L].x - lm[R].x)  // Chiều rộng (x-axis)
      : Math.abs(lm[L].z - lm[R].z)   // Độ sâu (z-axis)
  );
  // Lấy median value để loại bỏ outliers
  values.sort((a, b) => a - b);
  return values[Math.floor(values.length / 2)];
}
```

**2. Tính toán Waist Landmarks**

```typescript
function getWaistLandmarks(lm, type) {
  // Tính điểm giữa vai và hông
  const waistX = (shoulderX + hipX) / 2;
  const waistY = (shoulderY + hipY) / 2;
  const waistZ = (shoulderZ + hipZ) / 2;
  
  // Tính chiều rộng/độ sâu eo
  const waistHalfWidth = (shoulderWidth + hipWidth) / 4;
  const waistHalfDepth = (shoulderDepth + hipDepth) / 4;
  
  // Trả về left và right waist points
}
```

**3. Tính Chu vi (Circumference)**

```typescript
function calculateEllipseCircumference(a, b) {
  // Sử dụng công thức Ramanujan approximation
  const h = Math.pow(a - b, 2) / Math.pow(a + b, 2);
  const circumference = 
    Math.PI * (a + b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));
  return circumference;
}

// Áp dụng cho từng phần cơ thể
const chestCircumference = calculateEllipseCircumference(
  frontShoulderWidth / 2,  // Bán kính ngang
  sideChestDepth / 2        // Bán kính sâu
);
```

**4. Scale to Real World**

```typescript
function Scale(lm, realHeight) {
  const nose = lm[0];           // ?i?m m?c m?i
  const ankleL = lm[27];        // M?t c? ch?n tr?i
  const ankleR = lm[28];        // M?t c? ch?n ph?i
  const avgAnkleY = (ankleL.y + ankleR.y) / 2;
  
  // T?nh scale factor d?a tr?n chi?u cao th?c t?
  return realHeight / (avgAnkleY - nose.y);
}

// ?p d?ng scale
const scale = Scale(FrontBuffer[0], userHeight);
const scaledChest = chestCircumference * scale;
const scaledWaist = waistCircumference * scale;
const scaledHip = hipCircumference * scale;
```

#### Landmarks được sử dụng

| Landmark Index | Body Part | Usage |
|---------------|-----------|-------|
| 0 | Nose | Tính chiều cao, scale factor |
| 11 | Left Shoulder | Tính chiều rộng ngực, vai |
| 12 | Right Shoulder | Tính chiều rộng ngực, vai |
| 23 | Left Hip | Tính chiều rộng hông |
| 24 | Right Hip | Tính chiều rộng hông |
| 25-26 | Waist (Calculated) | Tính chu vi eo |
| 27-28 | Ankles | Tính chiều cao, scale factor |

### 🤖 Tích hợp Gemini AI

#### Luồng xử lý Backend

```
Frontend (Số đo)
    ↓
Backend API: /api/AnalysisDataMeasure/AISuggest
    ↓
1. Điều chỉnh số đo theo Brand Rules
    ├── Chest += brandRule.Chest
    ├── Waist += brandRule.Waist
    └── Hip += brandRule.Hip
    ↓
2. Điều chỉnh theo Gender
    └── AdjustByGenderSlight()
    ↓
3. Tính toán Size Match
    ├── GetSizeFromMeasure()
    ├── So sánh với Size Rules
    └── Tính Fit Percent (0-100%)
    ↓
4. Tạo Prompt cho Gemini
    └── CreatePrompt()
    ↓
5. Gọi Gemini API
    ├── Model: gemini-3-flash-preview
    ├── Input: Prompt với số đo + brand info
    └── Output: JSON với 3 fields
    ↓
6. Parse & Combine Results
    ├── Size Suggest (từ Size Matching)
    ├── Fit Suggest (từ Fit Percent)
    └── AI Insights (từ Gemini)
```

#### Gemini Prompt Structure

```csharp
SYSTEM ROLE:
- API sinh dữ liệu JSON (KHÔNG phải chatbot)
- CHỈ trả về JSON hợp lệ
- KHÔNG markdown, KHÔNG text thừa

DỮ LIỆU ĐẦU VÀO:
- Thương hiệu: {brand}
- Loại sản phẩm: {typeProduct}
- Chiều cao: {height} cm
- Vòng ngực: {chest} cm
- Vai: {shoulderWidth} cm
- Vòng eo: {waist} cm

JSON OUTPUT:
{
  "measurementInsight": {
    "content": "Phân tích số đo cơ thể, tập trung vào chiều cao và vòng ngực"
  },
  "productFitNote": {
    "content": "Mô tả độ ôm, độ thoải mái khi mặc"
  },
  "expectedFit": {
    "content": "Slim / Regular / Relaxed - cảm nhận dự kiến"
  }
}
```

#### Brand Rules & Size Matching

**Brand Rules Adjustment**
```csharp
// Mỗi brand có offset riêng để điều chỉnh số đo
dataMeasureAdjusted = {
  Chest: measureData.Chest + brandRule.Chest,
  Waist: measureData.Waist + brandRule.Waist,
  Hip: measureData.Hip + brandRule.Hip
};
```

**Size Matching Algorithm**
```csharp
// So sánh số đo với từng size trong brand
foreach (var size in brandSizes) {
  var fit = CalculateRangeFit(userValue, size.Min, size.Max);
  totalFit += fit * weight;
}

// Fit Percent Categories
>= 90%: "Rất vừa vặn"
>= 80%: "Vừa vặn"
>= 70%: "Tạm ổn"
>= 60%: "Hơi lệch"
>= 50%: "Không khuyến nghị"
< 50%:  "Không phù hợp"
```

#### Response Structure

```typescript
interface ResultAnalysis {
  analysisCode: string;           // GUID
  analysisDate: DateTime;
  sizeSuggest: string;             // Size được đề xuất (S, M, L, etc.)
  fitSuggest: string;             // "Rất vừa vặn", "Vừa vặn", etc.
  reliableRate: number;            // Fit Percent (0-100)
  fitSuggestFromAI: {
    measurementInsight: {          // Phân tích số đo từ Gemini
      content: string;
    };
    productFitNote: {              // Ghi chú về độ fit từ Gemini
      content: string;
    };
    expectedFit: {                 // Fit dự kiến (Slim/Regular/Relaxed)
      content: string;
    };
  };
}
```

### 🔄 Data Flow Diagram

```
┌─────────────┐
│   User      │
│  (Camera)   │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│  MediaPipe Pose │ ◄─── Video Frames (30fps)
│   Detection     │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│  Pose Landmarks │ (33 points với x, y, z, visibility)
│   (33 points)   │
└──────┬──────────┘
       │
       ├──► Detect Pose Type (FRONT/SIDE)
       │
       ├──► Buffer Frames (FrontBuffer/SideBuffer)
       │
       └──► Extract Measurements
              │
              ├──► Shoulder Width (FRONT)
              ├──► Hip Width (FRONT)
              ├──► Chest Depth (SIDE)
              ├──► Hip Depth (SIDE)
              └──► Waist Width/Depth
                     │
                     ▼
              ┌──────────────────┐
              │ Calculate        │ ◄─── Ellipse Formula
              │ Circumference    │
              │ (Chest/Waist/Hip)│
              └──────┬───────────┘
                     │
                     ▼
              ┌──────────────────┐
              │ Scale to Real     │ ◄─── User Height Input
              │ World (cm)        │
              └──────┬───────────┘
                     │
                     ▼
              ┌──────────────────┐
              │ Frontend Context  │
              │ (BodyMeasureEstimate)│
              └──────┬───────────┘
                     │
                     ▼
              ┌──────────────────┐
              │ API Call          │
              │ /AISuggest        │
              └──────┬───────────┘
                     │
                     ▼
              ┌──────────────────┐
              │ Backend           │
              │ AnalysisService   │
              └──────┬───────────┘
                     │
                     ├──► Adjust by Brand Rules
                     ├──► Adjust by Gender
                     ├──► Size Matching Algorithm
                     └──► Create Gemini Prompt
                            │
                            ▼
                     ┌──────────────────┐
                     │ Gemini API        │
                     │ (gemini-3-flash)   │
                     └──────┬───────────┘
                            │
                            ▼
                     ┌──────────────────┐
                     │ Parse JSON        │
                     │ Response          │
                     └──────┬───────────┘
                            │
                            ▼
                     ┌──────────────────┐
                     │ Combine Results   │
                     │ (Size + AI)       │
                     └──────┬───────────┘
                            │
                            ▼
                     ┌──────────────────┐
                     │ Return to         │
                     │ Frontend          │
                     └──────────────────┘
```

### 🏗️ Backend Architecture

#### Cấu trúc Backend

```
Backend/Raidexi/
├── Application/              # Application Layer
│   ├── Dtos/                 # Data Transfer Objects
│   │   ├── GeminiResponse.cs
│   │   ├── ResultAnalysis.cs
│   │   ├── SizeResult.cs
│   │   └── uploadDataToAnalysisMeasure.cs
│   └── Interfaces/           # Service Interfaces
│       ├── IAnalysisDataService.cs
│       ├── IAuthService.cs
│       └── IGeminiService.cs
│
├── Domain/                   # Domain Layer
│   ├── Entities/            # Domain Models
│   │   ├── User.cs
│   │   ├── MeasureData.cs
│   │   ├── MappingSize.cs
│   │   └── DataBrandAnalysis.cs
│   └── Interfaces/          # Repository Interfaces
│       ├── IUserRepository.cs
│       ├── ISizeMapping.cs
│       └── ITokenServices.cs
│
├── Infrastructure/          # Infrastructure Layer
│   ├── Persistence/        # Data Access
│   │   ├── AppDBContext.cs (PostgreSQL)
│   │   ├── MongoDbContext.cs
│   │   ├── UserRepository.cs
│   │   └── MappingSizeRepo.cs
│   ├── Security/           # Security Services
│   │   ├── PasswordHasher.cs (BCrypt)
│   │   └── TokenGenerate.cs (JWT)
│   └── Services/           # Business Logic
│       ├── AnalyisService.cs
│       ├── AuthService.cs
│       └── GeminiService.cs
│
└── Presentation/           # Presentation Layer
    ├── Controller/        # API Controllers
    │   ├── UserController.cs
    │   ├── AnalysisDataMeasureController.cs
    │   └── MappingSizeController.cs
    └── Services/
        └── CacheServices/
            └── CacheAnalysisDataService.cs
```

#### API Endpoints

**Authentication Endpoints** (`/api/User`)
- `POST /api/User/Login` - Đăng nhập với email/password
- `POST /api/User/Register` - Đăng ký tài khoản mới
- `POST /api/User/LoginWithFirebase` - Đăng nhập với Firebase token
- `POST /api/User/Logout` - Đăng xuất
- `GET /api/User/GetUserData` - Lấy thông tin người dùng

**Analysis Endpoints** (`/api/AnalysisDataMeasure`)
- `POST /api/AnalysisDataMeasure/AISuggest` - Đề xuất size với AI
  - Rate Limit: 5 requests/24h (anonymous)
  - Request Body: `uploadDataToAnalysisMeasure`
  - Response: `ResultAnalysis`

**Size Mapping Endpoints** (`/api/MappingSize`)
- `GET /api/MappingSize/brand-profiles` - Lấy danh sách brand profiles
- `POST /api/MappingSize/AddBrandProfile` - Thêm brand profile
- `POST /api/MappingSize/AddSizeMapping` - Thêm size mapping
- `POST /api/MappingSize/AddUniversalSize` - Thêm universal size
- `POST /api/MappingSize/AddCategoryRule` - Thêm category rule
- `POST /api/MappingSize/AddBrandRule` - Thêm brand rule

#### Database Schema

**PostgreSQL (User Data)**
```sql
Users Table:
- Id (Guid, PK)
- Email (string, unique)
- FullName (string)
- HashPassword (string)
- CreatedAt (DateTime)
- MeasureData (JSON)
```

**MongoDB (Brand & Size Data)**
```javascript
Collections:
- BrandProfiles: Thông tin thương hiệu
- SizeMappings: Mapping giữa universal size và brand size
- UniversalSizes: Kích thước chuẩn (S, M, L, XL, etc.)
- CategoryRules: Quy tắc theo loại sản phẩm (top, bottom, dress)
- BrandRules: Quy tắc điều chỉnh số đo theo brand
```

#### Backend Services

**AnalyisService**
- `GetSizeFromMeasure()`: Tính toán size phù hợp từ số đo
- `AISuggestSize()`: Tích hợp Gemini AI để đề xuất size
- `AdjustByGenderSlight()`: Điều chỉnh số đo theo giới tính
- `CalculateRangeFit()`: Tính toán độ phù hợp (0-100%)

**GeminiService**
- `CreatePrompt()`: Tạo prompt cho Gemini AI
- `GetAIMeasure()`: Gọi Gemini API và parse response

**AuthService**
- `LoginAsync()`: Xác thực người dùng
- `RegisterAsync()`: Đăng ký người dùng mới
- `LoginWithFirebaseAsync()`: Xác thực với Firebase

**CacheAnalysisDataService**
- Cache brand rules, size mappings, category rules
- Giảm số lần query database

#### Rate Limiting

```csharp
Policy: "anon05"
- Limit: 5 requests per 24 hours
- Window: Fixed window (24 hours)
- Scope: Per IP address
- Status Code: 429 Too Many Requests
```

#### Environment Variables

```env
# Database
DefaultConnection=PostgreSQL connection string
MongoUrl=MongoDB connection string
Databasename=MongoDB database name

# Firebase
FIREBASE_CREDENTIALS_JSON=Firebase service account JSON

# Gemini AI
GEMINI_API_KEY=Google Gemini API key

# JWT
JWT_SECRET_KEY=Secret key for JWT tokens
```

### ⚙️ Technical Details

#### MediaPipe Configuration

```typescript
poseRef.current.setOptions({
  modelComplexity: 2,              // 0-2, cao hơn = chính xác hơn
  smoothLandmarks: true,           // Làm mượt landmarks
  enableSegmentation: true,         // Bật segmentation
  smoothSegmentation: true,         // Làm mượt segmentation
  minDetectionConfidence: 0.7,     // Ngưỡng phát hiện
  minTrackingConfidence: 0.7       // Ngưỡng tracking
});
```

#### Error Handling

- **Camera không khả dụng**: Hiển thị "OFFLINE" status
- **Pose không detect được**: Bỏ qua frame, không thêm vào buffer
- **Buffer chưa đủ**: Hiển thị "Đang Thu Thập Dữ Liệu"
- **Gemini API lỗi**: Trả về size suggest từ algorithm, không có AI insights
- **Rate limiting**: Hiển thị thông báo "Đã hết lượt dùng thử"

#### Performance Optimization

- **Frame Buffering**: Chỉ xử lý frames hợp lệ
- **Median Filtering**: Loại bỏ outliers trong measurements
- **Lazy Loading**: MediaPipe chỉ load khi mở camera
- **Canvas Optimization**: Clear và redraw chỉ khi cần
- **Context Memoization**: Tránh re-render không cần thiết
- **Backend Caching**: In-memory cache cho brand rules và size mappings
- **Database Indexing**: Index trên email và các trường thường query

---

## 🔧 Cấu hình

### Environment Variables

Tạo file `.env.local` trong `FrontEnd/Raidexi/`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
# ... các config Firebase khác
```

### Tailwind Config

File `tailwind.config.js` đã được cấu hình với:
- Custom colors (brass, background-dark, etc.)
- Custom fonts (Newsreader, JetBrains Mono)
- Custom spacing và utilities

---

## 📝 Scripts

```bash
# Development
npm run dev          # Chạy development server

# Production
npm run build        # Build production
npm run start        # Chạy production server

# Linting
npm run lint         # Chạy ESLint
```

---

## 🧪 Testing

### Kiểm tra Camera

1. Đảm bảo camera được cấp quyền truy cập
2. Kiểm tra console browser để xem lỗi (nếu có)
3. Đảm bảo đủ ánh sáng khi đo lường

### Kiểm tra MediaPipe

- MediaPipe Pose được load từ CDN
- Kiểm tra network tab để đảm bảo các file MediaPipe được tải thành công

---

## 🐛 Troubleshooting

### Camera không hoạt động

- Kiểm tra quyền truy cập camera trong browser settings
- Đảm bảo không có ứng dụng khác đang sử dụng camera
- Thử trên trình duyệt khác

### MediaPipe không load

- Kiểm tra kết nối internet (MediaPipe load từ CDN)
- Kiểm tra console để xem lỗi cụ thể
- Thử clear cache và reload

### Đo lường không chính xác

- Đảm bảo đủ ánh sáng
- Đứng đúng vị trí trong khung hình
- Giữ nguyên tư thế trong suốt quá trình đo

---

## 🤝 Đóng góp

Chúng tôi hoan nghênh mọi đóng góp! Vui lòng:

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

### Code Style

- Sử dụng TypeScript cho type safety
- Tuân thủ ESLint rules
- Format code với Prettier (nếu có)
- Viết comments cho các function phức tạp

---

## 📄 License

Dự án này là private và không có license công khai.

---

## 👥 Team

- **Development**: Raidexi Team
- **AI/ML**: MediaPipe Integration
- **Design**: Custom UI/UX

---

## 📞 Liên hệ

- **Website**: [Raidexi](http://localhost:3000)
- **Email**: support@raidexi.com
- **Issues**: Tạo issue trên repository

---

## 🙏 Acknowledgments

- [MediaPipe](https://mediapipe.dev/) - Computer Vision framework
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Firebase](https://firebase.google.com/) - Backend services

---

<div align="center">

**Made with ❤️ by Raidexi Team**

⭐ Star this repo nếu bạn thấy hữu ích!

</div>
