"use client";

import { useEffect, useState } from "react";

type OrderStatus = { status?: string; tenantUrl?: string; error?: string };

export default function CheckoutReturn() {
  const [order, setOrder] = useState<OrderStatus>({});
  const [pending, setPending] = useState(true);
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("pedido");
    if (!id || !/^[0-9a-f-]{36}$/i.test(id)) { setOrder({ error: "Pedido inválido" }); setPending(false); return; }
    let active = true;
    const load = async () => {
      try {
        const response = await fetch(`/api/checkout/${encodeURIComponent(id)}`, { cache: "no-store" });
        const data = await response.json() as OrderStatus;
        if (active) { setOrder(response.ok ? data : { error: data.error || "Não foi possível consultar o pedido" }); setPending(false); }
      } catch { if (active) { setOrder({ error: "Não foi possível consultar o pedido" }); setPending(false); } }
    };
    void load();
    const interval = window.setInterval(load, 10000);
    return () => { active = false; window.clearInterval(interval); };
  }, []);
  const approved = order.status === "PAID";
  const tenant = order.tenantUrl ? new URL(order.tenantUrl) : null;
  return <main className="checkout-return"><div className="checkout-return-card"><img src="/assets/fluxoclinicas-mark.svg" alt="" width="48" height="48" /><h1>{pending ? "Consultando pagamento" : order.error ? "Não encontramos o pedido" : approved ? "Pagamento confirmado" : "Aguardando confirmação"}</h1><p>{order.error || (approved ? "Seu acesso foi liberado. Entre no endereço abaixo com o e-mail e a senha definidos no cadastro." : "O Asaas ainda não confirmou o pagamento. Esta página atualiza o status automaticamente; o acesso será liberado somente após a confirmação.")}</p>{approved && tenant?.protocol === "https:" && tenant.hostname.endsWith(".fluxoclinicas.online") && <a className="button button-dark" href={tenant.toString()}>Acessar minha clínica ↗</a>}<a href="/">Voltar ao site</a></div></main>;
}
