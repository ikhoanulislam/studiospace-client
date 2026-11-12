
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  Send,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "For general questions and support.",
    detail: "Email information coming soon",
  },
  {
    icon: MessageCircle,
    title: "General Support",
    description: "Need help using StudioSpace?",
    detail: "We're here to help.",
  },
  {
    icon: MapPin,
    title: "Our Location",
    description: "Made for creative minds.",
    detail: "Bangladesh",
  },
];

const faqs = [
  {
    question: "How can I book a studio?",
    answer:
      "Explore available studios, choose your preferred space, and follow the booking process on its details page.",
  },
  {
    question: "Can I list my own studio?",
    answer:
      "Yes! You can get started by choosing the Become a Host option on StudioSpace.",
  },
  {
    question: "How can I get support?",
    answer:
      "You can reach out through our contact form. Send us a message and our team can review your inquiry.",
  },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsSubmitting(true);
    setStatus(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const contactData = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to submit your message."
        );
      }

      setStatus({
        type: "success",
        message: "Your message has been submitted successfully!",
      });

      form.reset();
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F5F0] text-[#171717] transition-colors duration-300 dark:bg-[#11151F] dark:text-gray-100">
      {/* Hero */}
      <section className="px-5 py-20 text-center md:py-28">
        <div className="mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E9DCD3] bg-white px-4 py-2 dark:border-gray-700 dark:bg-[#1C2431]">
            <MessageCircle size={15} className="text-[#F15A3B]" />
            <span className="text-xs font-semibold tracking-wide text-[#6C625C] dark:text-gray-300">
              WE WOULD LOVE TO HEAR FROM YOU
            </span>
          </div>

          <h1 className="mt-7 font-serif text-5xl font-bold md:text-6xl">
            Let&apos;s Start a{" "}
            <span className="text-[#F15A3B]">Conversation.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#77716B] dark:text-gray-400 md:text-lg">
            Have a question, need assistance, or want to work with us?
            We&apos;re always happy to connect with creative minds.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="mx-auto max-w-[1200px] px-5 pb-20 md:px-10">
        <div className="grid gap-5 md:grid-cols-3">
          {contactMethods.map((method) => {
            const Icon = method.icon;

            return (
              <div
                key={method.title}
                className="rounded-3xl border border-[#E9E2D9] bg-white p-7 transition-all hover:-translate-y-1 hover:border-[#F15A3B] hover:shadow-lg dark:border-gray-700 dark:bg-[#1C2431]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FCE8E2] text-[#F15A3B]">
                  <Icon size={23} />
                </div>

                <h2 className="mt-6 text-xl font-bold">
                  {method.title}
                </h2>

                <p className="mt-2 text-sm text-[#88817A] dark:text-gray-400">
                  {method.description}
                </p>

                <p className="mt-5 text-sm font-semibold text-[#F15A3B]">
                  {method.detail}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-white py-20 transition-colors duration-300 dark:bg-[#171E2A] md:py-28">
        <div className="mx-auto grid max-w-[1200px] gap-14 px-5 md:px-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F15A3B]">
              GET IN TOUCH
            </p>

            <h2 className="mt-4 font-serif text-4xl font-bold md:text-5xl">
              Send Us a <span className="text-[#F15A3B]">Message.</span>
            </h2>

            <p className="mt-6 max-w-md leading-8 text-[#77716B] dark:text-gray-400">
              Whether you&apos;re a creator looking for a studio or an owner
              interested in joining our platform, we&apos;d love to hear from
              you.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FCE8E2] text-[#F15A3B]">
                  <Mail size={21} />
                </div>

                <div>
                  <p className="font-semibold">Email Support</p>
                  <p className="mt-1 text-sm text-[#88817A] dark:text-gray-400">
                    Contact details coming soon
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FCE8E2] text-[#F15A3B]">
                  <Clock size={21} />
                </div>

                <div>
                  <p className="font-semibold">Availability</p>
                  <p className="mt-1 text-sm text-[#88817A] dark:text-gray-400">
                    We&apos;re building our support experience.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl border border-[#E9E2D9] bg-[#F7F5F0] p-6 dark:border-gray-700 dark:bg-[#202938] md:p-9">
            <h3 className="text-2xl font-bold">Send a Message</h3>

            <p className="mt-2 text-sm text-[#88817A] dark:text-gray-400">
              Fill in the details below.
            </p>

            <form
              className="mt-8 space-y-5"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold"
                >
                  Your Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  required
                  maxLength={100}
                  className="w-full rounded-xl border border-[#E5DED5] bg-white px-4 py-3 text-sm text-[#171717] outline-none transition placeholder:text-gray-400 focus:border-[#F15A3B] dark:border-gray-600 dark:bg-[#111827] dark:text-gray-100 dark:placeholder:text-gray-500"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  maxLength={150}
                  className="w-full rounded-xl border border-[#E5DED5] bg-white px-4 py-3 text-sm text-[#171717] outline-none transition placeholder:text-gray-400 focus:border-[#F15A3B] dark:border-gray-600 dark:bg-[#111827] dark:text-gray-100 dark:placeholder:text-gray-500"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-semibold"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="What is this about?"
                  required
                  maxLength={200}
                  className="w-full rounded-xl border border-[#E5DED5] bg-white px-4 py-3 text-sm text-[#171717] outline-none transition placeholder:text-gray-400 focus:border-[#F15A3B] dark:border-gray-600 dark:bg-[#111827] dark:text-gray-100 dark:placeholder:text-gray-500"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold"
                >
                  Your Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Write your message here..."
                  required
                  maxLength={3000}
                  className="w-full resize-none rounded-xl border border-[#E5DED5] bg-white px-4 py-3 text-sm text-[#171717] outline-none transition placeholder:text-gray-400 focus:border-[#F15A3B] dark:border-gray-600 dark:bg-[#111827] dark:text-gray-100 dark:placeholder:text-gray-500"
                />
              </div>

              {/* Status Message */}
              {status && (
                <div
                  role="status"
                  className={`rounded-xl px-4 py-3 text-sm font-medium ${
                    status.type === "success"
                      ? "border border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/40 dark:text-green-300"
                      : "border border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300"
                  }`}
                >
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#F15A3B] px-6 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-1 hover:bg-[#D94A30] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={17} />
              </button>

              <p className="text-center text-xs text-[#99918A] dark:text-gray-500">
                Your message will be securely saved in our database.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-[1000px] px-5 py-20 md:py-28">
        <div className="mb-12 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F15A3B]">
            NEED HELP?
          </p>

          <h2 className="mt-4 font-serif text-4xl font-bold md:text-5xl">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-[#E9E2D9] bg-white p-6 dark:border-gray-700 dark:bg-[#1C2431]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                {faq.question}

                <ArrowUpRight
                  size={19}
                  className="shrink-0 text-[#F15A3B] transition-transform group-open:rotate-45"
                />
              </summary>

              <p className="mt-4 text-sm leading-7 text-[#77716B] dark:text-gray-400">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-14 text-center">
          <p className="text-[#77716B] dark:text-gray-400">
            Want to explore creative spaces?
          </p>

          <Link
            href="/studios"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#171717] px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#F15A3B] dark:bg-white dark:text-[#171717] dark:hover:bg-[#F15A3B] dark:hover:text-white"
          >
            Explore Studios
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
