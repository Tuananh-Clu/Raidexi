// seed.js
// Script to seed the Raidexi MongoDB database
// Usage: 
// 1. Install mongosh (MongoDB Shell) or node with mongodb package.
// 2. Run: mongosh "mongodb+srv://<username>:<password>@cluster0.kkfo6gw.mongodb.net/Raidexi" mongo-seed.js
// OR local: mongosh "mongodb://localhost:27017/Raidexi" mongo-seed.js

// Lấy database hiện tại (nếu chạy qua URL thì nó tự lấy db trên URL, nếu không thì dùng "Raidexi")
const databaseName = "Raidexi";
db = db.getSiblingDB(databaseName);

print("Starting to seed database: " + db.getName());

// 1. UniversalSize
db.UniversalSize.drop();
db.UniversalSize.insertMany([
  {
    "Gender": "Male",
    "Code": "S",
    "Chest": { "Min": 86, "Max": 91 },
    "Waist": { "Min": 71, "Max": 76 },
    "Hip": { "Min": 89, "Max": 94 },
    "ShoulderWidth": { "Min": 41, "Max": 43 },
    "Height": { "Min": 165, "Max": 170 }
  },
  {
    "Gender": "Male",
    "Code": "M",
    "Chest": { "Min": 96, "Max": 101 },
    "Waist": { "Min": 81, "Max": 86 },
    "Hip": { "Min": 96, "Max": 101 },
    "ShoulderWidth": { "Min": 43, "Max": 45 },
    "Height": { "Min": 170, "Max": 175 }
  },
  {
    "Gender": "Male",
    "Code": "L",
    "Chest": { "Min": 106, "Max": 111 },
    "Waist": { "Min": 91, "Max": 96 },
    "Hip": { "Min": 104, "Max": 109 },
    "ShoulderWidth": { "Min": 45, "Max": 47 },
    "Height": { "Min": 175, "Max": 180 }
  },
  {
    "Gender": "Female",
    "Code": "S",
    "Chest": { "Min": 81, "Max": 86 },
    "Waist": { "Min": 63, "Max": 68 },
    "Hip": { "Min": 88, "Max": 93 },
    "ShoulderWidth": { "Min": 36, "Max": 38 },
    "Height": { "Min": 155, "Max": 160 }
  },
  {
    "Gender": "Female",
    "Code": "M",
    "Chest": { "Min": 91, "Max": 96 },
    "Waist": { "Min": 73, "Max": 78 },
    "Hip": { "Min": 98, "Max": 103 },
    "ShoulderWidth": { "Min": 38, "Max": 40 },
    "Height": { "Min": 160, "Max": 165 }
  }
]);
print("Inserted UniversalSize records.");

// 2. BrandRUle (Chú ý tên Collection được định nghĩa trong code là "BrandRUle" với chữ U in hoa)
db.BrandRUle.drop();
db.BrandRUle.insertMany([
  {
    "Brand": "Nike",
    "Chest": 2,
    "Waist": 1,
    "Hip": 2
  },
  {
    "Brand": "Adidas",
    "Chest": 1,
    "Waist": 2,
    "Hip": 1
  },
  {
    "Brand": "Uniqlo",
    "Chest": 0,
    "Waist": 0,
    "Hip": 0
  }
]);
print("Inserted BrandRUle records.");

// 3. CategoryRule
db.CategoryRule.drop();
db.CategoryRule.insertMany([
  {
    "Category": "T-Shirt",
    "Fields": ["Chest", "ShoulderWidth", "Length"]
  },
  {
    "Category": "Pants",
    "Fields": ["Waist", "Hip", "Length"]
  },
  {
    "Category": "Jacket",
    "Fields": ["Chest", "ShoulderWidth", "SleeveLength", "Length"]
  }
]);
print("Inserted CategoryRule records.");

// 4. SizeMapping
db.SizeMapping.drop();
db.SizeMapping.insertMany([
  {
    "Universal": "S",
    "VN": "M",
    "US": "XS",
    "EU": "44",
    "JP": "M",
    "KR": "90"
  },
  {
    "Universal": "M",
    "VN": "L",
    "US": "S",
    "EU": "46",
    "JP": "L",
    "KR": "95"
  },
  {
    "Universal": "L",
    "VN": "XL",
    "US": "M",
    "EU": "48",
    "JP": "LL",
    "KR": "100"
  }
]);
print("Inserted SizeMapping records.");

// 5. BrandProfile
db.BrandProfile.drop();
db.BrandProfile.insertMany([
  {
    "name": "Nike",
    "refCode": "NK-01",
    "status": "OPTIMIZED",
    "lastSync": new Date(),
    "metricLabel": "FitAccuracy",
    "metricValue": "95%",
    "icon": "https://example.com/nike.png",
    "Category": "Sportswear",
    "origin": "US",
    "segment": "Premium",
    "dataSeason": "SS24"
  },
  {
    "name": "Adidas",
    "refCode": "AD-02",
    "status": "OPTIMIZED",
    "lastSync": new Date(),
    "metricLabel": "FitAccuracy",
    "metricValue": "92%",
    "icon": "https://example.com/adidas.png",
    "Category": "Sportswear",
    "origin": "DE",
    "segment": "Premium",
    "dataSeason": "SS24"
  },
  {
    "name": "Uniqlo",
    "refCode": "UQ-03",
    "status": "PENDING",
    "lastSync": new Date(),
    "metricLabel": "FitAccuracy",
    "metricValue": "88%",
    "icon": "https://example.com/uniqlo.png",
    "Category": "Casual",
    "origin": "JP",
    "segment": "Mass",
    "dataSeason": "AW24"
  }
]);
print("Inserted BrandProfile records.");

print("Database seeding completed successfully!");
