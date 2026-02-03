import Link from "next/link";
import { ArrowLeft, Building2, Eye } from "lucide-react";
import { getSectors, getVisitsBySector, getCompanies } from "@/lib/data";
import SectorBadge from "@/components/common/SectorBadge";
import VisitCard from "@/components/visit/VisitCard";
import { getSectorName, getSectorColor } from "@/lib/utils";

export function generateStaticParams() {
  const sectors = getSectors();
  return sectors.map((s) => ({
    sector: s.code,
  }));
}

interface SectorPageProps {
  params: Promise<{ sector: string }>;
}

export default async function SectorPage({ params }: SectorPageProps) {
  const { sector } = await params;
  const sectors = getSectors();
  const sectorInfo = sectors.find((s) => s.code === sector);

  if (!sectorInfo) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">섹터를 찾을 수 없습니다</h1>
          <Link href="/" className="text-accent hover:underline">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const visits = getVisitsBySector(sector);
  const companies = getCompanies().filter((c) => c.sector === sector);
  const sectorColor = getSectorColor(sector);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          홈으로
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-3xl font-bold text-foreground">
              {sectorInfo.name}
            </h1>
            <SectorBadge sector={sector} size="md" />
          </div>
          <p className="text-muted-foreground">
            {sectorInfo.nameEn}
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-4 h-4" style={{ color: sectorColor }} />
              <span className="text-xs text-muted-foreground">답사 수</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{visits.length}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-4 h-4" style={{ color: sectorColor }} />
              <span className="text-xs text-muted-foreground">기업 수</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{companies.length}</p>
          </div>
        </div>

        {/* Companies in this sector */}
        {companies.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {sectorInfo.name} 기업 ({companies.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {companies.map((company) => (
                <Link key={company.id} href={`/companies/${company.id}`}>
                  <div className="bg-card border border-border rounded-xl p-4 card-hover cursor-pointer">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground">{company.name}</h3>
                        <p className="text-xs text-muted-foreground">{company.nameEn}</p>
                      </div>
                      {company.stockCode && (
                        <span className="text-xs text-accent">{company.stockCode}</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {company.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Visits in this sector */}
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
