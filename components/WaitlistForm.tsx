"use client";

import { useState, FormEvent } from "react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [instagramHandle, setInstagramHandle] = useState("");
  const [name, setName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, instagramHandle, name, whatsappNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "Successfully joined the waitlist!");
        setEmail("");
        setInstagramHandle("");
        setName("");
        setWhatsappNumber("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    }
  };

  return (
    <section id="waitlist" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 relative overflow-hidden shadow-lg">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary-500 via-purple-500 to-pink-500"></div>

          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-slate-900">
            Join the private VoluChat beta
          </h2>
          <p className="text-lg text-slate-600 text-center mb-8">
            We're onboarding sellers in small batches to ensure quality. Early
            users get priority support and direct access to the founder.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2 text-slate-700"
              >
                Full Name <span className="text-primary-600">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all text-slate-900 placeholder:text-slate-400"
                placeholder="Your full name"
                disabled={status === "loading"}
              />
            </div>
    
            <div>
              <label
                htmlFor="whatsapp"
                className="block text-sm font-medium mb-2 text-slate-700"
              >
                WhatsApp Number <span className="text-primary-600">*</span>
              </label>
              <input
                type="tel"
                id="whatsapp"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all text-slate-900 placeholder:text-slate-400"
                placeholder="Your WhatsApp number with country code"
                disabled={status === "loading"}
              />
            </div>
    
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-slate-700"
              >
                Email address <span className="text-primary-600">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all text-slate-900 placeholder:text-slate-400"
                placeholder="you@example.com"
                disabled={status === "loading"}
              />
            </div>
    
            <div>
              <label
                htmlFor="instagram"
                className="block text-sm font-medium mb-2 text-slate-700"
              >
                Instagram handle (optional)
              </label>
              <input
                type="text"
                id="instagram"
                value={instagramHandle}
                onChange={(e) => setInstagramHandle(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all text-slate-900 placeholder:text-slate-400"
                placeholder="@yourshop"
                disabled={status === "loading"}
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full px-8 py-4 bg-linear-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white font-semibold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary-500/25"
            >
              {status === "loading" ? "Submitting..." : "Request invite"}
            </button>

            {message && (
              <div
                className={`p-4 rounded-xl text-sm font-medium ${
                  status === "success"
                    ? "bg-green-50 border border-green-200 text-green-700"
                    : "bg-red-50 border border-red-200 text-red-700"
                }`}
              >
                {message}
              </div>
            )}
          </form>

          <p className="text-sm text-slate-500 text-center mt-6">
            By joining, you'll be among the first to experience VoluChat and
            help shape the product.
          </p>
        </div>
      </div>
    </section>
  );
}
