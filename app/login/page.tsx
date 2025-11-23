import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - VoluChat",
  description:
    "Sign in to your VoluChat dashboard to manage your Instagram automation.",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center bg-slate-50 py-20">
        <div className="bg-white p-8 rounded-xl shadow-premium max-w-md w-full border border-slate-200 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">
            Welcome Back
          </h1>
          <p className="text-slate-600 mb-8">
            Sign in to access your VoluChat dashboard.
          </p>

          <div className="space-y-4">
            <Button className="w-full h-12 text-base" asChild>
              <a href="https://app.voluchat.com/login">Sign In</a>
            </Button>
            <div className="text-sm text-slate-500">
              Don't have an account?{" "}
              <a href="/start" className="text-primary-600 hover:underline">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
