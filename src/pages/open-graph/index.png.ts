import type { APIRoute } from "astro";
import { createOgImage } from "../../lib/og";

export const prerender = false;

export const GET: APIRoute = async () => {
  const image = await createOgImage({
    title: "VoluChat — AI WhatsApp Sales Agent for Fashion Boutiques",
    description:
      "Autonomous AI sales agent on WhatsApp for fashion boutiques. Automates Reel comment-to-DM, answers sizing questions, and closes UPI checkouts 24/7.",
  });

  return new Response(image, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
    },
  });
};
