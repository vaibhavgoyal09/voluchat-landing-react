export default function HowItWorks() {
    const steps = [
        {
            step: "1",
            title: "Join the private waitlist",
            description: "Sign up below and we'll send you an invite when your spot is ready. Early members get priority access.",
        },
        {
            step: "2",
            title: "We onboard you 1:1 and set up your flows",
            description: "A quick call to understand your products and automate your most common DM questions. No technical skills needed.",
        },
        {
            step: "3",
            title: "Let VoluChat handle DMs while you focus on orders",
            description: "Your AI assistant works 24/7, answering questions and qualifying leads. You handle fulfillment and real conversations.",
        },
    ];

    return (
        <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
                    How it works
                </h2>
                <p className="text-xl text-slate-400 text-center mb-16 max-w-2xl mx-auto">
                    Get started in three simple steps
                </p>
                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((item, index) => (
                        <div key={index} className="relative">
                            <div className="glass-card rounded-2xl p-8 text-center h-full hover:bg-white/5 transition-all">
                                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl rotate-3 flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg shadow-primary-500/20">
                                    <span className="-rotate-3 text-white">{item.step}</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-4 text-white">
                                    {item.title}
                                </h3>
                                <p className="text-slate-400 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-[1px] bg-gradient-to-r from-white/20 to-transparent"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
