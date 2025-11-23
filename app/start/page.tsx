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
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center bg-slate-50 py-20">
        <div className="bg-white p-8 rounded-xl shadow-premium max-w-md w-full border border-slate-200 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">
            Start Automating
          </h1>
          <p className="text-slate-600 mb-8">
            Join thousands of Indian sellers automating their sales.
          </p>

          <div className="space-y-4">
            <Button className="w-full h-12 text-base" asChild>
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
