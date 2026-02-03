"use client";

import { useState } from "react";
import DynamicMap from "@/components/map/DynamicMap";
import { getVisits, getSectors } from "@/lib/data";
import { getSectorColor, getSectorName } from "@/lib/utils";
import type { Visit } from "@/types";

export default function MapPage() {
  const visits: Visit[] = getVisits();
  const sectors = getSectors();
  const [selectedSector, setSelectedSector] = useState<string | null>(null);

  const filteredVisits = selectedSector
    ? visits.filter((v) => v.sectors.includes(selectedSector as any))
    : visits;

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-foreground">답사 지도</h1>
          <p className="text-sm text-muted-foreground mt-1">
            전체 {filteredVisits.length}건의 답사 위치
          </p>
        </div>

        {/* Sector Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setSelectedSector(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              selectedSector === null
                ? "bg-accent text-white border-accent"
                : "bg-card text-muted-foreground border-border hover:border-accent/50"
            }`}
          >
            전체
          </button>
          {sectors.map((sector) => {
            const color = getSectorColor(sector.code);
            const isActive = selectedSector === sector.code;
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
                {getSectorName(sector.code)}
              </button>
            );
          })}
        </div>

        {/* Map */}
        <div className="rounded-xl border border-border overflow-hidden">
          <DynamicMap
            visits={filteredVisits}
            height="calc(100vh - 12rem)"
          />
        </div>
      </div>
    </div>
  );
}
