"use client";

import {
  MessageSquare,
  Zap,
  BarChart,
  Globe,
  Settings,
  Shield,
  Users,
  Smartphone,
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [

  {
    title: "Comment-to-DM Automation",
    description:
      "Instantly reply to comments and send DMs. Turn engagement into leads without lifting a finger.",
    icon: MessageSquare,
    className: "md:col-span-2",
  },
  {
    title: "Regional Language AI",
    description:
      "Chat in Hindi, Hinglish, Tamil, & more. Our AI understands context and culture.",
    icon: Globe,
    className: "md:col-span-1",
  },
  {
    title: "Smart Lead Qualification",
    description:
      "Filter tire-kickers from buyers automatically.",
    icon: Zap,
    className: "md:col-span-1",
  },
  {
    title: "WhatsApp Handoff",
    description:
      "Seamlessly move hot leads from Instagram DMs to WhatsApp for closing.",
    icon: Smartphone,
    className: "md:col-span-2",
  },
  {
    title: "Growth Analytics",
    description:
      "Track every conversion, reply, and sale in real-time.",
    icon: BarChart,
    className: "md:col-span-1",
  },
  {
    title: "Enterprise Security",
    description:
      "Bank-grade encryption and Meta-compliant API usage.",
    icon: Shield,
    className: "md:col-span-1",
  },
];

export default function Features() {
  return (
    <section id="features" className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary-400/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="container-wide">
        <div className="text-center max-w-3xl mx-auto mb-16 px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-wider mb-6 border border-primary-100">
            <Zap className="w-3 h-3" /> Powerful Features
          </div>
          <h2 className="section-heading text-4xl sm:text-5xl mb-6">
            Everything you need to <br />
            <span className="text-gradient-primary">dominate Instagram sales</span>
          </h2>
          <p className="text-xl text-slate-600 font-light leading-relaxed">
            Stop manually replying to "PP?" and start automating your revenue engine
            with our enterprise-grade toolkit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className={cn(
                "group relative overflow-hidden rounded-[2.5rem] glass-card p-10",
                feature.className
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full bg-transparent">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-7 w-7 text-primary-600" />
                </div>

                <div className="mt-auto">
                  <h3 className="mb-4 text-2xl font-heading font-bold text-slate-900 group-hover:text-primary-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
