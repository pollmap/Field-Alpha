import visitsData from "@/data/visits.json";
import clustersData from "@/data/clusters.json";
import companiesData from "@/data/companies.json";
import sectorsData from "@/data/sectors.json";
import type { Visit, Cluster, Company, SectorInfo, Stats } from "@/types";

export function getVisits(): Visit[] {
  return visitsData.visits as Visit[];
}

export function getVisitById(id: string): Visit | undefined {
  return getVisits().find((v) => v.id === id);
}

export function getVisitsByCompany(companyId: string): Visit[] {
  return getVisits().filter((v) => v.companies.includes(companyId));
}

export function getVisitsByCluster(clusterId: string): Visit[] {
  return getVisits().filter((v) => v.cluster === clusterId);
}

export function getVisitsBySector(sectorCode: string): Visit[] {
  return getVisits().filter((v) => v.sectors.includes(sectorCode as any));
}

export function getRecentVisits(count: number = 5): Visit[] {
  return [...getVisits()]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

export function getClusters(): Cluster[] {
  return clustersData.clusters as Cluster[];
}

export function getClusterById(id: string): Cluster | undefined {
  return getClusters().find((c) => c.id === id);
}

export function getCompanies(): Company[] {
  return companiesData.companies as Company[];
}

export function getCompanyById(id: string): Company | undefined {
  return getCompanies().find((c) => c.id === id);
}

export function getCompanyByStockCode(code: string): Company | undefined {
  return getCompanies().find((c) => c.stockCode === code);
}

export function getSectors(): SectorInfo[] {
  return sectorsData.sectors as SectorInfo[];
}

export function getStats(): Stats {
  const visits = getVisits();
  const companies = getCompanies();
  const clusters = getClusters();

  const regions = new Set(visits.map((v) => v.location.region));
  const sectorDistribution: Record<string, number> = {};

  visits.forEach((v) => {
    v.sectors.forEach((s) => {
      sectorDistribution[s] = (sectorDistribution[s] || 0) + 1;
    });
  });

  return {
    totalVisits: visits.length,
    totalCompanies: companies.length,
    totalClusters: clusters.length,
    totalRegions: regions.size,
    sectorDistribution,
  };
}
