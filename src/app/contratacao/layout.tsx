import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acompanhar contratação | FluxoClínicas",
  robots: { index: false, follow: false },
};

export default function ContractLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
