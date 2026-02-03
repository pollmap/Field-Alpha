"use client";

import { useState } from "react";
import { getVisits, getSectors } from "@/lib/data";
import { getSectorColor, getSectorName } from "@/lib/utils";
import VisitCard from "@/components/visit/VisitCard";
import type { Visit } from "@/types";

export default function VisitsPage() {
  const allVisits: Visit[] = getVisits();
  const sectors = getSectors();
  const [selectedSector, setSelectedSector] = useState<string | null>(null);

  const sortedVisits = [...allVisits].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const filteredVisits = selectedSector
    ? sortedVisits.filter((v) => v.sectors.includes(selectedSector as any))
    : sortedVisits;

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">답사 기록</h1>
          <p className="text-sm text-muted-foreground mt-1">
            총 {filteredVisits.length}건의 답사 기록
          </p>
        </div>

        {/* Sector Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedSector(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              selectedSector === null
                ? "bg-accent text-white border-accent"
                : "bg-card text-muted-foreground border-border hover:border-accent/50"
            }`}
          >
            전체 ({allVisits.length})
          </button>
          {sectors.map((sector) => {
            const color = getSectorColor(sector.code);
            const isActive = selectedSector === sector.code;
            const count = allVisits.filter((v) =>
              v.sectors.includes(sector.code as any)
            ).length;
            if (count === 0) return null;
            return (
              <button
                key={sector.code}
                onClick={() =>
                  setSelectedSector(isActive ? null : sector.code)
                }
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors`}
                style={{
                  backgroundColor: isActive ? `${color}20` : undefined,
                  color: isActive ? color : undefined,
                  borderColor: isActive ? `${color}50` : undefined,
                }}
              >
                {getSectorName(sector.code)} ({count})
              </button>
            );
          })}
        </div>

        {/* Visit Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredVisits.map((visit) => (
            <VisitCard key={visit.id} visit={visit} />
          ))}
        </div>

        {filteredVisits.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">
            해당 섹터의 답사 기록이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
