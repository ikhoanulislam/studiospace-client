
"use client";

import { useState } from "react";
import { CheckCircle2, ArrowUpRight, Star } from "lucide-react";

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
  status?: string;
};

const API_URL = "http://localhost:5002";

const timeSlots = [
  "09:00 AM",
  "11:00 AM",
  "01:00 PM",
  "03:00 PM",
  "05:00 PM",
  "07:00 PM",
];

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

  const today = new Date();

  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  // Continue Booking: Show booking summary
  const handleBooking = () => {
    setError("");

    if (!date || !time) {
      setError("Please select a date and time.");
      return;
    }

    if (date < minDate) {
      setError("Please select a valid future date.");
      return;
    }

    setConfirmed(true);
  };

  // Confirm Booking: Save booking to backend
  const handleConfirmBooking = async () => {
    if (isSaving) return;

    setError("");
    setIsSaving(true);

    try {
      const response = await fetch(`${API_URL}/api/bookings`, {
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
      });

      const result = await response.json();

      if (response.status === 401) {
        throw new Error("Please login first to confirm your booking.");
      }

      if (!response.ok || !result.success) {
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
    <div className="sticky top-24 rounded-3xl border border-[#E9E2D9] bg-white p-7 shadow-sm">

      {/* Booking Success */}
      {savedBooking ? (
        <div>
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 size={30} className="text-green-600" />
          </div>

          <h2 className="text-2xl font-bold">
            Booking Submitted!
          </h2>

          <p className="mt-2 text-sm text-[#88817A]">
            Your booking request has been saved. Please wait for host confirmation.
          </p>

          <div className="my-6 space-y-4 rounded-2xl bg-[#F7F5F0] p-5">
            <div>
              <p className="text-xs text-[#88817A]">Booking ID</p>
              <p className="mt-1 break-all font-semibold">
                {savedBooking._id}
              </p>
            </div>

            <div>
              <p className="text-xs text-[#88817A]">Booking Status</p>
              <p className="mt-1 font-semibold capitalize">
                {savedBooking.status || "Pending"}
              </p>
            </div>

            <div>
              <p className="text-xs text-[#88817A]">Studio</p>
              <p className="mt-1 font-semibold">{studioName}</p>
            </div>

            <div>
              <p className="text-xs text-[#88817A]">Date</p>
              <p className="mt-1 font-semibold">{date}</p>
            </div>

            <div>
              <p className="text-xs text-[#88817A]">Time</p>
              <p className="mt-1 font-semibold">{time}</p>
            </div>

            <div className="border-t border-[#E9E2D9] pt-4">
              <p className="text-xs text-[#88817A]">
                Estimated Price
              </p>
              <p className="mt-1 text-2xl font-bold">
                ${price}
              </p>
            </div>
          </div>

          <p className="text-center text-sm text-[#88817A]">
            Your booking is waiting for host approval.
          </p>
        </div>
      ) : !confirmed ? (
        <>
          {/* Booking Form */}
          <p className="text-sm text-[#88817A]">
            Booking price
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            ${price}
            <span className="text-sm font-normal text-[#88817A]">
              / hour
            </span>
          </h2>

          <div className="my-6 border-t border-[#E9E2D9]" />

          <h3 className="mb-5 text-xl font-bold">
            Book this Studio
          </h3>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Select Date
            </label>

            <input
              type="date"
              min={minDate}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mb-5 w-full rounded-xl border border-[#E9E2D9] bg-[#F7F5F0] p-3 text-sm outline-none focus:border-[#F15A3B]"
            />

            <label className="mb-2 block text-sm font-semibold">
              Select Time
            </label>

            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mb-6 w-full rounded-xl border border-[#E9E2D9] bg-[#F7F5F0] p-3 text-sm outline-none focus:border-[#F15A3B]"
            >
              <option value="">Choose a time</option>

              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>

            {error && (
              <p className="mb-4 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="button"
              onClick={handleBooking}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#F15A3B] py-4 text-sm font-bold text-white transition hover:bg-[#DB472C]"
            >
              Continue Booking
              <ArrowUpRight size={18} />
            </button>
          </div>

          <p className="mt-4 text-center text-xs text-[#99918A]">
            You won't be charged yet.
          </p>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#88817A]">
            <Star
              size={14}
              className="fill-[#F15A3B] text-[#F15A3B]"
            />
            {rating} · {reviews} reviews
          </div>
        </>
      ) : (
        /* Booking Summary */
        <div>
          <h2 className="text-2xl font-bold">
            Booking Summary
          </h2>

          <p className="mt-2 text-sm text-[#88817A]">
            Review your booking details.
          </p>

          <div className="my-6 space-y-4 rounded-2xl bg-[#F7F5F0] p-5">
            <div>
              <p className="text-xs text-[#88817A]">Studio</p>
              <p className="mt-1 font-semibold">{studioName}</p>
            </div>

            <div>
              <p className="text-xs text-[#88817A]">Date</p>
              <p className="mt-1 font-semibold">{date}</p>
            </div>

            <div>
              <p className="text-xs text-[#88817A]">Time</p>
              <p className="mt-1 font-semibold">{time}</p>
            </div>

            <div>
              <p className="text-xs text-[#88817A]">
                Opening Hours
              </p>
              <p className="mt-1 font-semibold">{hours}</p>
            </div>

            <div className="border-t border-[#E9E2D9] pt-4">
              <p className="text-xs text-[#88817A]">
                Estimated Price (1 hour)
              </p>
              <p className="mt-1 text-2xl font-bold">
                ${price}
              </p>
            </div>
          </div>

          {error && (
            <p className="mb-4 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={() => {
              setConfirmed(false);
              setError("");
            }}
            disabled={isSaving}
            className="mb-3 w-full rounded-full border border-[#E9E2D9] py-3 text-sm font-bold hover:bg-[#F7F5F0] disabled:opacity-50"
          >
            Edit Booking
          </button>

          <button
            type="button"
            onClick={handleConfirmBooking}
            disabled={isSaving}
            className="w-full rounded-full bg-[#F15A3B] py-4 text-sm font-bold text-white hover:bg-[#DB472C] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Saving Booking..." : "Confirm Booking"}

            {!isSaving && (
              <ArrowUpRight size={17} className="ml-2 inline" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
