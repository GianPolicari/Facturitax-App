import type { Metadata } from "next";
import { Inter, Great_Vibes } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const greatVibes = Great_Vibes({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-great-vibes",
});

export const metadata: Metadata = {
    title: "Facturitax - Generador de Recibos X",
    description: "Generador de recibos tipo X estilo argentino para impresión",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className={`${inter.className} ${greatVibes.variable} antialiased bg-slate-100 min-h-screen text-slate-900`}>
                {children}
            </body>
        </html>
    );
}
