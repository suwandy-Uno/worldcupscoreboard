export function EmptyState({ title = "No results yet", body = "Try another filter or check back after the next refresh." }: { title?: string; body?: string }) {
  return (
    <div className="card p-8 text-center">
      <h2 className="font-bold">{title}</h2>
      <p className="mt-2 text-sm text-slate-400">{body}</p>
    </div>
  );
}
