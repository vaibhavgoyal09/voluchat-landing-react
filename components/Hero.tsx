import { ClientLogos } from "@/components/ui/client-logos";
import { ThreeBackground } from "@/components/ui/three-background";
import { Search, Sparkles, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="pt-12 pb-12 lg:pt-20 lg:pb-6 relative overflow-hidden min-h-screen flex flex-col justify-center"
    >
      {/* Three.js Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <ThreeBackground />
      </div>

      {/* Gradient Mesh Background (fallback overlay) */}
      <div className="absolute inset-0 gradient-mesh pointer-events-none -z-20 opacity-40"></div>

      {/* Contrast Booster - Radial Gradient behind text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.4)_40%,transparent_70%)] -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-6 sm:px-8 relative z-10 w-full">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 animate-fade-in">
          <div className="inline-flex flex-wrap justify-center items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-white/40 shadow-sm text-slate-600 text-xs font-semibold uppercase tracking-wider mb-8 hover:bg-white transition-colors cursor-default max-w-full">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-500"></span>
            </span>
            <span className="text-primary-700">New</span>
            <span className="w-px h-3 bg-slate-300 hidden sm:block"></span>
            <span className="text-center">Early Beta Access Open</span>
          </div>

          <div className="mb-8 relative w-full">
            <h1 className="section-heading hero-heading text-4xl sm:text-6xl lg:text-7xl font-heading font-bold text-slate-900 tracking-tight leading-[1.1] wrap-break-word">
              Turn Instagram Comments <br className="hidden sm:block" />
              <span className="font-serif italic font-light text-slate-700 block sm:inline mt-2 sm:mt-0">
                into Sales Automatically
              </span>
            </h1>

            {/* Decorative elements around text */}
            <div className="absolute -right-4 lg:-right-12 top-0 hidden lg:block animate-float delay-100">
              <div className="bg-white/40 backdrop-blur-md border border-white/50 p-3 rounded-2xl shadow-lg rotate-12">
                <span className="text-2xl">✨</span>
              </div>
            </div>
          </div>

          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mb-10 font-light px-2">
            Powerful comment-to-DM automation with advanced growth tools.
            Use <span className="font-medium text-slate-900">Ask for Follow</span>,
            <span className="font-medium text-slate-900"> Group Joins</span>, and automated
            <span className="font-medium text-slate-900"> Promotional Messages</span> to skyrocket your conversion.
            <span className="block mt-4 font-medium text-primary-600">
              Get started for free in our Early Beta!
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center justify-center">
            <a
              href="https://dashboard.voluchat.com"
              className="w-full sm:w-auto group relative px-8 py-4 bg-slate-900 text-white text-lg font-medium rounded-full hover:bg-slate-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 overflow-hidden flex justify-center items-center"
            >
              <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
              <span className="relative flex items-center gap-2">
                Get Started for Free <ArrowRight className="w-4 h-4" />
              </span>
            </a>
            <a
              href="#features"
              className="w-full sm:w-auto px-8 py-4 bg-white/50 backdrop-blur-sm text-slate-900 border border-white/60 text-lg font-medium rounded-full hover:bg-white/80 transition-all duration-300 shadow-sm hover:shadow-md flex justify-center items-center"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Glass Card Search Interface */}
        <div className="mt-16 sm:mt-20">
          <ClientLogos heading="Trusted by 500+ e-commerce brands" subheading="" />
        </div>
      </div>
    </section>
  );
}
