
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2,
  MapPin,
  Pencil,
  Trash2,
  Plus,
  X,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  RefreshCw,
} from "lucide-react";

const API_URL = "http://localhost:5002";

type Studio = {
  id: string;
  name: string;
  category: string;
  location: string;
  price: number;
  image?: string;
  description?: string;
};

export default function MyListingsPage() {
  const router = useRouter();

  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedStudio, setSelectedStudio] = useState<Studio | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [notification, setNotification] = useState("");

  const loadStudios = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/my-studios`, {
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
        throw new Error(
          result.message || "Unable to load studios."
        );
      }

      setStudios(Array.isArray(result.data) ? result.data : []);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Backend connection failed."
      );
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    loadStudios();
  }, [loadStudios]);

  const deleteStudio = async () => {
    if (!selectedStudio || deleting) return;

    setDeleting(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/api/studios/${selectedStudio.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.status === 401) {
        router.replace("/login");
        return;
      }

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Delete failed.");
      }

      setStudios((previous) =>
        previous.filter(
          (studio) => studio.id !== selectedStudio.id
        )
      );

      setSelectedStudio(null);
      setNotification("Studio deleted successfully!");
    } catch (err) {
      console.error(err);
      setNotification(
        err instanceof Error
          ? err.message
          : "Unable to delete studio."
      );
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    if (!notification) return;

    const timer = setTimeout(() => {
      setNotification("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [notification]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F5F0] text-gray-700 dark:bg-gray-950 dark:text-white">
        <Loader2 className="mr-3 animate-spin text-orange-500" size={25} />
        Loading your studios...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F5F0] px-5 py-10 text-gray-900 transition-colors dark:bg-gray-950 dark:text-white">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-orange-600 dark:text-orange-500">
              HOST DASHBOARD
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              My Studio Listings
            </h1>

            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Manage your creative spaces.
            </p>
          </div>

          <Link
            href="/add-studio"
            className="flex items-center gap-2 rounded-lg bg-orange-600 px-5 py-3 text-white transition hover:bg-orange-700"
          >
            <Plus size={20} />
            Add New Studio
          </Link>
        </div>

        {/* Statistics */}
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <p className="text-gray-500 dark:text-gray-400">
            Total Studios
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {studios.length}
          </h2>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-600 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
            <p>{error}</p>

            <button
              onClick={loadStudios}
              className="flex items-center gap-2 rounded-lg border border-red-300 px-4 py-2 text-sm dark:border-red-800"
            >
              <RefreshCw size={15} />
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {studios.length === 0 && !error ? (
          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <Building2
              size={50}
              className="mx-auto mb-4 text-gray-400 dark:text-gray-500"
            />

            <h2 className="text-xl font-bold">
              No Studios Yet
            </h2>

            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Start by adding your first creative studio.
            </p>

            <Link
              href="/add-studio"
              className="mt-5 inline-block rounded-lg bg-orange-600 px-5 py-3 text-white hover:bg-orange-700"
            >
              Add Your First Studio
            </Link>
          </div>
        ) : (
          /* Studio Cards */
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {studios.map((studio) => (
              <div
                key={studio.id}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
              >
                {studio.image ? (
                  <img
                    src={studio.image}
                    alt={studio.name}
                    className="h-52 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-52 items-center justify-center bg-gray-100 dark:bg-gray-800">
                    <Building2
                      size={50}
                      className="text-gray-400 dark:text-gray-600"
                    />
                  </div>
                )}

                <div className="p-5">
                  <span className="text-xs font-medium text-orange-600 dark:text-orange-400">
                    {studio.category}
                  </span>

                  <h2 className="mt-2 text-xl font-bold">
                    {studio.name}
                  </h2>

                  <p className="mt-2 flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <MapPin size={16} />
                    {studio.location}
                  </p>

                  <p className="mt-4 text-lg font-bold">
                    ৳{studio.price}
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {" "}/ hour
                    </span>
                  </p>

                  <div className="mt-5 flex gap-3">
                    <Link
                      href={`/studios/edit/${studio.id}`}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 py-2 text-white transition hover:bg-blue-700"
                    >
                      <Pencil size={16} />
                      Edit
                    </Link>

                    <button
                      onClick={() => setSelectedStudio(studio)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 py-2 text-white transition hover:bg-red-700"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {selectedStudio && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-700 dark:bg-gray-900">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/10">
                <AlertTriangle size={25} className="text-red-500" />
              </div>

              <button
                onClick={() => setSelectedStudio(null)}
                disabled={deleting}
                aria-label="Close delete confirmation"
                className="text-gray-500 hover:text-gray-900 disabled:opacity-50 dark:text-gray-400 dark:hover:text-white"
              >
                <X size={23} />
              </button>
            </div>

            <h2 className="mb-2 text-2xl font-bold">
              Delete Studio?
            </h2>

            <p className="mb-6 text-gray-500 dark:text-gray-400">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {selectedStudio.name}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setSelectedStudio(null)}
                disabled={deleting}
                className="flex-1 rounded-lg border border-gray-300 py-3 text-gray-700 transition hover:bg-gray-100 disabled:opacity-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                Cancel
              </button>

              <button
                onClick={deleteStudio}
                disabled={deleting}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deleting ? (
                  <>
                    <Loader2 size={17} className="animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Yes, Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-[110] flex max-w-[calc(100%-3rem)] items-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-4 text-gray-900 shadow-xl dark:border-gray-700 dark:bg-gray-900 dark:text-white">
          <CheckCircle2 size={21} className="shrink-0 text-green-500" />
          <span>{notification}</span>

          <button
            onClick={() => setNotification("")}
            aria-label="Close notification"
            className="ml-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <X size={18} />
          </button>
        </div>
      )}
    </main>
  );
}
