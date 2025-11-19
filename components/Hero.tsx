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
                            <span className="text-xs font-medium text-slate-300">For ambitious Instagram sellers</span>
                        </div>
                        <h1 className="text-5xl sm:text-7xl font-bold leading-tight mb-6 tracking-tight">
                            Your Instagram{' '}
                            <span className="bg-gradient-to-r from-primary-300 via-primary-400 to-indigo-400 bg-clip-text text-transparent">
                                growth assistant
                            </span>
                        </h1>
                        <p className="text-lg text-slate-400 mb-8 leading-relaxed max-w-lg">
                            Automate engagement, capture every lead, and grow your sales — while you focus on your products.
                            The intelligent assistant built for Instagram sellers.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <a
                                href="#waitlist"
                                className="px-8 py-4 bg-white text-slate-950 hover:bg-slate-200 rounded-full font-semibold text-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-white/10 text-center"
                            >
                                Join the beta
                            </a>
                            <a
                                href="#features"
                                className="px-8 py-4 glass-button rounded-full text-white font-medium text-lg text-center"
                            >
                                See what it does
                            </a>
                        </div>

                        {/* Meta Tech Partner Badge */}
                        <div className="inline-flex items-center gap-3 px-5 py-3 mb-6 rounded-2xl bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/30 backdrop-blur-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-xs font-semibold text-blue-300">Official</div>
                                    <div className="text-sm font-bold text-white">Meta Tech Partner</div>
                                </div>
                            </div>
                            <div className="h-8 w-px bg-blue-500/30"></div>
                            <div className="flex items-center gap-1 text-blue-200">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-xs font-medium">Verified & Compliant</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 text-sm text-slate-400">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Auto-respond to comments & DMs instantly</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Turn engagement into customers</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Setup in minutes, no coding needed</span>
                            </div>
                        </div>
                    </div>

                    {/* Mock automation preview */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-indigo-500/20 rounded-3xl blur-2xl"></div>
                        <div className="relative glass-card rounded-3xl p-6 border border-white/10">
                            <div className="bg-slate-950/80 rounded-2xl p-6 space-y-6">
                                {/* Post engagement */}
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-indigo-600"></div>
                                        <div>
                                            <div className="font-semibold text-white text-sm">Your Product Post</div>
                                            <div className="text-xs text-slate-500">Just now</div>
                                        </div>
                                    </div>
                                    <div className="bg-slate-800 rounded-lg p-3 mb-3">
                                        <p className="text-sm text-slate-300">New collection just dropped! 🔥</p>
                                    </div>

                                    {/* Multiple comments */}
                                    <div className="space-y-2 ml-4 mb-4">
                                        <div className="flex items-start gap-2">
                                            <div className="w-6 h-6 rounded-full bg-slate-700"></div>
                                            <div className="bg-slate-900 rounded-lg px-3 py-2 flex-1">
                                                <p className="text-xs text-slate-300"><span className="font-semibold">user1:</span> Price?</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="w-6 h-6 rounded-full bg-slate-700"></div>
                                            <div className="bg-slate-900 rounded-lg px-3 py-2 flex-1">
                                                <p className="text-xs text-slate-300"><span className="font-semibold">user2:</span> Interested!</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Automation indicator */}
                                <div className="flex items-center justify-center py-2">
                                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/30">
                                        <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse"></div>
                                        <div className="text-xs font-medium text-primary-300">VoluChat responding...</div>
                                    </div>
                                </div>

                                {/* Auto DMs sent */}
                                <div className="space-y-3">
                                    <div className="bg-gradient-to-br from-primary-900/20 to-indigo-900/20 border border-primary-500/20 rounded-lg p-3">
                                        <div className="flex items-center gap-2 mb-2">
                                            <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-xs text-slate-400">DM sent to user1</span>
                                        </div>
                                        <p className="text-xs text-slate-300">Hey! Prices start at ₹999. Check catalog →</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-primary-900/20 to-indigo-900/20 border border-primary-500/20 rounded-lg p-3">
                                        <div className="flex items-center gap-2 mb-2">
                                            <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-xs text-slate-400">DM sent to user2</span>
                                        </div>
                                        <p className="text-xs text-slate-300">Thanks! Here's how to order... 🛍️</p>
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
