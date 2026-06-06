export function AdBanner({ label = "Advertisement" }: { label?: string }) {
  return (
    <div className="card flex min-h-20 items-center justify-center border-dashed p-4 text-xs uppercase tracking-[.18em] text-slate-500">
      {label}
    </div>
  );
}
