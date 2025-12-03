"use client";

import { FeaturesSectionWithHoverEffects } from "@/components/ui/feature-section-with-hover-effects";

export default function Features() {
  return (
    <section id="features" className="section-spacing relative overflow-hidden">
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 gradient-mesh pointer-events-none opacity-50"></div>

      <div className="container-padding relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-semibold uppercase tracking-wide mb-4">
            Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Everything you need to scale
          </h2>
          <p className="text-lg text-slate-600">
            Powerful features designed for e-commerce brands and sellers.
          </p>
        </div>

        <FeaturesSectionWithHoverEffects />
      </div>
    </section>
  );
}
