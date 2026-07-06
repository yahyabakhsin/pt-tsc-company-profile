import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { QueryProvider } from "@/providers/query-provider";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "PT Tirta Surya Cipta | Industrial Automation & Systems Integration",
  description: "Enterprise-grade industrial system solutions including PLC programming, HMI/SCADA development, electrical control panels, and automation integration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="font-sans antialiased bg-background text-foreground flex flex-col min-h-screen">
        <QueryProvider>
          <Navbar />
          <main className="flex-grow flex flex-col">
            {children}
          </main>
          <Footer />
          <Toaster position="top-right" theme="dark" richColors />
        </QueryProvider>
      </body>
    </html>
  );
}
