"use client";

import { useState, FormEvent } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WaitlistForm from "@/components/WaitlistForm";

export default function WaitlistPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen relative flex flex-col justify-center pt-16">
        {/* Background Effects */}
        <div className="absolute inset-0 gradient-mesh pointer-events-none -z-20 opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.4)_40%,transparent_70%)] -z-10 pointer-events-none"></div>

        <div className="container-wide py-12 relative z-10">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="text-center mb-12">
              <h1 className="section-heading text-4xl md:text-5xl lg:text-6xl mb-4">
                Join the VoluChat Waitlist
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Be among the first to experience our revolutionary Instagram DM automation platform.
                Get early access, priority support, and help shape the future of VoluChat.
              </p>
            </div>

            <div className="glass-card p-8 md:p-12 rounded-[2.5rem]">
              <WaitlistForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}