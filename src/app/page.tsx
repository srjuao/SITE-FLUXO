import ClientLogic from "@/components/ClientLogic";

export default function Home() {
    return (
        <>
            <ClientLogic />

            {/* Header */}
            <header className="header" id="header">
                <nav className="nav container">
                    <a href="#" className="nav__logo">
                        <img src="/assets/logo.png" alt="Fluxo Clínicas" className="logo-img" />
                        <span>Fluxo Clínicas</span>
                    </a>

                    <div className="nav__menu" id="nav-menu">
                        <ul className="nav__list">
                            <li><a href="#funcionalidades" className="nav__link">Funcionalidades</a></li>
                            <li><a href="#precos" className="nav__link">Planos</a></li>
                            <li><a href="#api" className="nav__link">API</a></li>
                            <li><a href="#contato" className="nav__link">Contato</a></li>
                        </ul>
                        <div className="nav__mobile-actions">
                            <a href="https://app.fluxoclinicas.online" className="btn btn--ghost">Entrar</a>
                            <a href="#contato" className="btn btn--primary">Começar Grátis</a>
                        </div>
                    </div>

                    <div className="nav__actions">
                        <a href="https://app.fluxoclinicas.online" className="btn btn--ghost">Entrar</a>
                        <a href="#contato" className="btn btn--primary">Começar Grátis</a>
                    </div>

                    <button className="nav__toggle" id="nav-toggle">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero__bg">
                    <div className="hero__glow hero__glow--1"></div>
                    <div className="hero__glow hero__glow--2"></div>
                </div>

                <div className="container hero__container">
                    <div className="hero__content">
                        <span className="hero__badge">
                            <span className="badge__dot"></span>
                            Novo: Integração com WhatsApp Business
                        </span>

                        <h1 className="hero__title">
                            Relacionamento com o <span className="text-gradient">paciente</span>, reinventado
                        </h1>

                        <p className="hero__description">
                            Tecnologia que humaniza a saúde. Simplificamos a gestão da sua clínica para você focar no que
                            realmente importa: o cuidado com seus pacientes.
                        </p>

                        <div className="hero__actions">
                            <a href="#contato" className="btn btn--primary btn--lg">
                                Começar Grátis
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                            <a href="#funcionalidades" className="btn btn--ghost btn--lg">
                                Ver Funcionalidades
                            </a>
                        </div>

                        <div className="hero__stats">
                            <div className="stat">
                                <span className="stat__number">2.500+</span>
                                <span className="stat__label">Clínicas ativas</span>
                            </div>
                            <div className="stat">
                                <span className="stat__number">1M+</span>
                                <span className="stat__label">Agendamentos/mês</span>
                            </div>
                            <div className="stat">
                                <span className="stat__number">99.9%</span>
                                <span className="stat__label">Uptime</span>
                            </div>
                        </div>
                    </div>

                    <div className="hero__image">
                        <div className="dashboard-preview">
                            <div className="dashboard-preview__header">
                                <div className="window-controls">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <span className="dashboard-preview__title">Minha Agenda</span>
                            </div>
                            <div className="dashboard-preview__content">
                                <div className="schedule-item">
                                    <div className="schedule-time">08:00</div>
                                    <div className="schedule-info">
                                        <span className="schedule-name">Maria Silva</span>
                                        <span className="schedule-type">Consulta de Rotina</span>
                                    </div>
                                    <span className="schedule-status schedule-status--confirmed">Confirmado</span>
                                </div>
                                <div className="schedule-item">
                                    <div className="schedule-time">09:30</div>
                                    <div className="schedule-info">
                                        <span className="schedule-name">João Santos</span>
                                        <span className="schedule-type">Retorno</span>
                                    </div>
                                    <span className="schedule-status schedule-status--pending">Pendente</span>
                                </div>
                                <div className="schedule-item">
                                    <div className="schedule-time">11:00</div>
                                    <div className="schedule-info">
                                        <span className="schedule-name">Ana Costa</span>
                                        <span className="schedule-type">Primeira Consulta</span>
                                    </div>
                                    <span className="schedule-status schedule-status--confirmed">Confirmado</span>
                                </div>
                                <div className="schedule-item">
                                    <div className="schedule-time">14:00</div>
                                    <div className="schedule-info">
                                        <span className="schedule-name">Pedro Lima</span>
                                        <span className="schedule-type">Exame</span>
                                    </div>
                                    <span className="schedule-status schedule-status--confirmed">Confirmado</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features" id="funcionalidades">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">Funcionalidades</span>
                        <h2 className="section-title">Funcionalidades que <span className="text-gradient">fazem a diferença</span></h2>
                        <p className="section-description">Tudo que você precisa para gerenciar sua clínica de forma eficiente e profissional.</p>
                    </div>

                    <div className="features__grid">
                        <div className="feature-card">
                            <div className="feature-card__icon">
                                <svg viewBox="0 0 24 24" fill="none">
                                    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" />
                                    <circle cx="12" cy="16" r="2" fill="currentColor" />
                                </svg>
                            </div>
                            <h3 className="feature-card__title">Agendamento Automático</h3>
                            <p className="feature-card__description">Pacientes agendam online 24/7. Confirmação automática por WhatsApp e redução de faltas em até 40%.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-card__icon">
                                <svg viewBox="0 0 24 24" fill="none">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
                                </svg>
                            </div>
                            <h3 className="feature-card__title">Gestão de Pacientes</h3>
                            <p className="feature-card__description">Prontuário completo, histórico de atendimentos, documentos e comunicação centralizada.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-card__icon">
                                <svg viewBox="0 0 24 24" fill="none">
                                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3 className="feature-card__title">WhatsApp Integrado</h3>
                            <p className="feature-card__description">Comunicação direta com pacientes. Lembretes, confirmações e atendimento via WhatsApp Business.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-card__icon">
                                <svg viewBox="0 0 24 24" fill="none">
                                    <path d="M21.21 15.89A10 10 0 1 1 8 2.83" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M22 12A10 10 0 0 0 12 2v10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3 className="feature-card__title">Relatórios Inteligentes</h3>
                            <p className="feature-card__description">Dashboards em tempo real. Métricas de faturamento, ocupação e desempenho da equipe.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* AI Features */}
            <section className="ai-features">
                <div className="container">
                    <div className="ai-feature">
                        <div className="ai-feature__content">
                            <span className="section-tag">Inteligência Artificial</span>
                            <h2 className="section-title">Prontuário <span className="text-gradient">Inteligente</span></h2>
                            <p className="ai-feature__description">
                                Nosso prontuário eletrônico com IA aprende com seus padrões de atendimento e sugere
                                diagnósticos, medicamentos e condutas baseados no histórico do paciente.
                            </p>
                            <ul className="ai-feature__list">
                                <li>
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    Sugestões inteligentes de CID e condutas
                                </li>
                                <li>
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    Templates personalizados por especialidade
                                </li>
                                <li>
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    Integração com laboratórios e exames
                                </li>
                            </ul>
                        </div>
                        <div className="ai-feature__visual">
                            <div className="ai-card">
                                <div className="ai-card__header">
                                    <span className="ai-badge">IA</span>
                                    <span>Sugestão de Diagnóstico</span>
                                </div>
                                <div className="ai-card__content">
                                    <p>Baseado nos sintomas relatados, as possibilidades incluem:</p>
                                    <div className="ai-suggestion">
                                        <span className="ai-suggestion__label">J06.9</span>
                                        <span>Infecção aguda das vias aéreas superiores</span>
                                        <span className="ai-suggestion__confidence">92%</span>
                                    </div>
                                    <div className="ai-suggestion">
                                        <span className="ai-suggestion__label">J00</span>
                                        <span>Nasofaringite aguda (resfriado comum)</span>
                                        <span className="ai-suggestion__confidence">78%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="ai-feature ai-feature--reverse">
                        <div className="ai-feature__content">
                            <span className="section-tag">Produtividade</span>
                            <h2 className="section-title">Ditado <span className="text-gradient">Inteligente</span></h2>
                            <p className="ai-feature__description">
                                Fale naturalmente durante a consulta e deixe a IA transcrever e organizar suas anotações
                                automaticamente. Economize até 50% do tempo de documentação.
                            </p>
                            <ul className="ai-feature__list">
                                <li>
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    Transcrição em tempo real com 98% de precisão
                                </li>
                                <li>
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    Formatação automática de prontuário
                                </li>
                                <li>
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    Reconhecimento de termos médicos
                                </li>
                            </ul>
                        </div>
                        <div className="ai-feature__visual">
                            <div className="dictation-card">
                                <div className="dictation-card__header">
                                    <div className="mic-icon mic-icon--active">
                                        <svg viewBox="0 0 24 24" fill="none">
                                            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" stroke="currentColor"
                                                strokeWidth="2" />
                                            <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="currentColor" strokeWidth="2"
                                                strokeLinecap="round" />
                                            <line x1="12" y1="19" x2="12" y2="23" stroke="currentColor" strokeWidth="2"
                                                strokeLinecap="round" />
                                        </svg>
                                    </div>
                                    <span>Gravando...</span>
                                </div>
                                <div className="dictation-card__waves">
                                    <span></span><span></span><span></span><span></span><span></span>
                                </div>
                                <div className="dictation-card__text">
                                    <p>&quot;Paciente relata dor de cabeça há 3 dias, localizada na região frontal, de intensidade
                                        moderada...&quot;</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="benefits">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">Vantagens</span>
                        <h2 className="section-title">Por que escolher o <span className="text-gradient">Fluxo</span>?</h2>
                    </div>

                    <div className="benefits__grid">
                        <div className="benefit-card">
                            <div className="benefit-card__icon">
                                <svg viewBox="0 0 24 24" fill="none">
                                    <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" />
                                </svg>
                            </div>
                            <h3 className="benefit-card__title">Segurança de Dados</h3>
                            <p className="benefit-card__description">Criptografia de ponta a ponta, backup automático e conformidade
                                total com a LGPD. Seus dados e dos seus pacientes estão protegidos.</p>
                        </div>

                        <div className="benefit-card">
                            <div className="benefit-card__icon">
                                <svg viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                    <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3 className="benefit-card__title">Economia de Tempo</h3>
                            <p className="benefit-card__description">Reduza até 60% do tempo gasto com tarefas administrativas.
                                Automatize agendamentos, lembretes e documentação.</p>
                        </div>

                        <div className="benefit-card">
                            <div className="benefit-card__icon">
                                <svg viewBox="0 0 24 24" fill="none">
                                    <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round" />
                                    <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3 className="benefit-card__title">Suporte Premium</h3>
                            <p className="benefit-card__description">Equipe dedicada para ajudar na implantação e uso diário.
                                Suporte via chat, telefone e treinamentos inclusos.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="pricing" id="precos">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">Planos</span>
                        <h2 className="section-title">Escolha o plano <span className="text-gradient">ideal</span></h2>
                        <p className="section-description">Planos flexíveis que crescem com sua clínica. Sem taxa de adesão, cancele
                            quando quiser.</p>
                    </div>

                    <div className="pricing__grid">
                        {/* Médico Individual */}
                        <div className="pricing-card">
                            <div className="pricing-card__header">
                                <h3 className="pricing-card__name">Médico Individual</h3>
                                <p className="pricing-card__description">Para profissionais independentes</p>
                            </div>
                            <div className="pricing-card__price">
                                <span className="price__currency">R$</span>
                                <span className="price__value">150</span>
                                <span className="price__period">/mês</span>
                            </div>
                            <ul className="pricing-card__features">
                                <li>
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    1 usuário
                                </li>
                                <li>
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    Agendamento online
                                </li>
                                <li>
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    Prontuário eletrônico
                                </li>
                                <li>
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    Lembretes por WhatsApp
                                </li>
                                <li>
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    Suporte por email
                                </li>
                            </ul>
                            <a href="#contato" className="btn btn--outline btn--block">Começar Agora</a>
                        </div>

                        {/* Clínica Pequena */}
                        <div className="pricing-card">
                            <div className="pricing-card__header">
                                <h3 className="pricing-card__name">Clínica Pequena</h3>
                                <p className="pricing-card__description">Para pequenas clínicas</p>
                            </div>
                            <div className="pricing-card__price">
                                <span className="price__currency">R$</span>
                                <span className="price__value">500</span>
                                <span className="price__period">/mês</span>
                            </div>
                            <ul className="pricing-card__features">
                                <li>
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    Até 5 usuários
                                </li>
                                <li>
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    Tudo do plano anterior
                                </li>
                                <li>
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    Múltiplas agendas
                                </li>
                                <li>
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    Relatórios básicos
                                </li>
                                <li>
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    Suporte por chat
                                </li>
                            </ul>
                            <a href="#contato" className="btn btn--outline btn--block">Começar Agora</a>
                        </div>

                        {/* Clínica Média */}
                        <div className="pricing-card pricing-card--featured">
                            <div className="pricing-card__badge">Mais Popular</div>
                            <div className="pricing-card__header">
                                <h3 className="pricing-card__name">Clínica Média</h3>
                                <p className="pricing-card__description">Para clínicas em crescimento</p>
                            </div>
                            <div className="pricing-card__price">
                                <span className="price__currency">R$</span>
                                <span className="price__value">1.200</span>
                                <span className="price__period">/mês</span>
                            </div>
                            <ul className="pricing-card__features">
                                <li>
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    Até 10 usuários
                                </li>
                                <li>
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    Tudo do plano anterior
                                </li>
                                <li>
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    Prontuário com IA
                                </li>
                                <li>
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    Ditado inteligente
                                </li>
                                <li>
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    Relatórios avançados
                                </li>
                                <li>
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    Suporte prioritário
                                </li>
                            </ul>
                            <a href="#contato" className="btn btn--primary btn--block">Começar Agora</a>
                        </div>

                        {/* Clínica Grande */}
                        <div className="pricing-card">
                            <div className="pricing-card__header">
                                <h3 className="pricing-card__name">Clínica Grande</h3>
                                <p className="pricing-card__description">Para grandes operações</p>
                            </div>
                            <div className="pricing-card__price">
                                <span className="price__currency">R$</span>
                                <span className="price__value">2.200</span>
                                <span className="price__period">/mês</span>
                            </div>
                            <ul className="pricing-card__features">
                                <li>
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    Até 20 usuários
                                </li>
                                <li>
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    Tudo do plano anterior
                                </li>
                                <li>
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    API completa
                                </li>
                                <li>
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    Integrações customizadas
                                </li>
                                <li>
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    Gerente de conta dedicado
                                </li>
                                <li>
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    SLA garantido
                                </li>
                            </ul>
                            <a href="#contato" className="btn btn--outline btn--block">Falar com Vendas</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* API Section */}
            <section className="api" id="api">
                <div className="container">
                    <div className="api__content">
                        <div className="api__info">
                            <span className="section-tag">Para Desenvolvedores</span>
                            <h2 className="section-title">API <span className="text-gradient">Robusta</span></h2>
                            <p className="api__description">
                                Integre o Fluxo Clínicas com seus sistemas existentes. Nossa API RESTful oferece acesso completo
                                a todas as funcionalidades da plataforma.
                            </p>
                            <div className="api__features">
                                <div className="api__feature">
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    Documentação completa
                                </div>
                                <div className="api__feature">
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    SDKs em várias linguagens
                                </div>
                                <div className="api__feature">
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    Webhooks em tempo real
                                </div>
                                <div className="api__feature">
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    Sandbox para testes
                                </div>
                            </div>
                            <a href="#contato" className="btn btn--primary">Acessar Documentação</a>
                        </div>
                        <div className="api__code">
                            <div className="code-block">
                                <div className="code-block__header">
                                    <span className="code-block__dot"></span>
                                    <span className="code-block__dot"></span>
                                    <span className="code-block__dot"></span>
                                    <span className="code-block__title">Exemplo de Requisição</span>
                                </div>
                                <pre className="code-block__content"><code><span className="code-comment">// Buscar agendamentos do dia</span>{'\n'}<span className="code-keyword">const</span> response = <span className="code-keyword">await</span> fetch({'\n'}  <span className="code-string">&apos;https://api.fluxoclinicas.online/v1/appointments&apos;</span>,{'\n'}  {'{'}{'\n'}    headers: {'{'}{'\n'}      <span className="code-string">&apos;Authorization&apos;</span>: <span className="code-string">{`\`Bearer \${API_KEY}\``}</span>,{'\n'}      <span className="code-string">&apos;Content-Type&apos;</span>: <span className="code-string">&apos;application/json&apos;</span>{'\n'}    {'}'}{'\n'}  {'}'}{'\n'});{'\n\n'}<span className="code-keyword">const</span> appointments = <span className="code-keyword">await</span> response.json();</code></pre>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section className="contact" id="contato">
                <div className="container">
                    <div className="contact__content">
                        <div className="contact__info">
                            <span className="section-tag">Contato</span>
                            <h2 className="section-title">Vamos <span className="text-gradient">conversar</span>?</h2>
                            <p className="contact__description">
                                Tire suas dúvidas, agende uma demonstração ou solicite uma proposta personalizada para sua
                                clínica.
                            </p>
                            <div className="contact__methods">
                                <div className="contact__method">
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path
                                            d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                                            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    <span>(62) 99928-4367</span>
                                </div>
                                <div className="contact__method">
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                                            stroke="currentColor" strokeWidth="2" />
                                        <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                    <span>suporte@fluxoclinicas.online</span>
                                </div>
                                <div className="contact__method">
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor"
                                            strokeWidth="2" />
                                        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
                                        <circle cx="18" cy="6" r="1" fill="currentColor" />
                                    </svg>
                                    <span>@fluxoclinica_</span>
                                </div>
                            </div>
                        </div>
                        <form className="contact__form" id="contact-form">
                            <div className="form-group">
                                <label htmlFor="name">Nome completo</label>
                                <input type="text" id="name" name="name" placeholder="Seu nome" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" placeholder="seu@email.com" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Telefone</label>
                                <input type="tel" id="phone" name="phone" placeholder="(11) 99999-9999" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Mensagem</label>
                                <textarea id="message" name="message" rows={4} placeholder="Como podemos ajudar?"
                                    required></textarea>
                            </div>
                            <button type="submit" className="btn btn--primary btn--block">
                                Enviar Mensagem
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round" />
                                    <path d="M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer__grid">
                        <div className="footer__brand">
                            <a href="#" className="footer__logo">
                                <img src="/assets/logo.png" alt="Fluxo Clínicas" className="logo-img" />
                                <span>Fluxo Clínicas</span>
                            </a>
                            <p className="footer__tagline">Tecnologia que humaniza a saúde.</p>
                            <div className="footer__social">
                                <a href="https://instagram.com/fluxoclinica_" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" />
                                        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
                                        <circle cx="18" cy="6" r="1" fill="currentColor" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="footer__links">
                            <h4>Produto</h4>
                            <ul>
                                <li><a href="#funcionalidades">Funcionalidades</a></li>
                                <li><a href="#precos">Planos</a></li>
                                <li><a href="#api">API</a></li>
                            </ul>
                        </div>
                        <div className="footer__links">
                            <h4>Empresa</h4>
                            <ul>
                                <li><a href="#contato">Contato</a></li>
                                <li><a href="https://app.fluxoclinicas.online">Login</a></li>
                            </ul>
                        </div>
                        <div className="footer__links">
                            <h4>Legal</h4>
                            <ul>
                                <li><a href="#">Termos de Uso</a></li>
                                <li><a href="#">Privacidade</a></li>
                                <li><a href="#">LGPD</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer__bottom">
                        <p>&copy; 2026 Fluxo Clínicas. Todos os direitos reservados.</p>
                    </div>
                </div>
            </footer>
        </>
    );
}
