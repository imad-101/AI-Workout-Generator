import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Free AI Workout Generator Online - Highly Personalized Workouts",
  description:
    "Generate personalized AI-powered workout plans for free. Whether for weight loss, muscle gain, or endurance, get customized routines in seconds.",
  keywords:
    "AI workout generator, free workout plan, custom workouts, fitness AI, gym routine generator",
  authors: [
    {
      name: "Imad Uddin",
      url: "https://free-ai-workout-generator.vercel.app/",
    },
  ],
  robots: "index, follow",
  openGraph: {
    title: "AI Workout Generator - Free Personalized Workouts",
    description:
      "Get customized AI-generated workout routines for any fitness goal.",
    url: "https://free-ai-workout-generator.vercel.app/",
    siteName: "AI Workout Generator",
    images: [
      {
        url: "https://yourworkoutsite.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AI Workout Generator",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Workout Generator - Free Personalized Workouts",
    description:
      "Generate free, personalized AI-powered workout plans instantly.",
    images: ["https://yourworkoutsite.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://free-ai-workout-generator.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Your Name" />
      </head>
      <body className={`${inter.variable} antialiased bg-gray-900`}>
        <div className="container mx-auto px-4 md:px-24">
          <Header />
          <main>{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
