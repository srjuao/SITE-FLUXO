"use client";

export default function JourneyLink({ journey, children, className }: { journey: "start" | "demo"; children: React.ReactNode; className?: string }) {
  return <a href="#cadastro" className={className} onClick={event => { event.preventDefault(); try { window.sessionStorage.setItem("fluxo:last-cta", event.currentTarget.textContent?.trim().slice(0, 100) || journey); } catch { /* Storage may be disabled. */ } window.dispatchEvent(new CustomEvent("select-journey", { detail: journey })); }}>{children}</a>;
}
