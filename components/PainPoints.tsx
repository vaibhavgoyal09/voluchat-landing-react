import { XCircle, CheckCircle2, Clock, Users, MessageSquare, ArrowRight } from 'lucide-react';
import { cn } from "@/lib/utils";

export default function PainPoints() {
    const problems = [
        {
            icon: Clock,
            text: "Missed DMs while packing orders or busy.",
        },
        {
            icon: Users,
            text: "Customers leave if you reply late.",
        },
        {
            icon: MessageSquare,
            text: "Manually sending payment details repeatedly.",
        },
    ];

    const solutions = [
        {
            icon: CheckCircle2,
            text: "Instant, human-like auto-replies 24/7.",
        },
        {
            icon: CheckCircle2,
            text: "Smart flows that qualify & close sales.",
        },
        {
            icon: CheckCircle2,
            text: "Auto-send offers, stock & payment links.",
        },
    ];

    return (
        <section className="section-spacing relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 gradient-mesh opacity-30 pointer-events-none" />

            <div className="max-w-7xl mx-auto container-padding relative z-10">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-6">
                        Transform your <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-slate-800 to-primary-600">sales process</span>
                    </h2>
                    <p className="text-xl text-slate-600 font-light">
                        See the difference VoluChat makes in your daily operations.
                    </p>
                </div>

                <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-24 items-center">
                    {/* Central Connector (Desktop) */}
                    <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex-col items-center justify-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-white shadow-xl border border-slate-100 flex items-center justify-center">
                            <ArrowRight className="w-6 h-6 text-slate-400" />
                        </div>
                    </div>

                    {/* Left: The Old Way (Problem) */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-red-50/50 rounded-[2.5rem] transform rotate-1 group-hover:rotate-0 transition-transform duration-500" />
                        <div className="relative bg-white/60 backdrop-blur-md border border-red-100 rounded-[2rem] p-8 lg:p-10 shadow-sm transition-all duration-500 hover:shadow-red-100/50 hover:border-red-200">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2 bg-red-100 rounded-lg">
                                    <XCircle className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900">The Hard Way</h3>
                            </div>

                            <div className="space-y-6">
                                {problems.map((problem, i) => (
                                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-red-50/30 border border-red-100/50">
                                        <problem.icon className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                                        <p className="text-slate-700 font-medium">{problem.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: The VoluChat Way (Solution) */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-indigo-500/10 rounded-[2.5rem] transform -rotate-1 group-hover:rotate-0 transition-transform duration-500" />
                        <div className="relative bg-white/80 backdrop-blur-xl border border-primary-100 rounded-[2rem] p-8 lg:p-10 shadow-premium transition-all duration-500 hover:shadow-premium-lg hover:-translate-y-1">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2 bg-primary-100 rounded-lg">
                                    <CheckCircle2 className="w-6 h-6 text-primary-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900">The VoluChat Way</h3>
                            </div>

                            <div className="space-y-6">
                                {solutions.map((solution, i) => (
                                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-primary-100 shadow-sm">
                                        <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center mt-1 flex-shrink-0">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-primary-600" />
                                        </div>
                                        <p className="text-slate-800 font-semibold">{solution.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <a
                        href="#get-started"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-slate-900 text-white font-medium shadow-xl hover:shadow-2xl hover:bg-slate-800 hover:-translate-y-1 transition-all duration-300 group"
                    >
                        Switch to VoluChat
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>
        </section>
    );
}
