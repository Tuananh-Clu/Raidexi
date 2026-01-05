
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
    optimized: number;
    pending: number;
    recalibrate: number;
  };
}

export enum FilterType {
  ALL = 'ALL',
  OPTIMIZED = 'OPTIMIZED',
  PENDING = 'PENDING',
  RECALIBRATE = 'RECALIBRATE'
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
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}