import { Eye } from "lucide-react";

interface ObservationSectionProps {
  observations: string[];
  changes?: string[];
}

export default function ObservationSection({ observations, changes }: ObservationSectionProps) {
  return (
    <div className="observation-section rounded-lg p-5">
      <div className="flex items-center gap-2 mb-3">
        <Eye className="w-5 h-5 text-blue-400" />
        <h3 className="text-lg font-semibold text-foreground">관찰 사실 (Observations)</h3>
      </div>
      <p className="text-xs text-blue-400/70 mb-4">
        이 섹션은 현장에서 직접 확인한 객관적 사실입니다.
      </p>
      <ul className="space-y-2">
        {observations.map((obs, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-foreground/90">
            <span className="text-blue-400 mt-1 shrink-0">•</span>
            {obs}
          </li>
        ))}
      </ul>

      {changes && changes.length > 0 && (
        <div className="mt-5 pt-4 border-t border-blue-400/10">
          <h4 className="text-sm font-semibold text-blue-400 mb-2">이전 방문 대비 변화</h4>
          <ul className="space-y-1.5">
            {changes.map((change, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                <span className="text-blue-400 mt-0.5 shrink-0">&#8594;</span>
                {change}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
