// ============================================
// Field Alpha - Core Type Definitions
// ============================================

/** 산업 분류 코드 */
export type SectorCode =
  | 'bio'
  | 'semi'
  | 'battery'
  | 'display'
  | 'shipbuilding'
  | 'petrochemical'
  | 'steel'
  | 'auto'
  | 'realestate'
  | 'finance'
  | 'infra'
  | 'pharma'
  | 'cmo';

/** 산업 분류 정보 */
export interface SectorInfo {
  code: SectorCode;
  name: string;
  nameEn: string;
  color: string;
  icon: string;
  parent?: string;
}

/** 좌표 */
export interface Coordinates {
  lat: number;
  lng: number;
}

/** 답사 위치 */
export interface VisitLocation {
  name: string;
  coordinates: Coordinates;
  region: string;
  district: string;
  address?: string;
}

/** 답사 기록 */
export interface Visit {
  id: string;
  title: string;
  date: string;
  location: VisitLocation;
  cluster?: string;
  sectors: SectorCode[];
  companies: string[];
  visitNumber: number;
  duration?: string;
  weather?: string;
  summary: string;
  tags: string[];
  photos: string[];
  hasInsights: boolean;
  stockCodes?: string[];
  observations?: string[];
  insights?: string[];
  changes?: string[];
}

/** 클러스터 */
export interface Cluster {
  id: string;
  name: string;
  region: string;
  coordinates: Coordinates;
  sectors: SectorCode[];
  companies: string[];
  description: string;
  keyMetrics?: {
    totalCapa?: string;
    employees?: number;
    established?: number;
    area?: string;
    [key: string]: string | number | undefined;
  };
  visits?: string[];
}

/** 기업 */
export interface Company {
  id: string;
  name: string;
  nameEn: string;
  stockCode?: string;
  sector: SectorCode;
  cluster?: string;
  headquarters: string;
  founded?: number;
  employees?: number;
  description: string;
  visits: string[];
  relatedCompanies?: string[];
}

/** 시계열 엔트리 */
export interface TimelineEntry {
  visitId: string;
  locationId: string;
  date: string;
  photos: string[];
  observations: string[];
  metrics?: {
    constructionProgress?: number;
    employeeEstimate?: number;
    trafficLevel?: 'low' | 'medium' | 'high';
    [key: string]: string | number | undefined;
  };
  changes?: string[];
}

/** 투자 인사이트 */
export interface Insight {
  id: string;
  visitId: string;
  date: string;
  company?: string;
  cluster?: string;
  sector: SectorCode;
  hypothesis: string;
  signals: string[];
  risks: string[];
  checkpoints: string[];
  status: 'active' | 'verified' | 'rejected' | 'monitoring';
}

/** 통계 요약 */
export interface Stats {
  totalVisits: number;
  totalCompanies: number;
  totalClusters: number;
  totalRegions: number;
  sectorDistribution: Record<string, number>;
}
