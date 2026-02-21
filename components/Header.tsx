"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { createPortal } from "react-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { LucideIcon } from "lucide-react";
import {
  MessageSquare,
  Zap,
  BarChart,
  Globe,
  Shield,
  Users,
  Star,
  FileText,
  HelpCircle,
  DollarSign,
} from "lucide-react";

type LinkItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  description?: string;
};

export default function Header() {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(10);

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-4 left-0 right-0 z-50 transition-all duration-300 px-4",
        scrolled ? "py-0" : "py-2"
      )}
    >
      <nav
        className={cn(
          "mx-auto flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300",
          "bg-white/70 backdrop-blur-xl border border-white/40 shadow-premium supports-[backdrop-filter]:bg-white/60",
          scrolled ? "max-w-6xl shadow-lg" : "max-w-5xl"
        )}
      >
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="relative w-8 h-8">
              <Image
                src="/voluchat_logo.svg"
                alt="VoluChat"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-heading font-bold text-xl text-slate-900 tracking-tight hidden md:inline">
              VoluChat
            </span>
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-slate-100/50 text-slate-600 hover:text-slate-900 font-medium text-sm rounded-full h-9 px-4 transition-colors focus:bg-slate-100/50">
                  Features
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="bg-white/95 backdrop-blur-md grid w-[500px] grid-cols-2 gap-3 p-4 rounded-2xl border border-slate-100 shadow-xl">
                    {featureLinks.map((item, i) => (
                      <li key={i}>
                        <ListItem {...item} />
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-slate-100/50 text-slate-600 hover:text-slate-900 font-medium text-sm rounded-full h-9 px-4 transition-colors focus:bg-slate-100/50">
                  Company
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="bg-white/95 backdrop-blur-md grid w-[250px] gap-2 p-3 rounded-2xl border border-slate-100 shadow-xl">
                    {companyLinks.map((item, i) => (
                      <li key={i}>
                        <NavigationMenuLink
                          href={item.href}
                          className="flex p-2 hover:bg-slate-50 rounded-xl items-center gap-x-3 transition-colors group"
                        >
                          <div className="p-1.5 rounded-lg bg-slate-50 group-hover:bg-white transition-colors text-slate-500 group-hover:text-primary-600 border border-transparent group-hover:border-slate-100">
                            <item.icon className="size-4" />
                          </div>
                          <span className="font-medium text-sm text-slate-600 group-hover:text-slate-900">
                            {item.title}
                          </span>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  href="/pricing"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-100/50 hover:text-slate-900 text-slate-600 focus:bg-slate-100/50 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  Pricing
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="https://dashboard.voluchat.com/login"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-4 py-2"
          >
            Log in
          </Link>
          <Link
            href="https://dashboard.voluchat.com"
            className="btn-primary py-2 px-5 text-sm group"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
            <span className="relative flex items-center gap-2">
              Start Free
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="https://dashboard.voluchat.com"
            className="btn-primary py-2 px-4 text-xs group"
          >
            Get Started
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(!open)}
            className="md:hidden rounded-full hover:bg-slate-100"
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            <MenuToggleIcon open={open} className="size-5" />
          </Button>
        </div>
      </nav>

      <MobileMenu
        open={open}
        className="mt-4 mx-4 rounded-3xl border border-white/20 shadow-2xl bg-white/90 backdrop-blur-xl"
      >
        <NavigationMenu className="max-w-full block">
          <div className="flex w-full flex-col gap-y-1 p-2">
            <span className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Product
            </span>
            {featureLinks.map((link) => (
              <ListItem key={link.title} {...link} className="rounded-xl" />
            ))}

            <div className="h-px bg-slate-100 my-2 mx-4" />

            <span className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Company
            </span>
            {companyLinks.map((link) => (
              <NavigationMenuLink
                key={link.title}
                href={link.href}
                className="flex p-3 hover:bg-slate-50 rounded-xl items-center gap-x-3"
              >
                <div className="p-1.5 bg-white rounded-lg shadow-sm border border-slate-100 text-slate-500">
                  <link.icon className="size-4" />
                </div>
                <span className="font-medium text-slate-700">{link.title}</span>
              </NavigationMenuLink>
            ))}
            <NavigationMenuLink
              href="/pricing"
              className="flex p-3 hover:bg-slate-50 rounded-xl items-center gap-x-3"
            >
              <div className="p-1.5 bg-white rounded-lg shadow-sm border border-slate-100 text-slate-500">
                <DollarSign className="size-4" />
              </div>
              <span className="font-medium text-slate-700">Pricing</span>
            </NavigationMenuLink>
          </div>
        </NavigationMenu>

        <div className="p-4 mt-auto border-t border-slate-100">
          <Link
            href="https://dashboard.voluchat.com"
            className="w-full justify-center btn-primary btn-glow"
          >
            Get Started Now
          </Link>
          <p className="text-center mt-3 text-xs text-slate-400">
            No credit card required
          </p>
        </div>
      </MobileMenu>
    </header>
  );
}

type MobileMenuProps = React.ComponentProps<"div"> & {
  open: boolean;
};

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
  if (!open || typeof window === "undefined") return null;

  return createPortal(
    <div
      id="mobile-menu"
      className={cn(
        "bg-white/95 supports-backdrop-filter:bg-white/50 backdrop-blur-lg",
        "fixed top-14 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-y border-slate-200 md:hidden",
      )}
    >
      <div
        data-slot={open ? "open" : "closed"}
        className={cn(
          "data-[slot=open]:animate-in data-[slot=open]:zoom-in-97 ease-out",
          "size-full p-4",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

function ListItem({
  title,
  description,
  icon: Icon,
  className,
  href,
  ...props
}: React.ComponentProps<typeof NavigationMenuLink> & LinkItem) {
  return (
    <NavigationMenuLink
      className={cn(
        "group w-full flex flex-row gap-x-3 hover:bg-slate-50 rounded-xl p-3 transition-all duration-300",
        className,
      )}
      {...props}
      asChild
    >
      <Link href={href}>
        <div className="bg-slate-50 group-hover:bg-white flex aspect-square size-10 items-center justify-center rounded-lg border border-slate-100 shadow-sm transition-colors text-slate-500 group-hover:text-primary-600 group-hover:border-primary-100/50">
          <Icon className="size-5 transition-transform group-hover:scale-110" />
        </div>
        <div className="flex flex-col items-start justify-center">
          <span className="font-heading font-semibold text-sm text-slate-900 group-hover:text-primary-700 transition-colors">{title}</span>
          <span className="text-slate-500 text-xs mt-0.5 font-medium">{description}</span>
        </div>
      </Link>
    </NavigationMenuLink>
  );
}

const featureLinks: LinkItem[] = [
  {
    title: "DM Automation",
    href: "/features",
    description: "Auto-reply to Instagram DMs instantly",
    icon: MessageSquare,
  },
  {
    title: "WhatsApp Integration",
    href: "/features",
    description: "Seamless lead handoff to WhatsApp",
    icon: Zap,
  },
  {
    title: "Multi-language",
    href: "/features",
    description: "Hindi & regional language support",
    icon: Globe,
  },
  {
    title: "Analytics",
    href: "/features",
    description: "Track engagement and conversions",
    icon: BarChart,
  },
];

const companyLinks: LinkItem[] = [
  {
    title: "About Us",
    href: "/about",
    icon: Users,
  },
  {
    title: "Testimonials",
    href: "#testimonials",
    icon: Star,
  },
  {
    title: "Login",
    href: "https://dashboard.voluchat.com",
    icon: Users,
  },
  {
    title: "Blog",
    href: "/blog",
    icon: FileText,
  },
  {
    title: "Privacy Policy",
    href: "/privacy",
    icon: Shield,
  },
  {
    title: "Help Center",
    href: "/contact",
    icon: HelpCircle,
  },
];

function useScroll(threshold: number) {
  const [scrolled, setScrolled] = React.useState(false);

  const onScroll = React.useCallback(() => {
    setScrolled(window.scrollY > threshold);
  }, [threshold]);

  React.useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  React.useEffect(() => {
    onScroll();
  }, [onScroll]);

  return scrolled;
}
