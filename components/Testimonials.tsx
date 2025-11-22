"use client";

import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "motion/react";

const testimonials = [
    {
        text: "We used to miss DMs every evening. With VoluChat, replies go out instantly and we closed 30% more orders last month.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        name: "Priya Sharma",
        role: "@priyasjewels · Handmade jewelry",
    },
    {
        text: "The Hindi replies are perfect! Our customers feel more comfortable and actually respond faster now.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        name: "Rahul Verma",
        role: "@fashionstreet.in · Fashion boutique",
    },
    {
        text: "Setting up automation was so easy. Now I can focus on making products instead of replying to the same questions.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        name: "Sneha Patel",
        role: "@glowbysneha · D2C skincare",
    },
    {
        text: "VoluChat helped us scale from 50 to 200 orders per month. The WhatsApp funnel is a game-changer.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
        name: "Arjun Mehta",
        role: "@artisanfoods · Homemade snacks",
    },
    {
        text: "Best investment for our Instagram business. The AI understands context and never sounds robotic.",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
        name: "Ananya Singh",
        role: "@homedecor.in · Home décor",
    },
    {
        text: "Our response time went from 3 hours to instant. Customers love the quick replies in their language.",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
        name: "Vikram Reddy",
        role: "@vikramwatches · Accessories",
    },
    {
        text: "The analytics dashboard shows exactly which products get the most inquiries. Super helpful for inventory planning.",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
        name: "Kavya Iyer",
        role: "@kavyascrafts · Handmade crafts",
    },
    {
        text: "VoluChat's support team helped us set everything up in 30 minutes. We were live the same day!",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
        name: "Rohan Gupta",
        role: "@fitnessgear.in · Fitness products",
    },
    {
        text: "The pre-built templates for COD and size queries saved us so much time. Highly recommend!",
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop",
        name: "Meera Nair",
        role: "@meerasfashion · Ethnic wear",
    },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export default function Testimonials() {
    return (
        <section id="testimonials" className="section-spacing relative">
            <div className="container-padding z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center justify-center max-w-3xl mx-auto"
                >
                    <div className="flex justify-center">
                        <div className="inline-block px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-semibold uppercase tracking-wide">
                            Testimonials
                        </div>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-5 text-slate-900">
                        Loved by Indian Sellers
                    </h2>
                    <p className="text-center mt-5 text-slate-600 text-lg">
                        See what our customers have to say about us.
                    </p>
                </motion.div>

                <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
                    <TestimonialsColumn testimonials={firstColumn} duration={15} />
                    <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
                    <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
                </div>
            </div>
        </section>
    );
}
