
export interface Metric {
  id: string;
  label: string;
  value: number;
  unit: string;
}

export interface SystemStatus {
  id: string;
  timestamp: string;
  isLive: boolean;
  signalConfidence: number; 
  location: string;
}

export interface MeasurementData {
  metrics: Metric[];
  estimatedSize: string;
  sizeIndex: number;
}
export type MeasurementDataResponse = {
  height: number;
  chest: number;
  waist: number;
  hip: number;
  shoulderWidth: number;
}