import { MapPin, Target, BookOpen, Shield, Github, Mail } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Field Alpha 프로젝트 소개 및 답사 철학",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* Project Intro */}
      <section className="mb-12">
        <h1 className="text-3xl font-bold text-foreground mb-4">About Field Alpha</h1>
        <p className="text-base text-muted-foreground leading-relaxed mb-6">
          Field Alpha는 &ldquo;발로 뛴 투자 인사이트&rdquo;를 체계화한 투자 리서치 아카이브입니다.
          2023년 12월 삼성바이오로직스 즉흥 방문을 시작으로, 전국의 산업단지, 신도시, 기업 현장을
          직접 방문하며 수집한 1차 정보를 기록합니다.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              icon: MapPin,
              title: "현장 중심",
              desc: "보고서와 뉴스만으로는 알 수 없는 현장의 공기를 전달합니다.",
            },
            {
              icon: Target,
              title: "투자 엣지",
              desc: "관찰 → 가설 → 검증의 체계적 투자 리서치 프로세스를 구축합니다.",
            },
            {
              icon: BookOpen,
              title: "지식 공유",
              desc: "현장 리서치 방법론과 인사이트를 투자 커뮤니티와 공유합니다.",
            },
            {
              icon: Shield,
              title: "사실과 의견 분리",
              desc: "객관적 관찰 사실과 개인 투자 의견을 명확히 구분합니다.",
            },
          ].map((item) => (
            <div key={item.title} className="bg-card border border-border rounded-xl p-4">
              <item.icon className="w-5 h-5 text-accent mb-2" />
              <h3 className="text-sm font-semibold text-foreground mb-1">{item.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Profile */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-foreground mb-4">프로필</h2>
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center text-2xl font-bold text-accent shrink-0">
              CH
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">이찬희</h3>
              <p className="text-sm text-accent mb-3">Field Researcher & Investor</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                전국 산업단지와 기업 현장을 직접 방문하며 투자 인사이트를 축적하고 있습니다.
                현장에서만 얻을 수 있는 정보의 가치를 믿으며, 체계적인 리서치 아카이브를 구축 중입니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-foreground mb-4">답사 방법론</h2>
        <div className="space-y-4">
          {[
            {
              step: "01",
              title: "사전 리서치",
              desc: "방문 전 기업 공시, 뉴스, 재무제표 분석으로 관찰 포인트 설정",
            },
            {
              step: "02",
              title: "현장 관찰",
              desc: "공장 가동률, 물류 현황, 건설 진척, 주변 인프라 등 객관적 사실 기록",
            },
            {
              step: "03",
              title: "사진 기록",
              desc: "시계열 비교를 위한 체계적 사진 촬영 및 메타데이터 기록",
            },
            {
              step: "04",
              title: "가설 수립",
              desc: "현장 관찰을 바탕으로 투자 가설 수립 및 체크포인트 설정",
            },
            {
              step: "05",
              title: "추적 검증",
              desc: "분기 실적, 공시, 재방문을 통한 가설 검증 및 수정",
            },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-4">
              <div className="w-10 h-10 bg-accent/10 border border-accent/20 rounded-lg flex items-center justify-center text-xs font-bold text-accent shrink-0">
                {item.step}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-foreground mb-4">면책 조항</h2>
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-6">
          <ul className="space-y-3 text-sm text-amber-200/80">
            <li className="flex items-start gap-2">
              <span className="text-amber-400 mt-0.5">1.</span>
              본 사이트의 모든 콘텐츠는 정보 제공 목적이며, 특정 증권의 매수/매도를 권유하지 않습니다.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 mt-0.5">2.</span>
              &ldquo;투자 인사이트&rdquo; 섹션의 내용은 작성 시점 기준 개인 의견이며, 투자 조언이 아닙니다.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 mt-0.5">3.</span>
              투자 판단에 대한 책임은 전적으로 투자자 본인에게 있습니다.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 mt-0.5">4.</span>
              과거의 관찰과 의견이 미래 수익을 보장하지 않습니다.
            </li>
          </ul>
        </div>
      </section>

      {/* Contact */}
      <section>
        <h2 className="text-xl font-bold text-foreground mb-4">연락처</h2>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://github.com/pollmap"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-accent transition-colors"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
          <a
            href="mailto:contact@field-alpha.com"
            className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-accent transition-colors"
          >
            <Mail className="w-4 h-4" />
            Email
          </a>
        </div>
      </section>
    </div>
  );
}
