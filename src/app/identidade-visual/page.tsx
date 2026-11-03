import type { Metadata } from "next";

export const metadata: Metadata = { title: "Identidade visual | FluxoClínicas" };

const colors = [
  ["Verde principal", "#116A69", "brand-teal"],
  ["Verde profundo", "#113D42", "brand-deep"],
  ["Menta", "#BCE7D7", "brand-mint"],
  ["Coral", "#F39A78", "brand-coral"],
  ["Marfim", "#F7F7F1", "brand-ivory"],
];

export default function IdentityPage() {
  return <main className="identity-page"><div className="identity-wrap">
    <a className="identity-back" href="/">← Voltar ao site</a>
    <div className="identity-heading"><p className="eyebrow">IDENTIDADE VISUAL</p><h1>Cuidado que acompanha cada etapa.</h1><p>O traço contínuo representa a jornada de atendimento e a conexão entre clínica, equipe e paciente. O ponto final em coral destaca a chegada do cuidado. A forma permanece legível no aplicativo, no painel de TV e em peças impressas.</p></div>
    <section className="identity-section"><h2>Assinatura e pictograma</h2><div className="identity-examples"><div className="identity-sample light"><img className="identity-logo" src="/assets/fluxoclinicas-logo-horizontal.svg" alt="Logo horizontal do FluxoClínicas" /><span>Assinatura horizontal · fundo claro</span></div><div className="identity-sample dark"><img className="identity-symbol" src="/assets/fluxoclinicas-mark-light.svg" alt="Pictograma do FluxoClínicas em fundo escuro" /><span>Pictograma · fundo escuro</span></div></div><p className="identity-downloads"><a href="/assets/fluxoclinicas-logo-horizontal.svg" download>Baixar logo SVG ↗</a><a href="/assets/fluxoclinicas-mark.svg" download>Baixar pictograma SVG ↗</a><a href="/assets/fluxoclinicas-mark-light.svg" download>Baixar versão clara SVG ↗</a></p></section>
    <section className="identity-section"><h2>Paleta</h2><div className="identity-palette">{colors.map(([name, hex, className]) => <div key={hex}><div className={`identity-swatch ${className}`} /><strong>{name}</strong><code>{hex}</code></div>)}</div></section>
    <section className="identity-section identity-rules"><h2>Como usar</h2><div><p><strong>Respiro.</strong> Deixe ao redor do pictograma pelo menos um quarto da sua largura.</p><p><strong>Tamanho mínimo.</strong> Use o pictograma com pelo menos 24 px na tela; a assinatura horizontal, com pelo menos 150 px.</p><p><strong>Contraste.</strong> Use a marca principal em superfícies claras e a versão clara sobre verde profundo. Preserve as cores e proporções dos arquivos.</p></div></section>
  </div></main>;
}
