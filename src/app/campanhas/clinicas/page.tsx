"use client";

import { useState } from "react";
import styles from "./page.module.css";

type FormData = { name: string; clinic: string; email: string; phone: string; doctors: string };

export default function CampaignClinicsPage() {
  const [form, setForm] = useState<FormData>({ name: "", clinic: "", email: "", phone: "", doctors: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [website, setWebsite] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    setSending(true);
    setError("");
    try {
      const digits = form.phone.replace(/\D/g, "");
      if (digits.length < 11 || digits.length > 13) throw new Error("Informe um WhatsApp com DDD válido.");
      const response = await fetch("/api/commercial-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: "Clínica Inicial", messaging: "nao-sei", name: form.name.trim(),
          clinic: form.clinic.trim(), email: form.email.trim(), phone: form.phone.trim(),
          doctors: Number(form.doctors), website, intent: "demo",
        }),
      });
      if (!response.ok) throw new Error("Não conseguimos receber sua solicitação agora. Tente novamente em instantes.");
      setSent(true);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Tente novamente em instantes.");
    } finally {
      setSending(false);
    }
  }

  return <main className={styles.page}>
    <header className={styles.header}><a href="/" aria-label="FluxoClínicas, página inicial"><span className={styles.mark}>F</span><span>fluxo<span className={styles.brandLight}>clínicas</span></span></a><span>Um produto da Fluxo Apps</span></header>
    <div className={styles.body}>
      <section className={styles.pitch} aria-labelledby="campaign-title">
        <span className={styles.eyebrow}>PARA CLÍNICAS QUE QUEREM FLUIR MELHOR</span>
        <h1 id="campaign-title">Sua equipe cadastra tudo <em>duas vezes?</em></h1>
        <p className={styles.lead}>Agenda, recepção e atendimento podem seguir o mesmo fluxo. Conte como sua clínica funciona e veja uma demonstração aplicada à sua rotina.</p>
        <div className={styles.flow} aria-label="Fluxo do atendimento"><span>Agendar</span><i aria-hidden="true"/><span>Receber</span><i aria-hidden="true"/><span>Atender</span></div>
        <ul className={styles.points}><li>Informações organizadas em um só sistema</li><li>Recepção e médicos acompanhando as mesmas etapas</li><li>Demonstração conforme o tamanho da clínica</li></ul>
        <p className={styles.disclaimer}>Sem compromisso. Não informe dados de pacientes neste formulário.</p>
      </section>
      <section className={styles.card} aria-labelledby="form-title">
        <span className={styles.eyebrow}>CONVERSA COM A EQUIPE</span>
        <h2 id="form-title">Vamos entender sua clínica.</h2>
        <p>Deixe seus dados para conversarmos sobre sua operação e mostrar a plataforma.</p>
        {sent ? <div className={styles.success} role="status"><strong>Pedido recebido.</strong><span>A equipe comercial entrará em contato pelo telefone ou email informado.</span></div> : <form onSubmit={submit} className={styles.form}>
          <label>Seu nome<input required autoComplete="name" maxLength={160} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Nome do responsável" /></label>
          <label>Nome da clínica<input required maxLength={180} value={form.clinic} onChange={e => setForm({ ...form, clinic: e.target.value })} placeholder="Como se chama sua clínica?" /></label>
          <div className={styles.row}><label>Email profissional<input required type="email" autoComplete="email" maxLength={320} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="voce@clinica.com.br" /></label><label>WhatsApp com DDD<input required type="tel" autoComplete="tel" minLength={10} maxLength={30} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="(62) 99999-9999" /></label></div>
          <label>Quantos médicos atendem na clínica?<input required type="number" min="1" max="100" value={form.doctors} onChange={e => setForm({ ...form, doctors: e.target.value })} placeholder="Ex.: 5" /></label>
          <input className={styles.honeypot} tabIndex={-1} autoComplete="off" aria-hidden="true" name="website" value={website} onChange={e => setWebsite(e.target.value)} />
          {error && <p role="alert" className={styles.error}>{error}</p>}
          <button disabled={sending} type="submit">{sending ? "Enviando…" : "Pedir demonstração"}<span aria-hidden="true">↗</span></button>
          <small>Usaremos seus dados para responder ao pedido. Consulte nossa <a href="/politica-de-privacidade">política de privacidade</a>.</small>
        </form>}
      </section>
    </div>
    <footer className={styles.footer}><span>FluxoClínicas · Fluxo Apps</span><a href="/">Conhecer a plataforma ↗</a></footer>
  </main>;
}
