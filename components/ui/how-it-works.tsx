"use client";

import { cn } from "@/lib/utils";
import { Link2, Workflow, Zap } from "lucide-react";
import type React from "react";

// The main props for the HowItWorks component
interface HowItWorksProps extends React.HTMLAttributes<HTMLElement> {}

// The props for a single step card
interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
}

/**
 * A single step card within the "How It Works" section.
 * It displays an icon, title, description, and a list of benefits.
 */
const StepCard: React.FC<StepCardProps> = ({
  icon,
  title,
  description,
  benefits,
}) => (
  <div
    className={cn(
      "relative rounded-[2rem] border border-white/40 bg-white/60 backdrop-blur-md p-8 text-slate-900 transition-all duration-300 ease-in-out shadow-premium",
      "hover:scale-[1.02] hover:shadow-premium-lg hover:bg-white/80 z-10 group",
    )}
  >
    {/* Icon */}
    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-indigo-600 text-white shadow-lg shadow-primary-500/20 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    {/* Title and Description */}
    <h3 className="mb-3 text-2xl font-heading font-bold text-slate-900">
      {title}
    </h3>
    <p className="mb-8 text-slate-600 leading-relaxed font-medium text-lg">
      {description}
    </p>
    {/* Benefits List */}
    <ul className="space-y-4">
      {benefits.map((benefit, index) => (
        <li key={index} className="flex items-start gap-3">
          <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 mt-1">
            <div className="h-2 w-2 rounded-full bg-primary-600"></div>
          </div>
          <span className="text-base text-slate-700 leading-relaxed font-medium">
            {benefit}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

/**
 * A responsive "How It Works" section that displays a 3-step process.
 */
export const HowItWorks: React.FC<HowItWorksProps> = ({
  className,
  ...props
}) => {
  const stepsData = [
    {
      icon: <Link2 className="h-8 w-8" />,
      title: "Connect",
      description:
        "Link your Instagram & WhatsApp accounts securely in 1 click.",
      benefits: [
        "Official Meta API integration",
        "Secure OAuth authentication",
        "No password sharing required",
      ],
    },
    {
      icon: <Workflow className="h-8 w-8" />,
      title: "Select Flow",
      description:
        "Choose a pre-built template for your niche (Fashion, Food, etc).",
      benefits: [
        "Industry-specific templates",
        "Customizable automation rules",
        "Multi-language support built-in",
      ],
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Automate",
      description: "VoluChat replies instantly and sends leads to WhatsApp.",
      benefits: [
        "Instant AI-powered responses",
        "Automatic lead qualification",
        "Seamless WhatsApp handoff",
      ],
    },
  ];

  return (
    <section
      id="how-it-works"
      className={cn(
        "w-full py-12 sm:py-16 relative overflow-hidden",
        className,
      )}
      {...props}
    >
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-[600px] bg-primary-500/5 blur-[100px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute inset-0 gradient-mesh opacity-30 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="mx-auto mb-20 max-w-4xl text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-white/40 shadow-sm text-primary-700 text-xs font-semibold uppercase tracking-wider mb-6">
            How It Works
          </div>
          <h2 className="text-4xl font-heading font-bold tracking-tight text-slate-900 sm:text-5xl mb-6">
            Live in minutes, not days
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-light">
            No coding required. Just connect and start selling.
          </p>
        </div>

        {/* Step Indicators with Connecting Line */}
        <div className="relative mx-auto mb-16 w-full max-w-5xl hidden md:block">
          <div
            aria-hidden="true"
            className="absolute left-[16.6667%] top-1/2 h-0.5 w-[66.6667%] -translate-y-1/2 bg-gradient-to-r from-slate-200 via-primary-200 to-slate-200"
          ></div>
          {/* Use grid to align numbers with the card grid below */}
          <div className="relative grid grid-cols-3">
            {stepsData.map((_, index) => (
              <div
                key={index}
                className="flex h-14 w-14 items-center justify-center justify-self-center rounded-full bg-white border-4 border-primary-50 font-bold text-xl text-primary-600 shadow-lg z-10"
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Steps Grid */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          {stepsData.map((step, index) => (
            <StepCard
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              benefits={step.benefits}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
