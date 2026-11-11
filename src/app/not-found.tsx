
import Link from "next/link";
import { Aperture, ArrowLeft, Search, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#F7F5F0] px-5 py-16">
      <div className="w-full max-w-xl text-center">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FCE8E2] text-[#F15A3B]">
          <Aperture size={34} />
        </div>

        <p className="mt-8 text-sm font-bold uppercase tracking-[0.3em] text-[#F15A3B]">
          StudioSpace Error
        </p>

        <h1 className="mt-4 font-serif text-8xl font-bold text-[#171717] md:text-9xl">
          404
        </h1>

        <h2 className="mt-5 text-2xl font-bold text-[#171717] md:text-3xl">
          Oops! This Space Doesn't Exist.
        </h2>

        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#77716A]">
          The page you are looking for may have been moved, removed, or
          temporarily unavailable. Let's help you find your creative space.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[#171717] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#F15A3B]"
          >
            <Home size={17} />
            Back to Home
          </Link>

          <Link
            href="/studios"
            className="inline-flex items-center gap-2 rounded-full border border-[#D9D3CB] bg-white px-7 py-4 text-sm font-semibold text-[#171717] transition hover:border-[#F15A3B] hover:text-[#F15A3B]"
          >
            <Search size={17} />
            Explore Studios
          </Link>
        </div>

        <Link
          href="/"
          className="mt-9 inline-flex items-center gap-2 text-sm text-[#88817A] transition hover:text-[#F15A3B]"
        >
          <ArrowLeft size={15} />
          Return to StudioSpace
        </Link>

      </div>
    </main>
  );
}
