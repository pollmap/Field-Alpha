/**
 * 뉴스 수집 스크립트
 *
 * 사용법:
 *   npx ts-node scripts/fetch-news.ts
 *
 * 답사 기업들의 최근 뉴스를 수집하여 src/data/news.json에 저장.
 * 네이버 검색 API 또는 RSS 피드 기반.
 *
 * 환경변수:
 *   NAVER_CLIENT_ID - 네이버 개발자 Client ID
 *   NAVER_CLIENT_SECRET - 네이버 개발자 Client Secret
 */

import * as fs from "fs";
import * as path from "path";

const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID || "";
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET || "";

interface NewsEntry {
  companyId: string;
  companyName: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source: string;
}

const COMPANY_NAMES: Record<string, string> = {
  "samsung-biologics": "삼성바이오로직스",
  "samsung-electronics": "삼성전자",
  "sk-hynix": "SK하이닉스",
  "celltrion": "셀트리온",
  "hyundai-motor": "현대자동차",
  "posco-holdings": "포스코",
  "lg-energy": "LG에너지솔루션",
  "hd-hyundai-heavy": "HD현대중공업",
  "samsung-display": "삼성디스플레이",
  "lg-display": "LG디스플레이",
  "sk-bioscience": "SK바이오사이언스",
  "s-oil": "S-Oil",
  "samsung-heavy": "삼성중공업",
  "lg-chem": "LG화학",
  "naver": "네이버",
  "kakao": "카카오",
};

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, " ");
}

async function fetchNaverNews(query: string): Promise<any[]> {
  const url = `https://openapi.naver.com/v1/search/news.json?query=${encodeURIComponent(query)}&display=5&sort=date`;

  try {
    const response = await fetch(url, {
      headers: {
        "X-Naver-Client-Id": NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": NAVER_CLIENT_SECRET,
      },
    });
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error(`Failed to fetch news for "${query}":`, error);
    return [];
  }
}

async function main() {
  if (!NAVER_CLIENT_ID || !NAVER_CLIENT_SECRET) {
    console.log("⚠️  네이버 API 키가 설정되지 않았습니다.");
    console.log("   네이버 개발자센터(https://developers.naver.com/)에서 애플리케이션을 등록하세요.");
    console.log("   사용법: NAVER_CLIENT_ID=xxx NAVER_CLIENT_SECRET=yyy npx ts-node scripts/fetch-news.ts");
    console.log("");
    console.log("📰 샘플 뉴스 데이터로 대체합니다...");

    const sampleNews: NewsEntry[] = [
      {
        companyId: "samsung-biologics",
        companyName: "삼성바이오로직스",
        title: "삼성바이오, 美 릴리와 5조원 규모 CDMO 계약 체결",
        description: "삼성바이오로직스가 미국 일라이 릴리와 약 5조원 규모의 바이오의약품 위탁생산(CDMO) 계약을 체결했다.",
        link: "https://example.com/news/1",
        pubDate: "2025-01-25",
        source: "한국경제",
      },
      {
        companyId: "samsung-biologics",
        companyName: "삼성바이오로직스",
        title: "삼성바이오 4공장 GMP 인증 획득... 본격 가동",
        description: "삼성바이오로직스 인천 송도 4공장이 미국 FDA의 cGMP 인증을 획득하며 본격 상업 생산에 돌입한다.",
        link: "https://example.com/news/2",
        pubDate: "2025-01-20",
        source: "매일경제",
      },
      {
        companyId: "sk-hynix",
        companyName: "SK하이닉스",
        title: "SK하이닉스, HBM3E 12단 양산 본격화... AI 수혜 지속",
        description: "SK하이닉스가 차세대 고대역폭메모리(HBM3E) 12단 제품의 양산을 본격 시작했다.",
        link: "https://example.com/news/3",
        pubDate: "2025-01-28",
        source: "조선비즈",
      },
      {
        companyId: "sk-hynix",
        companyName: "SK하이닉스",
        title: "SK하이닉스 4분기 영업이익 8조원 돌파... 사상 최대",
        description: "SK하이닉스가 2024년 4분기 영업이익 8조원을 기록하며 사상 최대 실적을 달성했다.",
        link: "https://example.com/news/4",
        pubDate: "2025-01-24",
        source: "한국경제",
      },
      {
        companyId: "samsung-electronics",
        companyName: "삼성전자",
        title: "삼성전자, 평택 P4 라인 HBM 전환 투자 결정",
        description: "삼성전자가 평택캠퍼스 P4 라인 일부를 HBM 생산으로 전환하는 대규모 투자를 결정했다.",
        link: "https://example.com/news/5",
        pubDate: "2025-01-22",
        source: "매일경제",
      },
      {
        companyId: "hyundai-motor",
        companyName: "현대자동차",
        title: "현대차, 울산공장 전기차 전용라인 증설 발표",
        description: "현대자동차가 울산 5공장에 전기차 전용 생산라인을 증설한다고 발표했다.",
        link: "https://example.com/news/6",
        pubDate: "2025-01-15",
        source: "동아일보",
      },
      {
        companyId: "posco-holdings",
        companyName: "포스코홀딩스",
        title: "포스코, 아르헨티나 리튬 추출 플랜트 1단계 완공",
        description: "포스코홀딩스가 아르헨티나 리튬 직접 추출(DLE) 플랜트 1단계 건설을 완료했다.",
        link: "https://example.com/news/7",
        pubDate: "2025-01-18",
        source: "조선비즈",
      },
      {
        companyId: "lg-energy",
        companyName: "LG에너지솔루션",
        title: "LG에너지, 4680 배터리 양산 라인 가동 시작",
        description: "LG에너지솔루션이 오창공장에서 4680 원통형 배터리 양산 라인 가동을 시작했다.",
        link: "https://example.com/news/8",
        pubDate: "2025-01-12",
        source: "한국경제",
      },
      {
        companyId: "hd-hyundai-heavy",
        companyName: "HD현대중공업",
        title: "HD현대중공업, LNG운반선 10척 수주... 4.2조원",
        description: "HD현대중공업이 유럽 선주사로부터 LNG운반선 10척, 총 4조2000억원 규모를 수주했다.",
        link: "https://example.com/news/9",
        pubDate: "2025-01-20",
        source: "매일경제",
      },
      {
        companyId: "celltrion",
        companyName: "셀트리온",
        title: "셀트리온, 美 FDA 피하주사 허셉틴 바이오시밀러 승인",
        description: "셀트리온이 미국 FDA로부터 피하주사형 허셉틴 바이오시밀러의 판매 승인을 획득했다.",
        link: "https://example.com/news/10",
        pubDate: "2025-01-08",
        source: "조선비즈",
      },
      {
        companyId: "naver",
        companyName: "네이버",
        title: "네이버, AI 검색 '큐(Cue:)' 정식 출시... 검색 혁신",
        description: "네이버가 자체 초거대 AI '하이퍼클로바X' 기반 AI 검색 서비스 '큐'를 정식 출시했다.",
        link: "https://example.com/news/11",
        pubDate: "2025-01-30",
        source: "한국경제",
      },
      {
        companyId: "s-oil",
        companyName: "S-Oil",
        title: "S-Oil 샤힌 프로젝트 진척률 45%... 2026년 완공 목표",
        description: "S-Oil의 9조원 규모 샤힌 프로젝트가 진척률 45%를 기록하며 순항 중이다.",
        link: "https://example.com/news/12",
        pubDate: "2025-01-17",
        source: "매일경제",
      },
      {
        companyId: "samsung-heavy",
        companyName: "삼성중공업",
        title: "삼성중공업, FLNG 최초 수주 성공... 기술력 입증",
        description: "삼성중공업이 부유식 LNG 생산설비(FLNG)를 세계 최초로 단독 수주하는 데 성공했다.",
        link: "https://example.com/news/13",
        pubDate: "2025-01-22",
        source: "동아일보",
      },
      {
        companyId: "lg-chem",
        companyName: "LG화학",
        title: "LG화학, 여수 NCC 증설 완료... 에틸렌 생산능력 확대",
        description: "LG화학이 여수 석유화학단지 내 NCC(나프타분해시설) 증설을 완료하며 에틸렌 연간 생산능력을 확대했다.",
        link: "https://example.com/news/14",
        pubDate: "2025-01-10",
        source: "한국경제",
      },
    ];

    const outputPath = path.join(__dirname, "..", "src", "data", "news.json");
    fs.writeFileSync(
      outputPath,
      JSON.stringify({ news: sampleNews, lastUpdated: new Date().toISOString() }, null, 2)
    );
    console.log(`✅ 샘플 뉴스 데이터 ${sampleNews.length}건 저장 → ${outputPath}`);
    return;
  }

  console.log("📰 뉴스 수집 시작...");

  const allNews: NewsEntry[] = [];

  for (const [companyId, companyName] of Object.entries(COMPANY_NAMES)) {
    console.log(`  🔍 ${companyName} 뉴스 검색 중...`);
    const items = await fetchNaverNews(companyName);

    for (const item of items) {
      allNews.push({
        companyId,
        companyName,
        title: stripHtml(item.title),
        description: stripHtml(item.description),
        link: item.originallink || item.link,
        pubDate: new Date(item.pubDate).toISOString().slice(0, 10),
        source: new URL(item.originallink || item.link).hostname.replace("www.", ""),
      });
    }

    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  const outputPath = path.join(__dirname, "..", "src", "data", "news.json");
  fs.writeFileSync(
    outputPath,
    JSON.stringify(
      {
        news: allNews.sort((a, b) => b.pubDate.localeCompare(a.pubDate)),
        lastUpdated: new Date().toISOString(),
      },
      null,
      2
    )
  );

  console.log(`\n✅ 총 ${allNews.length}건 뉴스 저장 → ${outputPath}`);
}

main().catch(console.error);
