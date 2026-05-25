import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/app/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NexDraft - Intelligent Drafting for AI Development",
  description:
    "Transform startup ideas into production-ready technical documentation and development blueprints in minutes. Powered by autonomous AI agents.",
  keywords: [
    "AI",
    "Development",
    "Documentation",
    "Startup",
    "Blueprint",
    "Technical Specs",
  ],
  openGraph: {
    title: "NexDraft - From Product Idea to Engineering Blueprint",
    description:
      "Generate production-ready PRDs, system architectures, technical specifications, and implementation plans in minutes.",
    type: "website",
    url: "https://nexdraft.ai",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-light">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
