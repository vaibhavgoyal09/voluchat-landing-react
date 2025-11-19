export default function Footer() {
    return (
        <footer className="border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8 bg-slate-950/50 backdrop-blur-xl">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 rounded bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-xs">
                                V
                            </div>
                            <div className="text-xl font-bold text-white">
                                VoluChat
                            </div>
                        </div>
                        <p className="text-sm text-slate-500">
                            AI-powered Instagram DM assistant
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

                <div className="mt-8 pt-8 border-t border-white/5 text-center">
                    <p className="text-sm text-slate-500 mb-2">
                        © {new Date().getFullYear()} VoluChat. All rights reserved.
                    </p>
                    <p className="text-xs text-slate-600">
                        Currently in invite-only beta. Not affiliated with Instagram or Meta.
                    </p>
                </div>
            </div>
        </footer>
    );
}
