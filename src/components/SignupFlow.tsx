"use client";

import { useEffect, useState } from "react";

const planNames = ["Médico Individual", "Clínica Inicial", "Clínica Essencial", "Gestão", "Avançado", "Personalizado"];
const messagingOptions = [
  { value: "ate-100", label: "Até 100 lembretes por mês" },
  { value: "101-500", label: "De 101 a 500 lembretes por mês" },
  { value: "501-2000", label: "De 501 a 2.000 lembretes por mês" },
  { value: "mais-2000", label: "Mais de 2.000 lembretes por mês" },
  { value: "nao-sei", label: "Ainda não sei o volume" },
];

export default function SignupFlow() {
  const [plan, setPlan] = useState(planNames[1]);
  const [messaging, setMessaging] = useState("nao-sei");
  const [name, setName] = useState("");
  const [clinic, setClinic] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [doctors, setDoctors] = useState("");
  const [ready, setReady] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const select = (event: Event) => { setPlan((event as CustomEvent<string>).detail); setReady(false); setSubmitted(false); };
    window.addEventListener("select-plan", select);
    return () => window.removeEventListener("select-plan", select);
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setReady(true);
    setError("");
  }

  async function sendLead() {
    setSending(true);
    setError("");
    try {
      const response = await fetch("/api/commercial-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, messaging, name, clinic, email, phone, doctors: Number(doctors), website: "" }),
      });
      if (!response.ok) throw new Error("Não foi possível enviar seu pré-cadastro. Tente novamente em instantes.");
      setSubmitted(true);
      setReady(false);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Não foi possível enviar seu pré-cadastro.");
    } finally {
      setSending(false);
    }
  }

  return <div className="signup-card" id="cadastro">
    <div className="signup-intro"><span className="signup-kicker">PRÉ-CADASTRO</span><h3>Monte sua proposta</h3><p>Escolha o plano e estime os lembretes. Calcularemos a mensageria com a tarifa vigente antes de confirmar qualquer cobrança.</p></div>
    <form onSubmit={submit} className="signup-form">
      <label>Plano desejado<select value={plan} onChange={event => { setPlan(event.target.value); setReady(false); }}>{planNames.map(value => <option key={value}>{value}</option>)}</select></label>
      <label>Lembretes por WhatsApp<select value={messaging} onChange={event => { setMessaging(event.target.value); setReady(false); }}>{messagingOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
      <div className="signup-row"><label>Seu nome<input required autoComplete="name" value={name} onChange={event => { setName(event.target.value); setReady(false); }} placeholder="Nome do responsável" /></label><label>Clínica ou consultório<input required value={clinic} onChange={event => { setClinic(event.target.value); setReady(false); }} placeholder="Nome da clínica" /></label></div>
      <div className="signup-row"><label>E-mail de contato<input required type="email" autoComplete="email" value={email} onChange={event => { setEmail(event.target.value); setReady(false); }} placeholder="voce@clinica.com.br" /></label><label>WhatsApp com DDD<input required type="tel" autoComplete="tel" value={phone} onChange={event => { setPhone(event.target.value); setReady(false); }} placeholder="(62) 99999-9999" /></label></div>
      <label>Quantos médicos usarão o sistema?<input required type="number" min="1" max="10000" value={doctors} onChange={event => { setDoctors(event.target.value); setReady(false); }} placeholder="Ex.: 5" /></label>
      <button className="button button-coral" type="submit">Revisar pré-cadastro ↗</button>
      <p className="signup-disclaimer">Esta etapa não cria acesso nem gera cobrança. Seus dados serão enviados à equipe comercial quando você confirmar abaixo.</p>
    </form>
    {error && <p className="signup-error" role="alert">{error}</p>}
    {submitted && <div className="signup-success" role="status"><strong>Pré-cadastro recebido!</strong><p>A equipe comercial recebeu sua solicitação e entrará em contato.</p></div>}
    {ready && <div className="signup-review" role="status"><h4>Confira antes de enviar</h4><p><strong>{clinic}</strong> · {doctors} médico(s)<br />{plan} · {messagingOptions.find(option => option.value === messaging)?.label}<br />Contato: {name} · {email} · {phone}</p><button className="button button-dark" type="button" onClick={sendLead} disabled={sending}>{sending ? "Enviando..." : "Confirmar e enviar cadastro ↗"}</button><small>Um cartão será criado no Kanban Comercial. A equipe entrará em contato para apresentar os valores finais.</small></div>}
  </div>;
}
