import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Target, Users, Zap, Heart } from "lucide-react";

export const metadata: Metadata = {
    title: "About VoluChat - Instagram Automation for Indian Sellers",
    description: "Learn about VoluChat's mission to empower Indian Instagram sellers with AI-powered automation. Built in India, for India.",
    keywords: ["about VoluChat", "Instagram automation India", "Indian startup", "D2C automation"],
    openGraph: {
        title: "About VoluChat - Instagram Automation for Indian Sellers",
        description: "Learn about VoluChat's mission to empower Indian Instagram sellers",
    },
};

export default function AboutPage() {
    const values = [
        {
            icon: Target,
            title: "Mission-Driven",
            description: "Empowering Indian sellers to scale their Instagram businesses with intelligent automation."
        },
        {
            icon: Users,
            title: "Customer-First",
            description: "Every feature we build is designed with the unique needs of Indian sellers in mind."
        },
        {
            icon: Zap,
            title: "Innovation",
            description: "Leveraging cutting-edge AI to make automation accessible and affordable for everyone."
        },
        {
            icon: Heart,
            title: "Built in India",
            description: "Proudly made in India, supporting the growth of Indian D2C brands and entrepreneurs."
        }
    ];

    return (
        <main className="min-h-screen">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
                <div className="absolute inset-0 gradient-mesh opacity-30 pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
                            Empowering Indian sellers with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">AI automation</span>
                        </h1>

                        <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
                            VoluChat was born from a simple observation: Indian Instagram sellers were losing sales because they couldn't respond to DMs fast enough. We built the solution.
                        </p>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl font-bold text-slate-900 mb-8 text-center">Our Story</h2>

                        <div className="prose prose-lg max-w-none text-slate-700 space-y-6">
                            <p>
                                In 2024, we noticed a growing problem among Indian Instagram sellers and D2C brands. Despite having thousands of followers and high engagement, they were losing potential customers simply because they couldn't respond to DMs quickly enough.
                            </p>

                            <p>
                                Manual responses were time-consuming, especially when sellers were busy packing orders, managing inventory, or simply sleeping. By the time they replied, customers had already moved on to competitors.
                            </p>

                            <p>
                                We realized that while automation tools existed, they were either too expensive, too complex, or didn't support Indian languages. That's when VoluChat was born.
                            </p>

                            <p>
                                Today, VoluChat helps 500+ Indian sellers automate their Instagram DMs, qualify leads, and seamlessly hand off conversations to WhatsApp—all while supporting Hindi and regional languages. We're proud to be building technology that makes a real difference in the lives of Indian entrepreneurs.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4 text-center">Our Values</h2>
                        <p className="text-lg text-slate-600 mb-12 text-center max-w-2xl mx-auto">
                            These principles guide everything we do at VoluChat
                        </p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {values.map((value, index) => (
                                <div key={index} className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-lg transition-shadow">
                                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                                        <value.icon className="w-6 h-6 text-primary-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                                    <p className="text-slate-600">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-gradient-to-br from-primary-600 to-indigo-600">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid md:grid-cols-3 gap-12 text-center text-white">
                            <div>
                                <div className="text-5xl font-bold mb-2">500+</div>
                                <div className="text-primary-100">Active Sellers</div>
                            </div>
                            <div>
                                <div className="text-5xl font-bold mb-2">100K+</div>
                                <div className="text-primary-100">DMs Automated</div>
                            </div>
                            <div>
                                <div className="text-5xl font-bold mb-2">10+</div>
                                <div className="text-primary-100">Languages Supported</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl font-bold text-slate-900 mb-6">
                            Join the VoluChat family
                        </h2>
                        <p className="text-xl text-slate-600 mb-8">
                            Start automating your Instagram sales today and join hundreds of successful Indian sellers.
                        </p>
                        <Link
                            href="/#get-started"
                            className="inline-block px-8 py-4 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
                        >
                            Start your free trial
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
