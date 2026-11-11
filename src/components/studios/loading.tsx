
export default function StudiosLoading() {
  return (
    <main className="min-h-screen animate-pulse bg-[#F7F5F0] px-5 py-12 md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1440px]">

        {/* Heading Skeleton */}
        <div className="mb-10">
          <div className="h-4 w-32 rounded bg-gray-200" />
          <div className="mt-5 h-10 w-72 max-w-full rounded-lg bg-gray-200" />
          <div className="mt-4 h-4 w-96 max-w-full rounded bg-gray-200" />
        </div>

        {/* Search and Filter Skeleton */}
        <div className="mb-10 grid gap-4 rounded-2xl border border-gray-200 bg-white p-5 md:grid-cols-3">
          <div className="h-12 rounded-xl bg-gray-100" />
          <div className="h-12 rounded-xl bg-gray-100" />
          <div className="h-12 rounded-xl bg-gray-100" />
        </div>

        {/* Studio Cards Skeleton */}
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
            >
              <div className="h-56 bg-gray-200" />

              <div className="space-y-4 p-5">
                <div className="h-3 w-24 rounded bg-gray-200" />
                <div className="h-6 w-3/4 rounded bg-gray-200" />
                <div className="h-4 w-1/2 rounded bg-gray-200" />

                <div className="flex justify-between border-t border-gray-100 pt-4">
                  <div className="h-5 w-24 rounded bg-gray-200" />
                  <div className="h-9 w-24 rounded-full bg-gray-200" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
