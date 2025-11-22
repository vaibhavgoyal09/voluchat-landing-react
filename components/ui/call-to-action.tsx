import { MoveRight, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function CTA() {
    return (
        <div className="w-full py-16 lg:py-24">
            <div className="container mx-auto">
                <div className="flex flex-col text-center bg-white/80 backdrop-blur-xl border border-white/50 rounded-[2.5rem] p-8 lg:p-20 gap-10 items-center relative overflow-hidden shadow-2xl">
                    {/* Background decoration */}
                    <div className="absolute -top-32 -right-32 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-white/40 pointer-events-none"></div>

                    <div className="relative z-10">
                        <Badge className="text-sm px-4 py-1.5 bg-primary-50 text-primary-700 border-primary-100 hover:bg-primary-100">Get Started Now</Badge>
                    </div>
                    <div className="flex flex-col gap-6 relative z-10">
                        <h3 className="text-4xl md:text-6xl tracking-tight max-w-3xl font-heading font-bold text-slate-900 leading-tight">
                            Ready to 10x your <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">Instagram sales?</span>
                        </h3>
                        <p className="text-xl leading-relaxed tracking-tight text-slate-600 max-w-2xl font-medium mx-auto">
                            Join hundreds of Indian sellers who automated their DMs and WhatsApp follow-ups.
                            Setup takes 15 minutes.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-5 relative z-10 w-full sm:w-auto">
                        <Button className="gap-2 h-14 px-8 text-lg rounded-full bg-slate-900 hover:bg-slate-800 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300" size="lg">
                            Start Free Trial <MoveRight className="w-5 h-5" />
                        </Button>
                        <Button className="gap-2 h-14 px-8 text-lg rounded-full bg-white border-slate-200 text-slate-900 hover:bg-slate-50 hover:border-slate-300 shadow-sm" variant="outline" size="lg">
                            Book a Demo <PhoneCall className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { CTA };
