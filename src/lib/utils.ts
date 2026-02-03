import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export function getSectorColor(sectorCode: string): string {
  const colors: Record<string, string> = {
    bio: "#22c55e",
    semi: "#3b82f6",
    battery: "#a855f7",
    display: "#14b8a6",
    shipbuilding: "#06b6d4",
    petrochemical: "#ef4444",
    steel: "#78716c",
    auto: "#ec4899",
    realestate: "#f97316",
    finance: "#eab308",
    infra: "#6366f1",
    cmo: "#22c55e",
    pharma: "#22c55e",
  };
  return colors[sectorCode] || "#6b7280";
}

export function getSectorName(sectorCode: string): string {
  const names: Record<string, string> = {
    bio: "바이오/제약",
    semi: "반도체",
    battery: "2차전지/EV",
    display: "디스플레이",
    shipbuilding: "조선/해양",
    petrochemical: "석유화학",
    steel: "철강/소재",
    auto: "자동차/부품",
    realestate: "부동산",
    finance: "금융",
    infra: "인프라",
    cmo: "CMO/CDMO",
    pharma: "제약",
  };
  return names[sectorCode] || sectorCode;
}
