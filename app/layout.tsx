import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "VoluChat - Instagram Sales Automation for Indian Sellers",
  description: "Turn Instagram followers into paying customers on autopilot with AI-powered DMs in Indian languages. Built for Indian Instagram & WhatsApp Business sellers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/voluchat_logo.svg" type="image/svg+xml" />
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}

