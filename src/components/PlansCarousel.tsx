"use client";

import { useRef, useState } from "react";

type Plan = { name: string; price: string; unit: string; features: string[] };

export default function PlansCarousel({ plans }: { plans: Plan[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function move(direction: number) {
    const next = Math.max(0, Math.min(plans.length - 1, active + direction));
    const card = track.current?.children[next] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    setActive(next);
  }

  return <div className="carousel">
    <div className="carousel-controls"><span>Explore os planos <strong>{String(active + 1).padStart(2, "0")} / {String(plans.length).padStart(2, "0")}</strong></span><div><button type="button" onClick={() => move(-1)} disabled={active === 0} aria-label="Plano anterior">Anterior</button><button type="button" onClick={() => move(1)} disabled={active === plans.length - 1} aria-label="Próximo plano">Próximo</button></div></div>
    <div className="plans-grid" ref={track} onScroll={() => { const el = track.current; if (!el?.firstElementChild) return; const width = (el.firstElementChild as HTMLElement).getBoundingClientRect().width + 18; setActive(Math.min(plans.length - 1, Math.max(0, Math.round(el.scrollLeft / width)))); }} aria-label="Planos do FluxoClínicas">
      {plans.map((plan, index) => <article className={`plan ${index === 3 ? "plan-featured" : ""}`} key={plan.name}><span className="plan-number">{String(index + 1).padStart(2, "0")} / {String(plans.length).padStart(2, "0")}</span><h3>{plan.name}</h3><div className="plan-price"><strong>{plan.price}</strong><small>{plan.unit}</small></div><ul>{plan.features.map(feature => <li key={feature}>{feature}</li>)}</ul><a href="#cadastro" onClick={event => { event.preventDefault(); window.dispatchEvent(new CustomEvent("select-plan", { detail: plan.name })); }}>Escolher este plano</a></article>)}
    </div>
  </div>;
}
