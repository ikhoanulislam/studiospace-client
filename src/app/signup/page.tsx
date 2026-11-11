
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Camera, Loader2 } from "lucide-react";

const API_URL = "http://localhost:5002";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Signup failed.");
      }

      setSuccess("Account created successfully! You can now log in.");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-[#E9E2D9] bg-[#F7F5F0] p-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#F15A3B] dark:border-gray-700 dark:bg-[#0B1220] dark:text-white dark:placeholder:text-gray-500";

  const labelClass =
    "mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F5F0] px-5 py-12 text-[#171717] transition-colors dark:bg-[#0A0F1C] dark:text-white">
      <div className="w-full max-w-md rounded-3xl border border-[#E9E2D9] bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-[#111827] md:p-10">
        <Link href="/" className="mb-8 flex items-center gap-2">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F15A3B] text-white">
            <Camera size={23} />
          </span>

          <span className="text-xl font-bold">
            Studio<span className="text-[#F15A3B]">Space.</span>
          </span>
        </Link>

        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F15A3B]">
          Join Our Community
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Create Account
        </h1>

        <p className="mt-3 text-sm text-[#88817A] dark:text-gray-400">
          Create your account and discover inspiring creative spaces.
        </p>

        <form onSubmit={handleSignup} className="mt-8 space-y-5">
          <div>
            <label className={labelClass}>
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              autoComplete="name"
              maxLength={100}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              autoComplete="new-password"
              minLength={6}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Confirm Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              autoComplete="new-password"
              minLength={6}
              required
              className={inputClass}
            />
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
            >
              {error}
            </p>
          )}

          {success && (
            <div
              role="status"
              className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-300"
            >
              {success}
              <Link
                href="/login"
                className="ml-1 font-bold underline"
              >
                Login now
              </Link>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#F15A3B] py-4 text-sm font-bold text-white transition hover:bg-[#DB472C] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-[#88817A] dark:text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-bold text-[#F15A3B] hover:underline"
          >
            Log in
          </Link>
        </p>

        <p className="mt-6 text-center text-xs text-gray-400 dark:text-gray-500">
          By creating an account, you agree to use StudioSpace responsibly.
        </p>
      </div>
    </main>
  );
}
