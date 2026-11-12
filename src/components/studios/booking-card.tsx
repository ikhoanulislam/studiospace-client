
"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowUpRight,
  Star,
  CalendarDays,
  Clock,
  ShieldCheck,
  Loader2,
} from "lucide-react";

type BookingCardProps = {
  studioId: string;
  studioName: string;
  price: number;
  rating: number;
  reviews: number;
  hours: string;
};

type SavedBooking = {
  _id: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const timeSlots = [
  "09:00 AM",
  "11:00 AM",
  "01:00 PM",
  "03:00 PM",
  "05:00 PM",
  "07:00 PM",
];

const inputClass =
  "mb-5 w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-900 outline-none transition focus:border-orange-500 dark:border-gray-700 dark:bg-gray-950 dark:text-white";

export default function BookingCard({
  studioId,
  studioName,
  price,
  rating,
  reviews,
  hours,
}: BookingCardProps) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedBooking, setSavedBooking] =
    useState<SavedBooking | null>(null);
  const [error, setError] = useState("");
  const [loginRequired, setLoginRequired] = useState(false);

  const today = new Date();

  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const formattedPrice = `৳${Number(price).toLocaleString("en-BD")}`;

  const handleBooking = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoginRequired(false);

    if (!date || !time) {
      setError("Please select a date and time.");
      return;
    }

    if (date < minDate) {
      setError("Please select a valid date.");
      return;
    }

    setConfirmed(true);
  };

  const handleConfirmBooking = async () => {
    if (isSaving) return;

    setError("");
    setLoginRequired(false);
    setIsSaving(true);

    try {
      const response = await fetch(
        `${API_URL}/api/bookings`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studioId,
            studioName,
            bookingDate: date,
            bookingTime: time,
            price,
          }),
        }
      );

      const result = await response.json();

      if (response.status === 401) {
        setLoginRequired(true);
        throw new Error("Please log in to complete your booking.");
      }

      if (!response.ok || !result.success || !result.data?._id) {
        throw new Error(
          result.message || "Booking could not be saved."
        );
      }

      setSavedBooking(result.data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="sticky top-24 rounded-3xl border border-[#E9E2D9] bg-white p-6 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900 md:p-7">

      {/* Booking Success */}
      {savedBooking ? (
        <div>
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 dark:bg-green-500/15">
            <CheckCircle2 size={30} className="text-green-600 dark:text-green-400" />
          </div>

          <h2 className="text-2xl font-bold">
            Booking Submitted!
          </h2>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Your booking has been saved and is awaiting host confirmation.
          </p>

          <div className="my-6 space-y-4 rounded-2xl bg-[#F7F5F0] p-5 dark:bg-gray-800">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Booking ID
              </p>
              <p className="mt-1 break-all font-semibold">
                {savedBooking._id}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Studio
              </p>
              <p className="mt-1 font-semibold">{studioName}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Date & Time
              </p>
              <p className="mt-1 font-semibold">
                {date} · {time}
              </p>
            </div>

            <div className="border-t border-[#E9E2D9] pt-4 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Estimated Price (1 hour)
              </p>
              <p className="mt-1 text-2xl font-bold">
                {formattedPrice}
              </p>
            </div>
          </div>

          <Link
            href="/my-bookings"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-orange-600 py-4 text-sm font-bold text-white transition hover:bg-orange-700"
          >
            View My Bookings
            <ArrowUpRight size={18} />
          </Link>
        </div>

      ) : !confirmed ? (

        /* Booking Form */
        <>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Booking price
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {formattedPrice}
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {" "}/ hour
            </span>
          </h2>

          <div className="my-6 border-t border-[#E9E2D9] dark:border-gray-800" />

          <h3 className="mb-5 text-xl font-bold">
            Book this Studio
          </h3>

          <form onSubmit={handleBooking}>
            <label className="mb-2 block text-sm font-semibold">
              Select Date
            </label>

            <input
              type="date"
              min={minDate}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              disabled={isSaving}
              className={inputClass}
            />

            <label className="mb-2 block text-sm font-semibold">
              Select Time
            </label>

            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              disabled={isSaving}
              className={inputClass}
            >
              <option value="">Choose a time</option>

              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>

            {error && (
              <p role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-orange-600 py-4 text-sm font-bold text-white transition hover:bg-orange-700"
            >
              Continue Booking
              <ArrowUpRight size={18} />
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-gray-400">
            You won't be charged yet.
          </p>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <Star
              size={14}
              className="fill-orange-500 text-orange-500"
            />
            {rating} · {reviews} reviews
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-400">
            <ShieldCheck size={15} />
            Secure booking request
          </div>
        </>

      ) : (

        /* Booking Summary */
        <div>
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-500/15">
            <CalendarDays size={28} className="text-orange-600 dark:text-orange-400" />
          </div>

          <h2 className="text-2xl font-bold">
            Booking Summary
          </h2>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Review your booking details before confirming.
          </p>

          <div className="my-6 space-y-4 rounded-2xl bg-[#F7F5F0] p-5 dark:bg-gray-800">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Studio
              </p>
              <p className="mt-1 font-semibold">{studioName}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Date
              </p>
              <p className="mt-1 font-semibold">{date}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Time
              </p>
              <p className="mt-1 font-semibold">{time}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Opening Hours
              </p>
              <p className="mt-1 font-semibold">{hours}</p>
            </div>

            <div className="border-t border-[#E9E2D9] pt-4 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Estimated Price (1 hour)
              </p>
              <p className="mt-1 text-2xl font-bold">
                {formattedPrice}
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
              <p role="alert">{error}</p>

              {loginRequired && (
                <Link
                  href="/login"
                  className="mt-2 inline-block font-bold underline"
                >
                  Go to Login
                </Link>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={() => {
              setConfirmed(false);
              setError("");
              setLoginRequired(false);
            }}
            disabled={isSaving}
            className="mb-3 w-full rounded-full border border-[#E9E2D9] py-3 text-sm font-bold transition hover:bg-[#F7F5F0] disabled:opacity-50 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            Edit Booking
          </button>

          <button
            type="button"
            onClick={handleConfirmBooking}
            disabled={isSaving}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-orange-600 py-4 text-sm font-bold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Saving Booking...
              </>
            ) : (
              <>
                Confirm Booking
                <ArrowUpRight size={18} />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
