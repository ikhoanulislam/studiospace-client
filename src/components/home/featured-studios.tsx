
import Link from "next/link";
import {
  ArrowUpRight,
  MapPin,
  Star,
} from "lucide-react";

const studios = [
  {
    id: "studio-01",
    name: "The Creative Room",
    category: "Music Suite",
    location: "New York, NY",
    price: 85,
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "studio-02",
    name: "Lightbox Studio",
    category: "Photography",
    location: "Brooklyn, NY",
    price: 65,
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "studio-03",
    name: "The Podcast House",
    category: "Podcast Lounge",
    location: "Los Angeles, CA",
    price: 55,
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "studio-04",
    name: "Frame Studios",
    category: "Film Stage",
    location: "Austin, TX",
    price: 120,
    rating: "5.0",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "studio-05",
    name: "The Art Collective",
    category: "Art Workshop",
    location: "Portland, OR",
    price: 45,
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "studio-06",
    name: "Soundwave Studio",
    category: "Music Suite",
    location: "Chicago, IL",
    price: 95,
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=900&q=85",
  },
];

export default function FeaturedStudios() {
  return (
    <section className="bg-white py-20 transition-colors duration-300 dark:bg-[#11151F] md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">

        {/* Section Heading */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F15A3B]">
              Handpicked for you
            </p>

            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#171717] dark:text-white md:text-5xl">
              Spaces worth{" "}
              <span className="text-[#F15A3B]">
                creating in.
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[#77716B] dark:text-gray-400 md:text-base">
              Explore inspiring creative spaces selected to help
              bring your next big idea to life.
            </p>
          </div>

          <Link
            href="/studios"
            className="flex items-center gap-2 rounded-full border border-[#E9E2D9] px-6 py-3 text-sm font-semibold text-[#171717] transition-all hover:border-[#F15A3B] hover:text-[#F15A3B] dark:border-gray-600 dark:text-gray-200 dark:hover:border-[#F15A3B] dark:hover:text-[#F15A3B]"
          >
            Explore all studios
            <ArrowUpRight size={17} />
          </Link>
        </div>

        {/* Studio Grid */}
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">

          {studios.map((studio) => (
            <article
              key={studio.id}
              className="group overflow-hidden"
            >
              {/* Image */}
              <Link
                href={`/studios/${studio.id}`}
                className="relative block aspect-[4/3] overflow-hidden rounded-2xl bg-[#EEEAE3] dark:bg-[#222B39]"
              >
                <div
                  role="img"
                  aria-label={studio.name}
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url("${studio.image}")`,
                  }}
                />

                <div className="absolute left-4 top-4 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-[#171717] backdrop-blur">
                  {studio.category}
                </div>

                <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/95 px-3 py-2 text-xs font-bold text-[#171717]">
                  <Star
                    size={13}
                    fill="#F15A3B"
                    className="text-[#F15A3B]"
                  />
                  {studio.rating}
                </div>

                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
              </Link>

              {/* Details */}
              <div className="pt-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold tracking-tight text-[#171717] transition-colors group-hover:text-[#F15A3B] dark:text-white">
                    {studio.name}
                  </h3>

                  <span className="shrink-0 text-sm font-bold text-[#171717] dark:text-white">
                    ${studio.price}
                    <span className="font-normal text-[#99918A] dark:text-gray-400">
                      /hr
                    </span>
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-1.5 text-sm text-[#88817A] dark:text-gray-400">
                  <MapPin size={15} />
                  {studio.location}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-[#EEEAE3] pt-4 dark:border-gray-700">
                  <span className="text-xs font-medium text-[#99918A] dark:text-gray-400">
                    Sample listing
                  </span>

                  <Link
                    href={`/studios/${studio.id}`}
                    className="flex items-center gap-1 text-sm font-semibold text-[#171717] transition-colors hover:text-[#F15A3B] dark:text-white dark:hover:text-[#F15A3B]"
                  >
                    View Details
                    <ArrowUpRight size={15} />
                  </Link>
                </div>
              </div>
            </article>
          ))}

        </div>
      </div>
    </section>
  );
}
