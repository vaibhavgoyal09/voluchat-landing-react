export default function FAQ() {
    const faqs = [
        {
            question: "What does invite-only mean?",
            answer: "We're launching in private beta with limited spots. This lets us onboard sellers personally and ensure everyone gets great results. When you join the waitlist, we'll invite you based on fit and availability.",
        },
        {
            question: "Is this safe for my Instagram account?",
            answer: "Absolutely. VoluChat is designed to work within Meta's official policies and rate limits. We don't use any shady automation tactics that could get your account flagged.",
        },
        {
            question: "Do I need technical skills?",
            answer: "Not at all! We handle the setup for you during onboarding. You just tell us about your products and common questions, and we configure everything.",
        },
        {
            question: "How much will it cost after launch?",
            answer: "Pricing isn't finalized yet, but beta users will get locked-in founding member rates. Expect simple, affordable pricing based on conversation volume.",
        },
        {
            question: "Can VoluChat handle custom or complex orders?",
            answer: "VoluChat handles the repetitive stuff (sizes, pricing, shipping). For custom requests, it knows to loop you in immediately so you maintain that personal touch.",
        },
        {
            question: "How long does setup take?",
            answer: "Most sellers are up and running within 24 hours. We do a quick onboarding call, set up your conversation flows, and test everything before going live.",
        },
    ];

    return (
        <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
                    Frequently asked questions
                </h2>
                <p className="text-xl text-slate-400 text-center mb-16">
                    Everything you need to know about VoluChat
                </p>
                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="glass-card rounded-2xl p-6 hover:bg-white/5 transition-all"
                        >
                            <h3 className="text-lg font-semibold mb-3 text-white">
                                {faq.question}
                            </h3>
                            <p className="text-slate-400 leading-relaxed">
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
