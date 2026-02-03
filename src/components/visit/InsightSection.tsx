import { Lightbulb, AlertTriangle } from "lucide-react";

interface InsightSectionProps {
  insights: string[];
  date: string;
}

export default function InsightSection({ insights, date }: InsightSectionProps) {
  return (
    <div className="insight-section rounded-lg p-5">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="w-5 h-5 text-emerald-400" />
        <h3 className="text-lg font-semibold text-foreground">투자 인사이트 (Investment Insights)</h3>
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-2 bg-amber-500/8 border border-amber-500/20 rounded-lg p-3 mb-4">
        <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
        <p className="text-xs text-amber-300/80">
          이 섹션은 <strong>{date}</strong> 기준 개인 의견이며, 투자 조언이 아닙니다.
          투자 판단에 대한 책임은 전적으로 투자자 본인에게 있습니다.
        </p>
      </div>

      <ul className="space-y-2">
        {insights.map((insight, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-foreground/90">
            <span className="text-emerald-400 mt-1 shrink-0">&#9670;</span>
            {insight}
          </li>
        ))}
      </ul>
    </div>
  );
}
