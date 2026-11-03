"use client";

export default function JourneyLink({ journey, children, className }: { journey: "start" | "demo"; children: React.ReactNode; className?: string }) {
  return <a href="#cadastro" className={className} onClick={() => window.dispatchEvent(new CustomEvent("select-journey", { detail: journey }))}>{children}</a>;
}
