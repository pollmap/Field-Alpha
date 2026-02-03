"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search as SearchIcon, MapPin, Building2, Factory, ArrowRight } from "lucide-react";
import { search, type SearchResult } from "@/lib/search";
import SectorBadge from "@/components/common/SectorBadge";

const typeLabels: Record<string, { label: string; icon: typeof MapPin }> = {
  visit: { label: "답사 기록", icon: MapPin },
  company: { label: "기업", icon: Building2 },
  cluster: { label: "클러스터", icon: Factory },
};

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (query.length < 1) return [];
    return search(query);
  }, [query]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-6">통합 검색</h1>

      {/* Search Input */}
      <div className="relative mb-8">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="기업명, 지역, 산업, 키워드로 검색..."
          className="w-full pl-12 pr-4 py-3.5 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors text-sm"
          autoFocus
        />
      </div>

      {/* Results */}
      {query.length > 0 && (
        <div>
          <p className="text-sm text-muted-foreground mb-4">
            {results.length > 0
              ? `${results.length}개 결과`
              : `"${query}"에 대한 검색 결과가 없습니다.`}
          </p>

          <div className="space-y-3">
            {results.map((result) => {
              const typeInfo = typeLabels[result.type];
              const Icon = typeInfo?.icon || MapPin;

              return (
                <Link key={`${result.type}-${result.id}`} href={result.url}>
                  <div className="bg-card border border-border rounded-xl p-4 card-hover cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-accent font-medium">
                            {typeInfo?.label}
                          </span>
                        </div>
                        <h3 className="text-sm font-semibold text-foreground mb-1 truncate">
                          {result.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-2">{result.subtitle}</p>
                        <div className="flex flex-wrap gap-1">
                          {result.sectors.slice(0, 3).map((s) => (
                            <SectorBadge key={s} sector={s} />
                          ))}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 mt-2" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {query.length === 0 && (
        <div className="text-center py-16">
          <SearchIcon className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">
            기업명, 지역, 산업 키워드를 입력하여 검색하세요
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {["삼성바이오", "평택", "반도체", "바이오", "울산", "부동산"].map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-3 py-1.5 bg-card border border-border rounded-full text-xs text-muted-foreground hover:text-foreground hover:border-accent transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
