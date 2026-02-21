import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Target, Users, Zap, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About VoluChat - Instagram Automation for Indian Sellers",
  description:
    "Learn about VoluChat's mission to empower Indian Instagram sellers with AI-powered automation. Built in India, for India.",
  keywords: [
    "about VoluChat",
    "Instagram automation India",
    "Indian startup",
    "D2C automation",
  ],
  openGraph: {
    title: "About VoluChat - Instagram Automation for Indian Sellers",
    description:
      "Learn about VoluChat's mission to empower Indian Instagram sellers",
  },
};

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "VoluChat",
      "legalName": "VoluChat Technologies",
      "url": "https://voluchat.com",
      "logo": "https://voluchat.com/android-chrome-512x512.png",
      "foundingDate": "2024",
      "founders": [
        {
          "@type": "Person",
          "name": "VoluChat Team"
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN"
      },
      "sameAs": [
        "https://twitter.com/voluchat",
        "https://instagram.com/voluchat",
        "https://linkedin.com/company/voluchat"
      ]
    }
  };

  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description:
        "Empowering Indian sellers to scale their Instagram businesses with intelligent automation.",
    },
    {
      icon: Users,
      title: "Customer-First",
      description:
        "Every feature we build is designed with the unique needs of Indian sellers in mind.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description:
        "Leveraging cutting-edge AI to make automation accessible and affordable for everyone.",
    },
    {
      icon: Heart,
      title: "Built in India",
      description:
        "Proudly made in India, supporting the growth of Indian D2C brands and entrepreneurs.",
    },
  ];

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 relative overflow-hidden flex flex-col justify-center">
        <div className="absolute inset-0 gradient-mesh pointer-events-none -z-20 opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.4)_40%,transparent_70%)] -z-10 pointer-events-none"></div>

        <div className="container-wide relative z-10 w-full pt-12">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="section-heading text-5xl md:text-6xl lg:text-7xl mb-6">
              Empowering Indian sellers with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">
                AI automation
              </span>
            </h1>

            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              VoluChat was born from a simple observation: Indian Instagram
              sellers were losing sales because they couldn't respond to DMs
              fast enough. We built the solution.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding relative">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-heading text-4xl mb-8 text-center">
              Our Story
            </h2>

            <div className="prose prose-lg max-w-none text-slate-700 space-y-6">
              <p>
                In 2024, we noticed a growing problem among Indian Instagram
                sellers and D2C brands. Despite having thousands of followers
                and high engagement, they were losing potential customers simply
                because they couldn't respond to DMs quickly enough.
              </p>

              <p>
                Manual responses were time-consuming, especially when sellers
                were busy packing orders, managing inventory, or simply
                sleeping. By the time they replied, customers had already moved
                on to competitors.
              </p>

              <p>
                We realized that while automation tools existed, they were
                either too expensive, too complex, or didn't support Indian
                languages. That's when VoluChat was born.
              </p>

              <p>
                Today, VoluChat helps 500+ Indian sellers automate their
                Instagram DMs, qualify leads, and seamlessly hand off
                conversations to WhatsApp—all while supporting Hindi and
                regional languages. We're proud to be building technology that
                makes a real difference in the lives of Indian entrepreneurs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary-400/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

        <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            <h2 className="section-heading text-4xl mb-4 text-center">
              Our Values
            </h2>
            <p className="text-lg text-slate-600 mb-12 text-center max-w-2xl mx-auto">
              These principles guide everything we do at VoluChat
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="glass-card p-8 group hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-slate-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding relative">
        <div className="container-wide">
          <div className="max-w-5xl mx-auto glass p-12 rounded-[2.5rem]">
            <div className="grid md:grid-cols-3 gap-12 text-center text-slate-900">
              <div>
                <div className="text-5xl font-heading font-bold mb-2 text-gradient-primary">500+</div>
                <div className="text-slate-600 font-medium">Active Sellers</div>
              </div>
              <div>
                <div className="text-5xl font-heading font-bold mb-2 text-gradient-primary">100K+</div>
                <div className="text-slate-600 font-medium">DMs Automated</div>
              </div>
              <div>
                <div className="text-5xl font-heading font-bold mb-2 text-gradient-primary">10+</div>
                <div className="text-slate-600 font-medium">Languages Supported</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding relative">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center glass-card p-12 rounded-[2.5rem]">
            <h2 className="section-heading text-4xl mb-6">
              Join the VoluChat family
            </h2>
            <p className="text-xl text-slate-600 mb-8 font-light">
              Start automating your Instagram sales today and join hundreds of
              successful Indian sellers.
            </p>
            <Link
              href="/#get-started"
              className="btn-primary btn-glow"
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
