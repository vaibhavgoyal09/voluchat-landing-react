export default function Hero() {
    return (
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Ambient Glow */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-500/20 rounded-full blur-[100px] -z-10"></div>

            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
                            <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                            <span className="text-xs font-medium text-slate-300">Accepting early access</span>
                        </div>
                        <h1 className="text-5xl sm:text-7xl font-bold leading-tight mb-6 tracking-tight">
                            Turn DMs into a{' '}
                            <span className="bg-gradient-to-r from-primary-300 via-primary-400 to-indigo-400 bg-clip-text text-transparent">
                                sales machine
                            </span>
                        </h1>
                        <p className="text-lg text-slate-400 mb-8 leading-relaxed max-w-lg">
                            Stop losing buyers when you're offline. VoluChat uses AI to automate Instagram DM conversations,
                            answer product questions instantly, and hand off to you when needed.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <a
                                href="#waitlist"
                                className="px-8 py-4 bg-white text-slate-950 hover:bg-slate-200 rounded-full font-semibold text-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-white/10 text-center"
                            >
                                Join the waitlist
                            </a>
                            <a
                                href="#how-it-works"
                                className="px-8 py-4 glass-button rounded-full text-white font-medium text-lg text-center"
                            >
                                See how it works
                            </a>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-950"></div>
                                ))}
                            </div>
                            <p>Trusted by 100+ Instagram sellers</p>
                        </div>
                    </div>

                    {/* Mock DM Preview */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-indigo-500/20 rounded-3xl blur-2xl"></div>
                        <div className="relative glass-card rounded-3xl p-6 border border-white/10">
                            <div className="bg-slate-950/80 rounded-2xl p-4 space-y-4 h-[400px] overflow-hidden relative">
                                {/* Chat Header */}
                                <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center text-white font-bold">V</div>
                                    <div>
                                        <div className="font-semibold text-white">VoluChat Store</div>
                                        <div className="text-xs text-slate-400">Active now</div>
                                    </div>
                                </div>

                                {/* Messages */}
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-800 flex-shrink-0"></div>
                                        <div className="bg-slate-800 rounded-2xl rounded-tl-none px-4 py-3 max-w-[85%]">
                                            <p className="text-sm text-slate-200">Hi! What sizes do you have for this dress?</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 justify-end">
                                        <div className="bg-primary-600 text-white rounded-2xl rounded-tr-none px-4 py-3 max-w-[85%] shadow-lg shadow-primary-900/20">
                                            <p className="text-sm">We have S, M, L, and XL available! All sizes are currently in stock. ✨</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-800 flex-shrink-0"></div>
                                        <div className="bg-slate-800 rounded-2xl rounded-tl-none px-4 py-3 max-w-[85%]">
                                            <p className="text-sm text-slate-200">Do you ship to Bangalore?</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 justify-end">
                                        <div className="bg-primary-600 text-white rounded-2xl rounded-tr-none px-4 py-3 max-w-[85%] shadow-lg shadow-primary-900/20">
                                            <p className="text-sm">Yes! 🚀 We ship pan-India. Bangalore delivery takes 2-3 days.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
