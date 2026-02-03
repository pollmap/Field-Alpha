import Link from "next/link";
import { MapPin, Eye, Building2, TrendingUp } from "lucide-react";
import { getCompanies } from "@/lib/data";
import SectorBadge from "@/components/common/SectorBadge";

export default function CompaniesPage() {
  const companies = getCompanies();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            기업 목록
          </h1>
          <p className="text-muted-foreground">
            답사를 통해 확인한 기업 정보와 현장 기록
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {companies.map((company) => (
            <Link key={company.id} href={`/companies/${company.id}`}>
              <div className="bg-card border border-border rounded-xl p-5 card-hover cursor-pointer h-full flex flex-col">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground leading-snug">
                      {company.name}
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {company.nameEn}
                    </p>
                  </div>
                  <SectorBadge sector={company.sector} />
                </div>

                {company.stockCode && (
                  <div className="flex items-center gap-1 text-xs text-accent mb-2">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {company.stockCode}
                  </div>
                )}

                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                  <MapPin className="w-3.5 h-3.5" />
                  {company.headquarters}
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                  {company.description}
                </p>

                <div className="flex items-center gap-3 text-xs text-muted-foreground pt-3 border-t border-border mt-auto">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    답사 {company.visits.length}회
                  </span>
                  {company.employees && (
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5" />
                      {company.employees.toLocaleString()}명
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
