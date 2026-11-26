import { NextResponse } from "next/server";

export async function GET() {
  // 56-hour visitor telemetry for bottom terminal status bar
  const hours = Array.from({ length: 56 }, (_, i) => 3 + Math.floor(Math.sin(i / 3.5) * 2.5 + (i % 4) + 1));
  return NextResponse.json({
    total: 3120,
    since: "2026-01-01",
    hours,
  });
}

export async function POST() {
  return NextResponse.json({ ok: true });
}
