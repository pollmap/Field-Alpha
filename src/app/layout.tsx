import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Field Alpha | 발로 뛴 투자 인사이트",
    template: "%s | Field Alpha",
  },
  description:
    "전국 산업단지·신도시·기업 현장 답사 기록을 체계화한 투자 리서치 아카이브",
  keywords: [
    "현장답사",
    "투자리서치",
    "산업단지",
    "기업분석",
    "필드리서치",
    "Field Alpha",
  ],
  authors: [{ name: "이찬희" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="dark">
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
