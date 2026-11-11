

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  Heart,
  Lightbulb,
  Target,
  Users,
  Sparkles,
} from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Creativity First",
    description:
      "We believe every great idea deserves the right environment to grow and become reality.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "We connect creators, photographers, filmmakers, and studio owners in one creative community.",
  },
  {
    icon: Target,
    title: "Simple & Accessible",
    description:
      "We make discovering and booking creative spaces easier, faster, and more convenient.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F5F0] text-[#171717] transition-colors duration-300 dark:bg-[#11151F] dark:text-gray-100">

      {/* Hero */}
      <section className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-2 lg:px-16">
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#E9DCD3] bg-white px-4 py-2 dark:border-gray-700 dark:bg-[#1C2431]">
            <Sparkles size={15} className="text-[#F15A3B]" />
            <span className="text-xs font-semibold tracking-wide text-[#6C625C] dark:text-gray-300">
              GET TO KNOW US
            </span>
          </div>

          <h1 className="max-w-2xl font-serif text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
            We connect
            <br />
            spaces with
            <br />
            <span className="text-[#F15A3B]">creativity.</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-[#77716B] dark:text-gray-400 md:text-lg">
            StudioSpace is a platform designed to help creators discover
            inspiring spaces for photography, filmmaking, podcasting, and
            other creative projects.
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
              href="/#how-it-works"
              className="flex items-center gap-2 rounded-full border border-[#D9D3CB] bg-white px-7 py-4 text-sm font-semibold text-[#171717] transition-all hover:border-[#F15A3B] dark:border-gray-600 dark:bg-[#1C2431] dark:text-white"
            >
              How It Works
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>

        <div className="relative">
          <div
            className="min-h-[420px] rounded-[28px] bg-cover bg-center shadow-xl md:min-h-[530px]"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=85')",
            }}
          />

          <div className="absolute -bottom-6 -left-3 rounded-2xl border border-black/5 bg-white p-5 shadow-xl dark:border-gray-700 dark:bg-[#1C2431] md:-left-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FCE8E2] text-[#F15A3B]">
                <Camera size={24} />
              </div>
              <div>
                <p className="font-bold text-[#171717] dark:text-white">
                  Your Space.
                </p>
                <p className="mt-1 text-sm text-[#88817A] dark:text-gray-400">
                  Your Creative Vision.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-white py-20 transition-colors duration-300 dark:bg-[#171E2A] md:py-28">
        <div className="mx-auto grid max-w-[1200px] gap-12 px-5 md:px-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F15A3B]">
              OUR STORY
            </p>
            <h2 className="mt-4 font-serif text-4xl font-bold leading-tight md:text-5xl">
              A space for every
              <span className="text-[#F15A3B]"> big idea.</span>
            </h2>
          </div>

          <div className="space-y-5 text-base leading-8 text-[#77716B] dark:text-gray-400">
            <p>
              Every creative project starts with an idea. But finding the
              right place to bring that idea to life can be challenging.
            </p>
            <p>
              That is why StudioSpace exists. We aim to make creative spaces
              easier to discover and book by connecting talented creators
              with suitable studio owners.
            </p>
            <p>
              Whether you are capturing a photograph, recording a podcast,
              or producing a film, we want to help you find a space where
              creativity feels limitless.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28 lg:px-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-[#171717] p-8 text-white md:p-12">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-[#F15A3B]">
              <Target size={28} />
            </div>
            <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-[#F15A3B]">
              OUR MISSION
            </p>
            <h3 className="mt-4 font-serif text-3xl font-bold md:text-4xl">
              Making creative spaces accessible.
            </h3>
            <p className="mt-5 leading-8 text-white/65">
              Our mission is to simplify the process of finding and booking
              creative studios while helping studio owners connect with
              more creators.
            </p>
          </div>

          <div className="rounded-3xl border border-[#E9E2D9] bg-white p-8 transition-colors dark:border-gray-700 dark:bg-[#1C2431] md:p-12">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FCE8E2] text-[#F15A3B]">
              <Lightbulb size={28} />
            </div>
            <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-[#F15A3B]">
              OUR VISION
            </p>
            <h3 className="mt-4 font-serif text-3xl font-bold md:text-4xl">
              Inspiring creativity everywhere.
            </h3>
            <p className="mt-5 leading-8 text-[#77716B] dark:text-gray-400">
              We envision a world where every creator can find the right
              environment, tools, and opportunities to turn ideas into
              meaningful experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-white py-20 transition-colors duration-300 dark:bg-[#171E2A] md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F15A3B]">
              WHAT WE BELIEVE
            </p>
            <h2 className="mt-4 font-serif text-4xl font-bold md:text-5xl">
              Our Core Values
            </h2>
            <p className="mt-5 leading-8 text-[#77716B] dark:text-gray-400">
              The principles that guide everything we do at StudioSpace.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="rounded-3xl border border-[#E9E2D9] bg-[#F7F5F0] p-8 transition-all hover:-translate-y-2 hover:border-[#F15A3B] hover:shadow-lg dark:border-gray-700 dark:bg-[#222B39]"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FCE8E2] text-[#F15A3B]">
                    <Icon size={26} />
                  </div>

                  <h3 className="mt-7 text-xl font-bold text-[#171717] dark:text-white">
                    {value.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#77716B] dark:text-gray-400">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1200px] rounded-[32px] bg-[#F15A3B] px-7 py-14 text-center text-white md:px-16 md:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/75">
            YOUR CREATIVE JOURNEY STARTS HERE
          </p>

          <h2 className="mx-auto mt-5 max-w-2xl font-serif text-4xl font-bold md:text-5xl">
            Ready to bring your ideas to life?
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-8 text-white/85">
            Discover your perfect creative space and make something amazing.
          </p>

          <Link
            href="/studios"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-bold text-[#F15A3B] transition-all hover:-translate-y-1 hover:bg-[#171717] hover:text-white"
          >
            Explore Studios
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
