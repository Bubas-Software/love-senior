import type { Metadata } from "next";
import { DemoPreviewNotice } from "@/components/DemoPreviewNotice";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Love Sênior | Cuidados Humanizados em Goiânia",
    template: "%s | Love Sênior",
  },
  description:
    "Cuidado domiciliar com atenção individual, carinho e respeito. Love Sênior Cuidados Humanizados em Goiânia e região.",
  keywords: [
    "home care Goiânia",
    "cuidador de idosos Goiânia",
    "técnico de enfermagem domiciliar",
    "assistência domiciliar",
    "Love Sênior",
  ],
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <DemoPreviewNotice />
        {children}
      </body>
    </html>
  );
}
