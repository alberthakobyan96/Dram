type AuthHeaderProps = {
  title: string;
  subtitle: string;
};

export default function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div className="mb-7 text-center sm:mb-8 sm:text-left">
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-green-700">
        <img
          src="/favicon.png"
          alt="DRAM"
          className="size-5 rounded-md"
        />
        <span>DRAM</span>
      </div>
      <h1 className="text-3xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 text-base leading-7 text-slate-500">{subtitle}</p>
    </div>
  );
}
