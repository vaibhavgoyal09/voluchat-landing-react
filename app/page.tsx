import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PainPoints from "@/components/PainPoints";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is VoluChat safe for my Instagram account?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! VoluChat is built using official Meta APIs and follows all Instagram and WhatsApp guidelines. We prioritize account safety and compliance."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need technical knowledge to set this up?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Not at all. We provide done-for-you onboarding with a 30-minute call to help you set everything up. Our pre-built templates make it easy to get started without any technical skills."
        }
      },
      {
        "@type": "Question",
        "name": "Which languages do you support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "VoluChat supports Hindi and major regional Indian languages including Tamil, Telugu, Kannada, Malayalam, Bengali, Marathi, and Gujarati. Our AI understands context and replies naturally in the customer's preferred language."
        }
      },
      {
        "@type": "Question",
        "name": "Is it really free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! During our Early Beta period, you get full access to all VoluChat features completely free of charge. We want you to experience the power of automation without any barriers."
        }
      }
    ]
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <Hero />
      <PainPoints />
      <Features />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}
