
import { MeasurementCardData, Profile,MeasurementDetail } from "./types";

 export const ProfileData:Profile = {
    id: "8821",
    name: "Nguyen Van A",
    role: "Senior Pattern Maker",
    company: "VINATEXTILES CORP",
    email: "nguyen.a@vinatextiles.com",
    phone: "+84 909 123 456",
    location: "Ho Chi Minh City, VN",
    joinDate: "12/10/2021",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJgdJLPWqzm6MR8ebeLq0kCTQmkERIXa7fNVwZgqDSwyXYcwSFScrW-3ZSNumr7GtyHIiss2P0wQzRxVEWJlUcP0zqf6FLJBxp3jTP3XTD65Qeb7OIQe-RTjyMaLZNwZQLKhq-ySUjW2-nzUNoDKNZ7H93-afLaAbik1XuiKmsm1gP6YPOUI47DlaiBXPwACyXBuYQCT4Lhfomlm809TR-upzcb_0PEyuLCuOSbt7TRGdBQN1mx18pCUXfkuKCygQ1fvbUHl59IYTD",
    totalMeasurements: 142,
    completionRate: 98
  };

export  const measurementCards: MeasurementCardData[] =[
    {
      label: "Vòng ngực",
      englishLabel: "Chest",
      value: 98.5,
      unit: "CM",
      icon: "accessibility_new",
      status: "verified"
    },
    {
      label: "Vòng eo",
      englishLabel: "Waist",
      value: 82.0,
      unit: "CM",
      icon: "straighten",
      status: "manual"
    },
    {
      label: "Vòng hông",
      englishLabel: "Hips",
      value: 96.5,
      unit: "CM",
      icon: "boy",
      status: "verified"
    },
    {
      label: "Chiều dài tay",
      englishLabel: "Arm",
      value: 64.0,
      unit: "CM",
      icon: "pan_tool",
      status: "verified"
    }
  ];

 export const measurementDetails: MeasurementDetail[] =[
    {
      id: "1",
      label: "Vòng cổ",
      englishLabel: "Neck Girth",
      value: 38.5,
      unit: "cm",
      date: "12/10/2023",
      method: "3D Scan"
    },
    {
      id: "2",
      label: "Rộng vai",
      englishLabel: "Shoulder Width",
      value: 45.0,
      unit: "cm",
      date: "12/10/2023",
      method: "3D Scan"
    },
    {
      id: "3",
      label: "Độ dài lưng",
      englishLabel: "Back Length",
      value: 52.0,
      unit: "cm",
      date: "05/09/2023",
      method: "Manual"
    },
    {
      id: "4",
      label: "Vòng đùi",
      englishLabel: "Thigh Girth",
      value: 56.0,
      unit: "cm",
      date: "05/09/2023",
      method: "Manual"
    }
  ];