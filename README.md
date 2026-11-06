# FluxoClínicas — Site comercial

Site de vendas do **FluxoClínicas**, software de gestão para clínicas e médicos (agenda, recepção, prontuário, painel de chamada e financeiro).

Além das páginas de marketing, o site cuida do funil comercial completo:

- **Contratação online** — escolha de plano e cadastro (`/contratacao`)
- **Checkout** com cartão e **Pix** (`/api/checkout`, `/api/pix-checkout`)
- **Agendamento de demonstração** com horários disponíveis (`/api/demo-slots`, `/api/demo-bookings`)
- **Captura de leads** comerciais (`/api/commercial-leads`)
- Página de **identidade visual** da marca

## Stack

- [Next.js](https://nextjs.org/) (App Router) + TypeScript
- GSAP, Lenis e SplitType para animações e scroll suave
- Docker para deploy

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Estrutura

```
src/app/
├── api/            # rotas de checkout, Pix, leads e demonstrações
├── contratacao/    # fluxo de contratação
├── pagamento/      # páginas de pagamento
└── page.tsx        # landing page
```

---

Desenvolvido por [João Victor](https://github.com/srjuao) · Pier Dev
