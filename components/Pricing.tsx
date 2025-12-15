"use client";

import { PricingSection } from "@/components/ui/pricing";

const voluchatPlans = [
  {
    name: "Starter",
    price: "999",
    yearlyPrice: "799",
    period: "month",
    features: [
      "1,000 Automated DMs/month",
      "5 Active Workflows",
      "Hindi + 1 Regional Language",
      "Email Support",
      "Basic Analytics Dashboard",
    ],
    description: "Perfect for new sellers testing automation.",
    buttonText: "Start Free Trial",
    href: "https://dashboard.voluchat.com",
  },
  {
    name: "Growth",
    price: "2499",
    yearlyPrice: "1999",
    period: "month",
    features: [
      "10,000 Automated DMs/month",
      "Unlimited Workflows",
      "All Indian Languages",
      "WhatsApp Funnel Integration",
      "Priority Support",
      "Advanced Analytics",
    ],
    description: "Ideal for growing Instagram businesses.",
    buttonText: "Get Started",
    href: "https://dashboard.voluchat.com",
    isPopular: true,
  },
  {
    name: "Pro",
    price: "4999",
    yearlyPrice: "3999",
    period: "month",
    features: [
      "Unlimited Automated DMs",
      "Custom AI Training",
      "Dedicated Account Manager",
      "White-label Options",
      "API Access",
      "Custom Integrations",
    ],
    description: "For high-volume sellers and agencies.",
    buttonText: "Contact Sales",
    href: "https://dashboard.voluchat.com",
  },
];

export default function Pricing() {
  return (
    <PricingSection
      plans={voluchatPlans}
      title="Simple, Transparent Pricing"
      description="Start for free, upgrade as you grow. All plans include our core automation features."
    />
  );
}
