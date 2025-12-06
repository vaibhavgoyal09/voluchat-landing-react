"use client";

import { useState, FormEvent } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WaitlistForm from "@/components/WaitlistForm";

export default function WaitlistPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 pt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Join the VoluChat Waitlist
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Be among the first to experience our revolutionary Instagram DM automation platform.
                Get early access, priority support, and help shape the future of VoluChat.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-slate-200">
              <WaitlistForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}