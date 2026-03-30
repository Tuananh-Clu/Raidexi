# Raidexi

Raidexi la he thong full-stack ho tro do thong so co the, phan tich du lieu tu anh, luu tru lich su do va goi y kich co quan ao theo thuong hieu. Du an duoc tach thanh 2 phan chinh:

- Frontend web cho nguoi dung thao tac, xem ket qua va quan ly ho so.
- Backend API xu ly xac thuc, luu du lieu, phan tich AI, mapping size va gui mail.

README nay duoc viet chi tiet de giup dev moi co the clone repo, cau hinh moi truong, chay local va hieu nhanh luong du lieu cua he thong.

## 1. Muc tieu du an

Raidexi giai quyet bai toan chon size trang phuc dua tren so do co the thay vi uoc luong bang cam tinh. He thong huong toi quy trinh:

1. Nguoi dung dang nhap vao he thong.
2. Nguoi dung thuc hien do co the hoac nap du lieu tu anh.
3. He thong luu ket qua do va ket hop voi luat size cua thuong hieu.
4. AI sinh nhan xet ve thong so, fit du kien va goi y size.
5. Nguoi dung xem lai ket qua trong dashboard.

## 2. Tong quan kien truc

### 2.1 Frontend

Frontend nam trong `FrontEnd/Raidexi`, su dung:

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Axios
- Firebase
- Framer Motion
- Zustand

Frontend co vai tro:

- Render landing page va cac trang gioi thieu.
- Xu ly luong dang nhap, dang ky, dashboard.
- Thu thap du lieu do co the.
- Goi API backend de luu va phan tich du lieu.
- Hien thi ket qua goi y size.

### 2.2 Backend

Backend nam trong `Backend/Raidexi`, su dung:

- ASP.NET Core tren .NET 10
- Entity Framework Core
- PostgreSQL
- MongoDB
- Firebase Admin SDK
- Google GenAI / Gemini
- MailKit
- Swagger / OpenAPI

Backend co vai tro:

- Xac thuc nguoi dung va phat JWT.
- Luu user vao PostgreSQL.
- Luu du lieu do va mapping size vao MongoDB.
- Goi AI de phan tich size.
- Cung cap API cho frontend.
- Gui email qua SMTP.

## 3. Cau truc thu muc

```text
Raidexi/
|-- Backend/
|   `-- Raidexi/
|       |-- Application/      # DTO, interface service
|       |-- Domain/           # Entity va interface domain
|       |-- Infrastructure/   # Persistence, security, services
|       |-- Migrations/       # EF Core migrations
|       |-- Presentation/     # Controller va service phu tro
|       |-- Program.cs        # Diem vao cua backend
|       |-- appsettings.json
|       `-- Raidexi.csproj
|-- FrontEnd/
|   `-- Raidexi/
|       |-- app/              # Route theo App Router
|       |-- features/         # Module theo tinh nang
|       |-- provider/         # Context/provider dung chung
|       |-- Shared/           # Service, UI, component dung chung
|       |-- public/
|       `-- package.json
|-- License
`-- README.md
```

## 4. Cac trang va module chinh

### 4.1 Frontend routes

Trong thu muc `FrontEnd/Raidexi/app`, hien tai co cac route chinh:

- `/` - landing page
- `/Measurements` - giao dien do thong so
- `/Dashboard` - dashboard nguoi dung
- `/Login` - dang nhap
- `/SignUp` - dang ky
- `/Brand` - thong tin thuong hieu
- `/Brand/result` - ket qua theo thuong hieu
- `/AIAnalyzeImage` - phan tich anh
- `/PreviewMeasurement` - xem truoc ket qua do
- `/Contact` - lien he
- `/Architecture` - trang gioi thieu cau truc
- `/WorkFlow` - mo ta quy trinh hoat dong

### 4.2 Frontend features

Thu muc `FrontEnd/Raidexi/features` duoc tach theo domain:

- `Auth` - dang nhap, dang ky, lay thong tin user
- `Camera` - do thong so, luu measurement
- `Brand` - lay brand profile va xu ly du lieu theo thuong hieu
- `AnalyzeFromPic` - xu ly du lieu lien quan den anh
- `DashboardUser` - dashboard va ho so nguoi dung
- `Home` - cac section landing page
- `Contact` - giao dien lien he
- `Preview` - trang xem truoc thong so
- `WorkFlow` - phan trang trinh bay luong su dung

### 4.3 Backend layers

Backend duoc tach theo kieu layer:

- `Application` chua DTO va contract service.
- `Domain` chua entity va interface nghiep vu.
- `Infrastructure` chua DB context, repository, service xac thuc, mail, AI.
- `Presentation` chua API controller.

## 5. Database va luu tru

Du an dang dung ca PostgreSQL va MongoDB.

### 5.1 PostgreSQL

Thong qua `AppDBContext`, backend hien dang co `DbSet<User>`. Nghia la PostgreSQL dang dong vai tro chinh cho:

- Thong tin nguoi dung
- Dang nhap / dang ky
- Cap nhat ho so user

### 5.2 MongoDB

Thong qua `MongoDbContext`, MongoDB dang duoc dung cho:

- `UniversalSize`
- `BrandRule`
- `CategoryRule`
- `SizeMapping`
- `BrandProfile`
- `MeasureDataUser`
- `DataBrandAnalysis`

Noi cach khac:

- Du lieu user co tinh quan he duoc dat o PostgreSQL.
- Du lieu size mapping, lich su do va ket qua phan tich linh hoat duoc dat o MongoDB.

## 6. Xac thuc va bao mat

He thong hien tai dang su dung JWT cookie.

Luong hoat dong:

1. User dang nhap hoac dang ky.
2. Backend tao JWT.
3. JWT duoc set vao cookie `access_token_client`.
4. Cac request tiep theo doc cookie nay de xac dinh user.

Mot so diem can luu y tu ma nguon hien tai:

- Cookie dang duoc set voi `HttpOnly = true`.
- Cookie dang duoc set voi `Secure = true`.
- Cookie dang duoc set voi `SameSite = None`.
- Thoi han cookie la 7 ngay.

Dieu nay phu hop khi chay qua HTTPS, nhung khi local neu frontend/backend chua dong bo giao thuc thi co the phat sinh loi cookie.

## 7. AI va phan tich size

Backend co 2 luong lien quan den AI:

- Phan tich anh bang Gemini de trich du lieu co cau truc tu bang size.
- Sinh nhan xet va fit du kien dua tren so do co the va thong tin san pham.

Trong service hien tai:

- Bien moi truong `GEMINI_API_KEY` la bat buoc.
- Model dang duoc goi la `gemini-3-flash-preview`.
- Prompt yeu cau AI tra ve JSON hop le de backend parse tu dong.

Dieu nay co nghia la neu output AI sai schema, backend se de bi loi parse. Khi chinh sua prompt hoac DTO can test ky.

## 8. Cac API chinh

### 8.1 User API

- `POST /api/User/Login`
- `POST /api/User/Register`
- `GET /api/User/GetUserData`
- `POST /api/User/Logout`
- `POST /api/User/LoginWithFirebase`
- `POST /api/User/SaveMeasure`
- `POST /api/User/SaveMeasureBrandSize`
- `GET /api/User/GetBrandSizeMeasure`
- `PUT /api/User/UpdateUser`

### 8.2 Mapping size API

- `GET /api/MappingSize/brand-profiles`
- `POST /api/MappingSize/AddBrandProfile`
- `POST /api/MappingSize/AddSizeMapping`
- `POST /api/MappingSize/AddUniversalSize`
- `POST /api/MappingSize/AddCategoryRule`
- `POST /api/MappingSize/AddBrandRule`

### 8.3 Analysis API

- `POST /api/AnalysisDataMeasure/AISuggest`
- `POST /api/AnalysisDataMeasure/GetDataFromImage`
- `POST /api/AnalysisDataMeasure/AnalyseImage`

### 8.4 Mail API

- `POST /api/Mail/send`

## 9. Bien moi truong can cau hinh

### 9.1 Frontend

Tao file `FrontEnd/Raidexi/.env`

```env
KeyGoggle=
authDomain=
projectId=
storageBucket=
messagingSenderId=
appId=
measurementId=
```

Y nghia:

- `KeyGoggle` - API key Firebase cho frontend
- `authDomain` - domain xac thuc Firebase
- `projectId` - Firebase project id
- `storageBucket` - bucket luu tru
- `messagingSenderId` - sender id
- `appId` - Firebase app id
- `measurementId` - id cho analytics

### 9.2 Backend

Tao file `Backend/Raidexi/.env`

```env
FIREBASE_CREDENTIALS_JSON=
MongoUrl=
Databasename=
GEMINI_API_KEY=
MailAdmin=
MailAdminPassword=
```

Y nghia:

- `FIREBASE_CREDENTIALS_JSON` - service account JSON cua Firebase, dang string hoa
- `MongoUrl` - connection string MongoDB
- `Databasename` - ten database trong MongoDB
- `GEMINI_API_KEY` - API key cho Gemini
- `MailAdmin` - tai khoan SMTP gui mail
- `MailAdminPassword` - mat khau hoac app password SMTP

### 9.3 appsettings.json

Backend con doc them:

- `ConnectionStrings:DefaultConnection` - chuoi ket noi PostgreSQL
- `Jwt:Key` - secret key de ky JWT

Khuyen nghi:

- Khong commit secret that vao repo.
- Dua cac gia tri nhay cam vao `.env`, User Secrets, bien moi truong he thong hoac secret manager.

## 10. Yeu cau moi truong de chay local

Can cai dat san:

- Node.js 20 tro len
- npm
- .NET 10 SDK
- PostgreSQL
- MongoDB

Nen kiem tra nhanh:

```powershell
node -v
npm -v
dotnet --version
```

## 11. Huong dan chay local chi tiet

### Buoc 1. Clone repo

```powershell
git clone <repo-url>
Set-Location D:\Frontend\Raidexi
```

### Buoc 2. Cau hinh frontend

```powershell
Set-Location D:\Frontend\Raidexi\FrontEnd\Raidexi
npm install
```

Sau do tao file `.env` nhu muc 9.1.

De chay dev server:

```powershell
npm run dev
```

Mac dinh frontend se chay tai:

```text
http://localhost:3000
```

### Buoc 3. Cau hinh backend

```powershell
Set-Location D:\Frontend\Raidexi\Backend\Raidexi
dotnet restore
```

Sau do:

1. Tao file `.env` nhu muc 9.2.
2. Kiem tra `appsettings.json`.
3. Dam bao PostgreSQL va MongoDB dang chay.

Chay backend:

```powershell
dotnet run
```

Mac dinh frontend dang goi:

```text
http://localhost:5000
```

Swagger trong moi truong development:

```text
http://localhost:5000/swagger
```

### Buoc 4. Chay dong thoi 2 dich vu

Can mo 2 terminal:

- Terminal 1 chay frontend
- Terminal 2 chay backend

Neu muon test day du luong dang nhap, luu cookie va API, nen uu tien chay qua HTTPS hoac dong bo lai CORS / BASE_URL.

## 12. Luong nghiep vu chinh

### 12.1 Dang ky / dang nhap

1. Frontend goi `POST /api/User/Register` hoac `POST /api/User/Login`.
2. Backend kiem tra thong tin user.
3. Backend tao JWT va set cookie `access_token_client`.
4. Frontend goi `GET /api/User/GetUserData` de lay thong tin user da dang nhap.

### 12.2 Dang nhap bang Firebase

1. Frontend lay Firebase token.
2. Frontend goi `POST /api/User/LoginWithFirebase?token=...`
3. Backend verify token qua Firebase Admin.
4. Neu user chua ton tai thi tao moi.
5. Backend set cookie JWT cho session noi bo.

### 12.3 Luu so do co the

1. Frontend thu thap measurement.
2. Frontend goi `POST /api/User/SaveMeasure`.
3. Backend doc user tu cookie JWT.
4. Backend luu lich su do vao collection `MeasureDataUser` trong MongoDB.

### 12.4 Goi y size bang AI

1. Frontend hoac luong nghiep vu tao payload thong so.
2. Backend goi service AI.
3. Gemini tra ve JSON co cau truc.
4. Backend parse ket qua va tra ve cho frontend.
5. Neu can, ket qua duoc luu vao `DataBrandAnalysis`.

### 12.5 Lay du lieu thuong hieu

1. Frontend goi `GET /api/MappingSize/brand-profiles`.
2. Backend lay du lieu tu MongoDB.
3. Frontend render profile / ket qua theo thuong hieu.

## 13. Cac file quan trong nen doc dau tien

Neu ban moi vao du an, nen doc theo thu tu:

1. `FrontEnd/Raidexi/package.json`
2. `FrontEnd/Raidexi/app/page.tsx`
3. `FrontEnd/Raidexi/Shared/Service/Api.ts`
4. `Backend/Raidexi/Program.cs`
5. `Backend/Raidexi/Presentation/Controller/UserController.cs`
6. `Backend/Raidexi/Presentation/Controller/AnalysisDataMeasureController.cs`
7. `Backend/Raidexi/Infrastructure/Services/AuthService.cs`
8. `Backend/Raidexi/Infrastructure/Services/GeminiService.cs`

## 14. Nhung diem can luu y trong code hien tai

Day la cac diem quan trong minh thay tu ma nguon hien tai:

- Frontend dang hard-code `BASE_URL = "http://localhost:5000"` trong service API.
- Backend CORS hien tai cho phep origin `https://localhost:3000`.
- Backend co `UseHttpsRedirection()`, trong khi frontend dang goi HTTP.
- Cookie auth dang `Secure = true`, nen local HTTP co the gap van de.
- Backend se goi `db.Database.Migrate()` khi startup.
- `FIREBASE_CREDENTIALS_JSON` la bat buoc, neu thieu backend se throw exception ngay khi chay.
- Mail service dang gui qua `smtp.gmail.com:587`.

Day la nhung diem quan trong neu ban gap cac loi nhu:

- khong dang nhap duoc
- cookie khong duoc luu
- frontend goi API bi CORS
- backend khong startup vi thieu bien moi truong

## 15. Goi y cai thien README va du an trong tuong lai

Neu mo rong du an, nen bo sung them:

- file `.env.example` cho frontend va backend
- script chay dong thoi ca 2 service
- huong dan seed du lieu MongoDB
- huong dan migration PostgreSQL
- test case mau cho API
- deployment guide cho staging / production

## 16. Ban quyen

Du an di kem file `License` tai thu muc goc.
