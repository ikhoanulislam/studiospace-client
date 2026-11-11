
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  Clock,
  MapPin,
  ArrowUpRight,
  RefreshCw,
} from "lucide-react";

type Booking = {
  _id: string;
  studioId: string;
  studioName: string;
  bookingDate: string;
  bookingTime: string;
  price: number;
  status: "pending" | "confirmed" | "cancelled";
};

export default function MyBookingsPage() {
  const router = useRouter();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const token = sessionStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch(
        "http://localhost:5002/api/bookings",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        }
      );

      const result = await response.json();

      if (response.status === 401) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        router.push("/login");
        return;
      }

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Could not load bookings."
        );
      }

      setBookings(result.data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <main className="min-h-screen bg-[#F7F5F0] px-5 py-12 text-[#171717] md:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#F15A3B]">
              Your Reservations
            </p>

            <h1 className="font-serif text-4xl font-bold md:text-5xl">
              My Bookings
            </h1>

            <p className="mt-3 text-sm text-[#88817A]">
              Manage and view your studio reservations.
            </p>
          </div>

          <button
            onClick={fetchBookings}
            disabled={loading}
            className="flex items-center gap-2 rounded-full border border-[#E9E2D9] bg-white px-5 py-3 text-sm font-semibold hover:bg-[#F15A3B] hover:text-white disabled:opacity-50"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>

        <div className="my-10 border-t border-[#E9E2D9]" />

        {loading ? (
          <div className="rounded-3xl bg-white p-12 text-center">
            Loading your bookings...
          </div>
        ) : error ? (
          <div className="rounded-3xl bg-white p-10 text-center">
            <p className="text-red-600">{error}</p>

            <button
              onClick={fetchBookings}
              className="mt-5 rounded-full bg-[#F15A3B] px-6 py-3 text-sm font-bold text-white"
            >
              Try Again
            </button>
          </div>
        ) : bookings.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center">
            <CalendarDays
              size={42}
              className="mx-auto text-[#F15A3B]"
            />

            <h2 className="mt-5 text-2xl font-bold">
              No Bookings Yet
            </h2>

            <p className="mt-3 text-sm text-[#88817A]">
              Explore studios and book your perfect creative space.
            </p>

            <Link
              href="/studios"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#F15A3B] px-7 py-4 text-sm font-bold text-white"
            >
              Explore Studios
              <ArrowUpRight size={17} />
            </Link>
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm text-[#88817A]">
              {bookings.length} booking(s) found
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="rounded-3xl border border-[#E9E2D9] bg-white p-7 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#F15A3B]">
                        Studio Reservation
                      </p>

                      <h2 className="mt-2 text-2xl font-bold">
                        {booking.studioName}
                      </h2>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  <div className="my-6 space-y-4">
                    <div className="flex items-center gap-3 text-sm text-[#77716B]">
                      <CalendarDays
                        size={18}
                        className="text-[#F15A3B]"
                      />
                      {booking.bookingDate}
                    </div>

                    <div className="flex items-center gap-3 text-sm text-[#77716B]">
                      <Clock
                        size={18}
                        className="text-[#F15A3B]"
                      />
                      {booking.bookingTime}
                    </div>

                    <div className="flex items-center gap-3 text-sm text-[#77716B]">
                      <MapPin
                        size={18}
                        className="text-[#F15A3B]"
                      />
                      Studio ID: {booking.studioId}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-[#E9E2D9] pt-5">
                    <div>
                      <p className="text-xs text-[#88817A]">
                        Booking Price
                      </p>

                      <p className="mt-1 text-2xl font-bold">
                        ${booking.price}
                      </p>
                    </div>

                    <span className="text-xs text-[#88817A]">
                      ID: {booking._id.slice(-8)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
