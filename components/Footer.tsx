export default function Footer() {
    return (
        <footer className="border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8 bg-slate-950/50 backdrop-blur-xl">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <img src="/voluchat_logo.svg" alt="VoluChat" className="w-7 h-7" />
                            <div className="text-xl font-bold text-white">
                                VoluChat
                            </div>
                        </div>
                        <p className="text-sm text-slate-500">
                            Your Instagram growth assistant
                        </p>
                    </div>

                    <div className="flex gap-8 text-sm">
                        <a href="#" className="text-slate-400 hover:text-white transition-colors">
                            Privacy
                        </a>
                        <a href="#" className="text-slate-400 hover:text-white transition-colors">
                            Terms
                        </a>
                    </div>
                </div>


                <div className="mt-8 pt-8 border-t border-white/5">
                    {/* Meta Tech Partner Badge */}
                    <div className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                            <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </div>
                            <span className="text-sm font-semibold text-blue-200">Official Meta Tech Partner</span>
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-slate-500 mb-2">
                            © {new Date().getFullYear()} VoluChat. All rights reserved.
                        </p>
                        <p className="text-xs text-slate-600">
                            Currently in invite-only beta. Not affiliated with Instagram or Meta.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
