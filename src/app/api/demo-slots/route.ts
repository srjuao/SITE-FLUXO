import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  try {
    const upstream = await fetch(`${process.env.FLUXO_API_URL || "https://api.fluxoclinicas.online"}/v1/public/demo-slots`, { cache: "no-store", signal: AbortSignal.timeout(10000) });
    if (!upstream.ok) throw new Error("agenda indisponível");
    return NextResponse.json(await upstream.json());
  } catch {
    return NextResponse.json({ slots: [], error: "Horários indisponíveis no momento" }, { status: 503 });
  }
}
