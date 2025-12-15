import type { Metadata } from "next";
import { Inter, Space_Grotesk, Roboto_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: '--font-inter',
    display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: '--font-space-grotesk',
    display: 'swap',
    weight: ['400', '500', '600', '700'],
});

const robotoMono = Roboto_Mono({
    subsets: ["latin"],
    variable: '--font-roboto-mono',
    display: 'swap',
    weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
    title: "Athermind",
    description: "Athermind empowers BFSI leaders to navigate complexity with confidence. Governance, Risk, and Compliance—simplified.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${robotoMono.variable}`}>
            <body className="font-secondary">
                {children}
            </body>
        </html>
    );
}
