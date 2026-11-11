
export default function StudioDetailsLoading() {
  return (
    <main className="min-h-screen animate-pulse bg-[#F7F5F0] px-5 py-12 md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1200px]">

        {/* Back Link */}
        <div className="mb-8 h-4 w-32 rounded bg-gray-200" />

        {/* Studio Image */}
        <div className="h-[300px] rounded-3xl bg-gray-200 md:h-[480px]" />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">

          {/* Studio Information */}
          <section className="space-y-6">
            <div className="h-4 w-32 rounded bg-gray-200" />
            <div className="h-10 w-3/4 rounded-lg bg-gray-200" />
            <div className="h-5 w-48 rounded bg-gray-200" />

            <div className="space-y-3 pt-5">
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-2/3 rounded bg-gray-200" />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 sm:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-20 rounded-xl bg-gray-200"
                />
              ))}
            </div>
          </section>

          {/* Booking Card */}
          <aside className="h-[420px] rounded-3xl border border-gray-200 bg-white p-6">
            <div className="h-8 w-32 rounded bg-gray-200" />
            <div className="mt-5 h-4 w-48 rounded bg-gray-200" />
            <div className="mt-8 h-12 rounded-xl bg-gray-100" />
            <div className="mt-4 h-12 rounded-xl bg-gray-100" />
            <div className="mt-8 h-12 rounded-full bg-gray-200" />
          </aside>

        </div>
      </div>
    </main>
  );
}
