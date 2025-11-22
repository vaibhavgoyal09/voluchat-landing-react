"use client";

import AutoScroll from "embla-carousel-auto-scroll";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";

interface Logo {
    id: string;
    name: string;
    className?: string;
}

interface ClientLogosProps {
    heading?: string;
    subheading?: string;
    logos?: Logo[];
    className?: string;
}

const ClientLogos = ({
    heading = "Trusted by 500+ Indian sellers",
    subheading = "From fashion to electronics, sellers across India are automating their Instagram DMs",
    logos = [
        { id: "1", name: "Meesho", className: "h-6 w-auto" },
        { id: "2", name: "Myntra", className: "h-6 w-auto" },
        { id: "3", name: "Flipkart", className: "h-6 w-auto" },
        { id: "4", name: "Instagram", className: "h-6 w-auto" },
        { id: "5", name: "WhatsApp Business", className: "h-6 w-auto" },
        { id: "6", name: "Shopify", className: "h-6 w-auto" },
        { id: "7", name: "Amazon", className: "h-6 w-auto" },
        { id: "8", name: "Nykaa", className: "h-6 w-auto" },
    ],
}: ClientLogosProps) => {
    return (
        <section className="py-12 lg:py-16">
            <div className="container flex flex-col items-center text-center">
                <p className="text-sm text-slate-600 font-medium mb-2">
                    {heading}
                </p>
                {subheading && (
                    <p className="text-xs text-slate-500 max-w-2xl">
                        {subheading}
                    </p>
                )}
            </div>
            <div className="pt-8 md:pt-10">
                <div className="relative mx-auto flex items-center justify-center lg:max-w-5xl">
                    <Carousel
                        opts={{ loop: true }}
                        plugins={[AutoScroll({ playOnInit: true, speed: 1 })]}
                    >
                        <CarouselContent className="ml-0">
                            {logos.map((logo) => (
                                <CarouselItem
                                    key={logo.id}
                                    className="flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
                                >
                                    <div className="mx-8 flex shrink-0 items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
                                        <div className="text-slate-400 font-semibold text-lg">
                                            {logo.name}
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                    <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none"></div>
                    <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none"></div>
                </div>
            </div>
        </section>
    );
};

export { ClientLogos };
