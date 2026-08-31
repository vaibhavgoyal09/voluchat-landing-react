const faqs = [
  {
    question: "How does VoluChat differ from Wati, Interakt, or ManyChat?",
    answer:
      "Traditional tools are rigid flowchart bots with robotic 'Press 1' buttons that frustrate buyers. VoluChat is an intelligent generative AI closer that understands natural human conversations, answers complex product sizing/fabric questions, checks live stock, and completes native checkouts.",
  },
  {
    question: "Do I need to give up my existing Shopify store?",
    answer:
      "No! VoluChat connects directly to your existing Shopify store. It reads your product catalog, syncs inventory levels, and creates official paid orders in real-time.",
  },
  {
    question: "How does the Instagram Comment-to-DM trigger work?",
    answer:
      "Whenever someone comments on your Instagram posts, Reels, or Meta ads (e.g. 'Price please', 'Is this available in Medium?'), VoluChat auto-replies in 2 seconds and sends a personalized DM with photos, price, and stock info.",
  },
  {
    question: "Can human sales reps intervene if needed?",
    answer:
      "Yes. Your team has full oversight. If a customer needs custom alterations, bespoke bridal ordering, or VIP assistance, any rep can jump in and take over the WhatsApp chat seamlessly.",
  },
  {
    question: "What is included in the 10-Store Pilot Program?",
    answer:
      "The VoluChat engineering team handles 100% of the technical heavy lifting: Meta API authorization, WhatsApp Business API setup, Shopify catalog syncing, and brand voice guardrail testing.",
  },
  {
    question: "How do payments work inside WhatsApp?",
    answer:
      "VoluChat pushes native WhatsApp catalog checkouts, instant 1-click UPI links (GPay, PhonePe, Paytm), and Razorpay/Cashfree payment links. Once paid, the order is automatically marked paid in your Shopify backend.",
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

