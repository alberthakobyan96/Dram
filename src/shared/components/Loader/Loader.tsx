type LoaderProps = {
  label?: string;
};

export default function Loader({ label = "Loading" }: LoaderProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="flex flex-col items-center gap-4 text-slate-600">
        <div className="size-10 animate-spin rounded-full border-2 border-slate-200 border-t-green-600" />
        <p className="text-sm font-medium">{label}</p>
      </div>
    </main>
  );
}
