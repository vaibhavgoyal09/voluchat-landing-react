"use client";

import { useState } from "react";

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            question: "Is VoluChat safe for my Instagram account?",
            answer: "Yes! VoluChat is built using official Meta APIs and follows all Instagram and WhatsApp guidelines. We prioritize account safety and compliance."
        },
        {
            question: "Do I need technical knowledge to set this up?",
            answer: "Not at all. We provide done-for-you onboarding with a 30-minute call to help you set everything up. Our pre-built templates make it easy to get started without any technical skills."
        },
        {
            question: "Which languages do you support?",
            answer: "VoluChat supports Hindi and major regional Indian languages including Tamil, Telugu, Kannada, Malayalam, Bengali, Marathi, and Gujarati. Our AI understands context and replies naturally in the customer's preferred language."
        },
        {
            question: "Can I cancel anytime?",
            answer: "Absolutely! There are no long-term contracts. You can cancel your subscription anytime, and you'll retain access until the end of your billing period."
        }
    ];

    return (
        <section id="faq" className="section-spacing">
            <div className="max-w-3xl mx-auto container-padding">
                <div className="text-center mb-12">
                    <div className="inline-block px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-semibold uppercase tracking-wide mb-4">
                        FAQ
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Common Questions
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl overflow-hidden hover:bg-white/80 hover:border-white/60 hover:shadow-premium transition-all duration-300"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full py-6 px-8 text-left flex justify-between items-center"
                            >
                                <span className="font-bold text-lg text-slate-900 pr-8">
                                    {faq.question}
                                </span>
                                <span className={`text-2xl text-primary-600 transition-transform duration-300 flex-shrink-0 ${openIndex === index ? "rotate-45" : ""}`}>
                                    +
                                </span>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                                    }`}
                            >
                                <p className="px-8 pb-8 text-slate-600 leading-relaxed font-medium">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
