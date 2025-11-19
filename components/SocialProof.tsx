export default function SocialProof() {
    const personas = [
        {
            title: "Solo Instagram sellers",
            description: "Running your shop single-handedly? VoluChat is your 24/7 sales assistant that never sleeps.",
        },
        {
            title: "D2C brands testing Instagram first",
            description: "Building your brand on Instagram? Automate the basics and focus on creating great content and products.",
        },
        {
            title: "Agencies managing multiple shops",
            description: "Managing DMs for multiple clients? VoluChat scales with you, handling conversations across all accounts.",
        },
    ];

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
                    Who is VoluChat for?
                </h2>
                <p className="text-xl text-slate-400 text-center mb-16 max-w-2xl mx-auto">
                    Perfect for anyone selling or managing sales on Instagram
                </p>
                <div className="grid md:grid-cols-3 gap-8">
                    {personas.map((persona, index) => (
                        <div
                            key={index}
                            className="glass-card rounded-2xl p-8 text-center hover:bg-white/5 transition-all hover:-translate-y-1"
                        >
                            <h3 className="text-xl font-semibold mb-4 text-white">
                                {persona.title}
                            </h3>
                            <p className="text-slate-400 leading-relaxed">
                                {persona.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
