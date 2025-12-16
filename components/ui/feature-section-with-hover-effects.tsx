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
      title: "Instant Comment-to-DM",
      description:
        "Turn comments into conversations instantly. Automatically reply to comments and send a DM to close sales.",
      icon: <IconTerminal2 />,
    },
    {
      title: "Ask for Follow",
      description:
        "Boost your follower count by automatically checking if a user follows you before sending exclusive content.",
      icon: <IconHeart />,
    },
    {
      title: "Community Building",
      description:
        "Drive traffic to your WhatsApp or Telegram groups with automated invites sent directly to DMs.",
      icon: <IconRouteAltLeft />,
    },
    {
      title: "Smart Promotional Messages",
      description:
        "Automatically send timed promotional messages after a conversation ends to re-engage leads.",
      icon: <IconCurrencyDollar />,
    },
    {
      title: "Multi-language Support",
      description:
        "Engage with customers in Hindi, Tamil, Telugu, and more so they feel at home.",
      icon: <IconAdjustmentsBolt />,
    },
    {
      title: "Safe & Compliant",
      description:
        "Built with official Meta APIs to keep your account safe. No shady bots or bans.",
      icon: <IconCloud />,
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
