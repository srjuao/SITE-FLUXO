import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Organize sua clínica | FluxoClínicas",
  description: "Conte como sua clínica trabalha e veja uma demonstração do FluxoClínicas aplicada à sua rotina.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
