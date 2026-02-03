"use client";

import Link from "next/link";
import { MapPin, Building2, Factory, Compass, ArrowRight, TrendingUp, Newspaper, FileText, Calendar } from "lucide-react";
import DynamicMap from "@/components/map/DynamicMap";
import VisitCard from "@/components/visit/VisitCard";
import StatCard from "@/components/common/StatCard";
import SectorChart from "@/components/chart/SectorChart";
import TimelineChart from "@/components/chart/TimelineChart";
import { getRecentVisits, getStats, getVisits, getMonthlyVisitCounts, getRecentNews, getDisclosures } from "@/lib/data";
import { formatDateShort } from "@/lib/utils";

export default function HomePage() {
  const visits = getVisits();
  const recentVisits = getRecentVisits(6);
  const stats = getStats();
  const monthlyData = getMonthlyVisitCounts();
  const recentNews = getRecentNews(5);
  const recentDisclosures = getDisclosures().slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Hero */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-xs text-accent font-medium tracking-wider uppercase">
            Field Research Archive
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
          발로 뛴 투자 인사이트
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
          전국 산업단지, 신도시, 기업 현장 답사 기록을 체계화한 투자 리서치 아카이브.
          현장에서만 얻을 수 있는 1차 정보로 투자 엣지를 만듭니다.
        </p>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <StatCard label="총 답사" value={stats.totalVisits} icon={MapPin} color="#10b981" />
        <StatCard label="방문 기업" value={stats.totalCompanies} icon={Building2} color="#3b82f6" />
        <StatCard label="산업 클러스터" value={stats.totalClusters} icon={Factory} color="#a855f7" />
        <StatCard label="방문 지역" value={stats.totalRegions} icon={Compass} color="#f97316" />
      </section>

      {/* Map */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">답사 지도</h2>
          <Link href="/map" className="flex items-center gap-1 text-sm text-accent hover:underline">
            전체 지도 보기 <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <DynamicMap visits={visits} height="420px" />
      </section>

      {/* Recent Visits + Sidebar */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">최근 답사</h2>
            <Link href="/visits" className="flex items-center gap-1 text-sm text-accent hover:underline">
              전체 보기 <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recentVisits.map((visit) => (
              <VisitCard key={visit.id} visit={visit} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <SectorChart data={stats.sectorDistribution} />
          <TimelineChart data={monthlyData} />

          {/* Quick Links */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3">빠른 탐색</h3>
            <div className="space-y-2">
              {[
                { href: "/clusters", label: "산업 클러스터 분석", icon: Factory },
                { href: "/companies", label: "기업 프로필", icon: Building2 },
                { href: "/insights", label: "투자 인사이트", icon: TrendingUp },
                { href: "/search", label: "통합 검색", icon: MapPin },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                  <ArrowRight className="w-3 h-3 ml-auto" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* News & Disclosures */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent News */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Newspaper className="w-4 h-4 text-accent" />
            <h3 className="text-sm font-semibold text-foreground">최근 뉴스</h3>
          </div>
          <div className="space-y-3">
            {recentNews.map((news, i) => (
              <a
                key={i}
                href={news.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground group-hover:text-accent transition-colors line-clamp-1">
                      {news.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-muted-foreground">{news.source}</span>
                      <span className="text-[10px] text-muted-foreground">{news.pubDate}</span>
                      <span className="text-[10px] text-accent">{news.companyName}</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Recent Disclosures */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-semibold text-foreground">최근 공시 (DART)</h3>
          </div>
          <div className="space-y-3">
            {recentDisclosures.map((disc, i) => (
              <a
                key={i}
                href={disc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-1 h-1 rounded-full bg-blue-400 mt-2 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground group-hover:text-blue-400 transition-colors line-clamp-1">
                      {disc.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-muted-foreground">{disc.date}</span>
                      <span className="text-[10px] text-blue-400">{disc.companyName}</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
