

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User,
  Mail,
  CalendarDays,
  ArrowLeft,
  LogOut,
  Loader2,
  ShieldCheck,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

const API_URL = "http://localhost:5002";

type UserData = {
  id?: string;
  _id?: string;
  name?: string;
  email?: string;
  avatar?: string;
  role?: string;
  isHost?: boolean;
};

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState("");

  const loadProfile = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/auth/me`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      if (response.status === 401) {
        router.replace("/login");
        return;
      }

      const result = await response.json();

      if (!response.ok || !result.success || !result.data) {
        throw new Error(result.message || "Unable to load profile.");
      }

      setUser(result.data);
      sessionStorage.setItem("user", JSON.stringify(result.data));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load your profile."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed. Please try again.");
      }

      sessionStorage.removeItem("user");
      router.replace("/");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to logout."
      );
      setLoggingOut(false);
    }
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .filter(Boolean)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  const accountRole = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : user?.isHost
      ? "Host"
      : "Customer";

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F5F0] text-gray-600 dark:bg-gray-950 dark:text-gray-300">
        <div className="flex items-center gap-3">
          <Loader2 size={22} className="animate-spin" />
          Loading profile...
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F5F0] px-5 dark:bg-gray-950">
        <div className="max-w-md text-center">
          <AlertCircle
            size={40}
            className="mx-auto text-red-500"
          />

          <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
            Unable to Load Profile
          </h1>

          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            {error || "Something went wrong."}
          </p>

          <button
            type="button"
            onClick={loadProfile}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700"
          >
            <RefreshCw size={17} />
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F5F0] px-5 py-12 text-[#171717] transition-colors dark:bg-gray-950 dark:text-gray-100">
      <div className="mx-auto max-w-4xl">

        {/* Back Navigation */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-400"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        {/* Error Message */}
        {error && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        {/* Profile Card */}
        <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">

          {/* Profile Header */}
          <div className="bg-[#171717] px-8 py-10 text-center dark:bg-[#111827]">
            <div className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white/20 bg-orange-600 text-3xl font-bold text-white">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                initials
              )}
            </div>

            <h1 className="mt-5 text-2xl font-bold text-white">
              {user.name || "StudioSpace User"}
            </h1>

            <p className="mt-2 text-sm text-gray-300">
              Welcome to your StudioSpace account
            </p>

            <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white">
              <ShieldCheck size={15} />
              {accountRole}
            </span>
          </div>

          {/* Account Information */}
          <div className="p-8 md:p-10">
            <h2 className="text-xl font-bold text-[#171717] dark:text-white">
              Account Information
            </h2>

            <div className="mt-6 space-y-4">

              {/* Name */}
              <div className="flex items-center gap-4 rounded-xl bg-[#F7F5F0] p-5 dark:bg-gray-800">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-orange-600 dark:bg-gray-700">
                  <User size={20} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Full Name
                  </p>
                  <p className="break-words font-semibold text-gray-900 dark:text-white">
                    {user.name || "Not available"}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4 rounded-xl bg-[#F7F5F0] p-5 dark:bg-gray-800">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-orange-600 dark:bg-gray-700">
                  <Mail size={20} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Email Address
                  </p>
                  <p className="break-all font-semibold text-gray-900 dark:text-white">
                    {user.email || "Not available"}
                  </p>
                </div>
              </div>

              {/* Role */}
              <div className="flex items-center gap-4 rounded-xl bg-[#F7F5F0] p-5 dark:bg-gray-800">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-orange-600 dark:bg-gray-700">
                  <ShieldCheck size={20} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Account Role
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {accountRole}
                  </p>
                </div>
              </div>
            </div>

            {/* My Account */}
            <h2 className="mt-10 text-xl font-bold text-[#171717] dark:text-white">
              My Account
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Link
                href="/my-bookings"
                className="flex items-center justify-center gap-3 rounded-xl border border-black/10 p-5 font-semibold text-gray-900 transition hover:border-orange-500 hover:text-orange-600 dark:border-gray-700 dark:text-gray-200 dark:hover:border-orange-500 dark:hover:text-orange-400"
              >
                <CalendarDays size={20} />
                My Bookings
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex items-center justify-center gap-3 rounded-xl border border-red-200 p-5 font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/40"
              >
                {loggingOut ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <LogOut size={20} />
                )}

                {loggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Your creative journey starts with StudioSpace.
        </p>
      </div>
    </main>
  );
}
