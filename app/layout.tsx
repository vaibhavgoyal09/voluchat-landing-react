import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { HydrationFix } from "@/components/hydration-fix";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: {
    default: "VoluChat - AI-Powered Instagram Sales Automation",
    template: "%s | VoluChat",
  },
  description:
    "Turn Instagram followers into paying customers on autopilot with AI-powered DMs in multiple languages. The Instagram sales automation platform for e-commerce brands.",
  keywords: [
    "Instagram automation",
    "Instagram sales automation",
    "Instagram DM automation",
    "WhatsApp Business automation",
    "AI chatbot for Instagram",
    "Multilingual chatbot",
    "E-commerce automation",
    "Instagram lead generation",
    "Social commerce automation",
    "Instagram to WhatsApp automation",
    "Automated customer support",
    "Instagram business tools",
    "AI-powered sales assistant",
    "Cross-platform messaging automation",
    "Instagram marketing automation",
    "E-commerce chatbot",
    "Automated sales funnel",
    "Instagram CRM automation",
  ],
  authors: [{ name: "VoluChat" }],
  creator: "VoluChat",
  publisher: "VoluChat",
  metadataBase: new URL("https://voluchat.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://voluchat.com",
    title: "VoluChat - AI-Powered Instagram Sales Automation",
    description:
      "Turn Instagram followers into paying customers on autopilot with AI-powered DMs in multiple languages. The Instagram sales automation platform for e-commerce brands.",
    siteName: "VoluChat",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VoluChat - Instagram Sales Automation Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VoluChat - AI-Powered Instagram Sales Automation",
    description:
      "Turn Instagram followers into paying customers on autopilot with AI-powered DMs in multiple languages. The Instagram sales automation platform.",
    images: ["/og-image.png"],
    creator: "@voluchat",
    site: "@voluchat",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/voluchat_logo.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png" },
    ],
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://voluchat.com/#website",
        url: "https://voluchat.com",
        name: "VoluChat",
        description: "Instagram Sales Automation Platform with AI-Powered Multilingual Support",
        publisher: {
          "@id": "https://voluchat.com/#organization",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://voluchat.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://voluchat.com/#organization",
        name: "VoluChat",
        url: "https://voluchat.com",
        logo: {
          "@type": "ImageObject",
          url: "https://voluchat.com/android-chrome-512x512.png",
          width: 512,
          height: 512,
        },
        sameAs: [
          "https://twitter.com/voluchat",
          "https://instagram.com/voluchat",
          "https://linkedin.com/company/voluchat",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "",
          contactType: "customer support",
          availableLanguage: ["en", "es", "fr", "de", "hi", "ar", "pt", "it", "ja", "zh"],
        },
      },
      {
        "@type": "SoftwareApplication",
        name: "VoluChat",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: "Free trial available",
        },
        description:
          "Instagram Sales Automation platform with AI-powered multilingual DMs for e-commerce brands",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          ratingCount: "500",
        },
        author: {
          "@id": "https://voluchat.com/#organization",
        },
      },
    ],
  };

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Favicon - Multiple formats for better compatibility */}
        <link rel="icon" type="image/svg+xml" href="/voluchat_logo.svg" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="shortcut icon" href="/favicon.ico?v=2" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />

        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* International SEO - Hreflang Tags */}
        <link rel="alternate" href="https://voluchat.com" hrefLang="en" />
        <link rel="alternate" href="https://voluchat.com/es" hrefLang="es" />
        <link rel="alternate" href="https://voluchat.com/fr" hrefLang="fr" />
        <link rel="alternate" href="https://voluchat.com/de" hrefLang="de" />
        <link rel="alternate" href="https://voluchat.com/hi" hrefLang="hi" />
        <link rel="alternate" href="https://voluchat.com" hrefLang="x-default" />

        {/* Theme Color */}
        <meta name="theme-color" content="#1e3a8a" />
        <meta name="msapplication-TileColor" content="#1e3a8a" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <HydrationFix />
        {children}
      </body>
    </html>
  );
}

