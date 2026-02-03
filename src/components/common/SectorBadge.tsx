import { getSectorColor, getSectorName } from "@/lib/utils";

interface SectorBadgeProps {
  sector: string;
  size?: "sm" | "md";
}

export default function SectorBadge({ sector, size = "sm" }: SectorBadgeProps) {
  const color = getSectorColor(sector);
  const name = getSectorName(sector);

  return (
    <span
      className="sector-badge inline-flex items-center"
      style={{
        backgroundColor: `${color}18`,
        color: color,
        border: `1px solid ${color}30`,
        fontSize: size === "sm" ? "0.7rem" : "0.8rem",
        padding: size === "sm" ? "2px 8px" : "3px 10px",
      }}
    >
      {name}
    </span>
  );
}
