"use client";

import { useEffect, useRef, useState } from "react";
import { formatBRL, messagingPackages, monthlyPrice } from "@/lib/pricing";

const planNames = ["Médico Individual", "Clínica Inicial", "Clínica Essencial", "Gestão", "Avançado", "Personalizado"];
const messagingOptions = [
  ...messagingPackages.map(option => ({ value: option.value, label: `${option.label}${option.monthly ? ` · ${formatBRL(option.monthly)}/mês` : ""}` })),
  { value: "mais-2000", label: "Mais de 2.000 · sob proposta" },
  { value: "nao-sei", label: "Ainda não sei o volume" },
];
type DemoSlot = { id: string; startsAt: string; endsAt: string };

export default function SignupFlow() {
  const [journey, setJourney] = useState<"start" | "demo">("start");
  const [plan, setPlan] = useState(planNames[0]);
  const [messaging, setMessaging] = useState("none");
  const [paymentMethod, setPaymentMethod] = useState<"PIX" | "CREDIT_CARD" | "BOLETO">("PIX");
  const [name, setName] = useState("");
  const [clinic, setClinic] = useState("");
  const [slug, setSlug] = useState("");
  const [crm, setCrm] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [taxId, setTaxId] = useState("");
  const [address, setAddress] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [province, setProvince] = useState("");
  const [doctors, setDoctors] = useState("1");
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<"plan" | "account" | "payment">("plan");
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [demoSlots, setDemoSlots] = useState<DemoSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [slotsLoading, setSlotsLoading] = useState(false);
  const checkoutAttempt = useRef<string | null>(null);

  useEffect(() => { checkoutAttempt.current = null; }, [plan, messaging, paymentMethod, name, clinic, slug, crm, password, email, phone, taxId, address, addressNumber, postalCode, province, doctors]);

  useEffect(() => {
    if (journey !== "demo") return;
    let active = true;
    setSlotsLoading(true);
    fetch("/api/demo-slots", { cache: "no-store" }).then(response => response.json()).then((data: { slots?: DemoSlot[] }) => {
      if (active) setDemoSlots(Array.isArray(data.slots) ? data.slots : []);
    }).catch(() => { if (active) setDemoSlots([]); }).finally(() => { if (active) setSlotsLoading(false); });
    return () => { active = false; };
  }, [journey]);

  useEffect(() => {
    const select = (event: Event) => { setPlan((event as CustomEvent<string>).detail); setJourney("start"); setStage("plan"); setOpen(true); setReady(false); setSubmitted(false); };
    const selectJourney = (event: Event) => { setJourney((event as CustomEvent<"start" | "demo">).detail); setStage("plan"); setOpen(true); setReady(false); setSubmitted(false); };
    window.addEventListener("select-plan", select);
    window.addEventListener("select-journey", selectJourney);
    return () => { window.removeEventListener("select-plan", select); window.removeEventListener("select-journey", selectJourney); };
  }, []);

  const directPlan = plan === "Médico Individual";
  const wantsPurchase = journey === "start" && directPlan;
  const total = monthlyPrice(plan, directPlan ? 1 : Number(doctors), messaging);
  const checkoutBase = monthlyPrice("Médico Individual", 1, "none");
  const selectedMessagingPack = messagingPackages.find(option => option.value === messaging);
  // Patient reminder routes still report SIMULATION_ONLY. Paid packs must never be
  // charged through self-service until delivery and quota enforcement exist.
  const checkoutEligible = process.env.NEXT_PUBLIC_CHECKOUT_ENABLED === "true" && wantsPurchase && !!selectedMessagingPack && checkoutBase !== null;

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStage("payment");
    setReady(true);
    setError("");
  }

  async function sendLead() {
    setSending(true);
    setError("");
    try {
      if (checkoutEligible) {
        checkoutAttempt.current ??= crypto.randomUUID();
        const response = await fetch(paymentMethod === "CREDIT_CARD" ? "/api/checkout" : "/api/pix-checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Idempotency-Key": checkoutAttempt.current },
          body: JSON.stringify({ plan, messaging: "none", billingMethod: paymentMethod, name, clinic, slug, crm, password, email, phone, doctors: 1, taxId: taxId.replace(/\D/g, ""), address, addressNumber, postalCode: postalCode.replace(/\D/g, ""), province }),
        });
        const result = await response.json() as { orderId?: string; checkoutUrl?: string; amountCents?: number; error?: string };
        if (!response.ok || !result.orderId || !/^[0-9a-f-]{36}$/i.test(result.orderId) || !Number.isSafeInteger(result.amountCents) || result.amountCents! <= 0) throw new Error(result.error || "O pagamento está indisponível. Tente novamente mais tarde ou agende uma demonstração.");
        let checkoutUrl: string | null = null;
        if (paymentMethod === "CREDIT_CARD") {
          if (!result.checkoutUrl) throw new Error("O endereço de pagamento retornado é inválido.");
          const checkout = new URL(result.checkoutUrl);
          if (checkout.protocol !== "https:" || !["asaas.com", "sandbox.asaas.com"].includes(checkout.hostname) || checkout.pathname !== "/checkoutSession/show") throw new Error("O endereço de pagamento retornado é inválido.");
          checkoutUrl = checkout.toString();
        }
        window.sessionStorage.setItem(`fluxo-checkout:${result.orderId}`, JSON.stringify({ checkoutUrl, paymentMethod, plan, clinic, doctors: Number(doctors), amountCents: result.amountCents }));
        window.location.assign(`/pagamento?pedido=${encodeURIComponent(result.orderId)}`);
        return;
      }
      if (journey === "demo" && selectedSlot) {
        const response = await fetch("/api/demo-bookings", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slotId: selectedSlot, plan, messaging: messagingPackages.some(option => option.value === messaging) ? messaging : null, name, clinic, email, phone, doctors: Number(doctors) }),
        });
        if (!response.ok) throw new Error("Não foi possível reservar este horário. Escolha outro ou tente novamente.");
        setSubmitted(true);
        setReady(false);
        return;
      }
      const response = await fetch("/api/commercial-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, messaging, name, clinic, email, phone, doctors: Number(doctors), website: "", intent: wantsPurchase ? "purchase" : "demo" }),
      });
      if (!response.ok) throw new Error("Não foi possível enviar sua solicitação. Tente novamente em instantes.");
      setSubmitted(true);
      setReady(false);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Não foi possível enviar sua solicitação.");
    } finally {
      setSending(false);
    }
  }

  if (!open) return <div id="cadastro" className="signup-launch"><h3>Pronto para começar?</h3><p>Escolha seu plano e faça o cadastro em etapas.</p><button type="button" className="button button-coral" onClick={() => { setJourney("start"); setStage("plan"); setOpen(true); }}>Quero contratar ↗</button></div>;

  return <div className="signup-flow-overlay" onMouseDown={event => { if (event.target === event.currentTarget) setOpen(false); }}><div className="signup-card signup-flow-dialog" role="dialog" aria-modal="true" aria-label="Contratação FluxoClínicas">
    <button type="button" className="signup-flow-close" onClick={() => setOpen(false)} aria-label="Fechar cadastro">×</button>
    <div className="signup-flow-progress" aria-label="Etapas do cadastro"><span className="active">1. Plano</span><span className={stage !== "plan" ? "active" : ""}>2. Cadastro</span><span className={stage === "payment" ? "active" : ""}>3. Pagamento</span></div>
    <div className="signup-intro"><span className="signup-kicker">{stage === "plan" ? "ETAPA 1 DE 3" : stage === "account" ? "ETAPA 2 DE 3" : "ETAPA 3 DE 3"}</span><h3>{stage === "plan" ? "Escolha seu plano" : stage === "account" ? "Crie seu acesso" : "Revise e escolha como pagar"}</h3><p>{stage === "plan" ? "Comece pelo plano Médico Individual ou solicite uma proposta para sua clínica." : stage === "account" ? "Preencha seus dados e escolha o endereço da sua clínica." : "Confira o valor antes de prosseguir."}</p></div>
    {stage === "plan" && <><div className="signup-paths" role="group" aria-label="Como deseja começar">
      <button type="button" className={journey === "start" ? "selected" : ""} aria-pressed={journey === "start"} onClick={() => { setJourney("start"); setReady(false); setSubmitted(false); }}><strong>Quero contratar</strong><span>Escolha o plano para sua clínica.</span></button>
      <button type="button" className={journey === "demo" ? "selected" : ""} aria-pressed={journey === "demo"} onClick={() => { setJourney("demo"); setReady(false); setSubmitted(false); }}><strong>Agendar demonstração</strong><span>Converse com a equipe antes de decidir.</span></button>
    </div><div className="signup-form">
      <label>Plano desejado<select value={plan} onChange={event => { setPlan(event.target.value); setReady(false); }}>{planNames.map(value => <option key={value}>{value}</option>)}</select></label>
      {journey === "start" && !directPlan && <p className="signup-note">A contratação automática está disponível para Médico Individual. Para {plan}, nossa equipe confirma os detalhes da clínica antes da contratação.</p>}
      {!wantsPurchase && <label>Lembretes por WhatsApp<select value={messaging} onChange={event => { setMessaging(event.target.value); setReady(false); }}>{messagingOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>}
      {!wantsPurchase && <p className="signup-note">Franquias para lembretes de consulta. Uma confirmação e um lembrete consomem duas mensagens. Campanhas não estão incluídas; ao atingir o limite, novos envios ficam pausados.</p>}
      <button type="button" className="button button-coral" onClick={() => setStage("account")}>Continuar para cadastro ↗</button></div></>}
    {stage === "account" && <form onSubmit={submit} className="signup-form">
      <div className="signup-row"><label>Seu nome<input required autoComplete="name" value={name} onChange={event => { setName(event.target.value); setReady(false); }} placeholder="Nome do responsável" /></label><label>Clínica ou consultório<input required value={clinic} onChange={event => { setClinic(event.target.value); setReady(false); }} placeholder="Nome da clínica" /></label></div>
      {checkoutEligible && <><label>Endereço da sua clínica<input required autoComplete="off" value={slug} onChange={event => { setSlug(event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 40)); setReady(false); }} placeholder="meu-consultorio" minLength={3} maxLength={40} pattern="[a-z][a-z0-9]*(?:-[a-z0-9]+)*" /><small>{slug || "meu-consultorio"}.fluxoclinicas.online</small></label><div className="signup-row"><label>CPF do médico<input required inputMode="numeric" autoComplete="off" value={taxId} onChange={event => { setTaxId(event.target.value); setReady(false); }} placeholder="000.000.000-00" minLength={11} maxLength={14} /></label><label>CRM com UF<input required value={crm} onChange={event => { setCrm(event.target.value); setReady(false); }} placeholder="CRM/MG 42957" /></label></div><label>Crie sua senha<input required type="password" autoComplete="new-password" minLength={10} maxLength={128} value={password} onChange={event => { setPassword(event.target.value); setReady(false); }} placeholder="Pelo menos 10 caracteres" /></label></>}
      {checkoutEligible && <><div className="signup-row"><label>CEP do pagador<input required inputMode="numeric" autoComplete="postal-code" value={postalCode} onChange={event => { setPostalCode(event.target.value); setReady(false); }} placeholder="00000-000" /></label><label>Rua e endereço<input required autoComplete="street-address" value={address} onChange={event => { setAddress(event.target.value); setReady(false); }} placeholder="Rua, avenida ou praça" /></label></div><div className="signup-row"><label>Número<input required value={addressNumber} onChange={event => { setAddressNumber(event.target.value); setReady(false); }} placeholder="Número" /></label><label>Bairro<input required value={province} onChange={event => { setProvince(event.target.value); setReady(false); }} placeholder="Bairro" /></label></div></>}
      <div className="signup-row"><label>E-mail de contato<input required type="email" autoComplete="email" value={email} onChange={event => { setEmail(event.target.value); setReady(false); }} placeholder="voce@clinica.com.br" /></label><label>WhatsApp com DDD<input required type="tel" autoComplete="tel" value={phone} onChange={event => { setPhone(event.target.value); setReady(false); }} placeholder="(62) 99999-9999" /></label></div>
      {!checkoutEligible && <label>Quantos médicos usarão o sistema?<input required type="number" min="1" max="100" value={doctors} onChange={event => { setDoctors(event.target.value); setReady(false); }} placeholder="Ex.: 5" /></label>}
      {journey === "demo" && <label>Horário da demonstração<select value={selectedSlot} onChange={event => { setSelectedSlot(event.target.value); setReady(false); }} disabled={slotsLoading || demoSlots.length === 0}><option value="">{slotsLoading ? "Carregando horários..." : demoSlots.length ? "Escolha um horário" : "Nenhum horário disponível; solicite contato"}</option>{demoSlots.map(slot => <option key={slot.id} value={slot.id}>{new Intl.DateTimeFormat("pt-BR", { dateStyle: "full", timeStyle: "short", timeZone: "America/Sao_Paulo" }).format(new Date(slot.startsAt))}</option>)}</select></label>}
      <div className="signup-total" aria-live="polite"><span>{checkoutEligible ? "Pagamento de hoje" : "Total mensal estimado"}</span><strong>{total === null ? "Sob proposta" : formatBRL(checkoutEligible ? checkoutBase! : total)}</strong><small>{checkoutEligible ? "Plano Médico Individual. " : "Plano + médicos + franquia escolhida. "} {checkoutEligible ? paymentMethod === "PIX" ? "O Pix aparecerá na página de pagamento da FluxoClínicas." : paymentMethod === "BOLETO" ? "O boleto aparecerá na página de pagamento da FluxoClínicas." : "O cartão será informado na página segura do Asaas." : "Sem cobrança nesta etapa."}</small></div>
      <div className="signup-flow-actions"><button type="button" onClick={() => setStage("plan")}>← Voltar</button><button className="button button-coral" type="submit">{checkoutEligible ? "Continuar para pagamento ↗" : "Revisar solicitação ↗"}</button></div>
      <p className="signup-disclaimer">{checkoutEligible ? "A clínica só será ativada após a confirmação do pagamento pelo Asaas." : "Esta etapa não cria acesso nem gera cobrança."}{!checkoutEligible ? " Lembretes automáticos dependem de ativação do serviço." : ""}</p>
    </form>}
    {error && <p className="signup-error" role="alert">{error}</p>}
    {submitted && <div className="signup-success" role="status"><strong>{journey === "start" ? "Pedido de proposta recebido!" : selectedSlot ? "Demonstração agendada!" : "Pedido de demonstração recebido!"}</strong><p>{journey === "demo" && selectedSlot ? "O horário foi reservado. Nossa equipe entrará em contato para confirmar os detalhes." : "A equipe comercial recebeu sua solicitação e entrará em contato."}</p></div>}
    {stage === "payment" && ready && <div className="signup-review">
      <div className="signup-review-brand"><img src="/assets/fluxoclinicas-mark-light.svg" alt="" width="34" height="34" /><span>FluxoClínicas<small>{checkoutEligible ? "Confira sua contratação" : "Confira sua solicitação"}</small></span></div>
      <div className="signup-review-content"><h4>{checkoutEligible ? "Escolha como pagar" : "Confira antes de enviar"}</h4><dl><div><dt>Clínica</dt><dd>{clinic}</dd></div>{checkoutEligible && <div><dt>Endereço</dt><dd>{slug}.fluxoclinicas.online</dd></div>}<div><dt>Plano</dt><dd>{plan} · {checkoutEligible ? 1 : doctors} médico(s)</dd></div>{!checkoutEligible && <div><dt>Mensageria</dt><dd>{messagingOptions.find(option => option.value === messaging)?.label}</dd></div>}<div><dt>Responsável</dt><dd>{name} · {email} · {phone}</dd></div>{checkoutEligible && <><div className="signup-review-price"><dt>Pagamento de hoje</dt><dd>{formatBRL(checkoutBase!)}</dd></div></>}</dl>{checkoutEligible && <fieldset className="signup-payment-method"><legend>Forma de pagamento</legend><label><input type="radio" name="payment-method" checked={paymentMethod === "PIX"} onChange={() => setPaymentMethod("PIX")} />Pix na FluxoClínicas</label><label><input type="radio" name="payment-method" checked={paymentMethod === "CREDIT_CARD"} onChange={() => setPaymentMethod("CREDIT_CARD")} />Cartão de crédito no checkout seguro do Asaas</label><label><input type="radio" name="payment-method" checked={paymentMethod === "BOLETO"} onChange={() => setPaymentMethod("BOLETO")} />Boleto bancário</label></fieldset>}{error && <p className="signup-error" role="alert">{error}</p>}<div className="signup-flow-actions"><button type="button" onClick={() => { setReady(false); setStage("account"); }}>← Voltar</button><button className="button button-dark" type="button" onClick={sendLead} disabled={sending}>{sending ? "Aguarde..." : checkoutEligible ? paymentMethod === "PIX" ? `Gerar Pix de ${formatBRL(checkoutBase!)} ↗` : paymentMethod === "BOLETO" ? `Gerar boleto de ${formatBRL(checkoutBase!)} ↗` : "Ir para cartão de crédito ↗" : journey === "demo" ? "Solicitar demonstração ↗" : "Solicitar proposta ↗"}</button></div><small>{checkoutEligible ? paymentMethod === "PIX" ? "O Pix aparecerá na página da FluxoClínicas. Seu acesso será liberado após a confirmação." : paymentMethod === "BOLETO" ? "O boleto aparecerá na página da FluxoClínicas. Seu acesso será liberado após a compensação." : "Os dados do cartão serão informados no Asaas. Seu acesso será liberado após a confirmação." : "A equipe entrará em contato para combinar o próximo passo."}</small></div>
    </div>}
  </div></div>;
}
