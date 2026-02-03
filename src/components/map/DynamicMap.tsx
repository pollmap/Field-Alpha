"use client";

import dynamic from "next/dynamic";
import type { Visit } from "@/types";

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => (
    <div className="rounded-xl border border-border bg-card flex items-center justify-center" style={{ height: "500px" }}>
      <div className="text-muted-foreground text-sm animate-pulse">지도 로딩 중...</div>
    </div>
  ),
});

interface DynamicMapProps {
  visits: Visit[];
  height?: string;
  zoom?: number;
  center?: [number, number];
  onMarkerClick?: (visitId: string) => void;
}

export default function DynamicMap(props: DynamicMapProps) {
  return <MapView {...props} />;
}
