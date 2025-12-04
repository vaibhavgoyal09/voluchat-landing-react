import type { Metadata } from 'next';
import { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'VoluChat Blog - AI & Automation Insights',
    template: '%s | VoluChat Blog'
  },
  description: 'Latest insights, strategies, and best practices for Instagram sales automation and AI-powered customer engagement',
  keywords: [
    'Instagram automation',
    'AI chatbots',
    'e-commerce automation',
    'social media marketing',
    'Instagram sales',
    'AI-powered DMs',
    'customer engagement'
  ],
  openGraph: {
    title: 'VoluChat Blog - AI & Automation Insights',
    description: 'Latest insights, strategies, and best practices for Instagram sales automation and AI-powered customer engagement',
    type: 'website',
    url: 'https://voluchat.com/blog',
    siteName: 'VoluChat',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'VoluChat Blog - AI & Automation Insights'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VoluChat Blog - AI & Automation Insights',
    description: 'Latest insights, strategies, and best practices for Instagram sales automation and AI-powered customer engagement',
    images: ['/og-image.png']
  },
  alternates: {
    canonical: '/blog'
  }
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  // JSON-LD structured data for better SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "VoluChat Blog",
    "description": "Insights, strategies, and best practices for Instagram sales automation and AI-powered customer engagement",
    "url": "https://voluchat.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "VoluChat",
      "logo": {
        "@type": "ImageObject",
        "url": "https://voluchat.com/android-chrome-512x512.png",
        "width": 512,
        "height": 512
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://voluchat.com/blog?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      {children}
      <Footer />
    </>
  );
}