

"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  Clock,
  MapPin,
  ArrowUpRight,
  Loader2,
  ClipboardList,
  XCircle,
  AlertCircle,
  CheckCircle2,
  X,
} from "lucide-react";

const API_URL = "http://localhost:5002";

type Booking = {
  _id: string;
  studioId: string;
  studioName: string;
  bookingDate: string;
  bookingTime: string;
  price: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt?: string;
};

export default function MyBookingsPage() {
  const router = useRouter();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [selectedBooking, setSelectedBooking] =
    useState<Booking | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/bookings`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      if (response.status === 401) {
        router.replace("/login");
        return;
      }

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to load bookings.");
      }

      setBookings(Array.isArray(result.data) ? result.data : []);
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
    fetchBookings();
  }, [fetchBookings]);

  const handleCancelBooking = async () => {
    if (!selectedBooking || isCancelling) return;

    setIsCancelling(true);
    setError("");
    setNotice("");

    try {
      const response = await fetch(
        `${API_URL}/api/bookings/${selectedBooking._id}/cancel`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      if (response.status === 401) {
        router.replace("/login");
        return;
      }

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Booking cancellation failed."
        );
      }

      setBookings((previous) =>
        previous.map((booking) =>
          booking._id === selectedBooking._id
            ? { ...booking, status: "cancelled" }
            : booking
        )
      );

      setNotice("Booking cancelled successfully!");
      setSelectedBooking(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to cancel booking."
      );
    } finally {
      setIsCancelling(false);
    }
  };

  const statusStyle = (status: Booking["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400";
      case "cancelled":
        return "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400";
      default:
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400";
    }
  };

  const formatPrice = (value: number) =>
    `৳${Number(value || 0).toLocaleString("en-BD")}`;

  return (
    <main className="min-h-screen bg-[#F7F5F0] px-5 py-12 text-[#171717] transition-colors dark:bg-[#0B1120] dark:text-gray-100 md:px-10">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">
            Your Activity
          </p>

          <h1 className="font-serif text-4xl font-bold md:text-5xl">
            My Bookings
          </h1>

          <p className="mt-3 text-gray-500 dark:text-gray-400">
            Manage and keep track of your studio reservations.
          </p>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#E9E2D9] bg-white p-5 dark:border-gray-800 dark:bg-[#111827]">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Bookings
            </p>
            <p className="mt-2 text-3xl font-bold">
              {bookings.length}
            </p>
          </div>

          <div className="rounded-2xl border border-[#E9E2D9] bg-white p-5 dark:border-gray-800 dark:bg-[#111827]">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Confirmed
            </p>
            <p className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">
              {bookings.filter((b) => b.status === "confirmed").length}
            </p>
          </div>

          <div className="rounded-2xl border border-[#E9E2D9] bg-white p-5 dark:border-gray-800 dark:bg-[#111827]">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Cancelled
            </p>
            <p className="mt-2 text-3xl font-bold text-red-500 dark:text-red-400">
              {bookings.filter((b) => b.status === "cancelled").length}
            </p>
          </div>
        </div>

        {/* Success Message */}
        {notice && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-300">
            <CheckCircle2 size={20} />
            {notice}

            <button
              type="button"
              onClick={() => setNotice("")}
              className="ml-auto"
              aria-label="Dismiss notification"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
            <AlertCircle size={20} />
            <span className="flex-1">{error}</span>

            {!loading && (
              <button
                type="button"
                onClick={fetchBookings}
                className="font-bold underline"
              >
                Retry
              </button>
            )}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex min-h-64 items-center justify-center gap-3">
            <Loader2 className="animate-spin text-orange-500" size={28} />
            <span className="text-gray-500 dark:text-gray-400">
              Loading bookings...
            </span>
          </div>
        ) : error && bookings.length === 0 ? (
          <div className="rounded-3xl border border-[#E9E2D9] bg-white p-12 text-center dark:border-gray-800 dark:bg-[#111827]">
            <p className="text-gray-500 dark:text-gray-400">
              Unable to display your bookings.
            </p>

            <button
              type="button"
              onClick={fetchBookings}
              className="mt-5 rounded-full bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700"
            >
              Try Again
            </button>
          </div>
        ) : bookings.length === 0 ? (
          <div className="rounded-3xl border border-[#E9E2D9] bg-white px-6 py-16 text-center dark:border-gray-800 dark:bg-[#111827]">
            <ClipboardList
              size={48}
              className="mx-auto text-gray-400"
            />

            <h2 className="mt-5 font-serif text-2xl font-bold">
              No Bookings Yet
            </h2>

            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              You haven't booked any creative spaces yet.
            </p>

            <Link
              href="/studios"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-orange-600 px-7 py-4 text-sm font-bold text-white hover:bg-orange-700"
            >
              Explore Studios
              <ArrowUpRight size={17} />
            </Link>
          </div>
        ) : (

          /* Booking List */
          <div className="space-y-5">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="rounded-3xl border border-[#E9E2D9] bg-white p-6 shadow-sm transition-colors dark:border-gray-800 dark:bg-[#111827] md:p-8"
              >
                <div className="flex flex-col justify-between gap-5 md:flex-row">
                  <div>
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${statusStyle(booking.status)}`}
                      >
                        {booking.status}
                      </span>

                      <span className="break-all text-xs text-gray-400">
                        ID: {booking._id}
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl font-bold">
                      {booking.studioName}
                    </h2>

                    <div className="mt-5 grid gap-4 text-sm text-gray-500 dark:text-gray-400 sm:grid-cols-2">
                      <div className="flex items-center gap-2">
                        <CalendarDays size={18} className="text-orange-500" />
                        {booking.bookingDate}
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock size={18} className="text-orange-500" />
                        {booking.bookingTime}
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin size={18} className="text-orange-500" />
                        Studio Reservation
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row items-center justify-between gap-4 md:flex-col md:items-end">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Booking Price
                      </p>

                      <p className="mt-1 text-3xl font-bold">
                        {formatPrice(booking.price)}
                      </p>
                    </div>

                    <Link
                      href={`/studios/${booking.studioId}`}
                      className="inline-flex items-center gap-2 rounded-full border border-[#E9E2D9] px-5 py-3 text-sm font-semibold transition hover:bg-[#F7F5F0] dark:border-gray-700 dark:hover:bg-gray-800"
                    >
                      View Studio
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </div>

                {booking.status === "pending" && (
                  <div className="mt-6 border-t border-[#E9E2D9] pt-5 dark:border-gray-800">
                    <button
                      type="button"
                      onClick={() => setSelectedBooking(booking)}
                      className="inline-flex items-center gap-2 rounded-full border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/40"
                    >
                      <XCircle size={17} />
                      Cancel Booking
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/studios"
            className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:underline dark:text-orange-400"
          >
            Continue Exploring Studios
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-7 shadow-2xl dark:border-gray-700 dark:bg-[#111827]">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/10">
                <AlertCircle size={25} className="text-red-600 dark:text-red-400" />
              </div>

              <button
                type="button"
                onClick={() => setSelectedBooking(null)}
                disabled={isCancelling}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Close confirmation"
              >
                <X size={20} />
              </button>
            </div>

            <h2 className="font-serif text-2xl font-bold">
              Cancel this booking?
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
              Are you sure you want to cancel your booking for{" "}
              <strong className="text-gray-900 dark:text-white">
                {selectedBooking.studioName}
              </strong>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 rounded-2xl bg-[#F7F5F0] p-4 text-sm dark:bg-gray-800">
              <p className="text-gray-500 dark:text-gray-400">
                Booking Date
              </p>
              <p className="mt-1 font-semibold">
                {selectedBooking.bookingDate}
              </p>

              <p className="mt-3 text-gray-500 dark:text-gray-400">
                Booking Time
              </p>
              <p className="mt-1 font-semibold">
                {selectedBooking.bookingTime}
              </p>
            </div>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setSelectedBooking(null)}
                disabled={isCancelling}
                className="flex-1 rounded-full border border-[#E9E2D9] py-3 text-sm font-bold hover:bg-[#F7F5F0] disabled:opacity-50 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                Keep Booking
              </button>

              <button
                type="button"
                onClick={handleCancelBooking}
                disabled={isCancelling}
                className="flex-1 rounded-full bg-red-600 py-3 text-sm font-bold text-white hover:bg-red-700 disabled:opacity-60"
              >
                {isCancelling ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    Cancelling...
                  </span>
                ) : (
                  "Yes, Cancel"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
