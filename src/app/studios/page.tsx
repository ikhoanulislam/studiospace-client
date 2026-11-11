
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Search,
  Star,
  SlidersHorizontal,
} from "lucide-react";

type Studio = {
  id: string;
  name: string;
  category: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image?: string;
  description?: string;
};

type ApiResponse = {
  success: boolean;
  total: number;
  data: Studio[];
};

const API_URL = "http://localhost:5002/api/studios";

const studioVisuals: Record<
  string,
  { image: string; description: string }
> = {
  "studio-01": {
    image: "photo-1598488035139-bdbb2231ce04",
    description: "A premium creative music studio for musicians and producers.",
  },
  "studio-02": {
    image: "photo-1492691527719-9d1e07e534b4",
    description: "A beautiful photography space for professional photographers.",
  },
  "studio-03": {
    image: "photo-1590602847861-f357a9332bbc",
    description: "A professional podcast recording environment.",
  },
  "studio-04": {
    image: "photo-1485846234645-a62644f84728",
    description: "A production-ready creative space for filmmakers.",
  },
  "studio-05": {
    image: "photo-1460661419201-fd4cecdf8a8b",
    description: "An inspiring art workshop for creative minds.",
  },
  "studio-06": {
    image: "photo-1524368535928-5b5e00ddc76b",
    description: "A modern music production and recording space.",
  },
};

const categories = [
  "All Studios",
  "Music Suite",
  "Photography",
  "Podcast Lounge",
  "Film & Production",
  "Art Workshop",
];

export default function StudiosPage() {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Studios");
  const [maxPrice, setMaxPrice] = useState(200);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("recommended");

  useEffect(() => {
    let active = true;

    const fetchStudios = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL, {
          method: "GET",
          cache: "no-store",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const result: ApiResponse = await response.json();

        if (!result.success || !Array.isArray(result.data)) {
          throw new Error("Invalid API response.");
        }

        if (active) {
          setStudios(result.data);
        }
      } catch (err) {
        console.error("Studio API Error:", err);

        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load studios. Please check your backend."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchStudios();

    return () => {
      active = false;
    };
  }, []);

  const filteredStudios = useMemo(() => {
    let result = studios.filter((studio) => {
      const matchesSearch =
        studio.name.toLowerCase().includes(search.toLowerCase()) ||
        studio.location.toLowerCase().includes(search.toLowerCase()) ||
        studio.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All Studios" ||
        studio.category === category;

      const matchesPrice = studio.price <= maxPrice;
      const matchesRating = (studio.rating || 0) >= minRating;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice &&
        matchesRating
      );
    });

    if (sort === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      result = [...result].sort(
        (a, b) => (b.rating || 0) - (a.rating || 0)
      );
    }

    return result;
  }, [studios, search, category, maxPrice, minRating, sort]);

  const resetFilters = () => {
    setSearch("");
    setCategory("All Studios");
    setMaxPrice(200);
    setMinRating(0);
    setSort("recommended");
  };

  return (
    <main className="min-h-screen bg-[#F7F5F0] text-[#171717] transition-colors duration-300 dark:bg-[#11151F] dark:text-gray-100">

      {/* Header */}
      <section className="bg-[#191919] px-5 py-16 text-white transition-colors duration-300 dark:bg-[#0B101A] md:py-24">
        <div className="mx-auto max-w-[1440px] md:px-10 lg:px-16">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#F15A3B]">
            Discover creative spaces
          </p>

          <h1 className="max-w-3xl font-serif text-4xl font-bold leading-tight md:text-6xl">
            Find the perfect space
            <br />
            for your next creation.
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-white/60 md:text-base">
            Explore unique studios, creative spaces and professional
            environments for your next big idea.
          </p>

          {/* Search */}
          <div className="mt-9 flex max-w-2xl items-center gap-3 rounded-full bg-white p-2 dark:bg-[#1C2431]">
            <Search className="ml-3 shrink-0 text-[#77716B] dark:text-gray-400" size={20} />

            <input
              type="text"
              placeholder="Search studios, categories or locations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="min-w-0 flex-1 bg-transparent py-3 text-sm text-[#171717] outline-none placeholder:text-[#99918A] dark:text-white dark:placeholder:text-gray-500"
            />

            <button
              type="button"
              onClick={() => setSearch(search.trim())}
              className="rounded-full bg-[#F15A3B] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#DB472C]"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Listing */}
      <section className="mx-auto max-w-[1440px] px-5 py-14 md:px-10 lg:px-16">

        {/* Categories */}
        <div className="mb-10">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#F15A3B]">
            Browse by category
          </p>

          <div className="flex flex-wrap gap-3">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-full border px-5 py-3 text-sm font-semibold transition ${
                  category === item
                    ? "border-[#F15A3B] bg-[#F15A3B] text-white"
                    : "border-[#E9E2D9] bg-white text-[#55504B] hover:border-[#F15A3B] dark:border-gray-700 dark:bg-[#1C2431] dark:text-gray-300 dark:hover:border-[#F15A3B] dark:hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Filters and Results */}
        <div className="grid gap-10 lg:grid-cols-[260px_1fr]">

          {/* Sidebar */}
          <aside className="h-fit rounded-3xl border border-[#E9E2D9] bg-white p-6 dark:border-gray-700 dark:bg-[#1C2431]">
            <div className="mb-7 flex items-center gap-2">
              <SlidersHorizontal
                size={19}
                className="text-[#F15A3B]"
              />
              <h2 className="text-lg font-bold">Filters</h2>
            </div>

            {/* Price */}
            <div className="mb-8">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-bold">Maximum Price</h3>
                <span className="text-sm font-bold text-[#F15A3B]">
                  ${maxPrice}
                </span>
              </div>

              <input
                type="range"
                min="40"
                max="200"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#F15A3B]"
              />

              <div className="mt-2 flex justify-between text-xs text-[#88817A] dark:text-gray-400">
                <span>$40</span>
                <span>$200</span>
              </div>
            </div>

            <div className="mb-8 border-t border-[#E9E2D9] dark:border-gray-700" />

            {/* Rating */}
            <div className="mb-8">
              <h3 className="mb-4 text-sm font-bold">Minimum Rating</h3>

              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="w-full rounded-xl border border-[#E9E2D9] bg-[#F7F5F0] p-3 text-sm text-[#171717] outline-none focus:border-[#F15A3B] dark:border-gray-600 dark:bg-[#151B26] dark:text-white"
              >
                <option value={0}>All Ratings</option>
                <option value={4.5}>4.5+ Stars</option>
                <option value={4.8}>4.8+ Stars</option>
                <option value={4.9}>4.9+ Stars</option>
                <option value={5}>5.0 Stars</option>
              </select>
            </div>

            <button
              onClick={resetFilters}
              className="w-full rounded-full border border-[#E9E2D9] py-3 text-sm font-bold transition hover:border-[#F15A3B] hover:text-[#F15A3B] dark:border-gray-600 dark:text-gray-200 dark:hover:border-[#F15A3B] dark:hover:text-[#F15A3B]"
            >
              Reset Filters
            </button>
          </aside>

          {/* Studio Results */}
          <div>
            <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-3xl font-bold">
                  Explore Studios
                </h2>

                <p className="mt-2 text-sm text-[#88817A] dark:text-gray-400">
                  {loading
                    ? "Loading studios..."
                    : `${filteredStudios.length} studios found`}
                </p>
              </div>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-full border border-[#E9E2D9] bg-white px-5 py-3 text-sm text-[#171717] outline-none focus:border-[#F15A3B] dark:border-gray-600 dark:bg-[#1C2431] dark:text-white"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Loading */}
            {loading && (
              <div className="rounded-3xl border border-[#E9E2D9] bg-white px-6 py-20 text-center dark:border-gray-700 dark:bg-[#1C2431]">
                <p className="text-sm text-[#88817A] dark:text-gray-400">
                  Loading studios from server...
                </p>
              </div>
            )}

            {/* API Error */}
            {!loading && error && (
              <div className="rounded-3xl border border-red-200 bg-white px-6 py-20 text-center dark:border-red-900 dark:bg-[#1C2431]">
                <h3 className="text-xl font-bold">
                  Could not load studios
                </h3>

                <p className="mt-3 text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>

                <button
                  onClick={() => window.location.reload()}
                  className="mt-6 rounded-full bg-[#F15A3B] px-6 py-3 text-sm font-bold text-white hover:bg-[#DB472C]"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Studio Cards */}
            {!loading && !error && filteredStudios.length > 0 && (
              <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
                {filteredStudios.map((studio) => {
                  const visual = studioVisuals[studio.id];

                  const imageUrl = studio.image
                    ? studio.image
                    : visual
                      ? `https://images.unsplash.com/${visual.image}?auto=format&fit=crop&w=900&q=85`
                      : "";

                  return (
                    <article
                      key={studio.id}
                      className="group overflow-hidden rounded-3xl border border-[#E9E2D9] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-700 dark:bg-[#1C2431]"
                    >
                      <div className="relative h-56 overflow-hidden">
                        {imageUrl ? (
                          <div
                            className="h-full w-full bg-cover bg-center transition duration-500 group-hover:scale-105"
                            style={{
                              backgroundImage: `url(${imageUrl})`,
                            }}
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-[#E9E2D9] dark:bg-[#222B39]">
                            <Search size={40} className="text-[#88817A] dark:text-gray-400" />
                          </div>
                        )}

                        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-[#171717]">
                          {studio.category}
                        </span>

                        <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/95 px-3 py-2 text-xs font-bold text-[#171717]">
                          <Star size={13} fill="#F15A3B" className="text-[#F15A3B]" />
                          {studio.rating || "New"}
                        </span>
                      </div>

                      <div className="p-6">
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <h3 className="text-xl font-bold text-[#171717] transition group-hover:text-[#F15A3B] dark:text-white">
                            {studio.name}
                          </h3>

                          <div className="flex shrink-0 items-center gap-1 text-sm font-bold">
                            <Star
                              size={15}
                              fill="#F15A3B"
                              className="text-[#F15A3B]"
                            />
                            {studio.rating || "New"}
                          </div>
                        </div>

                        <p className="mb-3 flex items-center gap-2 text-sm text-[#88817A] dark:text-gray-400">
                          <MapPin size={15} />
                          {studio.location}
                        </p>

                        <p className="min-h-10 text-sm leading-6 text-[#77716B] dark:text-gray-400">
                          {studio.description ||
                            visual?.description ||
                            "Discover this creative studio for your next project."}
                        </p>

                        <div className="my-5 border-t border-[#E9E2D9] dark:border-gray-700" />

                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-2xl font-bold text-[#171717] dark:text-white">
                              ${studio.price}
                              <span className="text-xs font-normal text-[#88817A] dark:text-gray-400">
                                /hr
                              </span>
                            </p>

                            <p className="mt-1 text-xs text-[#88817A] dark:text-gray-400">
                              {studio.reviews || 0} reviews
                            </p>
                          </div>

                          <Link
                            href={`/studios/${studio.id}`}
                            className="inline-flex items-center gap-2 rounded-full bg-[#F15A3B] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#DB472C]"
                          >
                            View Details
                            <ArrowUpRight size={16} />
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {/* No Results */}
            {!loading && !error && filteredStudios.length === 0 && (
              <div className="rounded-3xl border border-[#E9E2D9] bg-white px-6 py-20 text-center dark:border-gray-700 dark:bg-[#1C2431]">
                <Search
                  size={36}
                  className="mx-auto mb-4 text-[#C3BBB1] dark:text-gray-500"
                />

                <h3 className="text-xl font-bold">
                  No studios found
                </h3>

                <p className="mt-2 text-sm text-[#88817A] dark:text-gray-400">
                  Try changing your search or filters.
                </p>

                <button
                  onClick={resetFilters}
                  className="mt-6 rounded-full bg-[#F15A3B] px-6 py-3 text-sm font-bold text-white hover:bg-[#DB472C]"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#191919] px-5 py-16 text-center text-white transition-colors duration-300 dark:bg-[#0B101A]">
        <h2 className="font-serif text-3xl font-bold md:text-4xl">
          Your next creative space is waiting.
        </h2>

        <p className="mt-4 text-sm text-white/60">
          Discover a space where your ideas come to life.
        </p>

        <Link
          href="/"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#F15A3B] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#DB472C]"
        >
          Back to Home
          <ArrowRight size={17} />
        </Link>
      </section>
    </main>
  );
}
