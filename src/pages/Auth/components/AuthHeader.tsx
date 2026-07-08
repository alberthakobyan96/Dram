type AuthHeaderProps = {
  title: string;
  subtitle: string;
};

export default function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div className="mb-8 text-center sm:text-left">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
        DRAM
      </p>
      <h1 className="text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 text-base leading-7 text-slate-500">{subtitle}</p>
    </div>
  );
}
