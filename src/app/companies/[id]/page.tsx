import Link from "next/link";
import { ArrowLeft, MapPin, Building2, Calendar, Users, TrendingUp, LinkIcon } from "lucide-react";
import { getCompanies, getCompanyById, getVisitsByCompany, getClusterById } from "@/lib/data";
import SectorBadge from "@/components/common/SectorBadge";
import VisitCard from "@/components/visit/VisitCard";

export function generateStaticParams() {
  const companies = getCompanies();
  return companies.map((company) => ({
    id: company.id,
  }));
}

interface CompanyDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function CompanyDetailPage({ params }: CompanyDetailPageProps) {
  const { id } = await params;
  const company = getCompanyById(id);

  if (!company) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">기업을 찾을 수 없습니다</h1>
          <Link href="/companies" className="text-accent hover:underline">
            기업 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const visits = getVisitsByCompany(company.id);
  const cluster = company.cluster ? getClusterById(company.cluster) : undefined;
  const relatedCompanies = (company.relatedCompanies || [])
    .map((rid) => getCompanyById(rid))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Back Button */}
        <Link
          href="/companies"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          기업 목록
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-3xl font-bold text-foreground">{company.name}</h1>
            <SectorBadge sector={company.sector} size="md" />
          </div>
          <p className="text-muted-foreground text-lg mb-1">{company.nameEn}</p>
          {company.stockCode && (
            <div className="flex items-center gap-1.5 text-sm text-accent">
              <TrendingUp className="w-4 h-4" />
              {company.stockCode}
            </div>
          )}
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-accent" />
              <span className="text-xs text-muted-foreground">본사</span>
            </div>
            <p className="text-sm font-semibold text-foreground">{company.headquarters}</p>
          </div>
          {company.founded && (
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-muted-foreground">설립연도</span>
              </div>
              <p className="text-sm font-semibold text-foreground">{company.founded}년</p>
            </div>
          )}
          {company.employees && (
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-muted-foreground">임직원 수</span>
              </div>
              <p className="text-sm font-semibold text-foreground">
                {company.employees.toLocaleString()}명
              </p>
            </div>
          )}
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-4 h-4 text-orange-400" />
              <span className="text-xs text-muted-foreground">산업</span>
            </div>
            <SectorBadge sector={company.sector} />
          </div>
        </div>

        {/* Description */}
        <div className="bg-card border border-border rounded-xl p-5 mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">기업 개요</h2>
          <p className="text-muted-foreground leading-relaxed">{company.description}</p>
        </div>

        {/* Cluster Link */}
        {cluster && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">소속 클러스터</h2>
            <Link href={`/clusters/${cluster.id}`}>
              <div className="bg-card border border-border rounded-xl p-4 card-hover cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <LinkIcon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{cluster.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {cluster.region} · 기업 {cluster.companies.length}개
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Related Companies */}
        {relatedCompanies.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              관련 기업
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedCompanies.map((rc) =>
                rc ? (
                  <Link key={rc.id} href={`/companies/${rc.id}`}>
                    <div className="bg-card border border-border rounded-xl p-4 card-hover cursor-pointer">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-foreground">{rc.name}</h3>
                          <p className="text-xs text-muted-foreground">{rc.nameEn}</p>
                        </div>
                        <SectorBadge sector={rc.sector} />
                      </div>
                    </div>
                  </Link>
                ) : null
              )}
            </div>
          </div>
        )}

        {/* Visit History */}
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
