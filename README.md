<div align="center">

# Hi there, I'm Tuan Anh 👋

**Junior Web Developer — Ho Chi Minh City**

*React · Next.js · ASP.NET Core · Clean Architecture*

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Tuananh-Clu)
[![Facebook](https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](https://www.facebook.com/tuan.anh.827144)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:yianh798@gmail.com)

</div>

---

## 💻 Tech Stack

**Frontend**
<br>
[![My Skills](https://skillicons.dev/icons?i=html,css,js,ts,react,nextjs,tailwind,bootstrap&theme=light)](https://skillicons.dev) 
<br>
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=flat-square&logo=framer&logoColor=blue)
![Zustand](https://img.shields.io/badge/Zustand-764ABC?style=flat-square&logo=react&logoColor=white)

**Backend**
<br>
[![My Skills](https://skillicons.dev/icons?i=cs,dotnet&theme=light)](https://skillicons.dev)
<br>
![ASP.NET Core](https://img.shields.io/badge/ASP.NET_Core-512BD4?style=flat-square&logo=dotnet&logoColor=white)

**Database & Tools**
<br>
[![My Skills](https://skillicons.dev/icons?i=mongodb,postgres,mysql,git,vercel&theme=light)](https://skillicons.dev)
<br>
![SQL Server](https://img.shields.io/badge/SQL_Server-CC2927?style=flat-square&logo=microsoft-sql-server&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=flat-square&logo=postman&logoColor=white)

---

## 🚀 Projects

### 📏 [Raidexi — AI Body Measurement & Size Advisor](https://github.com/Tuananh-Clu/Raidexi) `[Monorepo]`
*Nền tảng đo số đo cơ thể bằng AI và gợi ý kích cỡ quần áo theo từng thương hiệu. Người dùng đứng trước webcam — hệ thống tự động phát hiện landmark cơ thể, tính toán vai, ngực, eo, hông, chiều cao rồi đối chiếu với bảng size của brand để trả về kết quả cùng nhận xét fit từ Gemini AI.*

* **Tính năng nổi bật:**
  * Đo số đo từ webcam bằng MediaPipe Pose — thu 50 frame, lấy trung bình landmark, tính chu vi theo công thức ellipse với hệ số scale riêng từng vùng.
  * Phân tích ảnh bảng size bằng Gemini Vision — trích xuất JSON chuẩn rồi đối chiếu trực tiếp với số đo người dùng.
  * Gợi ý size theo brand với trọng số riêng cho top / bottom / dress.
  * Gemini AI sinh nhận xét fit 3 chiều: measurement insight, product fit note, expected fit.
  * Dual database: PostgreSQL cho user & lịch sử đo, MongoDB cho brand rules / category rules / size mappings linh hoạt.
  * Auth đa phương thức: email/password + Firebase token — JWT phân quyền từng endpoint. Rate limiting 5 request/24h cho anonymous client.
  * Clean Architecture: tách biệt Application / Domain / Infrastructure / Presentation.
* **Tech:** ![Next.js](https://img.shields.io/badge/-Next.js-black?style=flat-square&logo=next.js) ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) ![ASP.NET Core](https://img.shields.io/badge/-ASP.NET_Core-512BD4?style=flat-square&logo=dotnet) ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-4169E1?style=flat-square&logo=postgresql) ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=flat-square&logo=mongodb) ![Gemini](https://img.shields.io/badge/-Gemini_API-8E75B2?style=flat-square&logo=google)

### 🛍️ [Aurelia — Smart Fashion E-Commerce](https://github.com/Tuananh-Clu/Aurelia_E-commerce) `[Production]`
*Nền tảng thương mại điện tử thời trang tích hợp AI đo số đo cơ thể bằng camera. Người dùng có thể tự đo và nhận gợi ý size quần áo phù hợp theo thời gian thực. Hệ thống bao gồm dashboard riêng cho User, Shop và Admin.*

* **Tính năng nổi bật:**
  * AI đo số đo cơ thể qua camera (MediaPipe Pose) — tự động gợi ý size chính xác.
  * Ba dashboard độc lập: User mua hàng, Shop quản lý sản phẩm/đơn hàng, Admin toàn hệ thống.
  * Loyalty & Tier system — tích điểm, nâng hạng thành viên, ưu đãi theo cấp bậc.
  * Realtime notification qua SignalR — cập nhật trạng thái đơn hàng tức thì.
  * JWT Authentication + Google OAuth 2.0 — bảo mật và tiện lợi.
* **Tech:** ![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black) ![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat-square&logo=vite&logoColor=white) ![ASP.NET Core](https://img.shields.io/badge/-ASP.NET_Core-512BD4?style=flat-square&logo=dotnet) ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=flat-square&logo=mongodb) ![SignalR](https://img.shields.io/badge/-SignalR-00599C?style=flat-square)
* 🔗 **[Live Demo](https://aureliashop.vercel.app/)**

### 🎬 [Movie Booking System](https://github.com/Tuananh-Clu/Movie_Booking) `[Fullstack]`
*Hệ thống đặt vé xem phim mô phỏng luồng thực tế của rạp chiếu phim. Từ xem lịch chiếu, chọn ghế theo sơ đồ phòng chiếu, đến thanh toán và xác nhận vé.*

* **Tính năng nổi bật:**
  * Chọn ghế theo sơ đồ phòng chiếu trực quan — trạng thái ghế realtime.
  * Quản lý suất chiếu, phòng chiếu, phim — đầy đủ CRUD cho admin.
  * Phân quyền hai cấp User / Admin với JWT — kiểm soát truy cập từng endpoint.
  * RESTful API thiết kế rõ ràng — dễ tích hợp và mở rộng.
* **Tech:** ![ASP.NET Core](https://img.shields.io/badge/-ASP.NET_Core-512BD4?style=flat-square&logo=dotnet) ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=flat-square&logo=mongodb) ![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black)

---

## ⚙️ Core Skills

| Backend — .NET | Frontend — React / Next.js |
| :--- | :--- |
| <ul><li>ASP.NET Core Web API</li><li>RESTful API Design</li><li>JWT Auth & Authorization</li><li>Google OAuth 2.0 / Firebase</li><li>PostgreSQL + EF Core</li><li>MongoDB & Entity Modeling</li><li>Dependency Injection</li><li>SignalR (Realtime)</li><li>Background Services</li><li>Clean Architecture</li></ul> | <ul><li>Hooks & Custom Hooks</li><li>Component-driven architecture</li><li>Zustand / Context API</li><li>API integration</li><li>Authentication flow</li><li>MediaPipe Pose (CV)</li><li>Performance optimization</li><li>TailwindCSS / Framer Motion</li><li>TypeScript</li></ul> |

---

## 📊 GitHub Stats

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=Tuananh-Clu&show_icons=true&theme=transparent&hide_border=true&title_color=512BD4&icon_color=512BD4&text_color=333" alt="Tuan Anh's GitHub Stats" />
  <br/>
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=Tuananh-Clu&layout=compact&theme=transparent&hide_border=true&title_color=512BD4&text_color=333" alt="Top Languages" />
</div>

---

## 🌱 Currently Learning
`JWT / OAuth2 / OpenID Connect` &nbsp;•&nbsp; `Clean Architecture & DDD` &nbsp;•&nbsp; `React & .NET Performance` &nbsp;•&nbsp; `Docker & CI/CD`

---

## 🎯 Goal
> Trở thành developer có khả năng **thiết kế hệ thống**, hiểu sâu backend, tối ưu frontend — và tiến tới **Senior / Solution Architect** trong tương lai.
