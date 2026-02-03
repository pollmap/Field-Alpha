import Link from "next/link";
import { ArrowLeft, Lightbulb, Calendar, MapPin } from "lucide-react";
import { getVisits } from "@/lib/data";
import { getSectorName, getSectorColor, formatDate } from "@/lib/utils";
import SectorBadge from "@/components/common/SectorBadge";

export default function InsightsPage() {
  const visits = getVisits().filter((v) => v.hasInsights);

  // Group visits by sector (use first sector of each visit)
  const groupedBySector: Record<string, typeof visits> = {};
  visits.forEach((visit) => {
    const primarySector = visit.sectors[0] || "other";
    if (!groupedBySector[primarySector]) {
      groupedBySector[primarySector] = [];
    }
    groupedBySector[primarySector].push(visit);
  });

  const sectorKeys = Object.keys(groupedBySector);

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
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-6 h-6 text-yellow-400" />
            <h1 className="text-3xl font-bold text-foreground">인사이트 아카이브</h1>
          </div>
          <p className="text-muted-foreground">
            현장 답사에서 도출한 투자 인사이트 모음 ({visits.length}건)
          </p>
        </div>

        {/* Grouped by Sector */}
        <div className="space-y-10">
          {sectorKeys.map((sectorCode) => {
            const sectorVisits = groupedBySector[sectorCode];
            const sectorColor = getSectorColor(sectorCode);

            return (
              <div key={sectorCode}>
                {/* Sector Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-1 h-8 rounded-full"
                    style={{ backgroundColor: sectorColor }}
                  />
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold text-foreground">
                      {getSectorName(sectorCode)}
                    </h2>
                    <SectorBadge sector={sectorCode} />
                    <span className="text-sm text-muted-foreground">
                      ({sectorVisits.length}건)
                    </span>
                  </div>
                </div>

                {/* Visit Insights */}
                <div className="space-y-4 pl-4 border-l border-border">
                  {sectorVisits.map((visit) => (
                    <div
                      key={visit.id}
                      className="bg-card border border-border rounded-xl p-5"
                    >
                      {/* Visit Title & Meta */}
                      <Link href={`/visits/${visit.id}`}>
                        <h3 className="text-base font-semibold text-foreground hover:text-accent transition-colors mb-2">
                          {visit.title}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(visit.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {visit.location.region} {visit.location.district}
                        </span>
                      </div>

                      {/* Insights List */}
                      {visit.insights && visit.insights.length > 0 && (
                        <ul className="space-y-2">
                          {visit.insights.map((insight, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <Lightbulb
                                className="w-4 h-4 shrink-0 mt-0.5"
                                style={{ color: sectorColor }}
                              />
                              <span>{insight}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
