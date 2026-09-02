import type { APIRoute } from "astro";
import { createOgImage } from "../../lib/og";
import { fetchBlogPostBySlug, getBlogApiBaseUrl } from "../../lib/blogApi.mjs";

export const prerender = false;

// Predefined metadata mapping for core static pages
const STATIC_PAGE_META: Record<string, { title: string; description: string }> = {
  features: {
    title: "VoluChat Features — WhatsApp AI Sales Agent for Fashion Boutiques",
    description:
      "Explore VoluChat features: Instagram comment-to-DM, AI sizing stylist, 1-click UPI checkout, and 24/7 WhatsApp sales automation for clothing boutiques.",
  },
  pricing: {
    title: "VoluChat Pricing — 30-Day Free Trial & Done-For-You Setup",
    description:
      "Claim a 30-day free trial of VoluChat with 100% done-for-you setup for fashion boutiques. Includes live Shopify catalog sync, sizing qualification, and WhatsApp UPI checkout.",
  },
  "free-trial": {
    title: "Claim 30-Day Free Trial | VoluChat AI WhatsApp Sales Stylist",
    description:
      "Get 30 days absolutely free with 100% white-glove setup. Full access to VoluChat's autonomous AI sales stylist, sizing intelligence, and in-chat UPI checkout.",
  },
  compare: {
    title: "VoluChat vs Wati, Manychat & Manual Reps — Honest Comparison",
    description:
      "See how VoluChat's autonomous AI sales stylist compares to traditional flowchart chatbots (Wati, Interakt), link-pushers (ManyChat), and manual sales reps.",
  },
  "compare/wati": {
    title: "VoluChat vs Wati — AI Stylist vs WhatsApp Flowchart Bot",
    description:
      "Compare VoluChat's AI sales stylist with Wati's flowchart bot. See why natural AI conversation closes more fashion and boutique orders.",
  },
  "compare/manychat": {
    title: "VoluChat vs Manychat — AI Stylist vs Social Keyword Bot",
    description:
      "Compare VoluChat's in-chat WhatsApp sales agent with Manychat's external link-pusher. See why in-chat checkout converts 3x better for fashion boutiques.",
  },
  "compare/interakt": {
    title: "VoluChat vs Interakt — Autonomous AI Sales vs Shared Inbox",
    description:
      "Compare VoluChat's autonomous AI sales closer with Interakt's manual shared inbox. Automated sizing qualification and in-chat UPI.",
  },
  "compare/bik": {
    title: "VoluChat vs Bik.ai — Autonomous AI Sales Stylist vs WhatsApp Marketing Platform",
    description:
      "Compare VoluChat with Bik.ai. Autonomous sizing qualification and in-chat 1-click UPI checkout convert 3x more boutique shoppers.",
  },
  "compare/limechat": {
    title: "VoluChat vs Limechat — Boutique AI Closer vs Enterprise Bot Platform",
    description:
      "Compare VoluChat with Limechat. Done-for-you setup, specialized sizing intelligence, and in-chat UPI checkout.",
  },
  "compare/manual-reps": {
    title: "VoluChat vs Manual Sales Reps — Hiring Chat Staff vs AI Closer",
    description:
      "Compare hiring full-time chat reps with VoluChat's autonomous AI sales stylist for WhatsApp and Instagram. 24/7 availability, zero churn.",
  },
  about: {
    title: "About VoluChat — Built for Fashion & Clothing Boutiques",
    description:
      "Why we built VoluChat — autonomous WhatsApp and Instagram sales agent that closes orders, recommends sizes, and collects UPI payments 24/7.",
  },
  contact: {
    title: "Contact VoluChat — Direct Founder & Support Desk",
    description:
      "Get in touch with the VoluChat team. Direct WhatsApp founder line, email support, and pilot store intake.",
  },
  glossary: {
    title: "E-Commerce & WhatsApp Sales Glossary | VoluChat",
    description:
      "Key terms for WhatsApp & Instagram sales automation: comment-to-DM, sizing AI, cart recovery, and in-chat UPI checkout defined.",
  },
  security: {
    title: "Security & Brand Guardrails | VoluChat AI Sales",
    description:
      "Official Meta APIs, margin floors, zero out-of-stock selling, and instant human escalation on WhatsApp.",
  },
  privacy: {
    title: "Privacy Policy | VoluChat",
    description:
      "VoluChat privacy policy for autonomous WhatsApp and Instagram sales agents, Shopify catalog syncing, and conversation data.",
  },
  terms: {
    title: "Terms & Conditions | VoluChat",
    description:
      "VoluChat terms and conditions for autonomous WhatsApp and Instagram sales automation and conversational checkout workflows.",
  },
  "what-is/comment-to-DM-automation": {
    title: "What is Comment-to-DM Automation? | VoluChat Guide",
    description:
      "Learn how comment-to-DM automation instantly turns Instagram Reel comments into direct sales conversations with pricing, stock checks, and checkout.",
  },
  "what-is/whatsapp-sales-bot": {
    title: "What is a WhatsApp Sales Bot? | E-Commerce Guide",
    description:
      "What is a WhatsApp sales bot? Learn how AI sales agents qualify buyers, handle sizing, recommend upsells, and close orders in WhatsApp chats.",
  },
  "what-is/in-chat-upi-checkout": {
    title: "What is In-Chat UPI Checkout on WhatsApp? | VoluChat Guide",
    description:
      "Learn how in-chat UPI checkout lets customers pay via GPay, PhonePe, and Paytm directly inside WhatsApp DMs — zero website drop-offs.",
  },
  "what-is/whatsapp-cart-recovery": {
    title: "What is WhatsApp Cart Recovery for Fashion Boutiques? | VoluChat",
    description:
      "How WhatsApp cart recovery helps fashion stores recover 35%+ of abandoned checkouts with personalized fit reassurance and 1-click UPI links.",
  },
  "integrations/shopify": {
    title: "Shopify Integration — WhatsApp AI Sales | VoluChat",
    description:
      "Connect Shopify to VoluChat for live variant stock checks, automated draft orders, and delivery pincode validation inside WhatsApp chats.",
  },
  "integrations/razorpay": {
    title: "Razorpay WhatsApp Integration — Instant UPI Checkout | VoluChat",
    description:
      "Connect Razorpay with VoluChat to collect 1-click UPI payments (GPay, PhonePe, Paytm) inside WhatsApp DMs with instant webhook verification.",
  },
  "integrations/cashfree": {
    title: "Cashfree Payments WhatsApp Integration — Instant UPI | VoluChat",
    description:
      "Connect Cashfree Payments with VoluChat to generate instant UPI deep-links, verify payments in WhatsApp, and auto-sync paid orders to Shopify.",
  },
  "blog/index": {
    title: "VoluChat Blog | WhatsApp & Instagram Sales Guides",
    description:
      "Guides on WhatsApp and Instagram DM e-commerce automation: upsells, cross-sells, cart recovery, in-chat checkout, and D2C sales strategies.",
  },
};

export const GET: APIRoute = async ({ params, url }) => {
  let route = params.route || "";
  // Strip trailing slashes or extensions if any
  route = route.replace(/\.(png|jpg|jpeg|webp)$/, "").replace(/^\/+|\/+$/g, "");

  let title = "VoluChat — AI WhatsApp Sales Agent";
  let description =
    "Autonomous AI sales agent on WhatsApp for fashion boutiques. Automates Reel comment-to-DM, answers sizing questions, and closes UPI checkouts 24/7.";

  // Check query parameters first for ad-hoc custom titles/descriptions
  const customTitle = url.searchParams.get("title");
  const customDescription = url.searchParams.get("description");

  if (customTitle) {
    title = customTitle;
    if (customDescription) description = customDescription;
  } else if (STATIC_PAGE_META[route]) {
    title = STATIC_PAGE_META[route].title;
    description = STATIC_PAGE_META[route].description;
  } else if (route.startsWith("blog/")) {
    const slug = route.replace(/^blog\//, "");
    try {
      const apiUrl = getBlogApiBaseUrl();
      const blog = await fetchBlogPostBySlug(slug, { baseUrl: apiUrl });
      if (blog) {
        title = blog.seoTitle || blog.title;
        description = blog.seoDescription || blog.excerpt;
      } else {
        title = `${slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} | VoluChat Blog`;
      }
    } catch {
      title = `${slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} | VoluChat Blog`;
    }
  } else if (route) {
    title = `${route.split("/").pop()?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} | VoluChat`;
  }

  const image = await createOgImage({
    title,
    description,
  });

  return new Response(image, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
    },
  });
};
