import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CP Tracker",
  description: "High-performance Investment Dashboard",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary/30">
        <nav className="md:flex hidden items-center justify-between p-4 bg-surface surface-shadow sticky top-0 z-50 pt-[calc(1rem+env(safe-area-inset-top))]">
          <div className="text-primary font-bold text-xl tracking-tight">CP Tracker</div>
        </nav>
        <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-6 md:py-8 flex flex-col pt-[calc(1rem+env(safe-area-inset-top))]">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
