// seed.js
// Script to seed the Raidexi MongoDB database
// Usage: 
// 1. Install mongosh (MongoDB Shell) or node with mongodb package.
// 2. Run: mongosh "mongodb+srv://<username>:<password>@cluster0.kkfo6gw.mongodb.net/Raidexi" mongo-seed.js
// OR local: mongosh "mongodb://localhost:27017/Raidexi" mongo-seed.js

const databaseName = "Raidexi";
db = db.getSiblingDB(databaseName);

print("Starting to seed database: " + db.getName());

// 1. Clean up old collections
db.UniversalSize.drop();
db.BrandRUle.drop();
db.SizeMapping.drop();
print("Dropped old collections.");

// 2. CategoryRule
db.CategoryRule.drop();
db.CategoryRule.insertMany([
  {
    "Category": "top", // Note: Ensure this matches the UI's productType (e.g. "top", "bottom")
    "Fields": ["Chest", "ShoulderWidth"]
  },
  {
    "Category": "bottom",
    "Fields": ["Waist", "Hip"]
  },
  {
    "Category": "dress",
    "Fields": ["Chest", "Waist", "Hip"]
  }
]);
print("Inserted CategoryRule records.");

// 3. BrandProfile
db.BrandProfile.drop();
db.BrandProfile.insertMany([
  {
    "name": "ROUTINE",
    "refCode": "RT-VN-010",
    "status": 0,
    "lastSync": new Date("2026-01-06T10:25:00.000Z"),
    "metricLabel": "Sales",
    "metricValue": "+36.8%",
    "icon": "https://th.bing.com/th/id/OIP.ZKvZkpUjikIbAovQphBCVQHaB6",
    "Category": "Vietnam",
    "origin": "HỒ CHÍ MINH, VIỆT NAM",
    "segment": "BASIC WEAR / OFFICE CASUAL",
    "dataSeason": "SPRING – SUMMER 2024",
    "coverage": "90%",
    "requests": "15K"
  },
  {
    "name": "SIXDO",
    "refCode": "SD-VN-006",
    "status": 1,
    "lastSync": new Date("2026-01-06T08:35:00.000Z"),
    "metricLabel": "Performance",
    "metricValue": "+19.7%",
    "icon": "https://th.bing.com/th/id/OIP.CgWpA4DWGLY6oynRPeI3swHaCe",
    "Category": "Vietnam",
    "origin": "HÀ NỘI, VIỆT NAM",
    "segment": "HIGH-END WOMENSWEAR",
    "dataSeason": "FALL – WINTER 2023",
    "coverage": "75%",
    "requests": "8.5K"
  },
  {
    "name": "JUNO",
    "refCode": "JN-VN-005",
    "status": 0,
    "lastSync": new Date("2026-01-06T10:50:00.000Z"),
    "metricLabel": "Sales",
    "metricValue": "+33.4%",
    "icon": "https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-Juno-Red.png",
    "Category": "Vietnam",
    "origin": "HỒ CHÍ MINH, VIỆT NAM",
    "segment": "WOMENSWEAR / FOOTWEAR",
    "dataSeason": "SPRING – SUMMER 2024",
    "coverage": "85%",
    "requests": "12K"
  }
]);

print("Inserted BrandProfile records.");

// 4. BrandSizeChart — Real data sourced from brand websites
db.BrandSizeChart.drop();
db.BrandSizeChart.insertMany([

  {
    "brandRefCode": "UNIVERSAL",
    "charts": [
      {
        "gender": "male",
        "productType": "top",
        "items": [
          { "labels": { "US": "S", "UK": "36", "EU": "46", "VN": "S" }, "Chest": { "Min": 86, "Max": 91 }, "Waist": { "Min": 71, "Max": 76 }, "ShoulderWidth": { "Min": 41, "Max": 43 }, "Height": { "Min": 160, "Max": 165 } },
          { "labels": { "US": "M", "UK": "38", "EU": "48", "VN": "M" }, "Chest": { "Min": 91, "Max": 96 }, "Waist": { "Min": 76, "Max": 81 }, "ShoulderWidth": { "Min": 43, "Max": 45 }, "Height": { "Min": 165, "Max": 170 } },
          { "labels": { "US": "L", "UK": "40", "EU": "50", "VN": "L" }, "Chest": { "Min": 96, "Max": 101 }, "Waist": { "Min": 81, "Max": 86 }, "ShoulderWidth": { "Min": 45, "Max": 47 }, "Height": { "Min": 170, "Max": 175 } },
          { "labels": { "US": "XL", "UK": "42", "EU": "52", "VN": "XL" }, "Chest": { "Min": 101, "Max": 106 }, "Waist": { "Min": 86, "Max": 91 }, "ShoulderWidth": { "Min": 47, "Max": 49 }, "Height": { "Min": 175, "Max": 180 } }
        ]
      },
      {
        "gender": "female",
        "productType": "top",
        "items": [
          { "labels": { "US": "S", "UK": "8", "EU": "36", "VN": "S" }, "Chest": { "Min": 80, "Max": 84 }, "Waist": { "Min": 64, "Max": 68 }, "ShoulderWidth": { "Min": 36, "Max": 38 }, "Height": { "Min": 155, "Max": 160 } },
          { "labels": { "US": "M", "UK": "10", "EU": "38", "VN": "M" }, "Chest": { "Min": 84, "Max": 88 }, "Waist": { "Min": 68, "Max": 72 }, "ShoulderWidth": { "Min": 38, "Max": 40 }, "Height": { "Min": 160, "Max": 165 } },
          { "labels": { "US": "L", "UK": "12", "EU": "40", "VN": "L" }, "Chest": { "Min": 88, "Max": 92 }, "Waist": { "Min": 72, "Max": 76 }, "ShoulderWidth": { "Min": 40, "Max": 42 }, "Height": { "Min": 165, "Max": 170 } }
        ]
      },
      {
        "gender": "female",
        "productType": "dress",
        "items": [
          { "labels": { "US": "S", "UK": "8", "EU": "36", "VN": "S" }, "Chest": { "Min": 80, "Max": 84 }, "Waist": { "Min": 64, "Max": 68 }, "Hip": { "Min": 86, "Max": 90 }, "Height": { "Min": 155, "Max": 160 } },
          { "labels": { "US": "M", "UK": "10", "EU": "38", "VN": "M" }, "Chest": { "Min": 84, "Max": 88 }, "Waist": { "Min": 68, "Max": 72 }, "Hip": { "Min": 90, "Max": 94 }, "Height": { "Min": 160, "Max": 165 } },
          { "labels": { "US": "L", "UK": "12", "EU": "40", "VN": "L" }, "Chest": { "Min": 88, "Max": 92 }, "Waist": { "Min": 72, "Max": 76 }, "Hip": { "Min": 94, "Max": 98 }, "Height": { "Min": 165, "Max": 170 } }
        ]
      }
    ]
  },

  {
    "brandRefCode": "RT-VN-010",
    "charts": [
      {
        "gender": "male",
        "productType": "top",
        "items": [
          { "labels": { "VN": "S" }, "Chest": { "Min": 84, "Max": 88 }, "Waist": { "Min": 70, "Max": 74 }, "ShoulderWidth": { "Min": 40, "Max": 42 }, "Height": { "Min": 160, "Max": 165 } },
          { "labels": { "VN": "M" }, "Chest": { "Min": 88, "Max": 92 }, "Waist": { "Min": 74, "Max": 78 }, "ShoulderWidth": { "Min": 42, "Max": 44 }, "Height": { "Min": 165, "Max": 170 } },
          { "labels": { "VN": "L" }, "Chest": { "Min": 92, "Max": 96 }, "Waist": { "Min": 78, "Max": 82 }, "ShoulderWidth": { "Min": 44, "Max": 46 }, "Height": { "Min": 170, "Max": 175 } },
          { "labels": { "VN": "XL" }, "Chest": { "Min": 96, "Max": 100 }, "Waist": { "Min": 82, "Max": 86 }, "ShoulderWidth": { "Min": 46, "Max": 48 }, "Height": { "Min": 175, "Max": 180 } }
        ]
      },
      {
        "gender": "male",
        "productType": "bottom",
        "items": [
          { "labels": { "VN": "S" }, "Waist": { "Min": 70, "Max": 74 }, "Hip": { "Min": 88, "Max": 92 }, "Height": { "Min": 160, "Max": 165 } },
          { "labels": { "VN": "M" }, "Waist": { "Min": 74, "Max": 78 }, "Hip": { "Min": 92, "Max": 96 }, "Height": { "Min": 165, "Max": 170 } },
          { "labels": { "VN": "L" }, "Waist": { "Min": 78, "Max": 82 }, "Hip": { "Min": 96, "Max": 100 }, "Height": { "Min": 170, "Max": 175 } },
          { "labels": { "VN": "XL" }, "Waist": { "Min": 82, "Max": 86 }, "Hip": { "Min": 100, "Max": 104 }, "Height": { "Min": 175, "Max": 180 } }
        ]
      },
      {
        "gender": "female",
        "productType": "top",
        "items": [
          { "labels": { "VN": "S" }, "Chest": { "Min": 80, "Max": 84 }, "Waist": { "Min": 62, "Max": 66 }, "ShoulderWidth": { "Min": 36, "Max": 38 }, "Height": { "Min": 155, "Max": 160 } },
          { "labels": { "VN": "M" }, "Chest": { "Min": 84, "Max": 88 }, "Waist": { "Min": 66, "Max": 70 }, "ShoulderWidth": { "Min": 38, "Max": 40 }, "Height": { "Min": 160, "Max": 165 } },
          { "labels": { "VN": "L" }, "Chest": { "Min": 88, "Max": 92 }, "Waist": { "Min": 70, "Max": 74 }, "ShoulderWidth": { "Min": 40, "Max": 42 }, "Height": { "Min": 165, "Max": 170 } }
        ]
      }
    ]
  },
  {
    "brandRefCode": "SD-VN-006",
    "charts": [
      {
        "gender": "female",
        "productType": "dress",
        "items": [
          { "labels": { "VN": "S" }, "Chest": { "Min": 82, "Max": 86 }, "Waist": { "Min": 64, "Max": 68 }, "Hip": { "Min": 86, "Max": 90 }, "Height": { "Min": 150, "Max": 155 } },
          { "labels": { "VN": "M" }, "Chest": { "Min": 86, "Max": 90 }, "Waist": { "Min": 68, "Max": 72 }, "Hip": { "Min": 90, "Max": 94 }, "Height": { "Min": 155, "Max": 160 } },
          { "labels": { "VN": "L" }, "Chest": { "Min": 90, "Max": 94 }, "Waist": { "Min": 72, "Max": 76 }, "Hip": { "Min": 94, "Max": 98 }, "Height": { "Min": 160, "Max": 165 } },
          { "labels": { "VN": "XL" }, "Chest": { "Min": 94, "Max": 98 }, "Waist": { "Min": 76, "Max": 80 }, "Hip": { "Min": 98, "Max": 102 }, "Height": { "Min": 165, "Max": 170 } }
        ]
      },
      {
        "gender": "female",
        "productType": "top",
        "items": [
          { "labels": { "VN": "S" }, "Chest": { "Min": 82, "Max": 86 }, "Waist": { "Min": 64, "Max": 68 }, "ShoulderWidth": { "Min": 36, "Max": 38 }, "Height": { "Min": 150, "Max": 155 } },
          { "labels": { "VN": "M" }, "Chest": { "Min": 86, "Max": 90 }, "Waist": { "Min": 68, "Max": 72 }, "ShoulderWidth": { "Min": 38, "Max": 40 }, "Height": { "Min": 155, "Max": 160 } },
          { "labels": { "VN": "L" }, "Chest": { "Min": 90, "Max": 94 }, "Waist": { "Min": 72, "Max": 76 }, "ShoulderWidth": { "Min": 40, "Max": 42 }, "Height": { "Min": 160, "Max": 165 } }
        ]
      }
    ]
  },

  {
    "brandRefCode": "JN-VN-005",
    "charts": [
      {
        "gender": "female",
        "productType": "top",
        "items": [
          { "labels": { "VN": "S" }, "Chest": { "Min": 80, "Max": 84 }, "Waist": { "Min": 60, "Max": 64 }, "ShoulderWidth": { "Min": 35, "Max": 37 }, "Height": { "Min": 150, "Max": 155 } },
          { "labels": { "VN": "M" }, "Chest": { "Min": 84, "Max": 88 }, "Waist": { "Min": 64, "Max": 68 }, "ShoulderWidth": { "Min": 37, "Max": 39 }, "Height": { "Min": 155, "Max": 160 } },
          { "labels": { "VN": "L" }, "Chest": { "Min": 88, "Max": 92 }, "Waist": { "Min": 68, "Max": 72 }, "ShoulderWidth": { "Min": 39, "Max": 41 }, "Height": { "Min": 160, "Max": 165 } }
        ]
      },
      {
        "gender": "female",
        "productType": "dress",
        "items": [
          { "labels": { "VN": "S" }, "Chest": { "Min": 80, "Max": 84 }, "Waist": { "Min": 60, "Max": 64 }, "Hip": { "Min": 86, "Max": 90 }, "Height": { "Min": 150, "Max": 155 } },
          { "labels": { "VN": "M" }, "Chest": { "Min": 84, "Max": 88 }, "Waist": { "Min": 64, "Max": 68 }, "Hip": { "Min": 90, "Max": 94 }, "Height": { "Min": 155, "Max": 160 } },
          { "labels": { "VN": "L" }, "Chest": { "Min": 88, "Max": 92 }, "Waist": { "Min": 68, "Max": 72 }, "Hip": { "Min": 94, "Max": 98 }, "Height": { "Min": 160, "Max": 165 } }
        ]
      }
    ]
  },

  {
    "brandRefCode": "ZR-INT-001",
    "charts": [
      {
        "gender": "male",
        "productType": "top",
        "items": [
          { "labels": { "US": "S", "EU": "44", "VN": "S" }, "Chest": { "Min": 89, "Max": 93 }, "Waist": { "Min": 71, "Max": 80 }, "ShoulderWidth": { "Min": 42, "Max": 44 }, "Height": { "Min": 170, "Max": 175 } },
          { "labels": { "US": "M", "EU": "48", "VN": "M" }, "Chest": { "Min": 94, "Max": 98 }, "Waist": { "Min": 80, "Max": 84 }, "ShoulderWidth": { "Min": 44, "Max": 46 }, "Height": { "Min": 175, "Max": 180 } },
          { "labels": { "US": "L", "EU": "50", "VN": "L" }, "Chest": { "Min": 99, "Max": 103 }, "Waist": { "Min": 84, "Max": 91 }, "ShoulderWidth": { "Min": 46, "Max": 48 }, "Height": { "Min": 178, "Max": 183 } },
          { "labels": { "US": "XL", "EU": "52", "VN": "XL" }, "Chest": { "Min": 104, "Max": 108 }, "Waist": { "Min": 95, "Max": 101 }, "ShoulderWidth": { "Min": 48, "Max": 50 }, "Height": { "Min": 180, "Max": 185 } }
        ]
      },
      {
        "gender": "female",
        "productType": "top",
        "items": [
          { "labels": { "US": "XS", "EU": "32", "VN": "XS" }, "Chest": { "Min": 78, "Max": 82 }, "Waist": { "Min": 58, "Max": 62 }, "ShoulderWidth": { "Min": 35, "Max": 37 }, "Height": { "Min": 155, "Max": 160 } },
          { "labels": { "US": "S", "EU": "34", "VN": "S" }, "Chest": { "Min": 82, "Max": 86 }, "Waist": { "Min": 62, "Max": 66 }, "ShoulderWidth": { "Min": 37, "Max": 38 }, "Height": { "Min": 158, "Max": 163 } },
          { "labels": { "US": "M", "EU": "36", "VN": "M" }, "Chest": { "Min": 86, "Max": 90 }, "Waist": { "Min": 66, "Max": 70 }, "ShoulderWidth": { "Min": 38, "Max": 40 }, "Height": { "Min": 160, "Max": 165 } },
          { "labels": { "US": "L", "EU": "38", "VN": "L" }, "Chest": { "Min": 90, "Max": 94 }, "Waist": { "Min": 70, "Max": 74 }, "ShoulderWidth": { "Min": 40, "Max": 42 }, "Height": { "Min": 163, "Max": 168 } }
        ]
      }
    ]
  },

  {
    "brandRefCode": "BH-VN-012",
    "charts": [
      {
        "gender": "male",
        "productType": "top",
        "items": [
          { "labels": { "VN": "S" }, "Chest": { "Min": 96, "Max": 100 }, "Waist": { "Min": 80, "Max": 86 }, "ShoulderWidth": { "Min": 48, "Max": 52 }, "Height": { "Min": 160, "Max": 168 } },
          { "labels": { "VN": "M" }, "Chest": { "Min": 100, "Max": 106 }, "Waist": { "Min": 84, "Max": 90 }, "ShoulderWidth": { "Min": 50, "Max": 54 }, "Height": { "Min": 165, "Max": 173 } },
          { "labels": { "VN": "L" }, "Chest": { "Min": 106, "Max": 112 }, "Waist": { "Min": 88, "Max": 94 }, "ShoulderWidth": { "Min": 52, "Max": 56 }, "Height": { "Min": 170, "Max": 178 } },
          { "labels": { "VN": "XL" }, "Chest": { "Min": 112, "Max": 118 }, "Waist": { "Min": 92, "Max": 98 }, "ShoulderWidth": { "Min": 54, "Max": 58 }, "Height": { "Min": 175, "Max": 183 } }
        ]
      }
    ]
  },

  {
    "brandRefCode": "UM-VN-013",
    "charts": [
      {
        "gender": "male",
        "productType": "top",
        "items": [
          { "labels": { "VN": "S" }, "Chest": { "Min": 88, "Max": 92 }, "Waist": { "Min": 72, "Max": 76 }, "ShoulderWidth": { "Min": 42, "Max": 44 }, "Height": { "Min": 160, "Max": 168 } },
          { "labels": { "VN": "M" }, "Chest": { "Min": 92, "Max": 96 }, "Waist": { "Min": 76, "Max": 80 }, "ShoulderWidth": { "Min": 44, "Max": 46 }, "Height": { "Min": 165, "Max": 173 } },
          { "labels": { "VN": "L" }, "Chest": { "Min": 96, "Max": 100 }, "Waist": { "Min": 80, "Max": 84 }, "ShoulderWidth": { "Min": 46, "Max": 48 }, "Height": { "Min": 170, "Max": 178 } },
          { "labels": { "VN": "XL" }, "Chest": { "Min": 100, "Max": 106 }, "Waist": { "Min": 84, "Max": 90 }, "ShoulderWidth": { "Min": 48, "Max": 50 }, "Height": { "Min": 175, "Max": 183 } }
        ]
      }
    ]
  },
  {
    "brandRefCode": "HM-INT-002",
    "charts": [
      {
        "gender": "male",
        "productType": "top",
        "items": [
          { "labels": { "US": "XS", "EU": "44", "VN": "XS" }, "Chest": { "Min": 82, "Max": 86 }, "Waist": { "Min": 70, "Max": 74 }, "Height": { "Min": 165, "Max": 170 } },
          { "labels": { "US": "S", "EU": "46", "VN": "S" }, "Chest": { "Min": 86, "Max": 90 }, "Waist": { "Min": 74, "Max": 78 }, "Height": { "Min": 168, "Max": 173 } },
          { "labels": { "US": "M", "EU": "48", "VN": "M" }, "Chest": { "Min": 90, "Max": 94 }, "Waist": { "Min": 78, "Max": 82 }, "Height": { "Min": 172, "Max": 178 } },
          { "labels": { "US": "L", "EU": "50", "VN": "L" }, "Chest": { "Min": 94, "Max": 98 }, "Waist": { "Min": 82, "Max": 86 }, "Height": { "Min": 175, "Max": 180 } },
          { "labels": { "US": "XL", "EU": "52", "VN": "XL" }, "Chest": { "Min": 98, "Max": 102 }, "Waist": { "Min": 86, "Max": 90 }, "Height": { "Min": 178, "Max": 183 } }
        ]
      },
      {
        "gender": "female",
        "productType": "top",
        "items": [
          { "labels": { "US": "XS", "EU": "32", "VN": "XS" }, "Chest": { "Min": 78, "Max": 82 }, "Waist": { "Min": 62, "Max": 66 }, "Height": { "Min": 155, "Max": 160 } },
          { "labels": { "US": "S", "EU": "34", "VN": "S" }, "Chest": { "Min": 82, "Max": 86 }, "Waist": { "Min": 66, "Max": 70 }, "Height": { "Min": 158, "Max": 163 } },
          { "labels": { "US": "M", "EU": "36", "VN": "M" }, "Chest": { "Min": 86, "Max": 90 }, "Waist": { "Min": 70, "Max": 74 }, "Height": { "Min": 160, "Max": 165 } },
          { "labels": { "US": "L", "EU": "38", "VN": "L" }, "Chest": { "Min": 90, "Max": 94 }, "Waist": { "Min": 74, "Max": 78 }, "Height": { "Min": 163, "Max": 168 } }
        ]
      }
    ]
  },
  {
    "brandRefCode": "CM-VN-001",
    "charts": [
      {
        "gender": "male",
        "productType": "top",
        "items": [
          { "labels": { "VN": "S" }, "Chest": { "Min": 86, "Max": 92 }, "Waist": { "Min": 70, "Max": 76 }, "ShoulderWidth": { "Min": 40, "Max": 43 }, "Height": { "Min": 160, "Max": 167 } },
          { "labels": { "VN": "M" }, "Chest": { "Min": 90, "Max": 96 }, "Waist": { "Min": 74, "Max": 80 }, "ShoulderWidth": { "Min": 42, "Max": 45 }, "Height": { "Min": 165, "Max": 172 } },
          { "labels": { "VN": "L" }, "Chest": { "Min": 94, "Max": 100 }, "Waist": { "Min": 78, "Max": 84 }, "ShoulderWidth": { "Min": 43, "Max": 46 }, "Height": { "Min": 170, "Max": 177 } },
          { "labels": { "VN": "XL" }, "Chest": { "Min": 98, "Max": 104 }, "Waist": { "Min": 82, "Max": 88 }, "ShoulderWidth": { "Min": 45, "Max": 48 }, "Height": { "Min": 173, "Max": 180 } },
          { "labels": { "VN": "2XL" }, "Chest": { "Min": 102, "Max": 108 }, "Waist": { "Min": 86, "Max": 92 }, "ShoulderWidth": { "Min": 46, "Max": 49 }, "Height": { "Min": 177, "Max": 185 } }
        ]
      },
      {
        "gender": "male",
        "productType": "bottom",
        "items": [
          { "labels": { "VN": "S" }, "Waist": { "Min": 70, "Max": 76 }, "Hip": { "Min": 88, "Max": 94 }, "Height": { "Min": 160, "Max": 167 } },
          { "labels": { "VN": "M" }, "Waist": { "Min": 74, "Max": 80 }, "Hip": { "Min": 92, "Max": 98 }, "Height": { "Min": 165, "Max": 172 } },
          { "labels": { "VN": "L" }, "Waist": { "Min": 78, "Max": 84 }, "Hip": { "Min": 96, "Max": 102 }, "Height": { "Min": 170, "Max": 177 } },
          { "labels": { "VN": "XL" }, "Waist": { "Min": 82, "Max": 88 }, "Hip": { "Min": 100, "Max": 106 }, "Height": { "Min": 173, "Max": 180 } }
        ]
      }
    ]
  },

  {
    "brandRefCode": "YD-VN-002",
    "charts": [
      {
        "gender": "male",
        "productType": "top",
        "items": [
          { "labels": { "VN": "S" }, "Chest": { "Min": 88, "Max": 93 }, "Waist": { "Min": 74, "Max": 79 }, "Height": { "Min": 160, "Max": 165 } },
          { "labels": { "VN": "M" }, "Chest": { "Min": 93, "Max": 98 }, "Waist": { "Min": 79, "Max": 84 }, "Height": { "Min": 165, "Max": 170 } },
          { "labels": { "VN": "L" }, "Chest": { "Min": 98, "Max": 103 }, "Waist": { "Min": 84, "Max": 89 }, "Height": { "Min": 170, "Max": 175 } },
          { "labels": { "VN": "XL" }, "Chest": { "Min": 103, "Max": 108 }, "Waist": { "Min": 89, "Max": 94 }, "Height": { "Min": 175, "Max": 180 } },
          { "labels": { "VN": "XXL" }, "Chest": { "Min": 108, "Max": 113 }, "Waist": { "Min": 94, "Max": 99 }, "Height": { "Min": 180, "Max": 185 } }
        ]
      },
      {
        "gender": "male",
        "productType": "bottom",
        "items": [
          { "labels": { "VN": "S" }, "Waist": { "Min": 74, "Max": 79 }, "Hip": { "Min": 90, "Max": 95 }, "Height": { "Min": 160, "Max": 165 } },
          { "labels": { "VN": "M" }, "Waist": { "Min": 79, "Max": 84 }, "Hip": { "Min": 95, "Max": 100 }, "Height": { "Min": 165, "Max": 170 } },
          { "labels": { "VN": "L" }, "Waist": { "Min": 84, "Max": 89 }, "Hip": { "Min": 100, "Max": 105 }, "Height": { "Min": 170, "Max": 175 } },
          { "labels": { "VN": "XL" }, "Waist": { "Min": 89, "Max": 94 }, "Hip": { "Min": 105, "Max": 110 }, "Height": { "Min": 175, "Max": 180 } }
        ]
      },
      {
        "gender": "female",
        "productType": "top",
        "items": [
          { "labels": { "VN": "S" }, "Chest": { "Min": 80, "Max": 84 }, "Waist": { "Min": 62, "Max": 66 }, "Height": { "Min": 150, "Max": 157 } },
          { "labels": { "VN": "M" }, "Chest": { "Min": 84, "Max": 88 }, "Waist": { "Min": 66, "Max": 70 }, "Height": { "Min": 155, "Max": 162 } },
          { "labels": { "VN": "L" }, "Chest": { "Min": 88, "Max": 92 }, "Waist": { "Min": 70, "Max": 74 }, "Height": { "Min": 160, "Max": 167 } },
          { "labels": { "VN": "XL" }, "Chest": { "Min": 92, "Max": 96 }, "Waist": { "Min": 74, "Max": 78 }, "Height": { "Min": 163, "Max": 170 } }
        ]
      }
    ]
  },
  {
    "brandRefCode": "CT-VN-003",
    "charts": [
      {
        "gender": "female",
        "productType": "dress",
        "items": [
          { "labels": { "VN": "S" }, "Chest": { "Min": 80, "Max": 84 }, "Waist": { "Min": 64, "Max": 68 }, "Hip": { "Min": 86, "Max": 90 }, "Height": { "Min": 155, "Max": 160 } },
          { "labels": { "VN": "M" }, "Chest": { "Min": 84, "Max": 88 }, "Waist": { "Min": 68, "Max": 72 }, "Hip": { "Min": 90, "Max": 94 }, "Height": { "Min": 160, "Max": 165 } },
          { "labels": { "VN": "L" }, "Chest": { "Min": 88, "Max": 92 }, "Waist": { "Min": 72, "Max": 76 }, "Hip": { "Min": 94, "Max": 98 }, "Height": { "Min": 163, "Max": 168 } },
          { "labels": { "VN": "XL" }, "Chest": { "Min": 92, "Max": 96 }, "Waist": { "Min": 76, "Max": 80 }, "Hip": { "Min": 98, "Max": 102 }, "Height": { "Min": 165, "Max": 170 } }
        ]
      },
      {
        "gender": "female",
        "productType": "top",
        "items": [
          { "labels": { "VN": "S" }, "Chest": { "Min": 80, "Max": 84 }, "Waist": { "Min": 64, "Max": 68 }, "ShoulderWidth": { "Min": 36, "Max": 38 }, "Height": { "Min": 155, "Max": 160 } },
          { "labels": { "VN": "M" }, "Chest": { "Min": 84, "Max": 88 }, "Waist": { "Min": 68, "Max": 72 }, "ShoulderWidth": { "Min": 38, "Max": 40 }, "Height": { "Min": 160, "Max": 165 } },
          { "labels": { "VN": "L" }, "Chest": { "Min": 88, "Max": 92 }, "Waist": { "Min": 72, "Max": 76 }, "ShoulderWidth": { "Min": 40, "Max": 42 }, "Height": { "Min": 163, "Max": 168 } }
        ]
      }
    ]
  },

  {
    "brandRefCode": "HD-VN-004",
    "charts": [
      {
        "gender": "male",
        "productType": "top",
        "items": [
          { "labels": { "VN": "S" }, "Chest": { "Min": 96, "Max": 102 }, "Waist": { "Min": 78, "Max": 84 }, "ShoulderWidth": { "Min": 48, "Max": 52 }, "Height": { "Min": 158, "Max": 165 } },
          { "labels": { "VN": "M" }, "Chest": { "Min": 102, "Max": 108 }, "Waist": { "Min": 82, "Max": 88 }, "ShoulderWidth": { "Min": 50, "Max": 54 }, "Height": { "Min": 163, "Max": 173 } },
          { "labels": { "VN": "L" }, "Chest": { "Min": 108, "Max": 114 }, "Waist": { "Min": 86, "Max": 92 }, "ShoulderWidth": { "Min": 52, "Max": 56 }, "Height": { "Min": 170, "Max": 178 } },
          { "labels": { "VN": "XL" }, "Chest": { "Min": 114, "Max": 120 }, "Waist": { "Min": 90, "Max": 96 }, "ShoulderWidth": { "Min": 54, "Max": 58 }, "Height": { "Min": 175, "Max": 185 } }
        ]
      }
    ]
  },

  {
    "brandRefCode": "AD-INT-005",
    "charts": [
      {
        "gender": "male",
        "productType": "top",
        "items": [
          { "labels": { "US": "XS", "EU": "42", "VN": "XS" }, "Chest": { "Min": 83, "Max": 86 }, "Waist": { "Min": 71, "Max": 74 }, "Hip": { "Min": 82, "Max": 85 }, "Height": { "Min": 163, "Max": 168 } },
          { "labels": { "US": "S", "EU": "44", "VN": "S" }, "Chest": { "Min": 87, "Max": 92 }, "Waist": { "Min": 75, "Max": 80 }, "Hip": { "Min": 86, "Max": 91 }, "Height": { "Min": 168, "Max": 173 } },
          { "labels": { "US": "M", "EU": "48", "VN": "M" }, "Chest": { "Min": 93, "Max": 100 }, "Waist": { "Min": 81, "Max": 88 }, "Hip": { "Min": 92, "Max": 99 }, "Height": { "Min": 173, "Max": 178 } },
          { "labels": { "US": "L", "EU": "50", "VN": "L" }, "Chest": { "Min": 101, "Max": 108 }, "Waist": { "Min": 89, "Max": 96 }, "Hip": { "Min": 100, "Max": 107 }, "Height": { "Min": 178, "Max": 183 } },
          { "labels": { "US": "XL", "EU": "52", "VN": "XL" }, "Chest": { "Min": 109, "Max": 118 }, "Waist": { "Min": 97, "Max": 106 }, "Hip": { "Min": 108, "Max": 116 }, "Height": { "Min": 180, "Max": 186 } }
        ]
      },
      {
        "gender": "female",
        "productType": "top",
        "items": [
          { "labels": { "US": "XS", "EU": "32", "VN": "XS" }, "Chest": { "Min": 77, "Max": 82 }, "Waist": { "Min": 61, "Max": 66 }, "Hip": { "Min": 86, "Max": 91 }, "Height": { "Min": 155, "Max": 160 } },
          { "labels": { "US": "S", "EU": "34", "VN": "S" }, "Chest": { "Min": 83, "Max": 88 }, "Waist": { "Min": 67, "Max": 72 }, "Hip": { "Min": 92, "Max": 97 }, "Height": { "Min": 158, "Max": 163 } },
          { "labels": { "US": "M", "EU": "36", "VN": "M" }, "Chest": { "Min": 89, "Max": 94 }, "Waist": { "Min": 73, "Max": 78 }, "Hip": { "Min": 98, "Max": 103 }, "Height": { "Min": 160, "Max": 165 } },
          { "labels": { "US": "L", "EU": "40", "VN": "L" }, "Chest": { "Min": 95, "Max": 101 }, "Waist": { "Min": 79, "Max": 85 }, "Hip": { "Min": 104, "Max": 110 }, "Height": { "Min": 163, "Max": 168 } }
        ]
      }
    ]
  },

  {
    "brandRefCode": "BO-VN-007",
    "charts": [
      {
        "gender": "male",
        "productType": "top",
        "items": [
          { "labels": { "VN": "S" }, "Chest": { "Min": 90, "Max": 96 }, "Waist": { "Min": 74, "Max": 80 }, "ShoulderWidth": { "Min": 42, "Max": 46 }, "Height": { "Min": 160, "Max": 167 } },
          { "labels": { "VN": "M" }, "Chest": { "Min": 96, "Max": 102 }, "Waist": { "Min": 78, "Max": 84 }, "ShoulderWidth": { "Min": 44, "Max": 48 }, "Height": { "Min": 165, "Max": 173 } },
          { "labels": { "VN": "L" }, "Chest": { "Min": 102, "Max": 108 }, "Waist": { "Min": 82, "Max": 88 }, "ShoulderWidth": { "Min": 46, "Max": 50 }, "Height": { "Min": 170, "Max": 178 } },
          { "labels": { "VN": "XL" }, "Chest": { "Min": 108, "Max": 114 }, "Waist": { "Min": 86, "Max": 92 }, "ShoulderWidth": { "Min": 48, "Max": 52 }, "Height": { "Min": 175, "Max": 183 } }
        ]
      }
    ]
  },
  {
    "brandRefCode": "NK-INT-004",
    "charts": [
      {
        "gender": "male",
        "productType": "top",
        "items": [
          { "labels": { "US": "S", "EU": "44", "VN": "S" }, "Chest": { "Min": 88, "Max": 96 }, "Waist": { "Min": 73, "Max": 81 }, "Hip": { "Min": 88, "Max": 96 }, "Height": { "Min": 168, "Max": 175 } },
          { "labels": { "US": "M", "EU": "48", "VN": "M" }, "Chest": { "Min": 96, "Max": 104 }, "Waist": { "Min": 81, "Max": 89 }, "Hip": { "Min": 96, "Max": 104 }, "Height": { "Min": 173, "Max": 180 } },
          { "labels": { "US": "L", "EU": "50", "VN": "L" }, "Chest": { "Min": 104, "Max": 112 }, "Waist": { "Min": 89, "Max": 97 }, "Hip": { "Min": 104, "Max": 112 }, "Height": { "Min": 178, "Max": 185 } },
          { "labels": { "US": "XL", "EU": "52", "VN": "XL" }, "Chest": { "Min": 112, "Max": 124 }, "Waist": { "Min": 97, "Max": 109 }, "Hip": { "Min": 112, "Max": 120 }, "Height": { "Min": 183, "Max": 190 } }
        ]
      },
      {
        "gender": "female",
        "productType": "top",
        "items": [
          { "labels": { "US": "XS", "EU": "32", "VN": "XS" }, "Chest": { "Min": 76, "Max": 83 }, "Waist": { "Min": 60, "Max": 67 }, "Hip": { "Min": 84, "Max": 91 }, "Height": { "Min": 155, "Max": 160 } },
          { "labels": { "US": "S", "EU": "34", "VN": "S" }, "Chest": { "Min": 83, "Max": 90 }, "Waist": { "Min": 67, "Max": 74 }, "Hip": { "Min": 91, "Max": 98 }, "Height": { "Min": 158, "Max": 163 } },
          { "labels": { "US": "M", "EU": "36", "VN": "M" }, "Chest": { "Min": 90, "Max": 97 }, "Waist": { "Min": 74, "Max": 81 }, "Hip": { "Min": 98, "Max": 105 }, "Height": { "Min": 160, "Max": 167 } },
          { "labels": { "US": "L", "EU": "40", "VN": "L" }, "Chest": { "Min": 97, "Max": 104 }, "Waist": { "Min": 81, "Max": 88 }, "Hip": { "Min": 105, "Max": 112 }, "Height": { "Min": 163, "Max": 170 } }
        ]
      }
    ]
  },

  {
    "brandRefCode": "SS-VN-011",
    "charts": [
      {
        "gender": "male",
        "productType": "top",
        "items": [
          { "labels": { "VN": "0 (S)" }, "Chest": { "Min": 86, "Max": 92 }, "Waist": { "Min": 70, "Max": 76 }, "ShoulderWidth": { "Min": 41, "Max": 44 }, "Height": { "Min": 160, "Max": 170 } },
          { "labels": { "VN": "1 (M)" }, "Chest": { "Min": 92, "Max": 98 }, "Waist": { "Min": 76, "Max": 82 }, "ShoulderWidth": { "Min": 43, "Max": 46 }, "Height": { "Min": 166, "Max": 174 } },
          { "labels": { "VN": "2 (L)" }, "Chest": { "Min": 98, "Max": 104 }, "Waist": { "Min": 80, "Max": 86 }, "ShoulderWidth": { "Min": 45, "Max": 48 }, "Height": { "Min": 170, "Max": 177 } }
        ]
      }
    ]
  },

  {
    "brandRefCode": "UQ-INT-003",
    "charts": [
      {
        "gender": "male",
        "productType": "top",
        "items": [
          { "labels": { "US": "XS", "EU": "42", "VN": "XS" }, "Chest": { "Min": 80, "Max": 86 }, "Waist": { "Min": 66, "Max": 72 }, "Height": { "Min": 160, "Max": 165 } },
          { "labels": { "US": "S", "EU": "44", "VN": "S" }, "Chest": { "Min": 84, "Max": 90 }, "Waist": { "Min": 70, "Max": 76 }, "Height": { "Min": 165, "Max": 170 } },
          { "labels": { "US": "M", "EU": "46", "VN": "M" }, "Chest": { "Min": 88, "Max": 96 }, "Waist": { "Min": 76, "Max": 84 }, "Height": { "Min": 170, "Max": 175 } },
          { "labels": { "US": "L", "EU": "48", "VN": "L" }, "Chest": { "Min": 96, "Max": 104 }, "Waist": { "Min": 84, "Max": 92 }, "Height": { "Min": 175, "Max": 180 } },
          { "labels": { "US": "XL", "EU": "50", "VN": "XL" }, "Chest": { "Min": 104, "Max": 112 }, "Waist": { "Min": 92, "Max": 100 }, "Height": { "Min": 178, "Max": 185 } }
        ]
      },
      {
        "gender": "female",
        "productType": "top",
        "items": [
          { "labels": { "US": "XS", "EU": "32", "VN": "XS" }, "Chest": { "Min": 76, "Max": 82 }, "Waist": { "Min": 58, "Max": 64 }, "Height": { "Min": 150, "Max": 157 } },
          { "labels": { "US": "S", "EU": "34", "VN": "S" }, "Chest": { "Min": 80, "Max": 86 }, "Waist": { "Min": 64, "Max": 70 }, "Height": { "Min": 155, "Max": 162 } },
          { "labels": { "US": "M", "EU": "36", "VN": "M" }, "Chest": { "Min": 84, "Max": 92 }, "Waist": { "Min": 68, "Max": 76 }, "Height": { "Min": 158, "Max": 165 } },
          { "labels": { "US": "L", "EU": "38", "VN": "L" }, "Chest": { "Min": 92, "Max": 100 }, "Waist": { "Min": 76, "Max": 84 }, "Height": { "Min": 162, "Max": 170 } }
        ]
      }
    ]
  },

  {
    "brandRefCode": "BB-VN-008",
    "charts": [
      {
        "gender": "male",
        "productType": "top",
        "items": [
          { "labels": { "VN": "S" }, "Chest": { "Min": 90, "Max": 96 }, "Waist": { "Min": 74, "Max": 80 }, "ShoulderWidth": { "Min": 43, "Max": 46 }, "Height": { "Min": 160, "Max": 168 } },
          { "labels": { "VN": "M" }, "Chest": { "Min": 96, "Max": 102 }, "Waist": { "Min": 78, "Max": 84 }, "ShoulderWidth": { "Min": 45, "Max": 48 }, "Height": { "Min": 165, "Max": 173 } },
          { "labels": { "VN": "L" }, "Chest": { "Min": 102, "Max": 108 }, "Waist": { "Min": 82, "Max": 88 }, "ShoulderWidth": { "Min": 47, "Max": 50 }, "Height": { "Min": 170, "Max": 178 } },
          { "labels": { "VN": "XL" }, "Chest": { "Min": 108, "Max": 114 }, "Waist": { "Min": 86, "Max": 92 }, "ShoulderWidth": { "Min": 49, "Max": 52 }, "Height": { "Min": 175, "Max": 183 } }
        ]
      }
    ]
  }
]);
print("Inserted BrandSizeChart records for 17 brands + UNIVERSAL fallback.");

print("Database seeding completed successfully!");

