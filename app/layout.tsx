import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cap Côtier — Réviser le permis bateau",
  description: "Cours, fiches, quiz et examens blancs pour réviser l'option côtière du permis plaisance.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
