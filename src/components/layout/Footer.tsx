import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-accent rounded-lg flex items-center justify-center text-xs font-bold text-primary-foreground">
                FA
              </div>
              <span className="font-bold text-foreground">Field Alpha</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              발로 뛴 투자 인사이트 — 전국 산업단지, 기업 현장 답사 기록 아카이브
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">탐색</h4>
            <ul className="space-y-2">
              {[
                { href: "/map", label: "지도 탐색" },
                { href: "/visits", label: "답사 기록" },
                { href: "/clusters", label: "산업 클러스터" },
                { href: "/companies", label: "기업 프로필" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">면책 조항</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              본 사이트의 모든 투자 인사이트는 개인 의견이며, 투자 조언이 아닙니다.
              투자 판단에 대한 책임은 전적으로 투자자 본인에게 있습니다.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            &copy; 2024-2025 이찬희. Field Alpha Project.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with Next.js &middot; Deployed on GitHub Pages
          </p>
        </div>
      </div>
    </footer>
  );
}
