import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://floridarelocationusa.com'),
  title: {
    default: "Florida Relocation USA - Your Complete Guide to Moving to Florida",
    template: "%s | Florida Relocation USA",
  },
  description: "The most comprehensive Florida relocation platform. Explore cities, neighborhoods, schools, and connect with local real estate experts. Your journey to Florida starts here.",
  keywords: [
    "Florida relocation",
    "moving to Florida",
    "Florida cities",
    "Florida neighborhoods",
    "Florida schools",
    "Florida real estate",
    "Florida cost of living",
    "retirement in Florida",
    "Florida communities",
  ],
  authors: [{ name: "Florida Relocation USA" }],
  creator: "Florida Relocation USA",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Florida Relocation USA",
    title: "Florida Relocation USA - Your Complete Guide to Moving to Florida",
    description: "The most comprehensive Florida relocation platform. Explore cities, neighborhoods, schools, and connect with local real estate experts.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Florida Relocation USA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Florida Relocation USA - Your Complete Guide to Moving to Florida",
    description: "The most comprehensive Florida relocation platform.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
      style={{ ['--font-sans' as string]: 'var(--font-geist-sans)', ['--font-heading' as string]: 'var(--font-playfair)' }}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
