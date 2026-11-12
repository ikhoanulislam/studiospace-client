
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Search,
  Sparkles,
  Star,
  Camera,
  Mic2,
  Film,
  CalendarCheck,
  CreditCard,
  CheckCircle2,
} from "lucide-react";

import FeaturedStudios from "@/components/home/featured-studios";
import EventsPreview from "@/components/home/events-preview";

const categories = [
  { name: "Photography", icon: Camera },
  { name: "Film & Production", icon: Film },
  { name: "Podcast Rooms", icon: Mic2 },
];

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discover Your Space",
    description:
      "Explore a wide range of creative studios. Filter by location, category, and your creative needs.",
  },
  {
    number: "02",
    icon: CalendarCheck,
    title: "Choose Your Time",
    description:
      "Find the perfect studio, check its details, and select a date and time that works for you.",
  },
  {
    number: "03",
    icon: CreditCard,
    title: "Book Your Studio",
    description:
      "Complete your booking request and get ready to bring your creative vision to life.",
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Create Something Amazing",
    description:
      "Show up, explore your creativity, and make something unforgettable in your chosen space.",
  },
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#F7F5F0] text-[#171717] transition-colors duration-300 dark:bg-[#11151F] dark:text-gray-100">

      {/* Hero Section */}
      <section className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-2 lg:px-16">

        <div className="relative z-10">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#E9DCD3] bg-white px-4 py-2 dark:border-gray-700 dark:bg-[#1C2431]">
            <Sparkles size={15} className="text-[#F15A3B]" />
            <span className="text-xs font-semibold tracking-wide text-[#6C625C] dark:text-gray-300">
              YOUR SPACE. YOUR CREATIVE VISION.
            </span>
          </div>

          <h1 className="max-w-2xl font-serif text-5xl font-bold leading-[1.12] tracking-tight md:text-6xl lg:text-7xl">
            Find your space.
            <br />
            <span className="text-[#F15A3B]">Create your</span>
            <br />
            masterpiece.
          </h1>

          <p className="mt-7 max-w-lg text-base leading-8 text-[#77716B] dark:text-gray-400 md:text-lg">
            Discover inspiring creative spaces built for your next big idea.
            From photography studios to podcast rooms, find the perfect place
            to bring your vision to life.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/studios"
              className="flex items-center gap-3 rounded-full bg-[#F15A3B] px-7 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-1 hover:bg-[#D94A30]"
            >
              Explore Studios
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/host/apply"
              className="flex items-center gap-2 rounded-full border border-[#D9D3CB] bg-white px-7 py-4 text-sm font-semibold text-[#171717] transition-all hover:border-[#171717] dark:border-gray-600 dark:bg-[#1C2431] dark:text-white dark:hover:border-[#F15A3B]"
            >
              Host Your Space
              <ArrowUpRight size={17} />
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-8 border-t border-[#E6E0D8] pt-8 dark:border-gray-700">
            <div>
              <h3 className="text-2xl font-bold">500+</h3>
              <p className="mt-1 text-xs text-[#88817A] dark:text-gray-400">
                Creative Spaces
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold">2k+</h3>
              <p className="mt-1 text-xs text-[#88817A] dark:text-gray-400">
                Happy Creators
              </p>
            </div>

            <div>
              <div className="flex items-center gap-1">
                <Star size={18} fill="#F15A3B" className="text-[#F15A3B]" />
                <h3 className="text-2xl font-bold">4.9</h3>
              </div>
              <p className="mt-1 text-xs text-[#88817A] dark:text-gray-400">
                Average Rating
              </p>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative">
          <div
            className="relative min-h-[420px] overflow-hidden rounded-[28px] bg-cover bg-center shadow-xl md:min-h-[570px]"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=85')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/5" />

            <div className="absolute left-6 top-6 rounded-full bg-white/90 px-4 py-2 backdrop-blur-md">
              <span className="text-xs font-semibold text-[#171717]">
                ✦ SPACES THAT INSPIRE
              </span>
            </div>

            <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between gap-4 text-white">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-white/70">
                  Featured Space
                </p>
                <h2 className="mt-2 text-2xl font-bold md:text-3xl">
                  The Creative Room
                </h2>
                <p className="mt-2 flex items-center gap-1 text-sm text-white/80">
                  <MapPin size={15} />
                  Creative District
                </p>
              </div>

              <div className="rounded-2xl bg-white/15 p-4 backdrop-blur-lg">
                <Star size={18} fill="#FBBF24" className="text-yellow-400" />
                <p className="mt-1 text-sm font-bold">4.9</p>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-7 -left-3 rounded-2xl border border-black/5 bg-white p-4 shadow-xl dark:border-gray-700 dark:bg-[#1C2431] md:-left-8 md:p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FCE8E2] text-[#F15A3B]">
                <Camera size={22} />
              </div>
              <div>
                <p className="text-sm font-bold text-[#171717] dark:text-white">
                  Ready to create?
                </p>
                <p className="mt-1 text-xs text-[#88817A] dark:text-gray-400">
                  Your next idea starts here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="mx-auto max-w-[1440px] px-5 pb-20 pt-12 md:px-10 lg:px-16">
        <div className="rounded-3xl border border-[#E9E2D9] bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-[#1C2431] md:p-7">
          <div className="mb-5">
            <h2 className="text-xl font-bold">
              Find your perfect studio
            </h2>
            <p className="mt-1 text-sm text-[#88817A] dark:text-gray-400">
              A space for every creative idea.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]">
            <div className="flex items-center gap-3 rounded-xl border border-[#EAE5DF] p-4 dark:border-gray-600 dark:bg-[#151B26]">
              <MapPin className="text-[#F15A3B]" size={20} />
              <div>
                <p className="text-xs font-semibold">Location</p>
                <input
                  placeholder="Where do you want to create?"
                  className="mt-1 w-full min-w-0 bg-transparent text-sm text-[#171717] outline-none placeholder:text-[#A7A19A] dark:text-white dark:placeholder:text-gray-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-[#EAE5DF] p-4 dark:border-gray-600 dark:bg-[#151B26]">
              <Camera className="text-[#F15A3B]" size={20} />
              <div className="w-full">
                <p className="text-xs font-semibold">Studio Type</p>
                <select className="mt-1 w-full bg-transparent text-sm text-[#77716B] outline-none dark:text-gray-300">
                  <option value="">All Categories</option>
                  <option>Photography Studio</option>
                  <option>Film Stage</option>
                  <option>Podcast Lounge</option>
                  <option>Music Suite</option>
                  <option>Art Workshop</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-[#EAE5DF] p-4 dark:border-gray-600 dark:bg-[#151B26]">
              <Sparkles className="text-[#F15A3B]" size={20} />
              <div>
                <p className="text-xs font-semibold">Your Purpose</p>
                <p className="mt-1 text-sm text-[#A7A19A] dark:text-gray-400">
                  Bring your vision to life
                </p>
              </div>
            </div>

            <Link
              href="/studios"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#171717] px-7 py-4 font-semibold text-white transition-colors hover:bg-[#F15A3B] dark:bg-[#F15A3B] dark:hover:bg-[#D94A30]"
            >
              <Search size={19} />
              Search
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Studios */}
      <FeaturedStudios />

      {/* Categories Preview */}
      <section className="mx-auto max-w-[1440px] px-5 pb-20 md:px-10 lg:px-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F15A3B]">
              Explore Possibilities
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Find your creative space
            </h2>
          </div>

          <Link
            href="/studios"
            className="flex items-center gap-2 text-sm font-semibold hover:text-[#F15A3B]"
          >
            View all spaces <ArrowUpRight size={17} />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.name}
                href="/studios"
                className="group flex items-center justify-between rounded-2xl border border-[#E9E2D9] bg-white p-6 transition-all hover:-translate-y-1 hover:border-[#F15A3B] dark:border-gray-700 dark:bg-[#1C2431]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FCE8E2] text-[#F15A3B] transition-colors group-hover:bg-[#F15A3B] group-hover:text-white">
                    <Icon size={23} />
                  </div>
                  <span className="font-semibold">{category.name}</span>
                </div>

                <ArrowUpRight
                  size={20}
                  className="text-[#A7A19A] transition-colors group-hover:text-[#F15A3B]"
                />
              </Link>
            );
          })}
        </div>
      </section>

      <EventsPreview />

      {/* How It Works */}
      <section
        id="how-it-works"
        className="scroll-mt-24 bg-white py-20 transition-colors duration-300 dark:bg-[#171E2A] md:py-28"
      >
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F15A3B]">
              Simple & Easy
            </p>
            <h2 className="mt-4 font-serif text-4xl font-bold md:text-5xl">
              How It <span className="text-[#F15A3B]">Works</span>
            </h2>
            <p className="mt-5 text-base leading-8 text-[#77716B] dark:text-gray-400">
              Finding and booking your perfect creative space has never been
              easier. Just follow these four simple steps.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="group relative rounded-3xl border border-[#E9E2D9] bg-[#F7F5F0] p-7 transition-all duration-300 hover:-translate-y-2 hover:border-[#F15A3B] hover:shadow-xl dark:border-gray-700 dark:bg-[#222B39]"
                >
                  <div className="mb-7 flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FCE8E2] text-[#F15A3B] transition-colors group-hover:bg-[#F15A3B] group-hover:text-white">
                      <Icon size={25} />
                    </div>
                    <span className="font-serif text-3xl font-bold text-[#E5DCD3] dark:text-gray-500">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#77716B] dark:text-gray-400">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/studios"
              className="inline-flex items-center gap-3 rounded-full bg-[#F15A3B] px-8 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-1 hover:bg-[#D94A30]"
            >
              Find Your Studio
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
