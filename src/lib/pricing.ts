export const messagingPackages = [
  { value: "none", label: "Sem lembretes por enquanto", monthly: 0, limit: 0 },
  { value: "ate-100", label: "Até 100 lembretes por mês", monthly: 39, limit: 100 },
  { value: "101-500", label: "Até 500 lembretes por mês", monthly: 119, limit: 500 },
  { value: "501-2000", label: "Até 2.000 lembretes por mês", monthly: 349, limit: 2000 },
] as const;

export const planPrices: Record<string, { base: number; perDoctor: number } | null> = {
  "Médico Individual": { base: 0, perDoctor: 75 },
  "Clínica Inicial": { base: 149, perDoctor: 49 },
  "Clínica Essencial": { base: 249, perDoctor: 59 },
  "Gestão": { base: 399, perDoctor: 79 },
  "Avançado": { base: 699, perDoctor: 99 },
  "Personalizado": null,
};

export function monthlyPrice(plan: string, doctors: number, messaging: string): number | null {
  const price = planPrices[plan];
  const pack = messagingPackages.find(option => option.value === messaging);
  if (!price || !pack || !Number.isInteger(doctors) || doctors < 1) return null;
  return price.base + price.perDoctor * doctors + pack.monthly;
}

export function formatBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}
