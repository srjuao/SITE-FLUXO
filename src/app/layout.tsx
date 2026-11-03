import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "FluxoClínicas | Agenda, atendimento e gestão em um só fluxo",
    description: "Organize agenda, recepção, prontuário e gestão da clínica em uma plataforma feita para sua equipe.",
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
