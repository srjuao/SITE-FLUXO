import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request: Request, { params }: { params: { orderId: string } }) {
  if (!/^[0-9a-f-]{36}$/i.test(params.orderId)) return NextResponse.json({ error: "Pedido inválido" }, { status: 400 });
  try {
    const includeQr = new URL(request.url).searchParams.get("includeQr") === "1" ? "?includeQr=1" : "";
    const upstream = await fetch(`${process.env.FLUXO_API_URL || "https://api.fluxoclinicas.online"}/v1/public/pix-checkout/${encodeURIComponent(params.orderId)}${includeQr}`, {
      cache: "no-store", signal: AbortSignal.timeout(10000),
    });
    return NextResponse.json(await upstream.json(), { status: upstream.status });
  } catch { return NextResponse.json({ error: "Não foi possível consultar o Pix" }, { status: 503 }); }
}
