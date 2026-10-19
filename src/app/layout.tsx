import type { Metadata } from "next";
import { DM_Sans, Geist } from "next/font/google";
import { designSystem, toCssVars } from "@/lib/design-system";
import { marca } from "@/content/site";
import "./globals.css";

// Fonte padrão do projeto. O design-system.json aponta para --font-inter; se você
// trocar por outra família lá, o navegador cai no fallback sem quebrar o layout.
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${marca.nome} · ${marca.tagline}`,
  description: marca.descricaoCurta,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Os tokens do design-system.json viram custom properties aqui, no servidor.
  // É isso que faz trocar o JSON repintar o app inteiro sem tocar em componente.
  const vars = toCssVars(designSystem) as React.CSSProperties;

  return (
    <html
      lang="pt-BR"
      className={`${dmSans.variable} ${geist.variable} h-full`}
      style={vars}
      data-ds={designSystem.id}
      data-mode={designSystem.mode}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
