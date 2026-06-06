export function SearchFilterBar({ placeholder = "Search teams, groups, venues..." }: { placeholder?: string }) {
  return (
    <div className="card mb-5 grid gap-3 p-3 sm:grid-cols-[1fr_auto_auto]">
      <input className="rounded-md border border-line bg-black/20 px-3 py-2 text-sm outline-none" placeholder={placeholder} />
      <select className="rounded-md border border-line bg-black/20 px-3 py-2 text-sm outline-none"><option>All groups</option><option>Group A</option><option>Group B</option><option>Group C</option></select>
      <select className="rounded-md border border-line bg-black/20 px-3 py-2 text-sm outline-none"><option>All status</option><option>Live</option><option>Upcoming</option><option>Finished</option></select>
    </div>
  );
}
