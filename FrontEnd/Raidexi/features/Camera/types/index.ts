export interface ProfileTag {
  id: string;
  name: string;
  color: string;
  dataMeasure: MeasurementDataResponse | null;
}
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
  shoulderWidth: number;
  chest: number;
  waist: number;
  hip: number;
  height: number
  neck?: number;
  sleeveLength?: number;
  armHole?: number;
  upperArm?: number;
  inseam?: number;
  crotchDepth?: number;
  thigh?: number;
  outseamLength?: number;
}

export interface data {
  dataMeasure: MeasurementDataResponse;
  lastUpdate: string;
}
