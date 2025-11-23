import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Mail, MessageSquare, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
    title: "Contact Us - VoluChat Support",
    description: "Get in touch with VoluChat. Our support team is here to help with Instagram automation, technical issues, and sales inquiries.",
    openGraph: {
        title: "Contact Us - VoluChat Support",
        description: "Get in touch with VoluChat support team",
    },
};

export default function ContactPage() {
    return (
        <main className="min-h-screen">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
                <div className="absolute inset-0 gradient-mesh opacity-30 pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
                            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">touch</span>
                        </h1>

                        <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
                            Have questions? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Options */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
                        <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <Mail className="w-6 h-6 text-primary-600" />
                            </div>
                            <h3 className="font-semibold text-slate-900 mb-2">Email Support</h3>
                            <p className="text-sm text-slate-600 mb-3">For general inquiries</p>
                            <a href="mailto:support@voluchat.com" className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                                support@voluchat.com
                            </a>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <MessageSquare className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="font-semibold text-slate-900 mb-2">Live Chat</h3>
                            <p className="text-sm text-slate-600 mb-3">Chat with our team</p>
                            <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                                Start chat
                            </button>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <Phone className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-slate-900 mb-2">Phone Support</h3>
                            <p className="text-sm text-slate-600 mb-3">Mon-Fri, 9AM-6PM IST</p>
                            <a href="tel:+911234567890" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                                +91 123 456 7890
                            </a>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <MapPin className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="font-semibold text-slate-900 mb-2">Office</h3>
                            <p className="text-sm text-slate-600 mb-3">Visit us</p>
                            <p className="text-purple-600 font-medium text-sm">
                                India 🇮🇳
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-white border border-slate-200 rounded-2xl p-8 md:p-12 shadow-lg">
                            <h2 className="text-3xl font-bold text-slate-900 mb-2">Send us a message</h2>
                            <p className="text-slate-600 mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>

                            <form className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-2">
                                            First Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            required
                                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                            placeholder="John"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-2">
                                            Last Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            required
                                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                        placeholder="+91 98765 43210"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                                        Subject *
                                    </label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        required
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="sales">Sales Inquiry</option>
                                        <option value="support">Technical Support</option>
                                        <option value="billing">Billing Question</option>
                                        <option value="partnership">Partnership Opportunity</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={6}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all resize-none"
                                        placeholder="Tell us how we can help you..."
                                    />
                                </div>

                                <div className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        id="consent"
                                        name="consent"
                                        required
                                        className="mt-1 w-4 h-4 text-primary-600 border-slate-300 rounded focus:ring-primary-500"
                                    />
                                    <label htmlFor="consent" className="text-sm text-slate-600">
                                        I agree to receive communications from VoluChat and understand that I can unsubscribe at any time. *
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full px-8 py-4 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Support Hours */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white border border-slate-200 rounded-2xl p-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Clock className="w-6 h-6 text-primary-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">Support Hours</h3>
                                    <div className="space-y-2 text-slate-600">
                                        <p><strong>Email Support:</strong> 24/7 (Response within 24 hours)</p>
                                        <p><strong>Live Chat:</strong> Monday - Saturday, 9:00 AM - 9:00 PM IST</p>
                                        <p><strong>Phone Support:</strong> Monday - Friday, 9:00 AM - 6:00 PM IST</p>
                                        <p className="text-sm text-slate-500 mt-4">
                                            * Premium and Enterprise customers receive priority 24/7 support
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
