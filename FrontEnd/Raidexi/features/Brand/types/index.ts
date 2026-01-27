
export interface PartnerImage {
  src: string;
  alt: string;
}

export type GridItem = PartnerImage | { type: 'join' };
export interface FilterBarProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  counts: {
    all: number;
    international: number;
    VietNam: number;
  };
}

export enum FilterType {
  ALL = 'ALL',
  International = 'International',
  VietNam = 'VietNam'
}
export enum BrandStatus {
  OPTIMIZED = 'OPTIMIZED',
  PENDING = 'PENDING',
  RECALIBRATE = 'RECALIBRATE'
}

export interface Brand {
  id: string;
  name: string;
  refCode: string;
  status: BrandStatus;
  lastSync: string;
  metricLabel: string; 
  metricValue: string; 
  icon: string; 
  category: string;
  origin: string;
  segment: string;
  dataSeason: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number|undefined;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}
export enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}

export enum ProductType {
  TOP = 'top',
  BOTTOM = 'bottom',
  DRESS = 'dress'
}

export enum SizeSystem {
  UK = 'UK',
  US = 'US',
  VN = 'VN',
  EU = 'EU'
}

export interface SizePreferences {
  gender: Gender;
  productType: ProductType;
  sizeSystem: SizeSystem;
}
export interface UserMeasurements {
  chest: number | undefined;
  waist: number | undefined;
  shoulderWidth: number | undefined;
  height: number | undefined;
}



export enum RegionSystem {
  UK = 'UK (UK)',
  US = 'US (US)',
  VN = 'VN',
  EU = 'EU (EU)'
}

export interface SizeChartRow {
  size: string;
  chestRange: string;
  shoulderRange: string;
  fitStatus: 'Chật' | 'MATCH' | 'Rộng';
}