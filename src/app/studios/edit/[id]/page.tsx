

"use client";

import { Suspense, useEffect, useState, type FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Loader2,
  Plus,
  X,
} from "lucide-react";

const API_URL = "http://localhost:5002";

type StudioForm = {
  name: string;
  category: string;
  location: string;
  price: string;
  securityDeposit: string;
  capacity: string;
  image: string;
  description: string;
};

const initialForm: StudioForm = {
  name: "",
  category: "",
  location: "",
  price: "",
  securityDeposit: "0",
  capacity: "1",
  image: "",
  description: "",
};

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:placeholder:text-gray-500";

const labelClass =
  "mb-2 block text-sm font-medium text-gray-800 dark:text-gray-200";

function EditStudioForm() {
  const router = useRouter();
  const params = useParams();

  const studioId = params.id as string;

  const [form, setForm] = useState<StudioForm>(initialForm);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [amenityInput, setAmenityInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!studioId) return;

    let active = true;

    const fetchStudio = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/studios/${studioId}`,
          {
            credentials: "include",
            cache: "no-store",
          }
        );

        if (response.status === 401) {
          router.replace("/login");
          return;
        }

        const result = await response.json();

        if (!response.ok || !result.success || !result.data) {
          throw new Error(
            result.message || "Studio not found."
          );
        }

        if (!active) return;

        const studio = result.data;

        setForm({
          name: studio.name || "",
          category: studio.category || "",
          location: studio.location || "",
          price: String(studio.price ?? ""),
          securityDeposit: String(studio.securityDeposit ?? 0),
          capacity: String(studio.capacity ?? 1),
          image: studio.image || "",
          description: studio.description || "",
        });

        setAmenities(
          Array.isArray(studio.amenities)
            ? studio.amenities
            : []
        );
      } catch (error) {
        if (active) {
          setMessage(
            error instanceof Error
              ? error.message
              : "Unable to load studio."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchStudio();

    return () => {
      active = false;
    };
  }, [studioId, router]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const addAmenity = () => {
    const value = amenityInput.trim();

    if (!value) return;

    const alreadyExists = amenities.some(
      (item) => item.toLowerCase() === value.toLowerCase()
    );

    if (alreadyExists) {
      setMessage("This amenity has already been added.");
      return;
    }

    setAmenities((previous) => [...previous, value]);
    setAmenityInput("");
    setMessage("");
  };

  const removeAmenity = (item: string) => {
    setAmenities((previous) =>
      previous.filter((a) => a !== item)
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (saving) return;

    setMessage("");

    const price = Number(form.price);
    const deposit = Number(form.securityDeposit);
    const capacity = Number(form.capacity);

    if (
      !form.name.trim() ||
      !form.category.trim() ||
      !form.location.trim() ||
      form.price.trim() === "" ||
      !Number.isFinite(price) ||
      price <= 0 ||
      form.securityDeposit.trim() === "" ||
      !Number.isFinite(deposit) ||
      deposit < 0 ||
      form.capacity.trim() === "" ||
      !Number.isInteger(capacity) ||
      capacity < 1
    ) {
      setMessage("Please fill in all required fields correctly.");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(
        `${API_URL}/api/studios/${studioId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            name: form.name.trim(),
            location: form.location.trim(),
            price,
            securityDeposit: deposit,
            capacity,
            image: form.image.trim(),
            description: form.description.trim(),
            amenities,
          }),
        }
      );

      if (response.status === 401) {
        router.replace("/login");
        return;
      }

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to update studio."
        );
      }

      router.push("/my-listings");
      router.refresh();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-800 dark:bg-gray-950 dark:text-white">
        <Loader2 className="animate-spin text-orange-500" size={32} />
        <span className="ml-3">Loading studio...</span>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 text-gray-900 transition-colors dark:bg-gray-950 dark:text-white md:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/my-listings"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-400"
        >
          <ArrowLeft size={18} />
          Back to My Listings
        </Link>

        <div className="mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-orange-600 dark:text-orange-500">
            Host Dashboard
          </p>

          <h1 className="text-3xl font-bold md:text-4xl">
            Edit Your Studio
          </h1>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Update your creative space information.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:p-8"
        >
          {/* Studio Name */}
          <div>
            <label className={labelClass}>
              Studio Name *
            </label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              maxLength={100}
              className={inputClass}
              placeholder="Enter studio name"
            />
          </div>

          {/* Category */}
          <div>
            <label className={labelClass}>
              Category *
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className={inputClass}
            >
              <option value="">Select Category</option>
              <option value="Photography Studio">Photography Studio</option>
              <option value="Film & Production">Film & Production</option>
              <option value="Podcast Room">Podcast Room</option>
              <option value="Music Studio">Music Studio</option>
              <option value="Event Space">Event Space</option>
              <option value="Creative Workspace">Creative Workspace</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className={labelClass}>
              Location *
            </label>

            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              required
              maxLength={200}
              className={inputClass}
              placeholder="City, District"
            />
          </div>

          {/* Price, Deposit, Capacity */}
          <div className="grid gap-5 md:grid-cols-3">
            <div>
              <label className={labelClass}>
                Price / Hour (৳) *
              </label>

              <input
                type="number"
                name="price"
                min="1"
                step="any"
                value={form.price}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Security Deposit (৳)
              </label>

              <input
                type="number"
                name="securityDeposit"
                min="0"
                step="any"
                value={form.securityDeposit}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Capacity
              </label>

              <input
                type="number"
                name="capacity"
                min="1"
                step="1"
                value={form.capacity}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
          </div>

          {/* Image */}
          <div>
            <label className={labelClass}>
              Studio Image URL
            </label>

            <input
              name="image"
              type="url"
              value={form.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className={inputClass}
            />

            {form.image && (
              <img
                src={form.image}
                alt="Studio preview"
                className="mt-4 h-48 w-full rounded-xl border border-gray-200 object-cover dark:border-gray-700"
              />
            )}
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
                placeholder="Add an amenity"
                className={`min-w-0 flex-1 ${inputClass}`}
              />

              <button
                type="button"
                onClick={addAmenity}
                aria-label="Add amenity"
                className="rounded-lg bg-orange-600 px-4 text-white transition hover:bg-orange-700"
              >
                <Plus size={20} />
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {amenities.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-2 rounded-full bg-gray-200 px-3 py-2 text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                >
                  {item}

                  <button
                    type="button"
                    onClick={() => removeAmenity(item)}
                    aria-label={`Remove ${item}`}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              maxLength={2000}
              placeholder="Describe your studio..."
              className={`${inputClass} resize-y`}
            />
          </div>

          {/* Message */}
          {message && (
            <p
              role="alert"
              className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300"
            >
              {message}
            </p>
          )}

          {/* Buttons */}
          <div className="flex flex-col gap-3 pt-3 sm:flex-row">
            <button
              type="submit"
              disabled={saving}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <Loader2 className="animate-spin" size={19} />
              ) : (
                <Save size={19} />
              )}

              {saving ? "Saving..." : "Save Changes"}
            </button>

            <Link
              href="/my-listings"
              className="rounded-xl border border-gray-300 px-6 py-3 text-center font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

export default function EditStudioPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-800 dark:bg-gray-950 dark:text-white">
          Loading Edit Studio...
        </div>
      }
    >
      <EditStudioForm />
    </Suspense>
  );
}
