import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try { body = await request.json(); } catch {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }
  try {
    const upstream = await fetch(`${process.env.FLUXO_API_URL || "https://api.fluxoclinicas.online"}/v1/public/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Idempotency-Key": request.headers.get("Idempotency-Key") || "" },
      body: JSON.stringify(body),
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
    const result = await upstream.json() as Record<string, unknown>;
    if (!upstream.ok) return NextResponse.json({ error: typeof result.error === "string" ? result.error : "Pagamento indisponível" }, { status: upstream.status });
    return NextResponse.json(result, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Pagamento indisponível no momento" }, { status: 503 });
  }
}
