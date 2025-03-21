export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://free-ai-workout-generator.vercel.app/sitemap.xml",
  };
}
