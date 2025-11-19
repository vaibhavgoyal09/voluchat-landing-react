export default function Features() {
    const features = [
        {
            emoji: "💬",
            title: "Smart DM Flows for product queries",
            description: "Set up conversation flows that guide buyers through product selection, sizing, and checkout - all automated.",
        },
        {
            emoji: "📢",
            title: "Broadcasts for drops & offers",
            description: "Send targeted messages to your audience about new arrivals, sales, and exclusive deals without spamming.",
        },
        {
            emoji: "📊",
            title: "Simple dashboard to see conversations",
            description: "Monitor all your DM conversations in one place. Jump in anytime to take over from the AI.",
        },
        {
            emoji: "✅",
            title: "Designed for Meta's policies and limits",
            description: "We follow Instagram's automation rules strictly. Your account stays safe while you scale.",
        },
        {
            emoji: "🎯",
            title: "Context-aware AI responses",
            description: "VoluChat understands your products, pricing, and policies to give accurate answers every time.",
        },
        {
            emoji: "⚡",
            title: "Lightning-fast setup",
            description: "Get up and running in minutes, not days. We handle the technical complexity for you.",
        },
    ];

    return (
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative">
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] -z-10"></div>

            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
                    What VoluChat does for you
                </h2>
                <p className="text-xl text-slate-400 text-center mb-16 max-w-2xl mx-auto">
                    Everything you need to automate Instagram DMs and grow your sales
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="glass-card rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl mb-4 border border-white/10">
                                {feature.emoji}
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-white">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
