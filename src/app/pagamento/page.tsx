"use client";

import { useEffect, useRef, useState } from "react";
import { formatBRL } from "@/lib/pricing";

type CheckoutSummary = {
  checkoutUrl: string | null;
  paymentMethod: "PIX" | "CREDIT_CARD" | "BOLETO";
  plan: string;
  clinic: string;
  doctors: number;
  amountCents: number;
};

function validCheckout(value: unknown): value is CheckoutSummary {
  if (!value || typeof value !== "object") return false;
  const data = value as Partial<CheckoutSummary>;
  if (typeof data.plan !== "string" || typeof data.clinic !== "string" || !Number.isSafeInteger(data.doctors) || !Number.isSafeInteger(data.amountCents) || data.amountCents! <= 0) return false;
  if (data.paymentMethod === "PIX" || data.paymentMethod === "BOLETO") return data.checkoutUrl === null;
  if (data.paymentMethod !== "CREDIT_CARD" || typeof data.checkoutUrl !== "string") return false;
  try {
    const url = new URL(data.checkoutUrl);
    return url.protocol === "https:" && ["asaas.com", "sandbox.asaas.com"].includes(url.hostname) && url.pathname === "/checkoutSession/show";
  } catch { return false; }
}

export default function PaymentPage() {
  const [summary, setSummary] = useState<CheckoutSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [pix, setPix] = useState<{ qrCode: string; pixCopyPaste: string } | null>(null);
  const [status, setStatus] = useState("PENDING");
  const [pixError, setPixError] = useState("");
  const [boletoUrl, setBoletoUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const fetchedQr = useRef(false);
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("pedido");
    if (id && /^[0-9a-f-]{36}$/i.test(id)) {
      setOrderId(id);
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

  useEffect(() => {
    if (!orderId || summary?.paymentMethod === "CREDIT_CARD") return;
    let active = true;
    const load = async () => {
      try {
        const response = await fetch(`/api/pix-checkout/${orderId}${fetchedQr.current ? "" : "?includeQr=1"}`, { cache: "no-store" });
        const data = await response.json() as { status?: string; qrCode?: string; pixCopyPaste?: string; boletoUrl?: string; expiresAt?: string | null; error?: string };
        if (!active) return;
        if (!response.ok) throw new Error(data.error || "Não foi possível consultar o Pix.");
        if (typeof data.status === "string") setStatus(data.status);
        if (summary?.paymentMethod === "BOLETO" && data.boletoUrl) { const url = new URL(data.boletoUrl); if (url.protocol === "https:" && (url.hostname === "asaas.com" || url.hostname.endsWith(".asaas.com"))) setBoletoUrl(url.toString()); }
        if (data.status === "PENDING" && data.expiresAt && new Date(data.expiresAt).getTime() <= Date.now()) {
          setPix(null); setPixError("O QR Code expirou. Entre em contato para gerar uma nova cobrança."); return;
        }
        if (data.status === "PENDING" && typeof data.qrCode === "string" && /^[A-Za-z0-9+/=]+$/.test(data.qrCode) && data.qrCode.length < 200000 && typeof data.pixCopyPaste === "string") {
          setPix({ qrCode: data.qrCode, pixCopyPaste: data.pixCopyPaste });
          fetchedQr.current = true;
        }
        if (data.status !== "PENDING") setPix(null);
        setPixError("");
      } catch (error) { if (active) setPixError(error instanceof Error ? error.message : "Não foi possível consultar o Pix."); }
    };
    void load();
    const interval = window.setInterval(load, 10000);
    return () => { active = false; window.clearInterval(interval); };
  }, [orderId, summary?.paymentMethod]);

  return <main className="payment-page">
    <header className="payment-header"><a href="/" className="payment-brand" aria-label="FluxoClínicas, voltar ao início"><img src="/assets/fluxoclinicas-mark-light.svg" alt="" width="38" height="38" /><span>FluxoClínicas</span></a><span>Contratação segura</span></header>
    <div className="payment-layout">
      <section className="payment-main" aria-labelledby="payment-title">
        <a className="payment-back" href="/#cadastro">← Voltar à contratação</a>
        <p className="payment-eyebrow">ÚLTIMA ETAPA</p>
        <h1 id="payment-title">Tudo pronto para começar.</h1>
        <p className="payment-lead">Confira o pedido da sua clínica e conclua o pagamento com segurança.</p>
        {loading ? <p role="status">Carregando pedido...</p> : summary ? <>
          <div className="payment-order"><span className="payment-order-icon" aria-hidden="true">✦</span><div><strong>{summary.clinic}</strong><span>{summary.plan} · {summary.doctors} {summary.doctors === 1 ? "médico" : "médicos"}</span></div><span className="payment-order-state">Pedido criado</span></div>
          <div className="payment-next"><span>1</span><p><strong>Revise o valor</strong><br />O plano escolhido e o número de médicos definem esta mensalidade.</p></div>
          <div className="payment-next"><span>2</span><p><strong>{summary.paymentMethod === "PIX" ? "Pague pelo Pix" : summary.paymentMethod === "BOLETO" ? "Pague o boleto" : "Pague com cartão"}</strong><br />{summary.paymentMethod === "PIX" ? "Escaneie o QR Code ou copie o código abaixo." : summary.paymentMethod === "BOLETO" ? "Abra o boleto e aguarde a compensação do pagamento." : "Informe o cartão no ambiente seguro do Asaas."}</p></div>
          <div className="payment-next"><span>3</span><p><strong>Receba o acesso</strong><br />A clínica é ativada após a confirmação do pagamento.</p></div>
        </> : <div className="payment-missing" role="alert"><strong>Não encontramos este pedido nesta sessão.</strong><p>Volte ao cadastro para iniciar uma nova contratação. Se você já pagou, aguarde o e-mail de acesso ou fale com nossa equipe.</p><a className="button button-dark" href="/#cadastro">Voltar ao cadastro</a></div>}
      </section>
      {summary && <aside className="payment-summary" aria-label="Resumo do pedido"><div className="payment-summary-top"><span>RESUMO DA CONTRATAÇÃO</span><h2>{summary.plan}</h2><p>Para {summary.clinic}</p></div><div className="payment-summary-body"><div><span>Médicos</span><strong>{summary.doctors}</strong></div><div><span>Mensalidade</span><strong>{formatBRL(summary.amountCents / 100)}</strong></div><div className="payment-summary-total"><span>Total desta cobrança</span><strong>{formatBRL(summary.amountCents / 100)}</strong></div>
        {summary.paymentMethod !== "CREDIT_CARD" ? status === "PAID" ? <div className="payment-paid" role="status"><strong>Pagamento confirmado!</strong><p>Estamos preparando o acesso da sua clínica.</p><a className="button button-dark" href={`/contratacao?pedido=${orderId}`}>Ver meu acesso ↗</a></div> : status !== "PENDING" ? <p role="alert">Este pedido não está mais disponível para pagamento. Entre em contato com nossa equipe.</p> : summary.paymentMethod === "BOLETO" ? <div className="payment-pix"><p>Boleto bancário</p>{boletoUrl ? <a className="button button-coral" href={boletoUrl} target="_blank" rel="noopener noreferrer">Abrir boleto no Asaas ↗</a> : <p role="status">Preparando boleto...</p>}<small>O acesso será liberado após a confirmação do pagamento.</small></div> : <div className="payment-pix"><p>Escaneie para pagar</p>{pix && <img src={`data:image/png;base64,${pix.qrCode}`} width="216" height="216" alt="QR Code Pix da cobrança" />}{pix ? <><label htmlFor="pix-code">Pix copia e cola</label><input id="pix-code" readOnly value={pix.pixCopyPaste} onFocus={event => event.target.select()} /><button className="button button-coral" type="button" onClick={async () => { try { await navigator.clipboard.writeText(pix.pixCopyPaste); setCopied(true); } catch { setPixError("Selecione e copie o código Pix acima."); } }}>{copied ? "Código copiado ✓" : "Copiar código Pix"}</button></> : !pixError && <p role="status">Preparando QR Code Pix...</p>}{pixError && <p role="alert">{pixError}</p>}<small>A confirmação aparece automaticamente nesta página.</small></div>
          : <><a className="button button-coral" href={summary.checkoutUrl!} rel="noreferrer">Pagar com cartão no Asaas ↗</a><p>O cartão é informado na página segura do Asaas. A FluxoClínicas não recebe seus dados de cartão.</p></>}
      </div></aside>}
    </div>
    <footer className="payment-footer">FluxoClínicas · Tecnologia para cuidar melhor</footer>
  </main>;
}
