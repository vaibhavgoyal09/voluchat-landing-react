export default function PainPoints() {
    const painPoints = [
        {
            title: "Stop losing buyers when you're offline",
            description: "Never miss a sale again. VoluChat responds instantly 24/7, even when you're sleeping or busy with orders.",
        },
        {
            title: "Auto-reply to repetitive questions",
            description: "Prices, sizes, shipping, COD, stock availability - VoluChat handles the basics so you don't have to type the same answers 100 times a day.",
        },
        {
            title: "Hand off to humans instantly when needed",
            description: "Complex queries or custom orders? VoluChat knows when to loop you in, keeping the human touch where it matters.",
        },
        {
            title: "Built for Instagram's rules and limits",
            description: "Designed to work within Meta's policies. Safe, compliant automation that won't risk your account.",
        },
    ];

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
                    Built for Instagram sellers
                </h2>
                <p className="text-xl text-slate-400 text-center mb-16 max-w-2xl mx-auto">
                    We understand the daily grind of managing DMs. VoluChat solves your biggest pain points.
                </p>
                <div className="grid md:grid-cols-2 gap-8">
                    {painPoints.map((point, index) => (
                        <div
                            key={index}
                            className="glass-card rounded-2xl p-8 hover:bg-white/5 transition-all group"
                        >
                            <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-primary-300 transition-colors">
                                {point.title}
                            </h3>
                            <p className="text-slate-400 leading-relaxed">
                                {point.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
