export default function PainPoints() {
    const painPoints = [
        {
            title: "Never miss a lead again",
            description: "Every comment and DM gets an instant response — even when you're offline. Capture interested buyers before they move on to competitors.",
        },
        {
            title: "Scale without hiring",
            description: "Handle 10x the engagement without adding team members. Your growth assistant works 24/7, no breaks, no salary.",
        },
        {
            title: "Convert browsing into buying",
            description: "Automatically move people from 'just looking' to checkout. Send catalogs, payment links, and order details instantly.",
        },
        {
            title: "Pre-built for Instagram sellers",
            description: "No complex setup. We've built the flows you need — product inquiries, pricing, COD, shipping. Just customize and go live in minutes.",
        },
    ];

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
                    Grow faster with less effort
                </h2>
                <p className="text-xl text-slate-400 text-center mb-16 max-w-2xl mx-auto">
                    Focus on your products. Let VoluChat handle customer engagement and sales automation.
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
