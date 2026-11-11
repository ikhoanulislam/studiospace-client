
import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StudioSpace | Creative Spaces, Endless Possibilities",
  description:
    "Discover and book inspiring creative studios, photography spaces, podcast rooms, and production studios.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <Providers>
          <Suspense fallback={<div className="h-20" />}>
            <Navbar />
          </Suspense>

          <main className="min-h-screen">{children}</main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
