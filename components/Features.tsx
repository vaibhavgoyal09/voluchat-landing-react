export default function Features() {
    const features = [
        {
            emoji: "💬",
            title: "Smart comment automation",
            description: "Set keyword triggers like 'Price', 'Buy', 'Interested' and automatically send personalized DMs with product details, catalogs, or payment links.",
        },
        {
            emoji: "⚡",
            title: "Instant DM responses",
            description: "Answer repetitive questions automatically. Product info, pricing, shipping, COD availability — all handled without you lifting a finger.",
        },
        {
            emoji: "🎯",
            title: "Pre-built sales flows",
            description: "Launch with proven templates for common scenarios. We've done the thinking — you just customize the messages for your products.",
        },
        {
            emoji: "📊",
            title: "Track what's working",
            description: "See which posts, keywords, and flows drive the most engagement and sales. Double down on winners, eliminate losers.",
        },
        {
            emoji: "🔗",
            title: "Send anything via DM",
            description: "Product catalogs, Razorpay links, WhatsApp numbers, discount codes — automatically share whatever moves the sale forward.",
        },
        {
            emoji: "✅",
            title: "Instagram-safe automation",
            description: "Built to comply with Meta's policies. No spam tactics, no account risks. Just smart automation that helps your business grow.",
        },
    ];

    return (
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative">
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] -z-10"></div>

            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
                    Your complete growth toolkit
                </h2>
                <p className="text-xl text-slate-400 text-center mb-16 max-w-2xl mx-auto">
                    Everything you need to automate engagement and scale your Instagram sales
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
