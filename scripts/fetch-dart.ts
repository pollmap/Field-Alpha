/**
 * DART 공시 연동 스크립트
 *
 * 사용법:
 *   DART_API_KEY=xxx npx ts-node scripts/fetch-dart.ts
 *
 * DART OpenAPI(https://opendart.fss.or.kr/)에서 API키를 발급받아 사용.
 * 답사 기업들의 최근 공시를 수집하여 src/data/disclosures.json에 저장.
 */

import * as fs from "fs";
import * as path from "path";

const DART_API_KEY = process.env.DART_API_KEY || "";
const BASE_URL = "https://opendart.fss.or.kr/api";

interface DartDisclosure {
  corp_code: string;
  corp_name: string;
  stock_code: string;
  report_nm: string;
  rcept_no: string;
  flr_nm: string;
  rcept_dt: string;
  rm: string;
}

interface DisclosureEntry {
  companyId: string;
  companyName: string;
  stockCode: string;
  title: string;
  date: string;
  receiptNo: string;
  filer: string;
  url: string;
}

// 답사 기업 목록 - DART 종목코드 매핑
const COMPANY_STOCK_MAP: Record<string, { name: string; stockCode: string }> = {
  "samsung-biologics": { name: "삼성바이오로직스", stockCode: "207940" },
  "samsung-electronics": { name: "삼성전자", stockCode: "005930" },
  "sk-bioscience": { name: "SK바이오사이언스", stockCode: "302440" },
  "sk-energy": { name: "SK이노베이션", stockCode: "096770" },
  "s-oil": { name: "S-Oil", stockCode: "010950" },
  "sk-hynix": { name: "SK하이닉스", stockCode: "000660" },
  "celltrion": { name: "셀트리온", stockCode: "068270" },
  "hyundai-motor": { name: "현대자동차", stockCode: "005380" },
  "posco-holdings": { name: "포스코홀딩스", stockCode: "005490" },
  "lg-energy": { name: "LG에너지솔루션", stockCode: "373220" },
  "hd-hyundai-heavy": { name: "HD현대중공업", stockCode: "329180" },
  "lg-display": { name: "LG디스플레이", stockCode: "034220" },
  "hyundai-mobis": { name: "현대모비스", stockCode: "012330" },
  "samsung-heavy": { name: "삼성중공업", stockCode: "010140" },
  "lg-chem": { name: "LG화학", stockCode: "051910" },
  "naver": { name: "네이버", stockCode: "035420" },
  "kakao": { name: "카카오", stockCode: "035720" },
};

async function fetchDisclosures(stockCode: string): Promise<DartDisclosure[]> {
  const today = new Date();
  const threeMonthsAgo = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);

  const beginDate = threeMonthsAgo.toISOString().slice(0, 10).replace(/-/g, "");
  const endDate = today.toISOString().slice(0, 10).replace(/-/g, "");

  const url = `${BASE_URL}/list.json?crtfc_key=${DART_API_KEY}&stock_code=${stockCode}&bgn_de=${beginDate}&end_de=${endDate}&page_count=10&sort=date&sort_mth=desc`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "000" && data.list) {
      return data.list;
    }
    return [];
  } catch (error) {
    console.error(`Failed to fetch disclosures for ${stockCode}:`, error);
    return [];
  }
}

async function main() {
  if (!DART_API_KEY) {
    console.log("⚠️  DART_API_KEY 환경변수가 설정되지 않았습니다.");
    console.log("   DART OpenAPI(https://opendart.fss.or.kr/)에서 API키를 발급받으세요.");
    console.log("   사용법: DART_API_KEY=xxx npx ts-node scripts/fetch-dart.ts");
    console.log("");
    console.log("📋 샘플 데이터로 대체합니다...");

    // Generate sample data
    const sampleDisclosures: DisclosureEntry[] = [];
    const sampleData: Array<{ id: string; title: string; date: string }> = [
      { id: "samsung-biologics", title: "단일판매·공급계약체결(자율공시)", date: "2025-01-15" },
      { id: "samsung-biologics", title: "분기보고서 (2024.09)", date: "2024-11-14" },
      { id: "samsung-electronics", title: "타법인 주식 및 출자증권 취득결정", date: "2025-01-20" },
      { id: "samsung-electronics", title: "분기보고서 (2024.09)", date: "2024-11-14" },
      { id: "sk-hynix", title: "단일판매·공급계약체결", date: "2025-01-10" },
      { id: "sk-hynix", title: "연결재무제표기준영업(잠정)실적(공정공시)", date: "2025-01-24" },
      { id: "hyundai-motor", title: "분기보고서 (2024.09)", date: "2024-11-14" },
      { id: "posco-holdings", title: "주요사항보고서(타법인주식및출자증권양수결정)", date: "2025-01-08" },
      { id: "lg-energy", title: "연결재무제표기준영업(잠정)실적(공정공시)", date: "2025-01-27" },
      { id: "lg-energy", title: "기업설명회(IR) 개최(안내공시)", date: "2025-01-28" },
      { id: "celltrion", title: "분기보고서 (2024.09)", date: "2024-11-14" },
      { id: "celltrion", title: "단일판매·공급계약체결", date: "2025-01-05" },
      { id: "hd-hyundai-heavy", title: "수시공시의무관련사항(공정공시)", date: "2025-01-22" },
      { id: "samsung-heavy", title: "단일판매·공급계약체결(자율공시)", date: "2025-01-18" },
      { id: "s-oil", title: "분기보고서 (2024.09)", date: "2024-11-14" },
      { id: "naver", title: "연결재무제표기준영업(잠정)실적(공정공시)", date: "2025-01-30" },
      { id: "lg-chem", title: "분기보고서 (2024.09)", date: "2024-11-14" },
    ];

    for (const item of sampleData) {
      const company = COMPANY_STOCK_MAP[item.id];
      if (company) {
        sampleDisclosures.push({
          companyId: item.id,
          companyName: company.name,
          stockCode: company.stockCode,
          title: item.title,
          date: item.date,
          receiptNo: `2025${Math.random().toString().slice(2, 10)}`,
          filer: company.name,
          url: `https://dart.fss.or.kr/dsaf001/main.do?rcpNo=2025${Math.random().toString().slice(2, 10)}`,
        });
      }
    }

    const outputPath = path.join(__dirname, "..", "src", "data", "disclosures.json");
    fs.writeFileSync(
      outputPath,
      JSON.stringify({ disclosures: sampleDisclosures, lastUpdated: new Date().toISOString() }, null, 2)
    );
    console.log(`✅ 샘플 공시 데이터 ${sampleDisclosures.length}건 저장 → ${outputPath}`);
    return;
  }

  console.log("🔍 DART 공시 수집 시작...");

  const allDisclosures: DisclosureEntry[] = [];

  for (const [companyId, info] of Object.entries(COMPANY_STOCK_MAP)) {
    console.log(`  📋 ${info.name} (${info.stockCode}) 공시 조회 중...`);
    const disclosures = await fetchDisclosures(info.stockCode);

    for (const d of disclosures) {
      allDisclosures.push({
        companyId,
        companyName: d.corp_name,
        stockCode: d.stock_code,
        title: d.report_nm,
        date: `${d.rcept_dt.slice(0, 4)}-${d.rcept_dt.slice(4, 6)}-${d.rcept_dt.slice(6, 8)}`,
        receiptNo: d.rcept_no,
        filer: d.flr_nm,
        url: `https://dart.fss.or.kr/dsaf001/main.do?rcpNo=${d.rcept_no}`,
      });
    }

    // Rate limit: 1 request per second
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  const outputPath = path.join(__dirname, "..", "src", "data", "disclosures.json");
  fs.writeFileSync(
    outputPath,
    JSON.stringify(
      {
        disclosures: allDisclosures.sort((a, b) => b.date.localeCompare(a.date)),
        lastUpdated: new Date().toISOString(),
      },
      null,
      2
    )
  );

  console.log(`\n✅ 총 ${allDisclosures.length}건 공시 저장 → ${outputPath}`);
}

main().catch(console.error);
