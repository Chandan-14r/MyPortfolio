import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Syne, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/providers/AppProvider";
import LenisProvider from "@/providers/LenisProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });

export const metadata: Metadata = {
  title: "Chandan R.S. | Portfolio",
  description: "Interactive portfolio of Chandan R.S.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 'cyber';
                document.documentElement.setAttribute('data-theme', theme);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrains.variable} ${syne.variable} ${bebas.variable} font-sans antialiased`}
      >
        <AppProvider>
          <LenisProvider>
            {children}
          </LenisProvider>
        </AppProvider>
      </body>
    </html>
  );
}
