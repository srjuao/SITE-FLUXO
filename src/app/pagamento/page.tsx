"use client";

import { useEffect, useState } from "react";
import { formatBRL } from "@/lib/pricing";

type CheckoutSummary = {
  checkoutUrl: string;
  plan: string;
  clinic: string;
  doctors: number;
  amountCents: number;
};

function validCheckout(value: unknown): value is CheckoutSummary {
  if (!value || typeof value !== "object") return false;
  const data = value as Partial<CheckoutSummary>;
  if (typeof data.checkoutUrl !== "string" || typeof data.plan !== "string" || typeof data.clinic !== "string" || !Number.isSafeInteger(data.doctors) || !Number.isSafeInteger(data.amountCents) || data.amountCents! <= 0) return false;
  try {
    const url = new URL(data.checkoutUrl);
    return url.protocol === "https:" && ["asaas.com", "sandbox.asaas.com"].includes(url.hostname) && url.pathname === "/checkoutSession/show";
  } catch { return false; }
}

export default function PaymentPage() {
  const [summary, setSummary] = useState<CheckoutSummary | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("pedido");
    if (id && /^[0-9a-f-]{36}$/i.test(id)) {
      try {
        const stored = window.sessionStorage.getItem(`fluxo-checkout:${id}`);
        if (stored) {
          const parsed: unknown = JSON.parse(stored);
          if (validCheckout(parsed)) setSummary(parsed);
        }
      } catch { /* A página oferece o retorno ao cadastro quando a sessão não existe. */ }
    }
    setLoading(false);
  }, []);

  return <main className="payment-page">
    <header className="payment-header"><a href="/" className="payment-brand" aria-label="FluxoClínicas, voltar ao início"><img src="/assets/fluxoclinicas-mark-light.svg" alt="" width="38" height="38" /><span>FluxoClínicas</span></a><span>Contratação segura</span></header>
    <div className="payment-layout">
      <section className="payment-main" aria-labelledby="payment-title">
        <a className="payment-back" href="/#cadastro">← Voltar à contratação</a>
        <p className="payment-eyebrow">ÚLTIMA ETAPA</p>
        <h1 id="payment-title">Tudo pronto para começar.</h1>
        <p className="payment-lead">Confira o pedido da sua clínica antes de escolher Pix ou cartão na página segura de pagamento.</p>
        {loading ? <p role="status">Carregando pedido...</p> : summary ? <>
          <div className="payment-order"><span className="payment-order-icon" aria-hidden="true">✦</span><div><strong>{summary.clinic}</strong><span>{summary.plan} · {summary.doctors} {summary.doctors === 1 ? "médico" : "médicos"}</span></div><span className="payment-order-state">Pedido criado</span></div>
          <div className="payment-next"><span>1</span><p><strong>Revise o valor</strong><br />O plano escolhido e o número de médicos definem esta mensalidade.</p></div>
          <div className="payment-next"><span>2</span><p><strong>Escolha como pagar</strong><br />Pix e cartão são apresentados no ambiente seguro do Asaas.</p></div>
          <div className="payment-next"><span>3</span><p><strong>Receba o acesso</strong><br />A clínica é ativada após a confirmação do pagamento.</p></div>
        </> : <div className="payment-missing" role="alert"><strong>Não encontramos este pedido nesta sessão.</strong><p>Volte ao cadastro para iniciar uma nova contratação. Se você já pagou, aguarde o e-mail de acesso ou fale com nossa equipe.</p><a className="button button-dark" href="/#cadastro">Voltar ao cadastro</a></div>}
      </section>
      {summary && <aside className="payment-summary" aria-label="Resumo do pedido"><div className="payment-summary-top"><span>RESUMO DA CONTRATAÇÃO</span><h2>{summary.plan}</h2><p>Para {summary.clinic}</p></div><div className="payment-summary-body"><div><span>Médicos</span><strong>{summary.doctors}</strong></div><div><span>Mensalidade</span><strong>{formatBRL(summary.amountCents / 100)}</strong></div><div className="payment-summary-total"><span>Total desta cobrança</span><strong>{formatBRL(summary.amountCents / 100)}</strong></div><a className="button button-coral" href={summary.checkoutUrl} rel="noreferrer">Escolher Pix ou cartão ↗</a><p>O pagamento é processado pelo Asaas. A FluxoClínicas não recebe os dados do seu cartão.</p></div></aside>}
    </div>
    <footer className="payment-footer">FluxoClínicas · Tecnologia para cuidar melhor</footer>
  </main>;
}
