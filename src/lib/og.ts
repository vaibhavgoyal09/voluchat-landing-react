import { generateOpenGraphImage } from "astro-og-canvas";
import path from "node:path";

export interface OgImageOptions {
  title: string;
  description?: string;
  logo?: boolean;
}

export async function createOgImage({
  title,
  description = "Turn Instagram DMs and WhatsApp chats into 24/7 automated revenue for fashion boutiques.",
  logo = true,
}: OgImageOptions): Promise<Buffer> {
  const logoPath = path.resolve("./public/android-chrome-192x192.png");

  return (await generateOpenGraphImage({
    title,
    description,
    bgGradient: [
      [6, 6, 10],
      [0, 0, 0],
    ],
    border: {
      color: [16, 185, 129], // Emerald #10b981
      width: 4,
      side: "inline-start",
    },
    padding: 70,
    font: {
      title: {
        color: [252, 253, 255],
        size: 50,
        lineHeight: 1.15,
        weight: "Bold",
      },
      description: {
        color: [161, 164, 165],
        size: 26,
        lineHeight: 1.4,
      },
    },
    logo: logo
      ? {
          path: logoPath,
          size: [72, 72],
        }
      : undefined,
    format: "PNG",
    quality: 90,
  })) as Buffer;
}
