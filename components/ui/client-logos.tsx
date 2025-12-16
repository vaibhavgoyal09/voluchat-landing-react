"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import {
  IconBrandAmazon,
  IconBrandInstagram,
  IconBrandWhatsapp,
  IconBasket,
  IconShirt,
  IconShoppingCart,
  IconSparkles,
  IconBuildingStore,
} from "@tabler/icons-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface Logo {
  id: string;
  name: string;
  subtext: string;
  icon: any;
  color: string;
}

const DEFAULT_LOGOS_ROW_1: Logo[] = [
  {
    id: "instagram",
    name: "Instagram",
    subtext: "Social Commerce",
    icon: IconBrandInstagram,
    color: "text-pink-600",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    subtext: "Direct Sales",
    icon: IconBrandWhatsapp,
    color: "text-green-600",
  },
  {
    id: "amazon",
    name: "Amazon",
    subtext: "Marketplace",
    icon: IconBrandAmazon,
    color: "text-orange-500",
  },
  {
    id: "meesho",
    name: "Meesho",
    subtext: "Reselling",
    icon: IconBasket,
    color: "text-fuchsia-600",
  },
];

const DEFAULT_LOGOS_ROW_2: Logo[] = [
  {
    id: "myntra",
    name: "Myntra",
    subtext: "Fashion",
    icon: IconShirt,
    color: "text-rose-500",
  },
  {
    id: "flipkart",
    name: "Flipkart",
    subtext: "Marketplace",
    icon: IconShoppingCart,
    color: "text-blue-600",
  },
  {
    id: "nykaa",
    name: "Nykaa",
    subtext: "Beauty & Wellness",
    icon: IconSparkles,
    color: "text-pink-500",
  },
  {
    id: "retail",
    name: "Retail Stores",
    subtext: "Offline to Online",
    icon: IconBuildingStore,
    color: "text-indigo-600",
  },
];

interface ClientLogosProps {
  heading?: string;
  subheading?: string;
  title?: string;
}

export function ClientLogos({
  heading = "Trusted by 500+ Indian sellers",
  subheading,
  title = "Powering Your Favorite Brands",
}: ClientLogosProps) {
  return (
    <section className="py-20 lg:py-24 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary-400/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container px-4 md:px-6 mb-12 flex flex-col items-center text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-sm font-medium mb-6 animate-fade-in">
          <span className="flex h-2 w-2 rounded-full bg-primary-600 animate-pulse"></span>
          {heading}
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-tight text-slate-900 mb-4 animate-fade-in delay-100">
          {title}
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto animate-fade-in delay-200">
          {subheading || "From independent creators to large marketplaces, VoluChat powers automated sales conversations across every channel."}
        </p>
      </div>

      <div className="relative pt-8 space-y-8 animate-fade-in delay-300">
        {/* Row 1 - Left */}
        <div className="relative">
          <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
          <Carousel
            opts={{ loop: true, align: "start", dragFree: true }}
            plugins={[
              AutoScroll({
                playOnInit: true,
                speed: 1,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {[...DEFAULT_LOGOS_ROW_1, ...DEFAULT_LOGOS_ROW_1, ...DEFAULT_LOGOS_ROW_1].map((logo, idx) => (
                <CarouselItem
                  key={`${logo.id}-${idx}`}
                  className="pl-4 basis-auto"
                >
                  <LogoCard logo={logo} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Row 2 - Right (Reverse) */}
        <div className="relative">
          <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
          <Carousel
            opts={{ loop: true, align: "start", dragFree: true, direction: "rtl" }}
            plugins={[
              AutoScroll({
                playOnInit: true,
                speed: 1,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
                direction: "backward"
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {[...DEFAULT_LOGOS_ROW_2, ...DEFAULT_LOGOS_ROW_2, ...DEFAULT_LOGOS_ROW_2].map((logo, idx) => (
                <CarouselItem
                  key={`${logo.id}-${idx}`}
                  className="pl-4 basis-auto"
                >
                  <LogoCard logo={logo} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}

function LogoCard({ logo }: { logo: Logo }) {
  const Icon = logo.icon;
  return (
    <div
      className={cn(
        "group flex items-center gap-4 px-6 py-4 rounded-2xl border transition-all duration-300 min-w-[200px] cursor-default",
        "bg-white/60 backdrop-blur-md border-slate-200/60 shadow-sm",
        "hover:bg-white hover:border-primary-100 hover:shadow-premium hover:-translate-y-1"
      )}
    >
      <div
        className={cn(
          "p-3 rounded-xl bg-slate-50 text-slate-500 transition-all duration-300",
          "group-hover:scale-110 group-hover:bg-primary-50",
          logo.color.replace("text-", "group-hover:text-")
        )}
      >
        <Icon className="w-6 h-6" stroke={2} />
      </div>
      <div className="flex flex-col">
        <span className="font-heading font-semibold text-slate-800 text-lg group-hover:text-slate-900">
          {logo.name}
        </span>
        <span className="text-xs font-medium text-slate-500 group-hover:text-slate-600">
          {logo.subtext}
        </span>
      </div>
    </div>
  );
}
