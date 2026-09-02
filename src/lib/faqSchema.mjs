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
    question: "What is included in the 30-Day Free Trial & Free Setup offer?",
    answer:
      "For the first 10 boutique stores, you get a full 30-day free trial with all VoluChat AI sales features unlocked and 100% free white-glove setup. Our founder and engineering team configure your Meta Cloud API, WhatsApp Business API, Shopify product catalog sync, size charts, and UPI checkout links with zero technical work needed from your side.",
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

