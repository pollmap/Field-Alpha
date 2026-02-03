"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { getSectorColor } from "@/lib/utils";

interface TimelineData {
  month: string;
  count: number;
  sector?: string;
}

interface TimelineChartProps {
  data: TimelineData[];
  title?: string;
}

export default function TimelineChart({ data, title = "월별 답사 현황" }: TimelineChartProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4">{title}</h3>
      <div style={{ width: "100%", height: 200 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="month"
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              axisLine={{ stroke: "#1e293b" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              axisLine={{ stroke: "#1e293b" }}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "8px",
                color: "#f1f5f9",
                fontSize: "12px",
              }}
              formatter={(value: any) => [`${value}건`, "답사"]}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.sector ? getSectorColor(entry.sector) : "#10b981"}
                  fillOpacity={0.8}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
