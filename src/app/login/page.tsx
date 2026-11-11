

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import { Loader2, LockKeyhole, Mail } from "lucide-react";

const API_URL = "http://localhost:5002";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    let active = true;

    const checkSession = async () => {
      try {
        const response = await fetch(`${API_URL}/api/auth/me`, {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        const result = await response.json();

        if (response.ok && result.data) {
          sessionStorage.setItem("user", JSON.stringify(result.data));

          if (active) {
            window.location.replace("/");
          }

          return;
        }
      } catch (error) {
        console.error("Session check error:", error);
      }

      if (active) {
        setCheckingSession(false);
      }
    };

    checkSession();

    return () => {
      active = false;
    };
  }, []);

  const completeLogin = (user: unknown) => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    }

    window.location.replace("/");
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setMessage(result.message || "Login failed.");
        return;
      }

      completeLogin(result.data);
    } catch (error) {
      console.error("Login Error:", error);
      setMessage("Cannot connect to server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async (credential: string) => {
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/google`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ credential }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setMessage(result.message || "Google Login failed.");
        return;
      }

      completeLogin(result.data);
    } catch (error) {
      console.error("Google Login Error:", error);
      setMessage("Google Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F5F0] text-gray-700 dark:bg-[#0A0F1C] dark:text-white">
        <div className="flex items-center gap-3">
          <Loader2 size={22} className="animate-spin text-orange-500" />
          Checking login session...
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F5F0] px-4 py-10 transition-colors dark:bg-[#0A0F1C]">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-xl dark:border-gray-800 dark:bg-[#111827]">
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="text-3xl font-bold text-[#171717] dark:text-white"
          >
            Studio<span className="text-orange-500">Space</span>
          </Link>

          <h1 className="mt-6 text-2xl font-bold text-[#171717] dark:text-white">
            Welcome Back!
          </h1>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Sign in to continue to StudioSpace.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                autoComplete="email"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-11 pr-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 dark:border-gray-700 dark:bg-[#0A0F1C] dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>

            <div className="relative">
              <LockKeyhole
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-11 pr-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 dark:border-gray-700 dark:bg-[#0A0F1C] dark:text-white"
              />
            </div>
          </div>

          {message && (
            <p
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-600 py-3 font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading && <Loader2 size={18} className="animate-spin" />}
            {isLoading ? "Signing in..." : "Login"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
          <span className="text-sm text-gray-500">OR</span>
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (credentialResponse.credential) {
                handleGoogleLogin(credentialResponse.credential);
              } else {
                setMessage("Google authentication failed.");
              }
            }}
            onError={() => {
              setMessage("Google Login failed. Please try again.");
            }}
            text="continue_with"
            theme="outline"
            shape="rectangular"
            width="320"
          />
        </div>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400"
          >
            Sign Up
          </Link>
        </p>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-gray-500 transition hover:text-orange-500 dark:hover:text-white"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
