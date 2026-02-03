import Link from "next/link";
import { MapPin, Calendar, Clock, ArrowRight } from "lucide-react";
import SectorBadge from "@/components/common/SectorBadge";
import { formatDate } from "@/lib/utils";
import type { Visit } from "@/types";

interface VisitCardProps {
  visit: Visit;
}

export default function VisitCard({ visit }: VisitCardProps) {
  return (
    <Link href={`/visits/${visit.id}`}>
      <div className="bg-card border border-border rounded-xl p-5 card-hover cursor-pointer">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-base font-semibold text-foreground leading-snug line-clamp-2">
            {visit.title}
          </h3>
          {visit.visitNumber > 1 && (
            <span className="shrink-0 text-xs bg-accent/10 text-accent border border-accent/20 px-2 py-0.5 rounded-full">
              {visit.visitNumber}차 방문
            </span>
          )}
        </div>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{visit.summary}</p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {visit.sectors.map((s) => (
            <SectorBadge key={s} sector={s} />
          ))}
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(visit.date)}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {visit.location.region} {visit.location.district}
          </span>
          {visit.duration && (
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {visit.duration}
            </span>
          )}
        </div>

        <div className="mt-3 flex items-center gap-1 text-xs text-accent">
          상세 보기 <ArrowRight className="w-3 h-3" />
        </div>
      </div>
    </Link>
  );
}
