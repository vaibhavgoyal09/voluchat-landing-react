"use client";

import { PricingSection } from "@/components/ui/pricing";

const voluchatPlans = [
  {
    name: "Early Adopter",
    price: "0",
    yearlyPrice: "0",
    period: "beta",
    features: [
      "Unlimited Automated DMs",
      "Unlimited Workflows",
      "All Indian Languages",
      "WhatsApp Funnel Integration",
      "Priority Support",
      "Early Access to New Features",
    ],
    description: "Get full access to all features for free during our public beta.",
    buttonText: "Get Started Now",
    href: "https://dashboard.voluchat.com",
    isPopular: true,
  },
];

export default function Pricing() {
  return (
    <PricingSection
      plans={voluchatPlans}
      title="Free During Early Beta"
      description="Join now and get unlimited access to all features. No credit card required."
    />
  );
}
