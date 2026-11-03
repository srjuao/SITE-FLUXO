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
  const [plan, setPlan] = useState(planNames[1]);
  const [messaging, setMessaging] = useState("none");
  const [name, setName] = useState("");
  const [clinic, setClinic] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [taxId, setTaxId] = useState("");
  const [address, setAddress] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [province, setProvince] = useState("");
  const [doctors, setDoctors] = useState("");
  const [ready, setReady] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [demoSlots, setDemoSlots] = useState<DemoSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [slotsLoading, setSlotsLoading] = useState(false);
  const checkoutAttempt = useRef<string | null>(null);

  useEffect(() => { checkoutAttempt.current = null; }, [plan, messaging, name, clinic, email, phone, taxId, address, addressNumber, postalCode, province, doctors]);

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
    const select = (event: Event) => { setPlan((event as CustomEvent<string>).detail); setReady(false); setSubmitted(false); };
    const selectJourney = (event: Event) => { setJourney((event as CustomEvent<"start" | "demo">).detail); setReady(false); setSubmitted(false); };
    window.addEventListener("select-plan", select);
    window.addEventListener("select-journey", selectJourney);
    return () => { window.removeEventListener("select-plan", select); window.removeEventListener("select-journey", selectJourney); };
  }, []);

  const directPlan = plan === "Médico Individual" || plan === "Clínica Inicial";
  const wantsPurchase = journey === "start" && directPlan;
  const total = monthlyPrice(plan, Number(doctors), messaging);
  // Patient reminder routes still report SIMULATION_ONLY. Paid packs must never be
  // charged through self-service until delivery and quota enforcement exist.
  const checkoutEligible = process.env.NEXT_PUBLIC_CHECKOUT_ENABLED === "true" && wantsPurchase && messaging === "none" && total !== null;

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setReady(true);
    setError("");
  }

  async function sendLead() {
    setSending(true);
    setError("");
    try {
      if (checkoutEligible) {
        checkoutAttempt.current ??= crypto.randomUUID();
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Idempotency-Key": checkoutAttempt.current },
          body: JSON.stringify({ plan, messaging, name, clinic, email, phone, doctors: Number(doctors), taxId: taxId.replace(/\D/g, ""), address, addressNumber, postalCode: postalCode.replace(/\D/g, ""), province }),
        });
        const result = await response.json() as { checkoutUrl?: string; error?: string };
        if (!response.ok || !result.checkoutUrl) throw new Error(result.error || "O pagamento está indisponível. Tente novamente mais tarde ou agende uma demonstração.");
        const checkout = new URL(result.checkoutUrl);
        if (checkout.protocol !== "https:" || !["asaas.com", "sandbox.asaas.com"].includes(checkout.hostname)) throw new Error("O endereço de pagamento retornado é inválido.");
        window.location.assign(checkout.toString());
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

  return <div className="signup-card" id="cadastro">
    <div className="signup-intro"><span className="signup-kicker">COMECE AQUI</span><h3>Qual é o seu próximo passo?</h3><p>Escolha contratar ou conhecer a plataforma em uma demonstração.</p></div>
    <div className="signup-paths" role="group" aria-label="Como deseja começar">
      <button type="button" className={journey === "start" ? "selected" : ""} aria-pressed={journey === "start"} onClick={() => { setJourney("start"); setReady(false); setSubmitted(false); }}><strong>Quero contratar</strong><span>Escolha o plano para sua clínica.</span></button>
      <button type="button" className={journey === "demo" ? "selected" : ""} aria-pressed={journey === "demo"} onClick={() => { setJourney("demo"); setReady(false); setSubmitted(false); }}><strong>Agendar demonstração</strong><span>Converse com a equipe antes de decidir.</span></button>
    </div>
    <form onSubmit={submit} className="signup-form">
      <label>Plano desejado<select value={plan} onChange={event => { setPlan(event.target.value); setReady(false); }}>{planNames.map(value => <option key={value}>{value}</option>)}</select></label>
      {journey === "start" && !directPlan && <p className="signup-note">O plano {plan} exige uma demonstração e condições comerciais confirmadas antes da contratação.</p>}
      <label>Lembretes por WhatsApp<select value={messaging} onChange={event => { setMessaging(event.target.value); setReady(false); }}>{messagingOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
      {journey === "start" && messaging !== "none" && <p className="signup-note">Com lembretes, nossa equipe confirma a ativação do canal antes de cobrar a franquia. Você pode contratar o sistema agora sem mensageria ou solicitar uma proposta com mensagens.</p>}
      <p className="signup-note">Franquias para lembretes de consulta. Uma confirmação e um lembrete consomem duas mensagens. Campanhas não estão incluídas; ao atingir o limite, novos envios ficam pausados.</p>
      <div className="signup-row"><label>Seu nome<input required autoComplete="name" value={name} onChange={event => { setName(event.target.value); setReady(false); }} placeholder="Nome do responsável" /></label><label>Clínica ou consultório<input required value={clinic} onChange={event => { setClinic(event.target.value); setReady(false); }} placeholder="Nome da clínica" /></label></div>
      {checkoutEligible && <label>CPF ou CNPJ do pagador<input required inputMode="numeric" autoComplete="off" value={taxId} onChange={event => { setTaxId(event.target.value); setReady(false); }} placeholder="CPF ou CNPJ" minLength={11} maxLength={18} /></label>}
      {checkoutEligible && <><div className="signup-row"><label>CEP do pagador<input required inputMode="numeric" autoComplete="postal-code" value={postalCode} onChange={event => { setPostalCode(event.target.value); setReady(false); }} placeholder="00000-000" /></label><label>Rua e endereço<input required autoComplete="street-address" value={address} onChange={event => { setAddress(event.target.value); setReady(false); }} placeholder="Rua, avenida ou praça" /></label></div><div className="signup-row"><label>Número<input required value={addressNumber} onChange={event => { setAddressNumber(event.target.value); setReady(false); }} placeholder="Número" /></label><label>Bairro<input required value={province} onChange={event => { setProvince(event.target.value); setReady(false); }} placeholder="Bairro" /></label></div></>}
      <div className="signup-row"><label>E-mail de contato<input required type="email" autoComplete="email" value={email} onChange={event => { setEmail(event.target.value); setReady(false); }} placeholder="voce@clinica.com.br" /></label><label>WhatsApp com DDD<input required type="tel" autoComplete="tel" value={phone} onChange={event => { setPhone(event.target.value); setReady(false); }} placeholder="(62) 99999-9999" /></label></div>
      <label>Quantos médicos usarão o sistema?<input required type="number" min="1" max="100" value={doctors} onChange={event => { setDoctors(event.target.value); setReady(false); }} placeholder="Ex.: 5" /></label>
      {journey === "demo" && <label>Horário da demonstração<select value={selectedSlot} onChange={event => { setSelectedSlot(event.target.value); setReady(false); }} disabled={slotsLoading || demoSlots.length === 0}><option value="">{slotsLoading ? "Carregando horários..." : demoSlots.length ? "Escolha um horário" : "Nenhum horário disponível; solicite contato"}</option>{demoSlots.map(slot => <option key={slot.id} value={slot.id}>{new Intl.DateTimeFormat("pt-BR", { dateStyle: "full", timeStyle: "short", timeZone: "America/Sao_Paulo" }).format(new Date(slot.startsAt))}</option>)}</select></label>}
      <div className="signup-total" aria-live="polite"><span>{checkoutEligible ? "Valor da primeira cobrança" : "Total mensal estimado"}</span><strong>{total === null ? "Sob proposta" : formatBRL(total)}</strong><small>Plano + médicos + franquia escolhida. {checkoutEligible ? "Você revisará o pagamento na página segura do Asaas." : "Sem cobrança nesta etapa."}</small></div>
      <button className="button button-coral" type="submit">Revisar solicitação ↗</button>
      <p className="signup-disclaimer">{checkoutEligible ? "A clínica só será ativada após a confirmação do pagamento pelo Asaas." : "Esta etapa não cria acesso nem gera cobrança."} Lembretes automáticos dependem de ativação do serviço.</p>
    </form>
    {error && <p className="signup-error" role="alert">{error}</p>}
    {submitted && <div className="signup-success" role="status"><strong>{journey === "start" ? "Pedido de proposta recebido!" : selectedSlot ? "Demonstração agendada!" : "Pedido de demonstração recebido!"}</strong><p>{journey === "demo" && selectedSlot ? "O horário foi reservado. Nossa equipe entrará em contato para confirmar os detalhes." : "A equipe comercial recebeu sua solicitação e entrará em contato."}</p></div>}
    {ready && <div className="signup-review" role="status"><h4>Confira antes de enviar</h4><p><strong>{clinic}</strong> · {doctors} médico(s)<br />{plan} · {messagingOptions.find(option => option.value === messaging)?.label}<br />{total === null ? "Valor sob proposta" : `Total: ${formatBRL(total)}/mês`}<br />Contato: {name} · {email} · {phone}</p><button className="button button-dark" type="button" onClick={sendLead} disabled={sending}>{sending ? "Aguarde..." : checkoutEligible ? "Ir para o pagamento seguro ↗" : journey === "demo" ? "Solicitar demonstração ↗" : "Solicitar proposta ↗"}</button><small>{checkoutEligible ? "Acesso liberado apenas depois da confirmação do Asaas." : "A equipe entrará em contato para combinar o próximo passo."}</small></div>}
  </div>;
}
