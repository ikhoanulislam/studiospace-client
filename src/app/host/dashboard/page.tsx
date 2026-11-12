
"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  CalendarDays,
  Plus,
  LogOut,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  RefreshCw,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type HostUser = {
  name: string;
  email: string;
  isHost?: boolean;
  role?: string;
};

type Booking = {
  _id: string;
  studioId: string;
  studioName: string;
  bookingDate: string;
  bookingTime: string;
  price: number;
  status: "pending" | "confirmed" | "cancelled";
  userId?: {
    name?: string;
    email?: string;
  } | string;
};

const cardClass =
  "rounded-2xl border border-[#E9E2D9] bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900";

const mutedText = "text-gray-500 dark:text-gray-400";

export default function HostDashboard() {
  const router = useRouter();

  const [user, setUser] = useState<HostUser | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmingId, setConfirmingId] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const userResponse = await fetch(`${API_URL}/api/auth/me`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      if (userResponse.status === 401) {
        router.replace("/login");
        return;
      }

      const userResult = await userResponse.json();

      if (!userResponse.ok || !userResult.success || !userResult.data) {
        throw new Error(
          userResult.message || "Unable to verify your account."
        );
      }

      const currentUser = userResult.data;

      if (
        currentUser?.isHost !== true &&
        currentUser?.role !== "admin"
      ) {
        throw new Error("Host permission পাওয়া যায়নি।");
      }

      const bookingResponse = await fetch(
        `${API_URL}/api/host/bookings`,
        {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        }
      );

      if (bookingResponse.status === 401) {
        router.replace("/login");
        return;
      }

      const bookingResult = await bookingResponse.json();

      if (!bookingResponse.ok || !bookingResult.success) {
        throw new Error(
          bookingResult.message || "Unable to load bookings."
        );
      }

      setUser(currentUser);
      setBookings(
        Array.isArray(bookingResult.data)
          ? bookingResult.data
          : []
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const handleConfirmBooking = async (bookingId: string) => {
    setConfirmingId(bookingId);
    setError("");
    setNotice("");

    try {
      const response = await fetch(
        `${API_URL}/api/host/bookings/${bookingId}/confirm`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 401) {
        router.replace("/login");
        return;
      }

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Booking confirmation failed."
        );
      }

      setBookings((previous) =>
        previous.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: "confirmed" }
            : booking
        )
      );

      setNotice("Booking confirmed successfully!");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to confirm booking."
      );
    } finally {
      setConfirmingId("");
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout error:", err);
    }

    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");

    router.replace("/login");
  };

  const pendingCount = bookings.filter(
    (booking) => booking.status === "pending"
  ).length;

  const confirmedCount = bookings.filter(
    (booking) => booking.status === "confirmed"
  ).length;

  const cancelledCount = bookings.filter(
    (booking) => booking.status === "cancelled"
  ).length;

  const uniqueStudios = new Set(
    bookings.map((booking) => booking.studioId)
  ).size;

  const getCustomer = (booking: Booking) => {
    if (
      booking.userId &&
      typeof booking.userId === "object"
    ) {
      return {
        name: booking.userId.name || "Customer",
        email: booking.userId.email || "Email unavailable",
      };
    }

    return {
      name: "Customer",
      email: "Customer information unavailable",
    };
  };

  const getStatusStyle = (status: Booking["status"]) => {
    if (status === "confirmed") {
      return "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400";
    }

    if (status === "cancelled") {
      return "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400";
    }

    return "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400";
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F5F0] text-gray-800 dark:bg-gray-950 dark:text-white">
        <Loader2 className="mr-3 animate-spin text-[#F15A3B]" size={25} />
        Loading Host Dashboard...
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F5F0] p-6 dark:bg-gray-950">
        <div className={`${cardClass} w-full max-w-md p-8 text-center`}>
          <XCircle className="mx-auto mb-4 text-red-500" size={40} />

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Host Dashboard
          </h2>

          <p className="mt-4 text-sm text-red-500">{error}</p>

          <button
            onClick={fetchDashboard}
            className="mt-6 rounded-lg bg-[#F15A3B] px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Try Again
          </button>

          <Link
            href="/"
            className={`mt-4 block text-sm ${mutedText} hover:text-[#F15A3B]`}
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F5F0] text-gray-900 transition-colors dark:bg-gray-950 dark:text-white">
      {/* Header */}
      <header className="border-b border-[#E9E2D9] bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
          <Link href="/" className="text-2xl font-bold">
            StudioSpace{" "}
            <span className="text-[#F15A3B]">Host</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className={`hidden text-sm hover:text-[#F15A3B] sm:block ${mutedText}`}
            >
              Visit Website
            </Link>

            <button
              onClick={logout}
              className="flex items-center gap-2 rounded-lg border border-[#E9E2D9] px-4 py-2 text-sm transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              <LogOut size={17} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-10">
        {/* Welcome */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold tracking-widest text-[#F15A3B]">
              HOST CONTROL CENTER
            </p>

            <h1 className="mt-3 text-3xl font-bold md:text-4xl">
              Welcome back, {user?.name || "Host"}!
            </h1>

            <p className={`mt-2 ${mutedText}`}>
              Manage your studios and customer reservations.
            </p>
          </div>

          <Link href="/host/events" className="inline-flex items-center gap-2 rounded-full bg-[#F15A3B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D94A30]">
            <CalendarDays size={16} /> Manage Events
          </Link>

          <div className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-400">
            <ShieldCheck size={17} />
            Host Approved
          </div>
        </div>

        {/* Messages */}
        {notice && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-300">
            <CheckCircle2 size={20} />
            {notice}
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
            {error}
          </div>
        )}

        {/* Statistics */}
        <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className={`${cardClass} p-6`}>
            <Building2 className="mb-4 text-blue-500" size={30} />
            <p className={`text-sm ${mutedText}`}>
              Studios With Bookings
            </p>
            <h2 className="mt-2 text-3xl font-bold">
              {uniqueStudios}
            </h2>
          </div>

          <div className={`${cardClass} p-6`}>
            <CalendarDays className="mb-4 text-purple-500" size={30} />
            <p className={`text-sm ${mutedText}`}>
              Total Bookings
            </p>
            <h2 className="mt-2 text-3xl font-bold">
              {bookings.length}
            </h2>
          </div>

          <div className={`${cardClass} p-6`}>
            <Clock className="mb-4 text-amber-500" size={30} />
            <p className={`text-sm ${mutedText}`}>
              Pending Bookings
            </p>
            <h2 className="mt-2 text-3xl font-bold text-amber-500">
              {pendingCount}
            </h2>
          </div>

          <div className={`${cardClass} p-6`}>
            <CheckCircle2 className="mb-4 text-green-500" size={30} />
            <p className={`text-sm ${mutedText}`}>
              Confirmed Bookings
            </p>
            <h2 className="mt-2 text-3xl font-bold text-green-500">
              {confirmedCount}
            </h2>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 grid gap-5 md:grid-cols-2">
          <Link
            href="/add-studio"
            className={`${cardClass} flex items-center justify-between p-6 transition hover:border-blue-400`}
          >
            <div>
              <Plus className="mb-3 text-blue-500" size={27} />
              <h3 className="text-lg font-bold">Add New Studio</h3>
              <p className={`mt-1 text-sm ${mutedText}`}>
                Publish a new creative space.
              </p>
            </div>
            <ArrowUpRight className={mutedText} />
          </Link>

          <Link
            href="/my-listings"
            className={`${cardClass} flex items-center justify-between p-6 transition hover:border-purple-400`}
          >
            <div>
              <Building2 className="mb-3 text-purple-500" size={27} />
              <h3 className="text-lg font-bold">My Studio Listings</h3>
              <p className={`mt-1 text-sm ${mutedText}`}>
                Edit and manage your studios.
              </p>
            </div>
            <ArrowUpRight className={mutedText} />
          </Link>
        </div>

        {/* Booking Management */}
        <section className={`${cardClass} p-6 md:p-8`}>
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold tracking-widest text-[#F15A3B]">
                RESERVATION MANAGEMENT
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Customer Bookings
              </h2>

              <p className={`mt-2 text-sm ${mutedText}`}>
                Review and confirm reservations for your studios.
              </p>
            </div>

            <button
              onClick={fetchDashboard}
              className="flex items-center gap-2 rounded-lg border border-[#E9E2D9] px-4 py-2 text-sm transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>

          {/* Booking Counts */}
          <div className="mb-6 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-amber-100 px-3 py-2 text-amber-700 dark:bg-amber-950 dark:text-amber-400">
              Pending: {pendingCount}
            </span>

            <span className="rounded-full bg-green-100 px-3 py-2 text-green-700 dark:bg-green-950 dark:text-green-400">
              Confirmed: {confirmedCount}
            </span>

            <span className="rounded-full bg-red-100 px-3 py-2 text-red-700 dark:bg-red-950 dark:text-red-400">
              Cancelled: {cancelledCount}
            </span>
          </div>

          {/* Bookings */}
          {bookings.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#D8D1C8] py-16 text-center dark:border-gray-700">
              <CalendarDays
                className="mx-auto mb-4 text-gray-400"
                size={42}
              />

              <h3 className="text-lg font-semibold">
                No Bookings Yet
              </h3>

              <p className={`mt-2 text-sm ${mutedText}`}>
                Customer reservations for your studios will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => {
                const customer = getCustomer(booking);

                return (
                  <div
                    key={booking._id}
                    className="rounded-xl border border-[#E9E2D9] bg-[#FAF9F6] p-5 dark:border-gray-800 dark:bg-gray-950"
                  >
                    <div className="flex flex-col justify-between gap-5 lg:flex-row">
                      <div className="min-w-0">
                        <div className="mb-3 flex flex-wrap items-center gap-3">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${getStatusStyle(
                              booking.status
                            )}`}
                          >
                            {booking.status}
                          </span>

                          <span className="break-all text-xs text-gray-400">
                            ID: {booking._id}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold">
                          {booking.studioName}
                        </h3>

                        <div className={`mt-4 space-y-2 text-sm ${mutedText}`}>
                          <p>
                            Customer:{" "}
                            <span className="font-medium text-gray-900 dark:text-white">
                              {customer.name}
                            </span>
                          </p>

                          <p className="break-all">
                            Email: {customer.email}
                          </p>

                          <p className="flex items-center gap-2">
                            <CalendarDays size={16} />
                            {booking.bookingDate}
                          </p>

                          <p className="flex items-center gap-2">
                            <Clock size={16} />
                            {booking.bookingTime}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-row items-center justify-between gap-4 lg:flex-col lg:items-end">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Booking Price
                          </p>

                          <p className="mt-1 text-2xl font-bold">
                            ৳{booking.price}
                          </p>
                        </div>

                        {booking.status === "pending" && (
                          <button
                            onClick={() =>
                              handleConfirmBooking(booking._id)
                            }
                            disabled={confirmingId === booking._id}
                            className="flex items-center gap-2 rounded-full bg-green-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {confirmingId === booking._id ? (
                              <>
                                <Loader2
                                  size={17}
                                  className="animate-spin"
                                />
                                Confirming...
                              </>
                            ) : (
                              <>
                                <CheckCircle2 size={17} />
                                Confirm Booking
                              </>
                            )}
                          </button>
                        )}

                        {booking.status === "confirmed" && (
                          <span className="flex items-center gap-2 text-sm font-semibold text-green-600 dark:text-green-400">
                            <CheckCircle2 size={17} />
                            Confirmed
                          </span>
                        )}

                        {booking.status === "cancelled" && (
                          <span className="flex items-center gap-2 text-sm font-semibold text-red-600 dark:text-red-400">
                            <XCircle size={17} />
                            Cancelled
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
