import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    metadataBase: new URL("https://fluxoclinicas.online"),
    verification: { google: "VN3UFHlE8ZioEt4LtNF-Ka4cbfPRqVLBQ0QzHtYft6Y" },
    title: "FluxoClínicas | Agenda, atendimento e gestão em um só fluxo",
    description: "Organize agenda, recepção, prontuário e gestão da clínica em uma plataforma feita para sua equipe.",
    openGraph: {
        url: "/",
        type: "website",
        locale: "pt_BR",
        siteName: "FluxoClínicas",
        title: "FluxoClínicas | Agenda, atendimento e gestão em um só fluxo",
        description: "Organize agenda, recepção, prontuário e gestão da clínica em uma plataforma feita para sua equipe.",
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
