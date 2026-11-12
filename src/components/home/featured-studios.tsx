"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin, Star } from "lucide-react";

type Studio = {
  id: string;
  name: string;
  category: string;
  location: string;
  price: number;
  rating?: number;
  image?: string;
};

type StudiosResponse = {
  success: boolean;
  data: Studio[];
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85",
];

export default function FeaturedStudios() {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadStudios() {
      if (!API_URL) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/studios`, {
          cache: "no-store",
          headers: { Accept: "application/json" },
        });
        if (!response.ok) throw new Error("Could not load studios");

        const result: StudiosResponse = await response.json();
        if (!result.success || !Array.isArray(result.data)) {
          throw new Error("Invalid studios response");
        }

        if (active) setStudios(result.data.slice(0, 6));
      } catch (err) {
        console.error("Featured studios error:", err);
        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadStudios();
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="bg-white py-20 transition-colors duration-300 dark:bg-[#11151F] md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F15A3B]">
              Handpicked for you
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#171717] dark:text-white md:text-5xl">
              Spaces worth <span className="text-[#F15A3B]">creating in.</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#77716B] dark:text-gray-400 md:text-base">
              Explore inspiring creative spaces selected to help bring your next big idea to life.
            </p>
          </div>
          <Link
            href="/studios"
            className="flex items-center gap-2 rounded-full border border-[#E9E2D9] px-6 py-3 text-sm font-semibold text-[#171717] transition-all hover:border-[#F15A3B] hover:text-[#F15A3B] dark:border-gray-600 dark:text-gray-200 dark:hover:border-[#F15A3B] dark:hover:text-[#F15A3B]"
          >
            Explore all studios <ArrowUpRight size={17} />
          </Link>
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-[4/3] rounded-2xl bg-[#EEEAE3] dark:bg-[#222B39]" />
                <div className="mt-4 h-5 w-2/3 rounded bg-[#EEEAE3] dark:bg-[#222B39]" />
                <div className="mt-3 h-4 w-1/2 rounded bg-[#EEEAE3] dark:bg-[#222B39]" />
              </div>
            ))}
          </div>
        ) : error ? (
          <p className="rounded-2xl bg-[#F7F5F0] p-8 text-center text-sm text-[#77716B] dark:bg-[#1C2431] dark:text-gray-300">
            Featured studios are temporarily unavailable. Please explore all studios.
          </p>
        ) : studios.length === 0 ? (
          <p className="rounded-2xl bg-[#F7F5F0] p-8 text-center text-sm text-[#77716B] dark:bg-[#1C2431] dark:text-gray-300">
            No studios have been listed yet. Please check back soon.
          </p>
        ) : (
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {studios.map((studio, index) => (
              <article key={studio.id} className="group overflow-hidden">
                <Link
                  href={`/studios/${studio.id}`}
                  className="relative block aspect-[4/3] overflow-hidden rounded-2xl bg-[#EEEAE3] dark:bg-[#222B39]"
                >
                  <div
                    role="img"
                    aria-label={studio.name}
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url("${studio.image?.trim() || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]}")` }}
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-[#171717] backdrop-blur">
                    {studio.category}
                  </div>
                  {typeof studio.rating === "number" && studio.rating > 0 && (
                    <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/95 px-3 py-2 text-xs font-bold text-[#171717]">
                      <Star size={13} fill="#F15A3B" className="text-[#F15A3B]" />
                      {studio.rating.toFixed(1)}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                </Link>
                <div className="pt-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold tracking-tight text-[#171717] transition-colors group-hover:text-[#F15A3B] dark:text-white">
                      {studio.name}
                    </h3>
                    <span className="shrink-0 text-sm font-bold text-[#171717] dark:text-white">
                      ${studio.price}<span className="font-normal text-[#99918A] dark:text-gray-400">/hr</span>
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 text-sm text-[#88817A] dark:text-gray-400">
                    <MapPin size={15} /> {studio.location}
                  </div>
                  <div className="mt-4 flex items-center justify-end border-t border-[#EEEAE3] pt-4 dark:border-gray-700">
                    <Link
                      href={`/studios/${studio.id}`}
                      className="flex items-center gap-1 text-sm font-semibold text-[#171717] transition-colors hover:text-[#F15A3B] dark:text-white dark:hover:text-[#F15A3B]"
                    >
                      View Details <ArrowUpRight size={15} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
