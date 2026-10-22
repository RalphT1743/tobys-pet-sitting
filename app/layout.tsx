import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tobypetsitting.com"),
  title: "Toby’s Pet Sitting | Personal Pet Care in South Bay",
  description:
    "Personal pet sitting, overnight care, dog baths, and pet transportation from Toby’s Pet Sitting in South Bay, California.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Toby’s Pet Sitting",
    title: "Toby’s Pet Sitting | Personal Pet Care in South Bay",
    description:
      "Personal pet sitting, overnight care, dog baths, and pet transportation from Toby’s Pet Sitting in South Bay, California.",
  },
  twitter: {
    card: "summary",
    title: "Toby’s Pet Sitting | Personal Pet Care in South Bay",
    description:
      "Personal pet sitting, overnight care, dog baths, and pet transportation from Toby’s Pet Sitting in South Bay, California.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
