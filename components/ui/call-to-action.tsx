import { MoveRight, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function CTA() {
  return (
    <div className="w-full py-16 lg:py-24">
      <div className="container-wide mx-auto">
        <div className="flex flex-col text-center bg-white/60 backdrop-blur-xl border border-white/40 rounded-[2.5rem] p-8 lg:p-20 gap-10 items-center relative overflow-hidden shadow-2xl transition-all hover:shadow-glow duration-700">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-500/5 via-transparent to-accent-500/5 pointer-events-none" />
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-primary-500/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-accent-500/20 rounded-full blur-[100px] animate-pulse delay-700"></div>

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-sm font-semibold uppercase tracking-wide">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-primary-400 opacity-75"></span>
              Early Access
            </span>
          </div>
          <div className="flex flex-col gap-6 relative z-10">
            <h3 className="text-4xl md:text-6xl tracking-tighter max-w-4xl font-heading font-bold text-slate-900 leading-[1.1]">
              Ready to automate your <br className="hidden md:block" />
              <span className="text-gradient-primary">
                Instagram Revenue?
              </span>
            </h3>
            <p className="text-xl leading-relaxed tracking-tight text-slate-600 max-w-2xl font-light mx-auto">
              Stop leaving money in the comments. Join 500+ sellers scaling their business with VoluChat.
              Get started for free during our beta.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-5 relative z-10 w-full sm:w-auto">
            <a
              href="https://dashboard.voluchat.com"
              className="btn-primary btn-glow h-14 px-10 text-lg rounded-full inline-flex items-center justify-center gap-2"
            >
              Get Started for Free <MoveRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export { CTA };
