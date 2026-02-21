import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Features from "@/components/Features";
import {
  MessageSquare,
  Zap,
  Globe,
  BarChart3,
  Shield,
  Headphones,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Features - VoluChat Instagram Automation Platform",
  description:
    "Explore VoluChat's powerful features: AI-powered DM automation, multi-language support, WhatsApp integration, analytics, and more for Indian sellers.",
  keywords: [
    "Instagram automation features",
    "DM automation",
    "WhatsApp integration",
    "Hindi chatbot",
    "Instagram analytics",
  ],
  openGraph: {
    title: "Features - VoluChat Instagram Automation Platform",
    description:
      "Explore VoluChat's powerful features for Instagram sales automation",
  },
};

export default function FeaturesPage() {
  const featureSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "VoluChat Features",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Smart Auto-Replies",
      "Multi-Language Support (Hindi, Regional)",
      "Lead Qualification",
      "WhatsApp Integration",
      "Advanced Analytics",
      "CRM Integration"
    ]
  };

  const additionalFeatures = [
    {
      icon: MessageSquare,
      title: "Smart Auto-Replies",
      description:
        "AI-powered responses that understand context and intent. Reply to customer queries instantly in natural, human-like language.",
      benefits: [
        "24/7 instant responses",
        "Context-aware conversations",
        "Customizable response templates",
        "Emoji and media support",
      ],
    },
    {
      icon: Globe,
      title: "Multi-Language Support",
      description:
        "Communicate with customers in their preferred language. Full support for Hindi and major Indian regional languages.",
      benefits: [
        "Hindi, Tamil, Telugu, Bengali",
        "Marathi, Gujarati, Kannada",
        "Automatic language detection",
        "Regional dialect support",
      ],
    },
    {
      icon: Zap,
      title: "Lead Qualification",
      description:
        "Automatically qualify leads based on purchase intent, budget, and engagement. Focus on high-value customers.",
      benefits: [
        "Smart lead scoring",
        "Purchase intent detection",
        "Budget qualification",
        "Priority customer tagging",
      ],
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Track performance, measure engagement, and optimize your sales funnel with detailed insights and reports.",
      benefits: [
        "Real-time dashboards",
        "Conversion tracking",
        "Response time metrics",
        "Customer behavior insights",
      ],
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description:
        "Bank-level encryption and security measures to protect your business data and customer information.",
      benefits: [
        "End-to-end encryption",
        "GDPR & Indian law compliant",
        "Regular security audits",
        "Data backup & recovery",
      ],
    },
    {
      icon: Headphones,
      title: "Priority Support",
      description:
        "Get help when you need it with our dedicated Indian support team available via chat, email, and phone.",
      benefits: [
        "24/7 chat support",
        "Dedicated account manager",
        "Onboarding assistance",
        "Hindi support available",
      ],
    },
  ];

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(featureSchema) }}
      />
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 relative overflow-hidden flex flex-col justify-center">
        <div className="absolute inset-0 gradient-mesh pointer-events-none -z-20 opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.4)_40%,transparent_70%)] -z-10 pointer-events-none"></div>

        <div className="container-wide relative z-10 w-full pt-12">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-block px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-sm font-semibold uppercase tracking-wide mb-6">
              Platform Features
            </div>

            <h1 className="section-heading text-5xl md:text-6xl lg:text-7xl mb-6">
              Everything you need to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">
                automate sales
              </span>
            </h1>

            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              VoluChat combines powerful automation, intelligent AI, and
              seamless integrations to help Indian sellers scale their Instagram
              business effortlessly.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link
                href="/#get-started"
                className="btn-primary btn-glow"
              >
                Start free trial
              </Link>
              <Link
                href="/pricing"
                className="btn-secondary glass"
              >
                View pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features Section */}
      <Features />

      {/* Detailed Features Grid */}
      <section className="section-padding relative">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="section-heading text-4xl mb-4">
              Built for Indian sellers
            </h2>
            <p className="text-lg text-slate-600">
              Every feature is designed with the unique needs of Indian D2C
              brands and Instagram sellers in mind.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {additionalFeatures.map((feature, index) => (
              <div
                key={index}
                className="glass-card p-8 group hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                
                <div className="w-14 h-14 bg-white shadow-sm border border-slate-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10">
                  <feature.icon className="w-7 h-7 text-primary-600" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10 group-hover:text-primary-700 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-slate-600 mb-6">{feature.description}</p>

                <ul className="space-y-2">
                  {feature.benefits.map((benefit, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-slate-700"
                    >
                      <span className="text-primary-600 mt-0.5">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="section-padding relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary-400/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="section-heading text-4xl mb-4">
              Seamless integrations
            </h2>
            <p className="text-lg text-slate-600">
              VoluChat works with the tools you already use
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="glass-card p-8 text-center hover:shadow-premium hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                IG
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Instagram
              </h3>
              <p className="text-slate-600">
                Direct integration with Instagram DMs and comments
              </p>
            </div>

            <div className="glass-card p-8 text-center hover:shadow-premium hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                WA
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                WhatsApp Business
              </h3>
              <p className="text-slate-600">
                Seamless handoff to WhatsApp for closing sales
              </p>
            </div>

            <div className="glass-card p-8 text-center hover:shadow-premium hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                API
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Custom Integrations
              </h3>
              <p className="text-slate-600">
                Connect with your CRM, analytics, and more
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding relative">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center glass-card p-12 rounded-[2.5rem] bg-gradient-to-br from-primary-600 to-indigo-600 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/noise.webp')] opacity-5 mix-blend-overlay"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 tracking-tighter">
                Ready to transform your Instagram sales?
              </h2>
              <p className="text-xl mb-8 text-primary-50 font-light">
                Join 500+ Indian sellers already using VoluChat to automate their
                sales and grow their business.
              </p>
              <Link
                href="/#get-started"
                className="btn-primary hover:bg-slate-50 text-slate-900 bg-white shadow-xl hover:shadow-2xl"
              >
                Start your free trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
