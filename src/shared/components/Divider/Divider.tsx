type DividerProps = {
  label?: string;
};

export default function Divider({ label = "or" }: DividerProps) {
  return (
    <div className="my-6 flex items-center gap-4">
      <div className="h-px flex-1 bg-slate-200" />
      <span className="text-sm font-medium text-slate-400">{label}</span>
      <div className="h-px flex-1 bg-slate-200" />
    </div>
  );
}
