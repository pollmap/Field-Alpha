#!/usr/bin/env npx ts-node
/**
 * 답사 기록 추가 자동화 스크립트
 *
 * 사용법:
 *   npx ts-node scripts/add-visit.ts
 *
 * 대화형으로 답사 정보를 입력받아:
 * 1. src/data/visits.json에 새 항목 추가
 * 2. 사진 파일을 public/photos/에 복사 (경로 지정 시)
 *
 * 또는 JSON 파일을 직접 전달:
 *   npx ts-node scripts/add-visit.ts --file ./new-visit.json
 */

import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

const VISITS_PATH = path.join(__dirname, "..", "src", "data", "visits.json");
const COMPANIES_PATH = path.join(__dirname, "..", "src", "data", "companies.json");

function createReadlineInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

function ask(rl: readline.Interface, question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer.trim()));
  });
}

function generateId(date: string, location: string): string {
  const datePrefix = date.slice(0, 7);
  const slug = location
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 30);
  return `${datePrefix}-${slug}`;
}

async function addFromFile(filePath: string) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const newVisit = JSON.parse(raw);

  const visitsData = JSON.parse(fs.readFileSync(VISITS_PATH, "utf-8"));

  // Check for duplicate
  if (visitsData.visits.find((v: any) => v.id === newVisit.id)) {
    console.error(`❌ 이미 존재하는 ID: ${newVisit.id}`);
    process.exit(1);
  }

  visitsData.visits.push(newVisit);

  // Sort by date descending
  visitsData.visits.sort(
    (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  fs.writeFileSync(VISITS_PATH, JSON.stringify(visitsData, null, 2) + "\n");
  console.log(`✅ 답사 기록 추가 완료: ${newVisit.title} (${newVisit.id})`);
}

async function addInteractive() {
  const rl = createReadlineInterface();

  console.log("\n📝 새 답사 기록 추가\n");

  const title = await ask(rl, "제목: ");
  const date = await ask(rl, "날짜 (YYYY-MM-DD): ");
  const locationName = await ask(rl, "장소명: ");
  const region = await ask(rl, "지역 (시/도): ");
  const district = await ask(rl, "구/군: ");
  const address = await ask(rl, "주소 (선택): ");
  const latStr = await ask(rl, "위도 (lat): ");
  const lngStr = await ask(rl, "경도 (lng): ");
  const sectorsStr = await ask(rl, "산업 분류 (쉼표 구분, 예: bio,cmo): ");
  const companiesStr = await ask(rl, "관련 기업 ID (쉼표 구분, 선택): ");
  const clusterStr = await ask(rl, "클러스터 ID (선택): ");
  const visitNumberStr = await ask(rl, "방문 차수 (기본 1): ");
  const duration = await ask(rl, "체류 시간: ");
  const weather = await ask(rl, "날씨: ");
  const summary = await ask(rl, "요약 (2~3문장): ");
  const tagsStr = await ask(rl, "태그 (쉼표 구분): ");

  console.log("\n📷 관찰 사실 입력 (빈 줄 입력 시 종료):");
  const observations: string[] = [];
  while (true) {
    const obs = await ask(rl, "  - ");
    if (!obs) break;
    observations.push(obs);
  }

  const hasInsightsStr = await ask(rl, "투자 인사이트 있음? (y/n): ");
  const insights: string[] = [];
  if (hasInsightsStr.toLowerCase() === "y") {
    console.log("💡 투자 인사이트 입력 (빈 줄 입력 시 종료):");
    while (true) {
      const ins = await ask(rl, "  - ");
      if (!ins) break;
      insights.push(ins);
    }
  }

  const id = generateId(date, locationName);

  const newVisit = {
    id,
    title,
    date,
    location: {
      name: locationName,
      coordinates: { lat: parseFloat(latStr), lng: parseFloat(lngStr) },
      region,
      district,
      ...(address && { address }),
    },
    ...(clusterStr && { cluster: clusterStr }),
    sectors: sectorsStr.split(",").map((s) => s.trim()).filter(Boolean),
    companies: companiesStr ? companiesStr.split(",").map((s) => s.trim()).filter(Boolean) : [],
    visitNumber: parseInt(visitNumberStr) || 1,
    duration,
    weather,
    summary,
    tags: tagsStr.split(",").map((s) => s.trim()).filter(Boolean),
    photos: [],
    hasInsights: insights.length > 0,
    observations,
    ...(insights.length > 0 && { insights }),
  };

  console.log("\n📋 생성될 기록:");
  console.log(JSON.stringify(newVisit, null, 2));

  const confirm = await ask(rl, "\n저장하시겠습니까? (y/n): ");

  if (confirm.toLowerCase() === "y") {
    const visitsData = JSON.parse(fs.readFileSync(VISITS_PATH, "utf-8"));
    visitsData.visits.push(newVisit);
    visitsData.visits.sort(
      (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    fs.writeFileSync(VISITS_PATH, JSON.stringify(visitsData, null, 2) + "\n");
    console.log(`\n✅ 저장 완료: ${id}`);
    console.log(`   npm run build로 사이트를 재빌드하세요.`);
  } else {
    console.log("❌ 취소됨");
  }

  rl.close();
}

async function main() {
  const args = process.argv.slice(2);

  if (args[0] === "--file" && args[1]) {
    await addFromFile(args[1]);
  } else if (args[0] === "--help") {
    console.log(`
📝 Field Alpha - 답사 기록 추가 도구

사용법:
  npx ts-node scripts/add-visit.ts              # 대화형 입력
  npx ts-node scripts/add-visit.ts --file X.json # JSON 파일로 추가
  npx ts-node scripts/add-visit.ts --help        # 도움말

산업 코드:
  bio, semi, battery, display, shipbuilding, petrochemical,
  steel, auto, realestate, finance, infra, cmo, pharma
    `);
  } else {
    await addInteractive();
  }
}

main().catch(console.error);
