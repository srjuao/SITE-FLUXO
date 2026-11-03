import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try { body = await request.json(); } catch {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }
  try {
    const upstream = await fetch(`${process.env.FLUXO_API_URL || "https://api.fluxoclinicas.online"}/v1/public/commercial-leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    if (!upstream.ok) {
      return NextResponse.json({ error: "Cadastro indisponível no momento" }, { status: upstream.status >= 500 ? 503 : upstream.status });
    }
    return NextResponse.json({ received: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Cadastro indisponível no momento" }, { status: 503 });
  }
}
