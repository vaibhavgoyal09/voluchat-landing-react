const faqs = [
  {
    question: "Does VoluChat take actions automatically?",
    answer:
      "No. By default, VoluChat operates in a recommendation-only mode. It drafts the response or proposes the workflow action (like issuing a refund or recovering a cart), and waits for your team's approval.",
  },
  {
    question: "Do I need to replace my support team?",
    answer:
      "Not at all. VoluChat is built to empower lean teams, not replace them. It handles the repetitive, low-level inquiries and data-gathering so your team can focus on complex support issues and approvals.",
  },
  {
    question: "Is this only for Shopify stores?",
    answer:
      "Yes. We focus exclusively on Shopify to ensure our agents understand the nuances of its inventory, cart data, and historical orders deeply.",
  },
  {
    question: "What workflows can VoluChat help with first?",
    answer:
      "Common starting workflows include routing refund requests, answering order status and shipping delay questions, surfacing VIP escalations, and checking inventory availability.",
  },
  {
    question: "Can my team approve AI recommendations before anything happens?",
    answer:
      "Yes. VoluChat surfaces the right next step and shows the context behind the recommendation, keeping your team entirely in charge of approving important actions before they trigger.",
  },
  {
    question: "How much does VoluChat cost?",
    answer:
      "VoluChat uses closed, tailored pricing. We quote each store after reviewing catalog complexity, agent scope, integrations, expected workflow volume, guardrail requirements, and launch support needs.",
  },
];

export function getFaqSchema(pricingAnswer) {
  const answers = [...faqs];
  if (pricingAnswer !== undefined) {
    answers[answers.length - 1] = { ...answers[answers.length - 1], answer: pricingAnswer };
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: answers.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
