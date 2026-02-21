import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start Automating - VoluChat",
  description:
    "Start your free trial with VoluChat and automate your Instagram sales today.",
};

export default function StartPage() {
  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 gradient-mesh pointer-events-none -z-20 opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.4)_40%,transparent_70%)] -z-10 pointer-events-none"></div>

      <Header />
      <div className="flex-grow container-wide flex items-center justify-center py-20 relative z-10 animate-fade-in">
        <div className="glass-card p-8 md:p-12 rounded-[2.5rem] max-w-md w-full text-center">
          <h1 className="section-heading text-3xl mb-4">
            Start Automating
          </h1>
          <p className="text-slate-600 mb-8">
            Join thousands of Indian sellers automating their sales.
          </p>

          <div className="space-y-6">
            <Button className="w-full btn-primary btn-glow" asChild>
              <a href="https://app.voluchat.com/register">
                Create Free Account
              </a>
            </Button>
            <div className="text-sm text-slate-500">
              Already have an account?{" "}
              <a href="/login" className="text-primary-600 hover:underline">
                Sign In
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
