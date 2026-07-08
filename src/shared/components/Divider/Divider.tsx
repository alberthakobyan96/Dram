type DividerProps = {
  label?: string;
};

export default function Divider({ label = "or" }: DividerProps) {
  return (
    <div className="my-6 flex items-center gap-4 sm:my-7">
      <div className="h-px flex-1 bg-slate-200" />
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
        {label}
      </span>
      <div className="h-px flex-1 bg-slate-200" />
    </div>
  );
}
