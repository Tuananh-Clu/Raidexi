export interface Measurement {
  id: string;
  label: string;
  value: number|undefined;
  unit: string;
}

export type ExportFormat = 'pdf' | 'csv' | 'png';

export interface CustomerData {
  id: string;
  name: string;
  date: string;
}
