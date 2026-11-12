
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  MapPin,
  Star,
  CheckCircle2,
  Clock,
  Wifi,
  Camera,
  Music,
  Users,
  ShieldCheck,
} from "lucide-react";
import BookingCard from "@/components/studios/booking-card";

type Studio = {
  id?: string;
  _id?: string;
  name: string;
  category: string;
  location: string;
  price: number;
  rating?: number;
  reviews?: number;
  image?: string;
  description?: string;
  amenities?: string[];
  capacity?: number;
  securityDeposit?: number;
};

type PageProps = {
  params: Promise<{ id: string }>;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function StudioDetailsPage({ params }: PageProps) {
  const { id } = await params;

  let studio: Studio;

  try {
    const response = await fetch(
      `${API_URL}/api/studios/${encodeURIComponent(id)}`,
      { cache: "no-store" }
    );

    if (!response.ok) notFound();

    const result = await response.json();

    if (!result.success || !result.data) notFound();

    studio = result.data;
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_NOT_FOUND") {
      throw error;
    }

    console.error("Studio details error:", error);
    notFound();
  }

  const rating = Number(studio.rating) || 0;
  const reviews = Number(studio.reviews) || 0;
  const price = Number(studio.price) || 0;
  const deposit = Number(studio.securityDeposit) || 0;

  const fallbackImage =
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85";

  const imageUrl = studio.image?.startsWith("http")
    ? studio.image
    : fallbackImage;

  const features =
    studio.amenities?.length
      ? studio.amenities
      : [
          "Creative Workspace",
          "Comfortable Seating",
          "High-Speed WiFi",
          "Professional Equipment",
        ];

  const openingHours = "9:00 AM - 8:00 PM";

  return (
    <main className="min-h-screen bg-[#F7F5F0] text-[#171717] transition-colors dark:bg-gray-950 dark:text-white">
      {/* Breadcrumb */}
      <section className="mx-auto max-w-[1440px] px-5 pt-8 md:px-10 lg:px-16">
        <Link
          href="/studios"
          className="inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-400"
        >
          <ArrowLeft size={17} />
          Back to Studios
        </Link>
      </section>

      {/* Heading */}
      <section className="mx-auto max-w-[1440px] px-5 py-8 md:px-10 lg:px-16">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">
              {studio.category}
            </p>

            <h1 className="font-serif text-4xl font-bold md:text-6xl">
              {studio.name}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-2">
                <MapPin size={17} />
                {studio.location}
              </span>

              <span className="flex items-center gap-2">
                <Star
                  size={16}
                  fill="#F15A3B"
                  className="text-orange-500"
                />
                {rating} ({reviews} reviews)
              </span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Starting from
            </p>

            <p className="text-3xl font-bold">
              ৳{price.toLocaleString("en-BD")}
              <span className="text-base font-normal text-gray-500 dark:text-gray-400">
                /hr
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        <div className="grid gap-3 overflow-hidden rounded-3xl md:grid-cols-3">
          <div
            className="h-[300px] bg-cover bg-center md:col-span-2 md:h-[480px]"
            style={{ backgroundImage: `url("${imageUrl}")` }}
          />

          <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
            <div
              className="min-h-[140px] rounded-xl bg-cover bg-center md:rounded-none"
              style={{ backgroundImage: `url("${imageUrl}")` }}
            />

            <div className="flex min-h-[140px] items-center justify-center bg-[#E9E2D9] text-gray-500 dark:bg-gray-800 dark:text-gray-400">
              <div className="text-center">
                <Camera size={28} className="mx-auto mb-2" />
                <p className="text-sm">Studio Gallery</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-14 md:px-10 lg:grid-cols-[1fr_380px] lg:px-16">
        <div>
          {/* About */}
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">
              About this space
            </p>

            <h2 className="font-serif text-3xl font-bold">
              Create something extraordinary.
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-8 text-gray-600 dark:text-gray-400">
              {studio.description ||
                "A creative space designed for your projects, ideas and professional work."}
            </p>
          </div>

          <div className="my-10 border-t border-[#E9E2D9] dark:border-gray-800" />

          {/* Features */}
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">
              Studio Facilities
            </p>

            <h2 className="font-serif text-3xl font-bold">
              Everything you need.
            </h2>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              {features.map((feature, index) => (
                <div
                  key={`${feature}-${index}`}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2
                    size={20}
                    className="shrink-0 text-orange-500"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="my-10 border-t border-[#E9E2D9] dark:border-gray-800" />

          {/* Information */}
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">
              Studio Information
            </p>

            <h2 className="font-serif text-3xl font-bold">
              Good to know.
            </h2>

            <div className="mt-7 space-y-6">
              <div className="flex items-center gap-4">
                <Clock className="text-orange-500" size={22} />
                <div>
                  <p className="text-sm font-bold">Opening Hours</p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {openingHours}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <MapPin className="text-orange-500" size={22} />
                <div>
                  <p className="text-sm font-bold">Location</p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {studio.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {studio.category === "Music Studio" ? (
                  <Music className="text-orange-500" size={22} />
                ) : (
                  <Wifi className="text-orange-500" size={22} />
                )}

                <div>
                  <p className="text-sm font-bold">Studio Category</p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {studio.category}
                  </p>
                </div>
              </div>

              {studio.capacity ? (
                <div className="flex items-center gap-4">
                  <Users className="text-orange-500" size={22} />
                  <div>
                    <p className="text-sm font-bold">Capacity</p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {studio.capacity} people
                    </p>
                  </div>
                </div>
              ) : null}

              <div className="flex items-center gap-4">
                <ShieldCheck className="text-orange-500" size={22} />
                <div>
                  <p className="text-sm font-bold">Security Deposit</p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    ৳{deposit.toLocaleString("en-BD")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Card */}
        <aside>
          <BookingCard
            key={id}
            studioId={id}
            studioName={studio.name}
            price={price}
            rating={rating}
            reviews={reviews}
            hours={openingHours}
          />
        </aside>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#191919] px-5 py-16 text-center text-white dark:bg-black">
        <h2 className="font-serif text-3xl font-bold md:text-4xl">
          Ready to create something amazing?
        </h2>

        <p className="mt-4 text-sm text-white/60">
          Find your perfect creative space with StudioSpace.
        </p>

        <Link
          href="/studios"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-orange-600 px-7 py-4 text-sm font-bold transition hover:bg-orange-700"
        >
          Explore More Studios
          <ArrowUpRight size={17} />
        </Link>
      </section>
    </main>
  );
}
