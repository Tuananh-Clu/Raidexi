<div align="center">

# 👨‍💻 Hi there, I'm Tuan Anh (Clu) 👋

<img src="https://readme-typing-svg.herokuapp.com?font=Sora&weight=600&size=24&pause=1000&color=512BD4&center=true&vCenter=true&width=435&lines=Junior+Web+Developer;ASP.NET+Core+Specialist;React+%2F+Next.js+Enthusiast;Clean+Architecture+Follower" alt="Typing SVG" />

**Based in Ho Chi Minh City, Vietnam 🇻🇳**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Tuananh-Clu)
[![Facebook](https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](https://www.facebook.com/tuan.anh.827144)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:yianh798@gmail.com)

</div>

---

## 🏆 GitHub Achievements
<div align="center">
  <img src="https://github-profile-trophy.vercel.app/?username=Tuananh-Clu&theme=flat&column=7&margin-w=15&no-bg=true" alt="github trophy" />
</div>

---

## 🛠 My Specialized Stack

### 🎨 Frontend Development
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue)

### ⚙️ Backend Development
![C#](https://img.shields.io/badge/c%23-%23239120.svg?style=for-the-badge&logo=c-sharp&logoColor=white)
![.Net](https://img.shields.io/badge/.NET-512BD4?style=for-the-badge&logo=.net&logoColor=white)
![ASP.NET Core](https://img.shields.io/badge/ASP.NET%20Core-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)
![SignalR](https://img.shields.io/badge/SignalR-00599C?style=for-the-badge&logo=dotnet&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

### 🗄️ Databases & Infrastructure
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

---

## 🚀 Featured Projects

### 📏 [Raidexi — AI Body Measurement & Size Advisor](https://github.com/Tuananh-Clu/Raidexi) `[Monorepo]`
Nền tảng đo số đo cơ thể bằng AI và gợi ý kích cỡ quần áo theo từng thương hiệu. Người dùng đứng trước webcam — hệ thống tự động phát hiện landmark cơ thể, tính toán vai, ngực, eo, hông, chiều cao rồi đối chiếu với bảng size của brand để trả về kết quả cùng nhận xét fit từ Gemini AI. Monorepo gồm Next.js frontend và ASP.NET Core backend.

**Key Features:**
- **Đo số đo từ webcam:** Sử dụng MediaPipe Pose — thu 50 frame, lấy trung bình landmark, tính chu vi theo công thức ellipse với hệ số scale riêng từng vùng.
- **Phân tích bảng size:** Sử dụng Gemini Vision — trích xuất JSON chuẩn rồi đối chiếu trực tiếp với số đo người dùng.
- **Gợi ý size thông minh:** Tính fit percent từng size, map sang US/UK/EU theo yêu cầu với trọng số riêng cho top / bottom / dress.
- **AI Insights:** Gemini AI sinh nhận xét fit 3 chiều: measurement insight, product fit note, expected fit (Regular / Slim / Oversized).
- **System Architecture:** Dual database (PostgreSQL cho user & MongoDB cho rules); Auth đa phương thức (Firebase/JWT); Cache layer cho rules/mappings; Tổ chức theo **Clean Architecture**.

### 🛍️ [Aurelia — Smart Fashion E-Commerce](https://github.com/Tuananh-Clu/Aurelia_E-commerce) `[Production]`
Nền tảng thương mại điện tử thời trang tích hợp AI đo số đo cơ thể bằng camera. Hệ thống bao gồm dashboard riêng cho User, Shop và Admin với phân quyền rõ ràng và logic nghiệp vụ đầy đủ.

**Key Features:**
- AI đo số đo cơ thể qua camera (MediaPipe Pose) — tự động gợi ý size chính xác.
- Ba dashboard độc lập quản lý sản phẩm, đơn hàng và hệ thống.
- **Loyalty & Tier system:** Tích điểm, nâng hạng thành viên, ưu đãi theo cấp bậc.
- **Realtime:** Cập nhật trạng thái đơn hàng tức thì qua SignalR.
- **Security:** JWT Authentication + Google OAuth 2.0.
- 🔗 **[Live Demo](https://aureliashop.vercel.app/)**

### 🎬 [Movie Booking System](https://github.com/Tuananh-Clu/Movie_Booking) `[Fullstack]`
Hệ thống đặt vé xem phim mô phỏng luồng thực tế của rạp chiếu phim từ xem lịch chiếu, chọn ghế theo sơ đồ trực quan đến thanh toán.

**Key Features:**
- Chọn ghế theo sơ đồ phòng chiếu trực quan — trạng thái ghế realtime.
- Quản lý suất chiếu, phòng chiếu, phim — đầy đủ CRUD cho admin.
- Phân quyền User / Admin với JWT và RESTful API thiết kế rõ ràng.

---

## 📊 GitHub Activities

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=Tuananh-Clu&show_icons=true&theme=vue-dark&hide_border=true&title_color=512BD4&icon_color=512BD4" alt="Stats" />
  <br/>
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=Tuananh-Clu&layout=compact&theme=vue-dark&hide_border=true&title_color=512BD4" alt="Top Langs" />
</div>

---

## ⚙️ Core Expertise
- **Backend (.NET):** ASP.NET Core Web API, EF Core, Dependency Injection, SignalR, Background Services, Clean Architecture.
- **Frontend (React/Next.js):** Custom Hooks, Zustand/Context API, Framer Motion, MediaPipe Pose integration.
- **Database:** PostgreSQL, MongoDB (Entity Modeling), SQL Server.

---

## 🌱 Currently Learning & Goal
- **Learning:** `JWT / OAuth2 / OpenID Connect` • `DDD` • `Docker & CI/CD`.
- **Goal:** Trở thành developer có khả năng **thiết kế hệ thống**, tiến tới **Senior / Solution Architect**.

<div align="center">
  <br/>
  <img src="https://komarev.com/ghpvc/?username=Tuananh-Clu&color=512BD4&style=flat-square&label=PROFILE+VIEWS" alt="views" />
</div>
