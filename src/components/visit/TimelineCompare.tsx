"use client";

import { ArrowRight, Calendar, TrendingUp } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { Visit } from "@/types";

interface TimelineCompareProps {
  visits: Visit[];
}

export default function TimelineCompare({ visits }: TimelineCompareProps) {
  if (visits.length < 2) return null;

  const sorted = [...visits].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-accent" />
        <h3 className="text-lg font-semibold text-foreground">시계열 변화 추적</h3>
      </div>
      <p className="text-xs text-muted-foreground mb-5">
        동일 장소 {sorted.length}회 방문 기록의 변화를 추적합니다.
      </p>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />

        <div className="space-y-6">
          {sorted.map((visit, index) => {
            const isLatest = index === sorted.length - 1;
            return (
              <div key={visit.id} className="relative pl-12">
                {/* Timeline dot */}
                <div
                  className={`absolute left-3.5 w-3.5 h-3.5 rounded-full border-2 ${
                    isLatest
                      ? "bg-accent border-accent"
                      : "bg-card border-muted-foreground"
                  }`}
                  style={{ top: "4px" }}
                />

                <div className={`${isLatest ? "border-accent/30" : "border-border"} border rounded-lg p-4`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      {formatDate(visit.date)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({visit.visitNumber}차 방문)
                    </span>
                    {isLatest && (
                      <span className="text-[10px] bg-accent/10 text-accent px-1.5 py-0.5 rounded">
                        최신
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">{visit.summary}</p>

                  {/* Key observations */}
                  {visit.observations && visit.observations.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs text-blue-400 font-medium mb-1">주요 관찰</p>
                      <ul className="space-y-0.5">
                        {visit.observations.slice(0, 3).map((obs, i) => (
                          <li key={i} className="text-xs text-foreground/70 flex items-start gap-1.5">
                            <span className="text-blue-400 mt-0.5">·</span>
                            {obs}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Changes from previous */}
                  {visit.changes && visit.changes.length > 0 && (
                    <div className="bg-accent/5 border border-accent/10 rounded-lg p-3">
                      <p className="text-xs text-accent font-medium mb-1">이전 대비 변화</p>
                      <ul className="space-y-0.5">
                        {visit.changes.map((change, i) => (
                          <li key={i} className="text-xs text-foreground/70 flex items-start gap-1.5">
                            <ArrowRight className="w-3 h-3 text-accent mt-0.5 shrink-0" />
                            {change}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
