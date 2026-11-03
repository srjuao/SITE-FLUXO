import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: { orderId: string } }) {
  if (!/^[0-9a-f-]{36}$/i.test(params.orderId)) return NextResponse.json({ error: "Pedido inválido" }, { status: 400 });
  try {
    const upstream = await fetch(`${process.env.FLUXO_API_URL || "https://api.fluxoclinicas.online"}/v1/public/checkout/${encodeURIComponent(params.orderId)}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    const result = await upstream.json() as Record<string, unknown>;
    return NextResponse.json(result, { status: upstream.status });
  } catch {
    return NextResponse.json({ error: "Não foi possível consultar o pedido" }, { status: 503 });
  }
}
