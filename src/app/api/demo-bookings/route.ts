import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const upstream = await fetch(`${process.env.FLUXO_API_URL || "https://api.fluxoclinicas.online"}/v1/public/demo-bookings`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), cache: "no-store", signal: AbortSignal.timeout(10000),
    });
    const result = await upstream.json();
    return NextResponse.json(result, { status: upstream.status });
  } catch {
    return NextResponse.json({ error: "Não foi possível reservar o horário" }, { status: 503 });
  }
}
