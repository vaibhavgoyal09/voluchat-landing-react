export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/50 backdrop-blur-xl border-b border-white/5">
            <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src="/voluchat_logo.svg" alt="VoluChat" className="w-10 h-10" />
                        <div className="text-xl font-bold text-white tracking-tight">
                            VoluChat
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <a
                            href="#features"
                            className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                        >
                            Features
                        </a>
                        <a
                            href="#how-it-works"
                            className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                        >
                            How it works
                        </a>
                        <a
                            href="#faq"
                            className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                        >
                            FAQ
                        </a>
                        <a
                            href="#waitlist"
                            className="px-5 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-white text-sm font-medium transition-all backdrop-blur-md"
                        >
                            Request invite
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    );
}
