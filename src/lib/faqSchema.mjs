const faqs = [
  {
    question: "How is VoluChat different from chatbot tools like Wati or ManyChat?",
    answer:
      "Rule-based tools rely on rigid button menus ('Press 1 for Price') and external links where shoppers drop off. VoluChat acts like a digital sales employee: it understands natural fashion conversations, advises on size & fit, checks real-time stock, generates 1-click UPI payment links, and answers parcel tracking queries directly in chat.",
  },
  {
    question: "What happens when the AI doesn't know an answer or a client needs custom styling?",
    answer:
      "The AI never invents answers. When an inquiry falls outside its rules—such as bespoke bridal alterations or bulk wedding orders—it immediately alerts you on WhatsApp with the complete chat history so you or your team can step in with 1 tap.",
  },
  {
    question: "Can I control pricing, discounts, and return policies?",
    answer:
      "Yes. Strict margin floors, maximum discount rules, and return/exchange policies (like your 7-day window and unboxing photo requirement) are set by you during onboarding. The AI cannot offer unauthorized discounts or violate your store rules.",
  },
  {
    question: "How does it sync with my store inventory and couriers?",
    answer:
      "VoluChat syncs directly with Shopify or your product catalog to check live variant stock before confirming availability. It also integrates with couriers like Delhivery and Shiprocket to provide instant live parcel tracking when customers ask 'Where is my order?'",
  },
  {
    question: "How does setup work and how quickly can we launch?",
    answer:
      "We provide white-glove onboarding in under 48 hours. Our team connects your Instagram, WhatsApp Business API, catalog, and courier preferences directly with you—zero coding or technical headache required.",
  },
];

export function getFaqSchema(additionalFaqs = []) {
  const allFaqs = [...faqs, ...additionalFaqs];
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export { faqs };
