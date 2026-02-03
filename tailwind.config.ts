import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        border: "var(--border)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        // Sector colors
        "sector-bio": "#22c55e",
        "sector-semi": "#3b82f6",
        "sector-battery": "#a855f7",
        "sector-realestate": "#f97316",
        "sector-finance": "#eab308",
        "sector-shipbuilding": "#06b6d4",
        "sector-petrochemical": "#ef4444",
        "sector-steel": "#78716c",
        "sector-auto": "#ec4899",
        "sector-display": "#14b8a6",
        "sector-infra": "#6366f1",
      },
      fontFamily: {
        sans: ["Pretendard", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
