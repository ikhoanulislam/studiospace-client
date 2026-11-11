
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, X, Building2 } from "lucide-react";

export default function AddStudioPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [amenityInput, setAmenityInput] = useState("");

  const [form, setForm] = useState({
    name: "",
    category: "",
    location: "",
    price: "",
    securityDeposit: "0",
    capacity: "1",
    image: "",
    description: "",
  });

  const [amenities, setAmenities] = useState<string[]>([]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addAmenity = () => {
    const value = amenityInput.trim();

    if (value && !amenities.includes(value)) {
      setAmenities([...amenities, value]);
      setAmenityInput("");
    }
  };

  const removeAmenity = (item: string) => {
    setAmenities(amenities.filter((a) => a !== item));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5002/api/studios", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          securityDeposit: Number(form.securityDeposit),
          capacity: Number(form.capacity),
          amenities,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setMessage(result.message || "Unable to add studio.");
        setMessageType("error");
        return;
      }

      setMessage("Studio added successfully!");
      setMessageType("success");

      setTimeout(() => {
        router.push("/host/dashboard");
      }, 1200);
    } catch (error) {
      console.error("Add studio error:", error);
      setMessage("Backend server connection failed.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-[#E5DED5] bg-white px-4 py-3 text-sm text-[#171717] outline-none transition placeholder:text-gray-400 focus:border-[#F15A3B] focus:ring-2 focus:ring-[#F15A3B]/10 dark:border-gray-700 dark:bg-[#111827] dark:text-gray-100 dark:placeholder:text-gray-500";

  const labelClass =
    "mb-2 block text-sm font-semibold text-[#333] dark:text-gray-200";

  return (
    <main className="min-h-screen bg-[#F7F5F0] px-4 py-10 text-[#171717] transition-colors duration-300 dark:bg-[#11151F] dark:text-gray-100">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/host/dashboard"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#F15A3B] dark:text-gray-400 dark:hover:text-[#F15A3B]"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        {/* Page Heading */}
        <div className="mb-8">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FCE8E2] text-[#F15A3B]">
            <Building2 size={28} />
          </div>

          <p className="font-semibold tracking-widest text-[#F15A3B]">
            STUDIOSPACE HOST
          </p>

          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            Add New Studio
          </h1>

          <p className="mt-2 text-[#77716B] dark:text-gray-400">
            Share your creative space with the community.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-3xl border border-[#E9E2D9] bg-white p-6 shadow-sm transition-colors dark:border-gray-700 dark:bg-[#1C2431] md:p-8"
        >
          {/* Studio Name */}
          <div>
            <label htmlFor="name" className={labelClass}>
              Studio Name *
            </label>

            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={inputClass}
              placeholder="e.g. The Creative Room"
              required
              maxLength={100}
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className={labelClass}>
              Category *
            </label>

            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option value="">Select Category</option>
              <option value="Photography Studio">Photography Studio</option>
              <option value="Podcast Studio">Podcast Studio</option>
              <option value="Music Studio">Music Studio</option>
              <option value="Dance Studio">Dance Studio</option>
              <option value="Video Studio">Video Studio</option>
              <option value="Event Space">Event Space</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className={labelClass}>
              Location *
            </label>

            <input
              id="location"
              name="location"
              value={form.location}
              onChange={handleChange}
              className={inputClass}
              placeholder="City, Area"
              required
              maxLength={200}
            />
          </div>

          {/* Price */}
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="price" className={labelClass}>
                Hourly Rate (৳) *
              </label>

              <input
                id="price"
                type="number"
                name="price"
                min="1"
                value={form.price}
                onChange={handleChange}
                className={inputClass}
                placeholder="1000"
                required
              />
            </div>

            <div>
              <label htmlFor="securityDeposit" className={labelClass}>
                Security Deposit (৳)
              </label>

              <input
                id="securityDeposit"
                type="number"
                name="securityDeposit"
                min="0"
                value={form.securityDeposit}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* Capacity */}
          <div>
            <label htmlFor="capacity" className={labelClass}>
              Capacity (People)
            </label>

            <input
              id="capacity"
              type="number"
              name="capacity"
              min="1"
              value={form.capacity}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Image */}
          <div>
            <label htmlFor="image" className={labelClass}>
              Studio Image URL
            </label>

            <input
              id="image"
              type="url"
              name="image"
              value={form.image}
              onChange={handleChange}
              className={inputClass}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Amenities */}
          <div>
            <label className={labelClass}>
              Amenities
            </label>

            <div className="flex gap-2">
              <input
                value={amenityInput}
                onChange={(e) => setAmenityInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addAmenity();
                  }
                }}
                className={inputClass}
                placeholder="e.g. WiFi, AC, Lighting"
              />

              <button
                type="button"
                onClick={addAmenity}
                aria-label="Add amenity"
                className="flex shrink-0 items-center justify-center rounded-xl bg-[#F15A3B] px-5 text-white transition hover:bg-[#D94A30]"
              >
                <Plus size={20} />
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {amenities.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-2 rounded-full bg-[#FCE8E2] px-3 py-2 text-sm font-medium text-[#D94A30] dark:bg-[#3A2728] dark:text-[#FF9B82]"
                >
                  {item}

                  <button
                    type="button"
                    onClick={() => removeAmenity(item)}
                    aria-label={`Remove ${item}`}
                    className="transition hover:text-red-600"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className={labelClass}>
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              className={inputClass}
              rows={5}
              maxLength={3000}
              placeholder="Describe your studio..."
            />
          </div>

          {/* Status Message */}
          {message && (
            <p
              role="status"
              className={`rounded-xl p-4 text-sm font-medium ${
                messageType === "success"
                  ? "border border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-300"
                  : "border border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
              }`}
            >
              {message}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F15A3B] py-4 font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#D94A30] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Adding Studio..." : "Publish Studio"}
            {!loading && <Plus size={19} />}
          </button>

          <p className="text-center text-xs text-gray-400 dark:text-gray-500">
            Your studio will be submitted to the StudioSpace platform.
          </p>
        </form>
      </div>
    </main>
  );
}
