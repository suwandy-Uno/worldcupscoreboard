export function PageHeader({ title, description, children }: { title: string; description: string; children?: React.ReactNode }) {
  return (
    <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-3xl font-black sm:text-4xl">{title}</h1>
        <p className="mt-2 max-w-3xl text-slate-400">{description}</p>
      </div>
      {children}
    </div>
  );
}
