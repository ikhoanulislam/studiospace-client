
"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import {
  Aperture,
  ArrowUpRight,
  Camera,
  Film,
  Mic2,
  MapPin,
  Mail,
  Send,
  CheckCircle2,
} from "lucide-react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/studios" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const categories = [
  { name: "Photography Studios", icon: Camera },
  { name: "Film & Production", icon: Film },
  { name: "Podcast Rooms", icon: Mic2 },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleNewsletterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) return;

    setMessage("Thank you for your interest in StudioSpace!");
    setEmail("");
  }

  return (
    <footer className="bg-[#171717] text-white">
      <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-16 md:px-10 md:pt-20 lg:px-16">
        <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F15A3B]">
                <Aperture size={25} />
              </div>

              <span className="font-serif text-2xl font-bold">
                Studio<span className="text-[#F15A3B]">Space.</span>
              </span>
            </Link>

            <p className="mt-6 max-w-xs text-sm leading-7 text-white/55">
              Discover inspiring creative spaces and connect with the perfect
              studio for your next big idea. Your space, your creativity, your
              story.
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm text-white/60">
              <MapPin size={16} className="text-[#F15A3B]" />
              <span>Made for Creative Minds</span>
            </div>

            {/* Social Media */}
            <h3 className="mt-8 text-sm font-bold uppercase tracking-widest">
              Follow Us
            </h3>

            <div className="mt-4 flex items-center gap-3">

              {/* Instagram */}
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:-translate-y-1 hover:border-[#F15A3B] hover:bg-[#F15A3B] hover:text-white"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:-translate-y-1 hover:border-[#F15A3B] hover:bg-[#F15A3B] hover:text-white"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.8v8h3.4Z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:-translate-y-1 hover:border-[#F15A3B] hover:bg-[#F15A3B] hover:text-white"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M5.2 3.5a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6ZM3.6 8.5h3.2V20H3.6V8.5Zm5.3 0H12v1.6h.1a3.6 3.6 0 0 1 3.2-1.8c3.4 0 4 2.2 4 5V20h-3.2v-5.9c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V20H8.9V8.5Z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:-translate-y-1 hover:border-[#F15A3B] hover:bg-[#F15A3B] hover:text-white"
              >
                <svg viewBox="0 0 24 24" width="21" height="21" fill="currentColor">
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:-translate-y-1 hover:border-[#F15A3B] hover:bg-[#F15A3B] hover:text-white"
              >
                <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor">
                  <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-5-7.1L5.7 22H2.5l7.3-8.4L1.9 2h6.5l4.5 6.6L18.9 2Zm-1.1 18h1.7L7.4 3.9H5.6L17.8 20Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest">
              Quick Links
            </h3>

            <ul className="mt-6 space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/55 transition-colors hover:text-[#F15A3B]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest">
              Explore Categories
            </h3>

            <ul className="mt-6 space-y-4">
              {categories.map((category) => {
                const Icon = category.icon;

                return (
                  <li key={category.name}>
                    <Link
                      href="/studios"
                      className="flex items-center gap-3 text-sm text-white/55 transition-colors hover:text-[#F15A3B]"
                    >
                      <Icon size={17} />
                      {category.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest">
              Stay Inspired
            </h3>

            <p className="mt-6 text-sm leading-7 text-white/55">
              Get creative space inspiration and StudioSpace updates.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="mt-5">
              <label htmlFor="footer-email" className="sr-only">
                Email Address
              </label>

              <div className="flex overflow-hidden rounded-xl border border-white/15 bg-white/5 focus-within:border-[#F15A3B]">
                <input
                  id="footer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Your email address"
                  className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
                />

                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex items-center justify-center bg-[#F15A3B] px-4 transition hover:bg-[#D94A30]"
                >
                  <Send size={18} />
                </button>
              </div>

              {message && (
                <p className="mt-3 flex items-center gap-2 text-xs text-green-400">
                  <CheckCircle2 size={15} />
                  {message}
                </p>
              )}
            </form>

            <div className="mt-6 flex items-center gap-2 text-sm text-white/60">
              <Mail size={17} className="text-[#F15A3B]" />
              <span>Contact information coming soon</span>
            </div>

            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#F15A3B] transition-colors hover:text-white"
            >
              Contact Us
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-5 pt-8 text-center md:flex-row md:text-left">
          <p className="text-xs text-white/40">
            © 2026 StudioSpace. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-white/50">
            <Link href="/about" className="transition-colors hover:text-white">
              About Us
            </Link>

            <Link href="/contact" className="transition-colors hover:text-white">
              Contact
            </Link>

            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>

            <Link href="/terms" className="transition-colors hover:text-white">
              Terms & Conditions
            </Link>

            <Link href="/host/apply" className="transition-colors hover:text-white">
              Become a Host
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
