import Fuse from "fuse.js";
import { getVisits, getCompanies, getClusters } from "./data";
import type { Visit, Company, Cluster } from "@/types";

export type SearchResultType = "visit" | "company" | "cluster";

export interface SearchResult {
  type: SearchResultType;
  id: string;
  title: string;
  subtitle: string;
  sectors: string[];
  url: string;
}

function buildSearchIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  getVisits().forEach((v: Visit) => {
    results.push({
      type: "visit",
      id: v.id,
      title: v.title,
      subtitle: `${v.location.region} ${v.location.district} · ${v.date}`,
      sectors: v.sectors,
      url: `/visits/${v.id}`,
    });
  });

  getCompanies().forEach((c: Company) => {
    results.push({
      type: "company",
      id: c.id,
      title: c.name,
      subtitle: `${c.nameEn} · ${c.headquarters}`,
      sectors: [c.sector],
      url: `/companies/${c.id}`,
    });
  });

  getClusters().forEach((c: Cluster) => {
    results.push({
      type: "cluster",
      id: c.id,
      title: c.name,
      subtitle: `${c.region} · ${c.description.slice(0, 40)}...`,
      sectors: c.sectors,
      url: `/clusters/${c.id}`,
    });
  });

  return results;
}

let fuseInstance: Fuse<SearchResult> | null = null;

function getFuse(): Fuse<SearchResult> {
  if (!fuseInstance) {
    const index = buildSearchIndex();
    fuseInstance = new Fuse(index, {
      keys: ["title", "subtitle", "sectors"],
      threshold: 0.3,
      includeScore: true,
    });
  }
  return fuseInstance;
}

export function search(query: string): SearchResult[] {
  if (!query.trim()) return [];
  const fuse = getFuse();
  return fuse.search(query).map((r) => r.item);
}
