import Link from "next/link";
import { MapPin, Eye, BarChart3 } from "lucide-react";
import { getClusters, getVisitsByCluster } from "@/lib/data";
import SectorBadge from "@/components/common/SectorBadge";

export default function ClustersPage() {
  const clusters = getClusters();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            산업 클러스터
          </h1>
          <p className="text-muted-foreground">
            전국 주요 산업 클러스터 현황과 답사 기록
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {clusters.map((cluster) => {
            const visits = getVisitsByCluster(cluster.id);
            return (
              <Link key={cluster.id} href={`/clusters/${cluster.id}`}>
                <div className="bg-card border border-border rounded-xl p-5 card-hover cursor-pointer h-full flex flex-col">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h2 className="text-lg font-semibold text-foreground leading-snug">
                      {cluster.name}
                    </h2>
                    <span className="shrink-0 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5" />
                      {cluster.region}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {cluster.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {cluster.sectors.map((s) => (
                      <SectorBadge key={s} sector={s} />
                    ))}
                  </div>

                  {cluster.keyMetrics && (
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {cluster.keyMetrics.employees !== undefined && (
                        <div className="bg-background/50 rounded-lg px-3 py-2">
                          <p className="text-xs text-muted-foreground">고용 인원</p>
                          <p className="text-sm font-semibold text-foreground">
                            {cluster.keyMetrics.employees.toLocaleString()}명
                          </p>
                        </div>
                      )}
                      {cluster.keyMetrics.totalCapa && (
                        <div className="bg-background/50 rounded-lg px-3 py-2">
                          <p className="text-xs text-muted-foreground">총 CAPA</p>
                          <p className="text-sm font-semibold text-foreground">
                            {cluster.keyMetrics.totalCapa}
                          </p>
                        </div>
                      )}
                      {cluster.keyMetrics.established !== undefined && (
                        <div className="bg-background/50 rounded-lg px-3 py-2">
                          <p className="text-xs text-muted-foreground">설립연도</p>
                          <p className="text-sm font-semibold text-foreground">
                            {cluster.keyMetrics.established}년
                          </p>
                        </div>
                      )}
                      {cluster.keyMetrics.area && (
                        <div className="bg-background/50 rounded-lg px-3 py-2">
                          <p className="text-xs text-muted-foreground">면적</p>
                          <p className="text-sm font-semibold text-foreground">
                            {cluster.keyMetrics.area}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mt-auto flex items-center gap-3 text-xs text-muted-foreground pt-3 border-t border-border">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      답사 {visits.length}회
                    </span>
                    <span className="flex items-center gap-1">
                      <BarChart3 className="w-3.5 h-3.5" />
                      기업 {cluster.companies.length}개
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
