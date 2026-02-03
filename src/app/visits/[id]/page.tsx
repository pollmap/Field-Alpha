import Link from "next/link";
import {
  MapPin,
  Calendar,
  Clock,
  Cloud,
  Hash,
  ArrowLeft,
  Building2,
  Layers,
} from "lucide-react";
import { getVisits, getVisitById, getCompanyById, getClusterById } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import SectorBadge from "@/components/common/SectorBadge";
import ObservationSection from "@/components/visit/ObservationSection";
import InsightSection from "@/components/visit/InsightSection";

export function generateStaticParams() {
  const visits = getVisits();
  return visits.map((visit) => ({
    id: visit.id,
  }));
}

export default async function VisitDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const visit = getVisitById(id);

  if (!visit) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            답사를 찾을 수 없습니다
          </h1>
          <Link
            href="/visits"
            className="text-accent hover:underline text-sm"
          >
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const cluster = visit.cluster ? getClusterById(visit.cluster) : undefined;
  const companies = visit.companies
    .map((id) => getCompanyById(id))
    .filter(Boolean);

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Back Button */}
        <Link
          href="/visits"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          답사 목록
        </Link>

        {/* Title & Date */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {visit.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatDate(visit.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              {visit.location.region} {visit.location.district}
            </span>
            {visit.location.address && (
              <span className="text-xs text-muted-foreground/70">
                {visit.location.address}
              </span>
            )}
          </div>
        </div>

        {/* Sector Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          {visit.sectors.map((s) => (
            <SectorBadge key={s} sector={s} size="md" />
          ))}
        </div>

        {/* Visit Metadata */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {visit.weather && (
            <div className="bg-card border border-border rounded-lg p-3">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                <Cloud className="w-3.5 h-3.5" />
                날씨
              </div>
              <p className="text-sm font-medium text-foreground">
                {visit.weather}
              </p>
            </div>
          )}
          {visit.duration && (
            <div className="bg-card border border-border rounded-lg p-3">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                <Clock className="w-3.5 h-3.5" />
                소요시간
              </div>
              <p className="text-sm font-medium text-foreground">
                {visit.duration}
              </p>
            </div>
          )}
          <div className="bg-card border border-border rounded-lg p-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
              <Hash className="w-3.5 h-3.5" />
              방문 횟수
            </div>
            <p className="text-sm font-medium text-foreground">
              {visit.visitNumber}차 방문
            </p>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-card border border-border rounded-xl p-5 mb-6">
          <p className="text-sm text-foreground/90 leading-relaxed">
            {visit.summary}
          </p>
        </div>

        {/* Observations */}
        {visit.observations && visit.observations.length > 0 && (
          <div className="mb-6">
            <ObservationSection observations={visit.observations} />
          </div>
        )}

        {/* Insights */}
        {visit.hasInsights && visit.insights && visit.insights.length > 0 && (
          <div className="mb-6">
            <InsightSection insights={visit.insights} date={visit.date} />
          </div>
        )}

        {/* Changes */}
        {visit.changes && visit.changes.length > 0 && (
          <div className="bg-card border border-border rounded-xl p-5 mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">
              이전 방문 대비 변화
            </h3>
            <ul className="space-y-2">
              {visit.changes.map((change, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-foreground/90"
                >
                  <span className="text-accent mt-0.5 shrink-0">&#8594;</span>
                  {change}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Related Companies */}
        {companies.length > 0 && (
          <div className="bg-card border border-border rounded-xl p-5 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="w-5 h-5 text-muted-foreground" />
              <h3 className="text-lg font-semibold text-foreground">
                관련 기업
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {companies.map(
                (company) =>
                  company && (
                    <Link
                      key={company.id}
                      href={`/companies/${company.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-background border border-border rounded-lg text-sm text-foreground hover:border-accent/50 transition-colors"
                    >
                      {company.name}
                    </Link>
                  )
              )}
            </div>
          </div>
        )}

        {/* Related Cluster */}
        {cluster && (
          <div className="bg-card border border-border rounded-xl p-5 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-5 h-5 text-muted-foreground" />
              <h3 className="text-lg font-semibold text-foreground">
                관련 클러스터
              </h3>
            </div>
            <Link
              href={`/clusters/${cluster.id}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-background border border-border rounded-lg text-sm text-foreground hover:border-accent/50 transition-colors"
            >
              {cluster.name}
              <span className="text-xs text-muted-foreground">
                ({cluster.region})
              </span>
            </Link>
          </div>
        )}

        {/* Tags */}
        {visit.tags.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">
              태그
            </h3>
            <div className="flex flex-wrap gap-2">
              {visit.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-card border border-border rounded-full text-xs text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Back Button */}
        <div className="border-t border-border pt-6">
          <Link
            href="/visits"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            답사 목록으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
