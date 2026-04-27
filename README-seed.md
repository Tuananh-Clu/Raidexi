# Hướng dẫn Seed Dữ Liệu MongoDB

File `mongo-seed.js` chứa script để tự động tạo dữ liệu mẫu (seed) cho database MongoDB của dự án Raidexi. 
Các collection được seed bao gồm:
- `UniversalSize`
- `BrandRUle` (Tên collection trong database viết hoa U: BrandRUle)
- `CategoryRule`
- `SizeMapping`
- `BrandProfile`

## Cách 1: Chạy trực tiếp với Mongo Shell (mongosh)
Yêu cầu đã cài đặt [MongoDB Shell (`mongosh`)](https://www.mongodb.com/docs/mongodb-shell/install/).

Mở terminal và chạy lệnh sau (thay đổi kết nối URL nếu cần):

### Nêu sử dụng MongoDB Atlas (Trên Cloud)
```bash
mongosh "mongodb+srv://<username>:<password>@cluster0.kkfo6gw.mongodb.net/Raidexi" mongo-seed.js
```
*(Lưu ý: Thay thế `<username>` và `<password>` bằng thông tin kết nối thực tế trong file `.env`)*

### Nếu sử dụng MongoDB dưới Local
```bash
mongosh "mongodb://localhost:27017/Raidexi" mongo-seed.js
```

---

## Cách 2: Chạy bằng MongoDB Compass (Giao diện)
1. Mở phần mềm **MongoDB Compass** và kết nối tới database.
2. Mở cửa sổ **mongosh** (nằm ở thanh phía dưới cùng của giao diện Compass, thường có nút `>_ mongosh`).
3. Copy toàn bộ nội dung của file `mongo-seed.js` (ngoại trừ các dòng comment đầu tiên) và dán thẳng vào terminal của `mongosh` rồi nhấn Enter.

Script sẽ tự động xóa dữ liệu cũ trong các collection này (nếu có) và tạo mới các bản ghi mẫu chuẩn xác với Model (Entities) của Backend.
