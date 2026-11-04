import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
    themeColor: "#113d42",
};

export const metadata: Metadata = {
    metadataBase: new URL("https://fluxoclinicas.online"),
    verification: { google: "VN3UFHlE8ZioEt4LtNF-Ka4cbfPRqVLBQ0QzHtYft6Y" },
    title: "Software de gestão para clínicas e médicos | FluxoClínicas",
    description: "Agenda médica, recepção, prontuário, painel de chamada e gestão financeira em um software que acompanha o fluxo da sua clínica. Conheça os planos.",
    applicationName: "FluxoClínicas",
    category: "software de gestão para clínicas",
    openGraph: {
        url: "/",
        type: "website",
        locale: "pt_BR",
        siteName: "FluxoClínicas",
        title: "Software de gestão para clínicas e médicos | FluxoClínicas",
        description: "Agenda médica, recepção, prontuário, painel de chamada e gestão financeira em um software que acompanha o fluxo da sua clínica.",
        images: [{ url: "/assets/equipe-clinica.png", width: 1672, height: 941, alt: "Equipe de uma clínica usando o FluxoClínicas" }],
    },
    twitter: { card: "summary_large_image" },
    icons: {
        icon: '/assets/fluxoclinicas-mark.svg',
        shortcut: '/assets/fluxoclinicas-mark.svg',
        apple: '/assets/fluxoclinicas-mark.svg',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
