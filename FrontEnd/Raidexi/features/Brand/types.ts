
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
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number|undefined;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}
export enum Gender {
  MALE = 'NAM',
  FEMALE = 'NỮ'
}

export enum ProductType {
  TOP = 'ÁO',
  BOTTOM = 'QUẦN',
  DRESS = 'ĐẦM'
}

export enum SizeSystem {
  UK = 'ANH',
  US = 'MỸ',
  VN = 'VN',
  EU = 'CHÂU ÂU'
}

export interface SizePreferences {
  gender: Gender;
  productType: ProductType;
  sizeSystem: SizeSystem;
}
export interface UserMeasurements {
  chest: number;
  waist: number;
  hips: number;
  height: number;
}



export enum RegionSystem {
  UK = 'ANH (UK)',
  US = 'MỸ (US)',
  VN = 'VN',
  EU = 'CHÂU ÂU (EU)'
}

export interface SizeChartRow {
  size: string;
  chestRange: string;
  shoulderRange: string;
  fitStatus: 'Chật' | 'MATCH' | 'Rộng';
}