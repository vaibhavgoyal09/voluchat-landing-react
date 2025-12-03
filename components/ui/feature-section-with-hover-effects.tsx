import { cn } from "@/lib/utils";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Instagram → WhatsApp Funnel",
      description:
        "Automatically move hot leads from Instagram DMs to WhatsApp for closing and follow-ups.",
      icon: <IconRouteAltLeft />,
    },
    {
      title: "AI Replies in Multiple Languages",
      description:
        "Reply in multiple languages so customers actually read and respond.",
      icon: <IconTerminal2 />,
    },
    {
      title: "Ready-made E-commerce Workflows",
      description:
        "Flash sale, product inquiry, size/stock, payment confirmation – all pre-built for you.",
      icon: <IconEaseInOut />,
    },
    {
      title: "Official Platform-friendly Automation",
      description:
        "Built to respect Instagram and WhatsApp guidelines – no shady bots.",
      icon: <IconCloud />,
    },
    {
      title: "Analytics that Track Real Sales",
      description:
        "See how many DMs turned into orders and which flows perform best.",
      icon: <IconCurrencyDollar />,
    },
    {
      title: "Easy Setup & Onboarding",
      description:
        "Get started quickly with our guided setup process and go live fast.",
      icon: <IconHelp />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col py-10 relative group/feature transition-all duration-300",
        "bg-white/40 backdrop-blur-sm border border-white/40 hover:bg-white/80 hover:shadow-premium hover:border-white/60 hover:-translate-y-1 rounded-3xl mx-4 my-4",
      )}
    >
      <div className="mb-6 relative z-10 px-10 text-slate-400 group-hover/feature:text-primary-600 transition-colors duration-300">
        <div className="p-4 bg-white/50 rounded-2xl w-fit group-hover/feature:bg-primary-50 group-hover/feature:scale-110 transition-all duration-300 shadow-sm border border-white/50">
          {icon}
        </div>
      </div>
      <div className="text-xl font-heading font-bold mb-3 relative z-10 px-10 text-slate-900">
        {title}
      </div>
      <p className="text-base text-slate-600 max-w-xs relative z-10 px-10 leading-relaxed font-medium">
        {description}
      </p>
    </div>
  );
};
