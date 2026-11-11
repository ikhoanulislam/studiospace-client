

"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  Aperture,
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  XCircle,
  Loader2,
} from "lucide-react";

const API_URL = "http://localhost:5002";

interface Application {
  _id: string;
  fullName: string;
  phone: string;
  location: string;
  studioType: string;
  experience: string;
  message: string;
  status: "pending" | "approved" | "rejected";
  adminNote?: string;
  createdAt: string;
}

const initialForm = {
  fullName: "",
  phone: "",
  location: "",
  studioType: "",
  experience: "",
  message: "",
};

const inputClass =
  "w-full rounded-xl border border-[#E9E2D9] bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#F15A3B] dark:border-gray-700 dark:bg-[#0B1220] dark:text-white dark:placeholder:text-gray-500";

const labelClass =
  "mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200";

export default function HostApplicationPage() {
  const [form, setForm] = useState(initialForm);
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    let active = true;

    const loadApplication = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/host/application`,
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          }
        );

        if (response.status === 401) {
          if (active) setIsLoggedIn(false);
          return;
        }

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Unable to load application."
          );
        }

        if (!active) return;

        setIsLoggedIn(true);

        if (result.data) {
          setApplication(result.data);

          if (result.data.status === "rejected") {
            setForm({
              fullName: result.data.fullName || "",
              phone: result.data.phone || "",
              location: result.data.location || "",
              studioType: result.data.studioType || "",
              experience: result.data.experience || "",
              message: result.data.message || "",
            });
          }
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadApplication();

    return () => {
      active = false;
    };
  }, []);

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/host/apply`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (response.status === 401) {
        setIsLoggedIn(false);
        throw new Error(
          "Your session expired. Please log in again."
        );
      }

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Application submission failed."
        );
      }

      setApplication(result.data);
      setSuccess(
        "Your Host Application has been submitted successfully!"
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to submit application."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F5F0] dark:bg-gray-950">
        <div className="text-center">
          <Loader2
            size={36}
            className="mx-auto animate-spin text-[#F15A3B]"
          />
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Loading Host Application...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F5F0] px-5 py-12 transition-colors dark:bg-gray-950 md:py-16">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#666] transition hover:text-[#F15A3B] dark:text-gray-400"
        >
          <ArrowLeft size={17} />
          Back to Home
        </Link>

        <div className="mb-9 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FCE8E2] text-[#F15A3B] dark:bg-orange-500/10">
            <Aperture size={30} />
          </div>

          <p className="mt-5 text-xs font-bold uppercase tracking-[0.25em] text-[#F15A3B]">
            Join Our Community
          </p>

          <h1 className="mt-3 font-serif text-4xl font-bold text-[#171717] dark:text-white md:text-5xl">
            Become a Host
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#77716A] dark:text-gray-400">
            Share your creative space with the world. Apply to become a
            StudioSpace host and connect with creators.
          </p>
        </div>

        {!isLoggedIn ? (
          <section className="rounded-3xl border border-[#E9E2D9] bg-white p-8 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900 md:p-12">
            <ShieldCheck
              size={45}
              className="mx-auto text-[#F15A3B]"
            />

            <h2 className="mt-5 text-2xl font-bold text-gray-900 dark:text-white">
              Login Required
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-500 dark:text-gray-400">
              Please log in to your StudioSpace account before applying
              to become a host.
            </p>

            <Link
              href="/login"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#171717] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#F15A3B] dark:bg-orange-600 dark:hover:bg-orange-700"
            >
              Log In to Continue
              <ArrowRight size={17} />
            </Link>

            <p className="mt-5 text-sm text-gray-500 dark:text-gray-400">
              New to StudioSpace?{" "}
              <Link
                href="/signup"
                className="font-semibold text-[#F15A3B] hover:underline"
              >
                Create an Account
              </Link>
            </p>
          </section>
        ) : application && application.status !== "rejected" ? (
          <section className="rounded-3xl border border-[#E9E2D9] bg-white p-8 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900 md:p-12">
            {application.status === "pending" ? (
              <Clock
                size={55}
                className="mx-auto text-amber-500"
              />
            ) : (
              <CheckCircle2
                size={55}
                className="mx-auto text-green-600"
              />
            )}

            <h2 className="mt-5 text-2xl font-bold text-gray-900 dark:text-white">
              {application.status === "pending"
                ? "Application Under Review"
                : "Application Approved!"}
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-500 dark:text-gray-400">
              {application.status === "pending"
                ? "Thank you for applying. Our team is reviewing your application. We will update your status after review."
                : "Congratulations! Your host application has been approved. Further host account activation will follow."}
            </p>

            <div className="mt-7 rounded-2xl bg-[#F7F5F0] p-5 text-left dark:bg-gray-800">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Application Details
              </p>

              <p className="mt-3 font-semibold text-gray-900 dark:text-white">
                {application.fullName}
              </p>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {application.studioType}
              </p>

              <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                Status:{" "}
                <span className="font-bold capitalize text-[#F15A3B]">
                  {application.status}
                </span>
              </p>

              {application.adminNote && (
                <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                  Admin Note: {application.adminNote}
                </p>
              )}
            </div>

            <Link
              href="/"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#171717] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#F15A3B] dark:bg-orange-600"
            >
              Back to Home
              <ArrowRight size={17} />
            </Link>
          </section>
        ) : (
          <section className="rounded-3xl border border-[#E9E2D9] bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:p-10">
            {application?.status === "rejected" && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/30">
                <div className="flex items-center gap-2 font-bold text-red-700 dark:text-red-400">
                  <XCircle size={19} />
                  Previous Application Rejected
                </div>

                <p className="mt-2 text-sm text-red-600 dark:text-red-300">
                  You can update your information and submit a new application.
                </p>

                {application.adminNote && (
                  <p className="mt-2 text-sm text-red-700 dark:text-red-300">
                    Admin Note: {application.adminNote}
                  </p>
                )}
              </div>
            )}

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Host Application Form
              </h2>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Fill in the details below to submit your application.
              </p>
            </div>

            {error && (
              <div
                role="alert"
                className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300"
              >
                {error}
              </div>
            )}

            {success && (
              <div
                role="status"
                className="mb-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700 dark:border-green-900 dark:bg-green-950/30 dark:text-green-300"
              >
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className={labelClass}>
                  Full Name *
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  placeholder="Enter your full name"
                  className={inputClass}
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className={labelClass}>
                    <span className="inline-flex items-center gap-2">
                      <Phone size={15} />
                      Phone Number *
                    </span>
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    maxLength={20}
                    placeholder="+8801XXXXXXXXX"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    <span className="inline-flex items-center gap-2">
                      <MapPin size={15} />
                      Location *
                    </span>
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    required
                    maxLength={200}
                    placeholder="City, District"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  <span className="inline-flex items-center gap-2">
                    <Building2 size={16} />
                    Studio Type *
                  </span>
                </label>

                <select
                  name="studioType"
                  value={form.studioType}
                  onChange={handleChange}
                  required
                  className={inputClass}
                >
                  <option value="">Select your studio type</option>
                  <option value="Photography Studio">Photography Studio</option>
                  <option value="Video Production Studio">Video Production Studio</option>
                  <option value="Music Studio">Music Studio</option>
                  <option value="Podcast Studio">Podcast Studio</option>
                  <option value="Dance Studio">Dance Studio</option>
                  <option value="Creative Workspace">Creative Workspace</option>
                  <option value="Event Space">Event Space</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>
                  Hosting Experience *
                </label>

                <select
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  required
                  className={inputClass}
                >
                  <option value="">Select your experience</option>
                  <option value="No experience">No experience</option>
                  <option value="Less than 1 year">Less than 1 year</option>
                  <option value="1-3 years">1-3 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="More than 5 years">More than 5 years</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>
                  Tell Us About Your Studio *
                </label>

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  maxLength={2000}
                  rows={5}
                  placeholder="Describe your studio, facilities, equipment and what makes it special..."
                  className={`${inputClass} resize-y leading-7`}
                />
              </div>

              <div className="rounded-xl bg-[#F7F5F0] p-4 dark:bg-gray-800">
                <p className="text-xs leading-6 text-[#77716A] dark:text-gray-400">
                  By submitting this application, you agree that StudioSpace
                  may review your information. Your host account will only
                  be activated after approval and the subsequent activation
                  process.
                </p>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#171717] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#F15A3B] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-orange-600 dark:hover:bg-orange-700"
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Submitting Application...
                  </>
                ) : (
                  <>
                    Submit Host Application
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          </section>
        )}
      </div>
    </main>
  );
}
