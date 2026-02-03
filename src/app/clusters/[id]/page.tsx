import Link from "next/link";
import { ArrowLeft, MapPin, Building2, Calendar, Users, Maximize2 } from "lucide-react";
import { getClusters, getClusterById, getVisitsByCluster, getCompanyById } from "@/lib/data";
import SectorBadge from "@/components/common/SectorBadge";
import VisitCard from "@/components/visit/VisitCard";

export function generateStaticParams() {
  const clusters = getClusters();
  return clusters.map((cluster) => ({
    id: cluster.id,
  }));
}

interface ClusterDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ClusterDetailPage({ params }: ClusterDetailPageProps) {
  const { id } = await params;
  const cluster = getClusterById(id);

  if (!cluster) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">클러스터를 찾을 수 없습니다</h1>
          <Link href="/clusters" className="text-accent hover:underline">
            클러스터 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const visits = getVisitsByCluster(cluster.id);
  const companies = cluster.companies
    .map((companyId) => getCompanyById(companyId))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Back Button */}
        <Link
          href="/clusters"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          클러스터 목록
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <MapPin className="w-4 h-4" />
            {cluster.region}
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-3">
            {cluster.name}
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            {cluster.description}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {cluster.sectors.map((s) => (
              <SectorBadge key={s} sector={s} size="md" />
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        {cluster.keyMetrics && (
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-foreground mb-4">주요 지표</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {cluster.keyMetrics.totalCapa && (
                <div className="bg-card border border-border rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="w-4 h-4 text-accent" />
                    <span className="text-xs text-muted-foreground">총 CAPA</span>
                  </div>
                  <p className="text-xl font-bold text-foreground">{cluster.keyMetrics.totalCapa}</p>
                </div>
              )}
              {cluster.keyMetrics.employees !== undefined && (
                <div className="bg-card border border-border rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span className="text-xs text-muted-foreground">고용 인원</span>
                  </div>
                  <p className="text-xl font-bold text-foreground">
                    {cluster.keyMetrics.employees.toLocaleString()}명
                  </p>
                </div>
              )}
              {cluster.keyMetrics.established !== undefined && (
                <div className="bg-card border border-border rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-purple-400" />
                    <span className="text-xs text-muted-foreground">설립연도</span>
                  </div>
                  <p className="text-xl font-bold text-foreground">{cluster.keyMetrics.established}년</p>
                </div>
              )}
              {cluster.keyMetrics.area && (
                <div className="bg-card border border-border rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Maximize2 className="w-4 h-4 text-orange-400" />
                    <span className="text-xs text-muted-foreground">면적</span>
                  </div>
                  <p className="text-xl font-bold text-foreground">{cluster.keyMetrics.area}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Companies */}
        {companies.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              소속 기업 ({companies.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {companies.map((company) =>
                company ? (
                  <Link key={company.id} href={`/companies/${company.id}`}>
                    <div className="bg-card border border-border rounded-xl p-4 card-hover cursor-pointer">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-semibold text-foreground">{company.name}</h3>
                          <p className="text-xs text-muted-foreground">{company.nameEn}</p>
                        </div>
                        <SectorBadge sector={company.sector} />
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {company.description}
                      </p>
                      {company.stockCode && (
                        <p className="text-xs text-accent mt-2">{company.stockCode}</p>
                      )}
                    </div>
                  </Link>
                ) : null
              )}
            </div>
          </div>
        )}

        {/* Related Visits */}
        {visits.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              답사 기록 ({visits.length})
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {visits.map((visit) => (
                <VisitCard key={visit.id} visit={visit} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
