import { ClientLogos } from "@/components/ui/client-logos";
import { ThreeBackground } from "@/components/ui/three-background";
import { Search, Sparkles, ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section id="hero" className="pt-16 pb-16 lg:pt-28 lg:pb-8 relative overflow-hidden min-h-screen flex flex-col justify-center">
            {/* Three.js Animated Background */}
            <ThreeBackground />

            {/* Gradient Mesh Background (fallback overlay) */}
            <div className="absolute inset-0 gradient-mesh pointer-events-none -z-20 opacity-40"></div>

            {/* Contrast Booster - Radial Gradient behind text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.4)_40%,transparent_70%)] -z-10 pointer-events-none"></div>

            <div className="container mx-auto px-6 sm:px-8 relative z-10 w-full">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 animate-fade-in">
                    <div className="inline-flex flex-wrap justify-center items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-white/40 shadow-sm text-slate-600 text-xs font-semibold uppercase tracking-wider mb-8 hover:bg-white transition-colors cursor-default max-w-full">
                        <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-500"></span>
                        </span>
                        <span className="text-primary-700">New</span>
                        <span className="w-px h-3 bg-slate-300 hidden sm:block"></span>
                        <span className="text-center">Instagram Sales Automation</span>
                    </div>

                    <div className="mb-8 relative w-full">
                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-bold text-slate-900 tracking-tight leading-[1.1] break-words">
                            The sales assistant <br className="hidden sm:block" />
                            <span className="font-serif italic font-light text-slate-700 block sm:inline mt-2 sm:mt-0">that works for you</span>
                        </h1>

                        {/* Decorative elements around text */}
                        <div className="absolute -right-4 lg:-right-12 top-0 hidden lg:block animate-float delay-100">
                            <div className="bg-white/40 backdrop-blur-md border border-white/50 p-3 rounded-2xl shadow-lg rotate-12">
                                <span className="text-2xl">✨</span>
                            </div>
                        </div>
                    </div>

                    <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mb-10 font-light px-2">
                        VoluChat automatically replies to DMs, qualifies leads, and moves them to WhatsApp. Available in <span className="font-medium text-slate-900">Hindi & regional languages</span>.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center justify-center">
                        <a href="#get-started" className="w-full sm:w-auto group relative px-8 py-4 bg-slate-900 text-white text-lg font-medium rounded-full hover:bg-slate-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 overflow-hidden flex justify-center items-center">
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                            <span className="relative flex items-center gap-2">
                                Start free trial <ArrowRight className="w-4 h-4" />
                            </span>
                        </a>
                        <a href="#demo" className="w-full sm:w-auto px-8 py-4 bg-white/50 backdrop-blur-sm text-slate-900 border border-white/60 text-lg font-medium rounded-full hover:bg-white/80 transition-all duration-300 shadow-sm hover:shadow-md flex justify-center items-center">
                            View demo
                        </a>
                    </div>
                </div>

                {/* Glass Card Search Interface */}
                <div className="relative max-w-3xl mx-auto mt-8 animate-fade-in delay-200 w-full">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[2rem] blur-xl opacity-20 animate-pulse"></div>

                    <div className="relative bg-white/10 backdrop-blur-xl border border-white/40 rounded-[2rem] shadow-2xl overflow-hidden p-6 sm:p-10">
                        <div className="flex flex-col gap-6">
                            <div className="text-center">
                                <h3 className="text-xl sm:text-2xl font-light text-slate-800 mb-2">Your personal assistant</h3>
                                <p className="text-slate-500 text-sm">Ask VoluChat to handle your sales queries</p>
                            </div>

                            <div className="relative group w-full">
                                <div className="absolute inset-0 bg-white/40 rounded-2xl blur-sm group-hover:blur-md transition-all"></div>
                                <div className="relative bg-white/60 backdrop-blur-md border border-white/60 rounded-2xl p-2 flex flex-col sm:flex-row items-center gap-3 shadow-inner transition-all group-hover:bg-white/80">
                                    <div className="hidden sm:block pl-4 text-slate-400">
                                        <Sparkles className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="text"
                                        readOnly
                                        value="Find the most urgent DMs..."
                                        className="w-full bg-transparent border-none focus:ring-0 text-slate-700 text-base sm:text-lg placeholder:text-slate-400 font-light py-3 text-center sm:text-left truncate"
                                    />
                                    <button className="w-full sm:w-auto bg-slate-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-lg whitespace-nowrap">
                                        <Search className="w-4 h-4" />
                                        <span>Search</span>
                                    </button>
                                </div>
                            </div>

                            {/* Floating Elements */}
                            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 mt-4 opacity-80">
                                <div className="bg-white/40 backdrop-blur-md border border-white/40 px-4 py-2 rounded-full text-xs sm:text-sm text-slate-600 flex items-center gap-2 shadow-sm animate-float delay-100 whitespace-nowrap">
                                    <span>🛍️</span> Product inquiries
                                </div>
                                <div className="bg-white/40 backdrop-blur-md border border-white/40 px-4 py-2 rounded-full text-xs sm:text-sm text-slate-600 flex items-center gap-2 shadow-sm animate-float delay-300 whitespace-nowrap">
                                    <span>📦</span> Order status
                                </div>
                                <div className="bg-white/40 backdrop-blur-md border border-white/40 px-4 py-2 rounded-full text-xs sm:text-sm text-slate-600 flex items-center gap-2 shadow-sm animate-float delay-200 whitespace-nowrap">
                                    <span>💬</span> Hindi support
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 sm:mt-20">
                    <ClientLogos
                        heading="Trusted by 500+ Indian sellers"
                        subheading=""
                    />
                </div>
            </div>
        </section>
    );
}
