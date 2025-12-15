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
      <section className="pt-32 pb-16 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-30 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-sm font-semibold uppercase tracking-wide mb-6">
              Platform Features
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
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

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#get-started"
                className="px-8 py-4 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
              >
                Start free trial
              </Link>
              <Link
                href="/pricing"
                className="px-8 py-4 bg-white border border-slate-200 text-slate-900 rounded-full font-medium hover:bg-slate-50 transition-all"
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
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
                className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-xl hover:border-primary-200 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-600 transition-colors">
                  <feature.icon className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">
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
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Seamless integrations
            </h2>
            <p className="text-lg text-slate-600">
              VoluChat works with the tools you already use
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
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

            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
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

            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
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
      <section className="py-20 bg-gradient-to-br from-primary-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to transform your Instagram sales?
            </h2>
            <p className="text-xl mb-8 text-primary-50">
              Join 500+ Indian sellers already using VoluChat to automate their
              sales and grow their business.
            </p>
            <Link
              href="/#get-started"
              className="inline-block px-8 py-4 bg-white text-primary-600 rounded-full font-medium hover:bg-primary-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
            >
              Start your free trial
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
