"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, MessageSquare, Search } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="h-screen gradient-mesh flex items-center justify-center p-4 overflow-hidden">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        {/* 404 Number with floating animation */}
        <div className="relative animate-fade-in">
          <div className="text-7xl md:text-9xl font-heading font-bold text-gradient select-none">
            404
          </div>

          {/* Floating decorative elements */}
          <div className="absolute -top-2 -right-4 animate-float delay-100">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center shadow-premium">
              <Search className="w-6 h-6 text-primary-600" />
            </div>
          </div>

          <div className="absolute -bottom-2 -left-4 animate-float delay-200">
            <div className="w-10 h-10 bg-primary-200 rounded-full flex items-center justify-center shadow-premium">
              <MessageSquare className="w-5 h-5 text-primary-700" />
            </div>
          </div>
        </div>

        {/* Main content card */}
        <div className="glass-card-premium p-6 md:p-8 rounded-2xl animate-fade-in delay-100">
          <div className="space-y-4">
            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-slate-900 tracking-tight">
              Page Not Found
            </h1>

            {/* Description */}
            <p className="text-sm md:text-base text-slate-600 leading-relaxed">
              Oops! The page you're looking for seems to have wandered off into
              the digital void. Don't worry, we'll help you find your way back.
            </p>

            {/* Navigation options */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
              <Button asChild size="default" className="w-full sm:w-auto">
                <Link href="/" className="inline-flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Go Home
                </Link>
              </Button>

              <Button
                variant="outline"
                size="default"
                onClick={() => window.history.back()}
                className="w-full sm:w-auto"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>
          </div>
        </div>

        {/* Quick links section */}
        <div className="animate-fade-in delay-200">
          <h2 className="text-lg font-heading font-semibold text-slate-900 mb-4">
            Popular Destinations
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {quickLinks.map((link, index) => (
              <Link
                key={link.title}
                href={link.href}
                className="glass-card-premium p-3 rounded-xl hover:scale-105 transition-all duration-300 group"
              >
                <div className="text-center space-y-2">
                  <div className="mx-auto w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                    <link.icon className="w-4 h-4 text-primary-600" />
                  </div>
                  <h3 className="font-medium text-slate-900 text-xs group-hover:text-primary-600 transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-xs text-slate-600 hidden sm:block">
                    {link.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer message */}
        <div className="p-4 glass rounded-xl animate-fade-in delay-300">
          <p className="text-slate-600 text-xs">
            Need help?{" "}
            <Link
              href="/contact"
              className="text-primary-600 font-medium hover:underline"
            >
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const quickLinks = [
  {
    title: "Features",
    href: "/features",
    description: "Explore automation tools",
    icon: MessageSquare,
  },
  {
    title: "Pricing",
    href: "/pricing",
    description: "View our plans",
    icon: Home, // You might want to replace with a pricing icon
  },
  {
    title: "Blog",
    href: "/blog",
    description: "Latest insights",
    icon: Search, // You might want to replace with a blog icon
  },
  {
    title: "Get Started",
    href: "/start",
    description: "Start free trial",
    icon: Home, // You might want to replace with a start/play icon
  },
];

// Also create the metadata for the 404 page
export const metadata = {
  title: "404 - Page Not Found",
  description:
    "The page you're looking for doesn't exist. Return to VoluChat - AI-Powered Instagram Sales Automation.",
};
