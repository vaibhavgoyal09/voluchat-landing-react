import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Pricing from "@/components/Pricing";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing - VoluChat Instagram Automation Plans",
  description:
    "Choose the perfect VoluChat plan for your business. Transparent pricing for Instagram DM automation. Free trial available. Plans starting for Indian sellers.",
  keywords: [
    "VoluChat pricing",
    "Instagram automation pricing",
    "WhatsApp automation cost",
    "Indian seller plans",
  ],
  openGraph: {
    title: "Pricing - VoluChat Instagram Automation Plans",
    description:
      "Choose the perfect VoluChat plan for your business. Free trial available.",
  },
};

export default function PricingPage() {
  const faqs = [
    {
      question: "Can I switch plans later?",
      answer:
        "Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
    },
    {
      question: "What happens after the free trial?",
      answer:
        "After your 14-day free trial, you'll be automatically enrolled in the plan you selected. You can cancel anytime before the trial ends without being charged.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "We offer a 30-day money-back guarantee. If you're not satisfied with VoluChat, contact us within 30 days of purchase for a full refund.",
    },
    {
      question: "Are there any setup fees?",
      answer:
        "No! There are no setup fees, hidden charges, or long-term contracts. You only pay for your chosen subscription plan.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit/debit cards, UPI, net banking, and digital wallets popular in India.",
    },
    {
      question: "Can I get a custom enterprise plan?",
      answer:
        "Yes! If you need more than 10,000 DMs per month or require custom features, contact our sales team for a tailored enterprise solution.",
    },
  ];

  const comparisonFeatures = [
    {
      name: "Automated Instagram DM responses",
      starter: true,
      growth: true,
      pro: true,
    },
    {
      name: "WhatsApp Business integration",
      starter: true,
      growth: true,
      pro: true,
    },
    {
      name: "Multi-language support (Hindi + regional)",
      starter: true,
      growth: true,
      pro: true,
    },
    {
      name: "Basic analytics dashboard",
      starter: true,
      growth: true,
      pro: true,
    },
    { name: "Email support", starter: true, growth: true, pro: true },
    {
      name: "DM volume per month",
      starter: "1,000",
      growth: "5,000",
      pro: "10,000",
    },
    {
      name: "Lead qualification workflows",
      starter: false,
      growth: true,
      pro: true,
    },
    {
      name: "Advanced analytics & reports",
      starter: false,
      growth: true,
      pro: true,
    },
    {
      name: "Custom automation rules",
      starter: "3",
      growth: "10",
      pro: "Unlimited",
    },
    { name: "Priority support", starter: false, growth: true, pro: true },
    {
      name: "Dedicated account manager",
      starter: false,
      growth: false,
      pro: true,
    },
    { name: "Custom integrations", starter: false, growth: false, pro: true },
    { name: "API access", starter: false, growth: false, pro: true },
    { name: "White-label options", starter: false, growth: false, pro: true },
  ];

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-30 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-sm font-semibold uppercase tracking-wide mb-6">
              Simple, Transparent Pricing
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Choose the perfect plan for your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">
                business
              </span>
            </h1>

            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Start with a 14-day free trial. No credit card required. Cancel
              anytime.
            </p>

            <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
              <Check className="w-5 h-5 text-green-600" />
              <span>14-day free trial</span>
              <span className="text-slate-300">•</span>
              <Check className="w-5 h-5 text-green-600" />
              <span>No credit card required</span>
              <span className="text-slate-300">•</span>
              <Check className="w-5 h-5 text-green-600" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <Pricing />

      {/* Feature Comparison Table */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Compare plans
              </h2>
              <p className="text-lg text-slate-600">
                See what's included in each plan
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="text-left py-4 px-6 font-semibold text-slate-900">
                      Feature
                    </th>
                    <th className="text-center py-4 px-6 font-semibold text-slate-900">
                      Starter
                    </th>
                    <th className="text-center py-4 px-6 font-semibold text-slate-900 bg-primary-50">
                      Growth
                    </th>
                    <th className="text-center py-4 px-6 font-semibold text-slate-900">
                      Pro
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-100 hover:bg-slate-50"
                    >
                      <td className="py-4 px-6 text-slate-700">
                        {feature.name}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {typeof feature.starter === "boolean" ? (
                          feature.starter ? (
                            <Check className="w-5 h-5 text-green-600 mx-auto" />
                          ) : (
                            <span className="text-slate-300">—</span>
                          )
                        ) : (
                          <span className="text-slate-700 font-medium">
                            {feature.starter}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center bg-primary-50/50">
                        {typeof feature.growth === "boolean" ? (
                          feature.growth ? (
                            <Check className="w-5 h-5 text-green-600 mx-auto" />
                          ) : (
                            <span className="text-slate-300">—</span>
                          )
                        ) : (
                          <span className="text-slate-700 font-medium">
                            {feature.growth}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {typeof feature.pro === "boolean" ? (
                          feature.pro ? (
                            <Check className="w-5 h-5 text-green-600 mx-auto" />
                          ) : (
                            <span className="text-slate-300">—</span>
                          )
                        ) : (
                          <span className="text-slate-700 font-medium">
                            {feature.pro}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Frequently asked questions
              </h2>
              <p className="text-lg text-slate-600">
                Got questions? We've got answers.
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 border border-slate-200"
                >
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-slate-600">{faq.answer}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-slate-600 mb-4">Still have questions?</p>
              <Link
                href="mailto:support@voluchat.com"
                className="inline-block px-6 py-3 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 transition-colors"
              >
                Contact our team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Money-back Guarantee */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50 border-y border-green-100">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              30-Day Money-Back Guarantee
            </h2>
            <p className="text-lg text-slate-600">
              Try VoluChat risk-free. If you're not completely satisfied within
              the first 30 days, we'll refund your money—no questions asked.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
