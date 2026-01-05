export interface Profile {
  id: string;
  name: string;
  role: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  avatarUrl: string;
  totalMeasurements: number;
  completionRate: number;
}

export interface MeasurementCardData {
  label: string;
  englishLabel: string;
  value: number;
  unit: string;
  icon: string;
  status: 'verified' | 'manual';
}

export interface MeasurementDetail {
  id: string;
  label: string;
  englishLabel: string;
  value: number;
  unit: string;
  date: string;
  method: '3D Scan' | 'Manual';
}
export interface UserData {
  id: string;
  name: string;
  email: string;
  hashPassword: string;
  createdAt: string;
}