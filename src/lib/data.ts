import visitsData from "@/data/visits.json";
import clustersData from "@/data/clusters.json";
import companiesData from "@/data/companies.json";
import sectorsData from "@/data/sectors.json";
import newsData from "@/data/news.json";
import disclosuresData from "@/data/disclosures.json";
import type { Visit, Cluster, Company, SectorInfo, Stats } from "@/types";

// ─── Visits ───

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

export function getVisitsByLocation(locationName: string): Visit[] {
  return getVisits().filter((v) => v.location.name === locationName);
}

export function getRecentVisits(count: number = 5): Visit[] {
  return [...getVisits()]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

export function getRelatedVisits(visitId: string): Visit[] {
  const visit = getVisitById(visitId);
  if (!visit) return [];

  return getVisits().filter(
    (v) =>
      v.id !== visitId &&
      (v.location.name === visit.location.name ||
        v.companies.some((c) => visit.companies.includes(c)) ||
        v.cluster === visit.cluster)
  );
}

export function getMonthlyVisitCounts(): Array<{ month: string; count: number }> {
  const visits = getVisits();
  const counts: Record<string, number> = {};

  visits.forEach((v) => {
    const month = v.date.slice(0, 7);
    counts[month] = (counts[month] || 0) + 1;
  });

  return Object.entries(counts)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, count]) => ({
      month: month.replace("-", "."),
      count,
    }));
}

// ─── Clusters ───

export function getClusters(): Cluster[] {
  return clustersData.clusters as Cluster[];
}

export function getClusterById(id: string): Cluster | undefined {
  return getClusters().find((c) => c.id === id);
}

// ─── Companies ───

export function getCompanies(): Company[] {
  return companiesData.companies as Company[];
}

export function getCompanyById(id: string): Company | undefined {
  return getCompanies().find((c) => c.id === id);
}

export function getCompanyByStockCode(code: string): Company | undefined {
  return getCompanies().find((c) => c.stockCode === code);
}

export function getCompaniesBySector(sectorCode: string): Company[] {
  return getCompanies().filter((c) => c.sector === sectorCode);
}

// ─── Sectors ───

export function getSectors(): SectorInfo[] {
  return sectorsData.sectors as SectorInfo[];
}

export function getSectorByCode(code: string): SectorInfo | undefined {
  return getSectors().find((s) => s.code === code);
}

// ─── News & Disclosures ───

export interface NewsEntry {
  companyId: string;
  companyName: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source: string;
}

export interface DisclosureEntry {
  companyId: string;
  companyName: string;
  stockCode: string;
  title: string;
  date: string;
  receiptNo: string;
  filer: string;
  url: string;
}

export function getNews(): NewsEntry[] {
  return newsData.news as NewsEntry[];
}

export function getNewsByCompany(companyId: string): NewsEntry[] {
  return getNews().filter((n) => n.companyId === companyId);
}

export function getRecentNews(count: number = 10): NewsEntry[] {
  return [...getNews()]
    .sort((a, b) => b.pubDate.localeCompare(a.pubDate))
    .slice(0, count);
}

export function getDisclosures(): DisclosureEntry[] {
  return disclosuresData.disclosures as DisclosureEntry[];
}

export function getDisclosuresByCompany(companyId: string): DisclosureEntry[] {
  return getDisclosures().filter((d) => d.companyId === companyId);
}

// ─── Stats ───

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
