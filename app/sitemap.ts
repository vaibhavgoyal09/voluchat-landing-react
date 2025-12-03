import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://voluchat.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          'en': baseUrl,
          'es': `${baseUrl}/es`,
          'fr': `${baseUrl}/fr`,
          'de': `${baseUrl}/de`,
          'hi': `${baseUrl}/hi`,
        },
      },
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          'en': `${baseUrl}/about`,
          'es': `${baseUrl}/es/about`,
          'fr': `${baseUrl}/fr/about`,
          'de': `${baseUrl}/de/about`,
          'hi': `${baseUrl}/hi/about`,
        },
      },
    },
    {
      url: `${baseUrl}/features`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          'en': `${baseUrl}/features`,
          'es': `${baseUrl}/es/features`,
          'fr': `${baseUrl}/fr/features`,
          'de': `${baseUrl}/de/features`,
          'hi': `${baseUrl}/hi/features`,
        },
      },
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          'en': `${baseUrl}/pricing`,
          'es': `${baseUrl}/es/pricing`,
          'fr': `${baseUrl}/fr/pricing`,
          'de': `${baseUrl}/de/pricing`,
          'hi': `${baseUrl}/hi/pricing`,
        },
      },
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          'en': `${baseUrl}/contact`,
          'es': `${baseUrl}/es/contact`,
          'fr': `${baseUrl}/fr/contact`,
          'de': `${baseUrl}/de/contact`,
          'hi': `${baseUrl}/hi/contact`,
        },
      },
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
      alternates: {
        languages: {
          'en': `${baseUrl}/privacy`,
          'es': `${baseUrl}/es/privacy`,
          'fr': `${baseUrl}/fr/privacy`,
          'de': `${baseUrl}/de/privacy`,
          'hi': `${baseUrl}/hi/privacy`,
        },
      },
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
      alternates: {
        languages: {
          'en': `${baseUrl}/terms`,
          'es': `${baseUrl}/es/terms`,
          'fr': `${baseUrl}/fr/terms`,
          'de': `${baseUrl}/de/terms`,
          'hi': `${baseUrl}/hi/terms`,
        },
      },
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          'en': `${baseUrl}/login`,
          'es': `${baseUrl}/es/login`,
          'fr': `${baseUrl}/fr/login`,
          'de': `${baseUrl}/de/login`,
          'hi': `${baseUrl}/hi/login`,
        },
      },
    },
    {
      url: `${baseUrl}/start`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          'en': `${baseUrl}/start`,
          'es': `${baseUrl}/es/start`,
          'fr': `${baseUrl}/fr/start`,
          'de': `${baseUrl}/de/start`,
          'hi': `${baseUrl}/hi/start`,
        },
      },
    },
  ];
}
