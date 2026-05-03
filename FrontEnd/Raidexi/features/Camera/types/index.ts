
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
  // core — used by analysis engine
  shoulderWidth: number;
  chest: number;
  waist: number;
  hip: number;
  height: number;
  // supplementary — display & print only
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
