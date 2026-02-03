"use client";

import { useEffect, useState } from "react";
import { getSectorColor } from "@/lib/utils";
import type { Visit } from "@/types";

interface MapViewProps {
  visits: Visit[];
  height?: string;
  zoom?: number;
  center?: [number, number];
  onMarkerClick?: (visitId: string) => void;
}

export default function MapView({
  visits,
  height = "500px",
  zoom = 7,
  center = [36.5, 127.5],
  onMarkerClick,
}: MapViewProps) {
  const [mapReady, setMapReady] = useState(false);
  const [L, setL] = useState<any>(null);

  useEffect(() => {
    import("leaflet").then((leaflet) => {
      setL(leaflet.default);
      setMapReady(true);
    });
  }, []);

  useEffect(() => {
    if (!mapReady || !L) return;

    const container = document.getElementById("field-alpha-map");
    if (!container) return;

    // Clean up existing map
    if ((container as any)._leaflet_id) {
      (container as any)._leaflet_id = null;
      container.innerHTML = "";
    }

    const map = L.map("field-alpha-map").setView(center, zoom);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(map);

    visits.forEach((visit) => {
      const color = getSectorColor(visit.sectors[0] || "");
      const icon = L.divIcon({
        className: "custom-marker",
        html: `<div style="
          width: 24px; height: 24px;
          background: ${color};
          border: 2px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.4);
          display: flex; align-items: center; justify-content: center;
        "><div style="width: 8px; height: 8px; background: white; border-radius: 50%;"></div></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const marker = L.marker(
        [visit.location.coordinates.lat, visit.location.coordinates.lng],
        { icon }
      ).addTo(map);

      const popupContent = `
        <div style="min-width: 200px; padding: 4px;">
          <h3 style="font-size: 14px; font-weight: 600; margin: 0 0 6px 0; color: #f1f5f9;">${visit.title}</h3>
          <p style="font-size: 12px; color: #94a3b8; margin: 0 0 6px 0;">${visit.date} · ${visit.location.region}</p>
          <p style="font-size: 12px; color: #cbd5e1; margin: 0 0 8px 0; line-height: 1.4;">${visit.summary}</p>
          <a href="/visits/${visit.id}" style="font-size: 12px; color: #10b981; text-decoration: none;">상세 보기 &rarr;</a>
        </div>
      `;

      marker.bindPopup(popupContent);

      if (onMarkerClick) {
        marker.on("click", () => onMarkerClick(visit.id));
      }
    });

    return () => {
      map.remove();
    };
  }, [mapReady, L, visits, center, zoom, onMarkerClick]);

  return (
    <div className="relative rounded-xl overflow-hidden border border-border">
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        crossOrigin=""
      />
      <div id="field-alpha-map" style={{ height, width: "100%" }} />
      {!mapReady && (
        <div
          className="absolute inset-0 bg-card flex items-center justify-center"
          style={{ height }}
        >
          <div className="text-muted-foreground text-sm">지도 로딩 중...</div>
        </div>
      )}
    </div>
  );
}
