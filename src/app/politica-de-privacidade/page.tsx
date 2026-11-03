import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Política de Privacidade | Fluxo Clínicas",
    description: "Política de privacidade do Fluxo Clínicas.",
    alternates: { canonical: "/politica-de-privacidade" },
    openGraph: {
        url: "/politica-de-privacidade",
        title: "Política de Privacidade | FluxoClínicas",
        description: "Política de privacidade do FluxoClínicas.",
        images: [{ url: "/assets/equipe-clinica.png", width: 1672, height: 941, alt: "Equipe de uma clínica usando o FluxoClínicas" }],
    },
};

export default function PoliticaDePrivacidade() {
    return (
        <main style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px", lineHeight: 1.7 }}>
            <a href="/" style={{ color: "inherit" }}>← Voltar para Fluxo Clínicas</a>
            <h1>Política de Privacidade</h1>
            <p><strong>Última atualização:</strong> 23 de outubro de 2026</p>

            <p>
                A Fluxo Clínicas respeita a privacidade de seus usuários e se compromete a proteger os dados
                pessoais tratados por sua plataforma de gestão para clínicas e profissionais de saúde.
            </p>

            <h2>1. Dados que podemos coletar</h2>
            <p>
                Podemos tratar dados fornecidos no cadastro e no uso da plataforma, informações de contato,
                dados de agendamento, mensagens e informações técnicas necessárias para segurança, suporte e
                funcionamento do serviço. Dados de saúde são tratados apenas quando inseridos pelo cliente no
                contexto de sua utilização da plataforma e conforme suas instruções e responsabilidades legais.
            </p>

            <h2>2. Como usamos os dados</h2>
            <p>
                Os dados são usados para prestar, manter e aprimorar os serviços, organizar agendamentos,
                facilitar a comunicação solicitada pelo usuário, oferecer suporte, prevenir fraudes e cumprir
                obrigações legais. Não vendemos dados pessoais.
            </p>

            <h2>3. Compartilhamento e fornecedores</h2>
            <p>
                Podemos compartilhar dados somente quando necessário para operar o serviço, por exemplo com
                provedores de hospedagem, segurança, comunicação e integração, sempre dentro da finalidade
                contratada e com medidas de proteção adequadas, ou quando exigido por lei.
            </p>

            <h2>4. Segurança e retenção</h2>
            <p>
                Adotamos medidas técnicas e administrativas razoáveis para proteger os dados contra acesso não
                autorizado, perda, alteração ou divulgação indevida. Mantemos os dados pelo período necessário
                às finalidades informadas, obrigações legais e defesa de direitos.
            </p>

            <h2>5. Direitos do titular</h2>
            <p>
                Nos termos da legislação aplicável, você pode solicitar confirmação de tratamento, acesso,
                correção, anonimização, eliminação quando cabível, portabilidade e informações sobre o uso dos
                seus dados. Para exercer seus direitos ou tirar dúvidas, escreva para
                <a href="mailto:joaovictorro11@gmail.com"> joaovictorro11@gmail.com</a>.
            </p>

            <h2>6. Cookies</h2>
            <p>
                Utilizamos cookies e tecnologias semelhantes quando necessários para funcionamento, segurança,
                preferências e análise de uso do site. Você pode controlar cookies nas configurações do seu
                navegador, embora isso possa afetar alguns recursos.
            </p>

            <h2>7. Alterações</h2>
            <p>
                Esta política pode ser atualizada para refletir mudanças no serviço ou na legislação. A versão
                vigente estará sempre disponível nesta página.
            </p>

            <h2>8. Contato</h2>
            <p>
                Fluxo Clínicas — <a href="https://www.fluxoapps.online">www.fluxoapps.online</a><br />
                E-mail: <a href="mailto:joaovictorro11@gmail.com">joaovictorro11@gmail.com</a>
            </p>
        </main>
    );
}
