import { CTA } from "@/components/ui/call-to-action";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-slate-200 pt-12 pb-12">
            <div className="container-padding">
                {/* New CTA Component */}
                <CTA />

                <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8">
                            <img src="/voluchat_logo.svg" alt="VoluChat" className="w-full h-full" />
                        </div>
                        <span className="font-heading font-bold text-xl text-slate-900">VoluChat</span>
                    </div>

                    <div className="text-sm text-slate-500 font-medium">
                        © {currentYear} VoluChat. Built with ❤️ in India 🇮🇳
                    </div>

                    <div className="flex gap-8 text-sm font-medium text-slate-600">
                        <a href="#" className="hover:text-primary-600 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-primary-600 transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-primary-600 transition-colors">Contact Support</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
