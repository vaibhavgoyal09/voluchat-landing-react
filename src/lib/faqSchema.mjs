const faqs = [
  {
    question: "How is VoluChat different from chatbot tools like Wati or ManyChat?",
    answer:
      "Rule-based tools push rigid button menus ('Press 1 for Price') and external website links where shoppers drop off. VoluChat acts like a digital team member: it understands fashion questions, checks live catalog inventory, qualifies sizing, generates secure UPI payment links, and answers order tracking queries directly in chat.",
  },
  {
    question: "Is this replacing my sales and support team?",
    answer:
      "No. It handles routine questions—size charts, fabric details, price queries, order status, and FAQs—freeing your team to focus on high-touch VIP clients, bespoke wedding customizations, and packing orders.",
  },
  {
    question: "What happens when the AI doesn't know the answer?",
    answer:
      "It doesn't invent an answer. When a question falls outside its configured knowledge or rules (like custom bridal alterations or bulk wholesale inquiries), it alerts your team on WhatsApp with the complete chat context for a smooth human takeover.",
  },
  {
    question: "Can I control discounts and commercial rules?",
    answer:
      "Yes. Strict margin rules and discount caps are set by you during onboarding. The AI cannot offer unapproved deals or negotiate below your profitability floors.",
  },
  {
    question: "Can it check my live inventory?",
    answer:
      "Yes. VoluChat syncs with Shopify or your boutique's product catalog to check variant stock in real-time before confirming availability, preventing out-of-stock orders.",
  },
  {
    question: "Can it track customer orders?",
    answer:
      "Yes. When customers message asking 'Where is my order?', VoluChat verifies their order number and returns live dispatch status, AWB tracking, and expected delivery milestones from courier partners like Delhivery and Shiprocket.",
  },
  {
    question: "Can customers request exchanges through it?",
    answer:
      "Yes. It checks your boutique's configured return window, verifies the order date, collects unboxing photos and preferred exchange sizes, and prepares a verified ticket for your staff.",
  },
  {
    question: "Can my team take over a conversation?",
    answer:
      "Yes. At any point, your team can reply in the chat on your existing WhatsApp Business app or dashboard; the AI pauses immediately and lets humans take over.",
  },
  {
    question: "Will it sound like my boutique?",
    answer:
      "Yes. During onboarding, we calibrate the AI's tone, greetings, and vocabulary to match your boutique's brand identity, whether that is warm & consultative or modern & minimalist.",
  },
  {
    question: "How does setup work?",
    answer:
      "We provide guided onboarding in under 48 hours. Our team connects your Instagram, WhatsApp Business API, catalog, and courier preferences with zero technical effort required from you.",
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
