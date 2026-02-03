"use client";

import { useEffect, useRef } from "react";

interface StockChartProps {
  stockCode: string;
  companyName: string;
  visitDates?: string[];
}

export default function StockChart({ stockCode, companyName, visitDates = [] }: StockChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const krxCode = stockCode.replace(".KS", "");

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: `KRX:${krxCode}`,
      interval: "D",
      timezone: "Asia/Seoul",
      theme: "dark",
      style: "1",
      locale: "kr",
      allow_symbol_change: false,
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false,
      calendar: false,
      hide_volume: false,
      support_host: "https://www.tradingview.com",
      backgroundColor: "rgba(15, 23, 42, 1)",
      gridColor: "rgba(30, 41, 59, 0.5)",
    });

    container.appendChild(script);
  }, [krxCode]);

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="px-4 pt-4 pb-2 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground">{companyName} 주가</h3>
            <p className="text-xs text-muted-foreground">{stockCode}</p>
          </div>
          {visitDates.length > 0 && (
            <div className="text-right">
              <p className="text-xs text-muted-foreground">답사일</p>
              <div className="flex flex-wrap gap-1 justify-end mt-0.5">
                {visitDates.map((date) => (
                  <span
                    key={date}
                    className="text-[10px] bg-accent/10 text-accent border border-accent/20 px-1.5 py-0.5 rounded"
                  >
                    {date}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        ref={containerRef}
        className="tradingview-widget-container"
        style={{ height: "400px", width: "100%" }}
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-sm text-muted-foreground animate-pulse">차트 로딩 중...</div>
        </div>
      </div>
    </div>
  );
}
