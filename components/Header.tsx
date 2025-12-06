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
      className={cn("sticky top-0 z-50 w-full border-b border-transparent bg-transparent", {
        "border-slate-200/60 shadow-sm": scrolled,
      })}
    >
      <nav className="mx-auto flex w-full items-center justify-between px-6 py-2">
        <div className="flex items-center gap-5">
          <Link
            href="/"
            className="hover:bg-accent rounded-md p-2 flex items-center gap-2"
          >
            <Image
              src="/voluchat_logo.svg"
              alt="VoluChat"
              width={32}
              height={32}
              className="w-8 h-8 md:w-6 md:h-6"
            />
            <span className="font-heading font-bold text-xl text-slate-900 tracking-tight hidden md:inline">
              VoluChat
            </span>
          </Link>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-slate-600 hover:text-slate-900 text-sm">
                  Features
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-background p-1 pr-1.5">
                  <ul className="bg-white grid w-lg grid-cols-2 gap-2 rounded-md border border-slate-200 p-2 shadow-premium">
                    {featureLinks.map((item, i) => (
                      <li key={i}>
                        <ListItem {...item} />
                      </li>
                    ))}
                  </ul>
                  <div className="p-2">
                    <p className="text-slate-600 text-sm">
                      Ready to automate?{" "}
                      <Link
                        href="/waitlist"
                        className="text-primary-600 font-medium hover:underline"
                      >
                        Join waitlist
                      </Link>
                    </p>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-slate-600 hover:text-slate-900 text-sm">
                  Company
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-background p-1 pr-1.5 pb-1.5">
                  <div className="grid w-md grid-cols-1 gap-2">
                    <ul className="bg-white space-y-2 rounded-md border border-slate-200 p-2 shadow-premium">
                      {companyLinks.map((item, i) => (
                        <li key={i}>
                          <NavigationMenuLink
                            href={item.href}
                            className="flex p-2 hover:bg-accent flex-row rounded-md items-center gap-x-2"
                          >
                            <item.icon className="text-slate-900 size-4" />
                            <span className="font-medium text-sm">
                              {item.title}
                            </span>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuLink className="px-4" asChild>
                <Link
                  href="/pricing"
                  className="hover:bg-accent rounded-md p-2 text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                  Pricing
                </Link>
              </NavigationMenuLink>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <Link 
            href="/waitlist" 
            className="group relative px-6 py-3 h-10 bg-[var(--color-slate-900)] text-white text-sm font-medium rounded-full hover:bg-[var(--color-slate-800)] transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 overflow-hidden flex justify-center items-center"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
            <span className="relative flex items-center gap-2">
              Join Waitlist
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <Link 
            href="/waitlist" 
            className="group relative px-4 py-3 h-10 bg-[var(--color-slate-900)] text-white text-sm font-medium rounded-full hover:bg-[var(--color-slate-800)] transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 overflow-hidden flex justify-center items-center"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
            <span className="relative flex items-center gap-2">
              Join Waitlist
            </span>
          </Link>
          <Button
            variant="outline"
            onClick={() => setOpen(!open)}
            className="md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            <MenuToggleIcon open={open} className="size-6" duration={300} />
          </Button>
        </div>
      </nav>
      <MobileMenu
        open={open}
        className="flex flex-col justify-between gap-2 overflow-y-auto"
      >
        <NavigationMenu className="max-w-full">
          <div className="flex w-full flex-col gap-y-2">
            <span className="text-base font-semibold text-slate-900">
              Features
            </span>
            {featureLinks.map((link) => (
              <ListItem key={link.title} {...link} />
            ))}
            <span className="text-base font-semibold text-slate-900 mt-4">
              Company
            </span>
            {companyLinks.map((link) => (
              <NavigationMenuLink
                key={link.title}
                href={link.href}
                className="flex p-2 hover:bg-accent flex-row rounded-md items-center gap-x-2"
              >
                <link.icon className="text-slate-900 size-4" />
                <span className="font-medium text-base">{link.title}</span>
              </NavigationMenuLink>
            ))}
            <NavigationMenuLink asChild className="mt-2">
              <Link
                href="/pricing"
                className="hover:bg-accent rounded-md p-2 text-base font-medium"
              >
                Pricing
              </Link>
            </NavigationMenuLink>
          </div>
        </NavigationMenu>
        <div className="flex flex-col gap-3">
          <Link 
            href="/waitlist" 
            className="group relative w-full px-8 py-4 h-12 bg-[var(--color-slate-900)] text-white text-base font-medium rounded-full hover:bg-[var(--color-slate-800)] transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 overflow-hidden flex justify-center items-center"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
            <span className="relative flex items-center gap-2">
              Join Waitlist
            </span>
          </Link>
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
        "w-full flex flex-row gap-x-2 hover:bg-slate-50 rounded-md p-2 transition-colors",
        className,
      )}
      {...props}
      asChild
    >
      <Link href={href}>
        <div className="bg-primary-50/50 flex aspect-square size-10 items-center justify-center rounded-md border border-primary-100 shadow-sm">
          <Icon className="text-primary-600 size-4" />
        </div>
        <div className="flex flex-col items-start justify-center">
          <span className="font-medium text-sm">{title}</span>
          <span className="text-slate-600 text-xs">{description}</span>
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
    title: "Join Waitlist",
    href: "/waitlist",
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
